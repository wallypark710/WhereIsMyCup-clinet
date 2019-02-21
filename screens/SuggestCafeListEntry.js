import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

class SuggestCafeListEntry extends Component {
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
        <View style={styles.suggest}>
          <Image source={img} style={styles.img} />
          <View
            style={{
              height: 60,
              position: 'absolute',
              width: width - 70,
              top: 190,
              backgroundColor: '#222',
              opacity: 0.7,
              zIndex: 0,

              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          />
          <View
            style={{
              zIndex: 1,
              position: 'absolute',
              width: width - 80,
              top: 190,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontWeight: '500',
                margin: 5,
                marginLeft: 10,
                color: 'white',
              }}
            >
              {this.props.cafe.title}
            </Text>

            <View
              style={{
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              {this.props.cafe.distance ? (
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="ios-pin" size={20} color="white" />
                  <Text
                    style={{
                      marginHorizontal: 5,
                      marginTop: 4,
                      color: 'white',
                    }}
                  >
                    {this.props.cafe.distance}m
                  </Text>
                </View>
              ) : (
                <Text />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SuggestCafeListEntry;

const styles = StyleSheet.create({
  suggest: {
    width: width - 70,
    height: 250,
    marginTop: 20,
    // marginLeft: 20,
    marginBottom: 20,

    backgroundColor: 'white',

    // shadowOffset: { width: 0, height: 0 },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
    // elevation: 1,

    position: 'relative',
  },
  img: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
  },
});
