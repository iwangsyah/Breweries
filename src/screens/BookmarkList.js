import React, {useEffect, useState, useCallback} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Images from '../assets/images';
import {Navbar} from '../components';

const BookmarkList = ({navigation}) => {

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
        { text: "OK", onPress: () => deleteBookmark(item) }
      ]
    );
  }

  const deleteBookmark = (item) => {
    const index = bookmarkList.findIndex(obj => obj.id === item.id);
    const array = [...bookmarkList];
    array.splice(index, 1);
    dispatch({type: 'SET_BOOKMARK_LIST', payload: array});
  }

  return (
    <SafeAreaView style={styles.container}>
        <Navbar title="Bookmarked List" onBack={() => navigation.pop()}/>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#F5F5F5', padding: 16}}>
          {bookmarkList.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.itemContainer, styles.shadow]} 
                onPress={() => navigation.navigate('BreweriesDetail', {item, isBookmarked: true})}
              >
                <View style={styles.name}>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                    <Text style={{fontSize: 16, fontStyle: 'italic'}}>{item.brewery_type}</Text>
                  </View>
                  <TouchableOpacity  onPress={() => deleteConfirmation(item)}>
                    <Image source={Images.icTrash} style={{width: 24, height: 24, marginLeft: 10, tintColor: '#DF4A41'}}/>
                  </TouchableOpacity>
                </View>
                <Text>{item.street ? `${item.street}, ` : ''}{item.city}, {item.state}</Text>
              </TouchableOpacity>
          ))}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
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

export default BookmarkList;
