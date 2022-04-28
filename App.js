import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';

const App = () => {

  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isReachEnd, setIsReachEnd] = useState(false);

  useEffect(() => {
    getBreweries()
  },[])

  const getBreweries = (search, page) => {
    return fetch(`https://api.openbrewerydb.org/breweries?by_name=${search ? search : ''}&page=${page ? page : 1}&per_page=10`)
      .then((response) => response.json())
      .then((json) => {
        setName(search);
        setRefreshing(false);
        setIsReachEnd(false);
        setData([...data, ...json]);
      })
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
        setIsReachEnd(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setData([])
    setRefreshing(true);
    getBreweries('', 1);
    setPage(1);
  }, []);

  const onSearch = (search) => {
    setName(search);
    debounce(search)
  }

  const debounce = useCallback(
    _.debounce((name) => {
      getBreweries(name, 1);
    }, 1200),
    []
  );

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput 
          placeholder="Search by name" 
          onChangeText={onSearch}
          style={styles.input}
          value={name}
        />
        <TouchableOpacity>
          <Image source={require('./star_filled.png')} style={{width: 30, height: 30, tintColor: '#000'}}/>
        </TouchableOpacity>
      </View>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic" 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            !isReachEnd && getBreweries(name, page + 1);
            setIsReachEnd(true);
          }
        }}
        style={{backgroundColor: '#F5F5F5', padding: 16}}
      >
        {data.map((item, index) => (
          <TouchableOpacity key={index} style={styles.itemContainer}>
            <View style={styles.name}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{fontSize: 16, fontStyle: 'italic'}}>{item.brewery_type}</Text>
              </View>
              <TouchableOpacity>
                <Image source={require('./star.png')} style={{width: 24, height: 24, marginLeft: 10}}/>
              </TouchableOpacity>
            </View>
            <Text>{item.street ? `${item.street}, ` : ''}{item.city}, {item.state}</Text>
          </TouchableOpacity>
        ))}
        {isReachEnd && !refreshing && (
          <ActivityIndicator style={{marginVertical: 30}} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16},
  input: {flex:1, backgroundColor:'#F5F5F5', padding: 12, marginRight: 12, borderRadius: 8},
  itemContainer: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 16, borderRadius: 8},
  name: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
});

export default App;
