import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class CafeListEntry extends Component {
  render() {
    const img = this.props.cafe.images[0]
      ? { uri: this.props.cafe.images[0] }
      : require('../images/cafe.jpg');
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.handlePress(this.props.cafe);
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              flex: 2,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              overflow: 'hidden',
            }}
          >
            <Image style={styles.img} source={img} />
          </View>

          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              paddingTop: 10,
            }}
          >
            <Text numberOfLines={1} style={{ fontWeight: '500' }}>
              {this.props.cafe.title}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Icon name="ios-pin" size={15} color="#888" />
              <Text style={{ color: '#888', marginLeft: 3 }}>
                {this.props.cafe.distance}m
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CafeListEntry;

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 0.7,
    borderColor: '#dddddd',
    marginBottom: 20,

    backgroundColor: 'white',

    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 1,
    borderRadius: 5,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
