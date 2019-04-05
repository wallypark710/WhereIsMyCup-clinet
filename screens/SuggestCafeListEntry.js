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
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const defaultImage = require('../images/cafe.jpg');

class SuggestCafeListEntry extends Component {
  state = {};

  render() {
    const { cafe, handlePress } = this.props;
    const img = cafe.images[0] ? { uri: cafe.images[0] } : { defaultImage };

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handlePress(cafe);
        }}
      >
        <View style={styles.suggest}>
          <Image source={img} style={styles.img} />
          <View style={styles.suggestCafeListTextArea} />
          <View
            style={{
              zIndex: 1,
              position: 'absolute',
              width: width - 80,
              top: 190,
            }}
          >
            <Text style={styles.suggestCafeTitle}>{cafe.title}</Text>
            <View
              style={{
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              {cafe.distance ? (
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="ios-pin" size={20} color="white" />
                  <Text
                    style={{
                      marginHorizontal: 5,
                      marginTop: 4,
                      color: 'white',
                    }}
                  >
                    {cafe.distance}m
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

SuggestCafeListEntry.propTypes = {
  handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  suggest: {
    width: width - 70,
    height: 250,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'white',
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
  suggestCafeListTextArea: {
    height: 60,
    position: 'absolute',
    width: width - 70,
    top: 190,
    backgroundColor: '#222',
    opacity: 0.7,
    zIndex: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  suggestCafeTitle: {
    fontSize: 23,
    fontWeight: '500',
    margin: 5,
    marginLeft: 10,
    color: 'white',
  },
});
