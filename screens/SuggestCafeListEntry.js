import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback
} from 'react-native';

const { width } = Dimensions.get('window');

class SuggestCafeListEntry extends Component {
  render(){
    const img = this.props.cafe.images[0] ? {uri: this.props.cafe.images[0] } : require('../images/cafe.jpg');
    
    return (
      <TouchableWithoutFeedback onPress={()=>{ this.props.handlePress(this.props.cafe)}}>
        <View style={styles.suggest}>
          <Image source={img} style={styles.img} />
          <View style={{ borderWidth: 0.5, borderColor: '#dddddd', height: 80 }}>
            <Text style={{ fontSize: 24, fontWeight: '500', margin: 5 }}> { this.props.cafe.title } </Text>
            <Text style={{ margin: 5, marginLeft: 10 }}>{this.props.cafe.distance}m</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      );
  }
}

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