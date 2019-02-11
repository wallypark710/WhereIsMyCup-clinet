import React from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SuggestCafeListEntry = () => (
  <View style={styles.suggest}>
    <Image source={require('../images/cafe.jpg')} style={styles.img} />
    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', height: 80 }}>
      <Text style={{ fontSize: 24, fontWeight: '500', margin: 5 }}> Wallis Cafe </Text>
      <Text style={{ margin: 5, marginLeft: 10 }}>Sweet music in a luxurious atmosphere </Text>
    </View>
  </View>
);

export default SuggestCafeListEntry;

const styles = StyleSheet.create({
  suggest: {
    width: width - 40,
    height: 300,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,

    backgroundColor: 'white',
    
    shadowOffset: {width: 0, height: 0},
    shadowColor:'black',
    shadowOpacity: 0.2,
    elevation: 1
  },
  img: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
});