import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

class SuggestCafeListEntry extends Component {
  render() {
    const img = this.props.cafe.images[0]
      ? { uri: this.props.cafe.images[0] }
      : require('../images/cafe.jpg');

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.handlePress(this.props.cafe);
        }}
        style={{ width: width }}
      >
        <View style={styles.suggest}>
          <View style={{ flex: 3 }}>
            <Image source={img} style={styles.img} />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: width - 40,
              flex: 1,
            }}
          >
            <View style={{ backgroundColor: 'white' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  marginLeft: 10,
                  marginTop: 10,
                  color: '#333',
                }}
              >
                {this.props.cafe.title}
              </Text>
            </View>

            <View
              style={{
                width: width - 40,
                marginTop: 5,
                marginLeft: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                // justifyContent: 'space-between',
              }}
            >
              {this.props.cafe.distance ? (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginRight: 7,
                  }}
                >
                  <Icon name="ios-pin" size={20} color="#888" />
                  <Text
                    style={{
                      marginHorizontal: 5,
                      marginTop: 4,
                      color: '#888',
                    }}
                  >
                    {this.props.cafe.distance}m
                  </Text>
                </View>
              ) : (
                <Text />
              )}
              <View>
                <Text
                  style={{
                    marginRight: 5,
                    marginTop: 4,
                    color: '#888',
                    backgroundColor: 'white',
                  }}
                >
                  {this.props.cafe.addresses[0]}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SuggestCafeListEntry;

const styles = StyleSheet.create({
  suggest: {
    flex: 1,
    width: width - 40,
    height: 250,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 15,

    // borderWidth: 0.7,
    // borderColor: '#dddddd',
    // paddingVertical: 10,

    // shadowOffset: { width: 0, height: 0 },
    // shadowColor: '#dddddd',
    // shadowOpacity: 0.1,
    // elevation: 1,
  },
  img: {
    flex: 1,
    width: width - 40,
    borderRadius: 15,
    resizeMode: 'cover',
  },
});
