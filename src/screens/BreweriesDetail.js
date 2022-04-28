import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../assets/images';
import {Navbar} from '../components';

const BreweriesDetail = ({route, navigation}) => {

  const {item, isBookmarked} = route.params;
  const bookmarkList = useSelector(state => state.bookmark.bookmarkList);
  const dispatch = useDispatch();

  const deleteConfirmation = (item) => {
    Alert.alert(
      "Are you sure want to remove this item from bookmark?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteBookmark() }
      ]
    );
  }
  
  const deleteBookmark = () => {
    const index = bookmarkList.findIndex(obj => obj.id === item.id);
    const array = [...bookmarkList];
    array.splice(index, 1);
    dispatch({type: 'SET_BOOKMARK_LIST', payload: array});
    navigation.pop();
  }

  const openWebPage = () => {
    if (item.website_url) {
      navigation.navigate('WebScreen', {url: item.website_url, title: item.name});
    } else {
      Alert.alert(
        "This item doesn't have a web url",
        "Would you like to be redirected to the Going Merry website?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate('WebScreen', {url: 'https://www.goingmerry.com/', title: 'Going Merry'}) }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Breweries Detail" onBack={() => navigation.pop()}/>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#F5F5F5', padding: 16}}>
        <Text style={styles.title}>Name :</Text>
        <Text style={styles.value}>{item.name}</Text>
        <Text style={styles.title}>Type :</Text>
        <Text style={styles.value}>{item.brewery_type}</Text>
        <Text style={styles.title}>Address :</Text>
        <Text style={styles.value}>{item.street ? `${item.street}, ` : ''}{item.city}, {item.state}{`\n${item.postal_code}, ${item.country}`}</Text>
        <Text style={styles.title}>Updated At :</Text>
        <Text style={styles.value}>{moment(item.updated_at).format('MMM, DD YYYY')}</Text>
        <TouchableOpacity style={[styles.button, styles.buttonCustom('#0677D7'), styles.shadow]} onPress={openWebPage}>
          <Image source={Images.icWeb} style={{width: 24, height: 24, marginRight: 10, tintColor: '#FFFFFF'}}/>
          <Text style={styles.txtButton}>Open URL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonCustom('#DF4A41'), styles.shadow, {display: isBookmarked ? 'flex' : 'none'}]} onPress={deleteConfirmation}>
          <Image source={Images.icTrash} style={{width: 24, height: 24, marginRight: 10, tintColor: '#FFFFFF'}}/>
          <Text style={styles.txtButton}>Remove from bookmark</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {fontSize: 14, fontWeight: 'bold', marginBottom: 6},
  value: {fontSize: 18, fontWeight: '400', marginLeft: 10, marginBottom: 16},
  button: {alignSelf: 'center', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 22},
  buttonCustom: (color) => ({flexDirection:'row', backgroundColor: color, marginTop: 20}),
  txtButton: {fontSize: 16, fontWeight: '600', color: '#FFFFFF'},
  shadow: {
    shadowColor: 'rgba(25, 25, 25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    elevation: 8,
    shadowRadius: 2,
    shadowOpacity: 0.5,
  }
});

export default BreweriesDetail;
