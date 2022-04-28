import React, {useEffect, useState, useCallback} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';
import Images from '../assets/images';

const Navbar = ({title, onBack}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.icon} onPress={onBack}>
        <Image source={Images.icBack} style={styles.icBack}/>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.icon}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: 60, backgroundColor: '#58AB6B', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16},
  title: {flex: 1, textAlign: 'center', fontSize: 22, color: '#FFFFFF', fontWeight: '500'},
  icBack: {width: 24, height: 24, tintColor: '#FFFFFF', resizeMode: 'contain'},
  icon: {width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: 16},
});

export default Navbar;
