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
import {useDispatch, useSelector} from 'react-redux';
import Images from '../assets/images';

const BreweriesList = ({navigation}) => {

  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isReachEnd, setIsReachEnd] = useState(false);
  const bookmarkList = useSelector(state => state.bookmark.bookmarkList);
  const dispatch = useDispatch();

  useEffect(() => {
    getBreweries()
  },[])

  const getBreweries = (search, page) => {
    return fetch(`https://api.openbrewerydb.org/breweries?by_name=${search ? search : ''}&page=${page ? page : 1}&per_page=10`)
      .then((response) => response.json())
      .then((json) => {
        console.log('json: ', json);
        setName(search);
        setIsLoading(false);
        setRefreshing(false);
        setIsReachEnd(false);
        setPage(page ? page : 1)
        const uniqData = _.uniqBy([...data, ...json], 'id');
        setData(uniqData);
      })
      .catch((error) => {
        setIsLoading(false);
        setRefreshing(false);
        setIsReachEnd(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setData([])
    setRefreshing(true);
    getBreweries();
  }, []);

  const onSearch = (search) => {
    setName(search);
    debounce(search)
  }

  const debounce = useCallback(
    _.debounce((name) => {
      setIsLoading(true);
      getBreweries(name);
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

  const addToBookmark = (item) => {
    const index = bookmarkList.findIndex(obj => obj.id === item.id);
    if (index < 0) {
      dispatch({type: 'SET_BOOKMARK_LIST', payload: [...bookmarkList, item]});
    } else {
      alert('The item has been bookmarked');
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput 
          placeholder="Search by name" 
          onChangeText={onSearch}
          style={styles.input}
          value={name}
        />
        <TouchableOpacity onPress={() => navigation.navigate('BookmarkList')}>
          <Image source={Images.icStarFilled} style={{width: 30, height: 30, tintColor: '#000'}}/>
        </TouchableOpacity>
      </View>
      { isLoading ? 
        <ActivityIndicator size="large" style={{marginVertical: 30}} />
        :
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
          {data.map((item, index) => {
            const bookmarkIndex = bookmarkList.findIndex(obj => obj.id === item.id);
            return (
              <TouchableOpacity key={index} style={[styles.itemContainer, styles.shadow]} onPress={() => navigation.navigate('BreweriesDetail', {item})}>
                <View style={styles.name}>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                    <Text style={{fontSize: 16, fontStyle: 'italic'}}>{item.brewery_type}</Text>
                  </View>
                  <TouchableOpacity  onPress={() => addToBookmark(item)}>
                    <Image source={bookmarkIndex < 0 ? Images.icStar : Images.icStarFilled} style={{width: 24, height: 24, marginLeft: 10}}/>
                  </TouchableOpacity>
                </View>
                <Text>{item.street ? `${item.street}, ` : ''}{item.city}, {item.state}</Text>
              </TouchableOpacity>
            )
          })}
          {isReachEnd && !refreshing && (
            <ActivityIndicator style={{marginVertical: 30}} />
          )}
        </ScrollView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {height: 60, backgroundColor: '#58AB6B', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16},
  input: {flex:1, height: 40, backgroundColor:'#F5F5F5', padding: 12, marginRight: 16, borderRadius: 8},
  itemContainer: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 16, borderRadius: 8},
  name: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
  shadow: {
    shadowColor: 'rgba(25, 25, 25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    elevation: 8,
    shadowRadius: 4,
    shadowOpacity: 0.5,
  }
});

export default BreweriesList;
