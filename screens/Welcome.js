import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');
class Welcome extends Component {
  goToScreen = (screenName) => {
    this.props.navigation.navigate(screenName);
  };

  render() {
    return (
      <View style={styles.contains}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require('../images/LOGO.png')} />
        </View>

        <View style={styles.subContain}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnEntry}
              onPress={() => {
                this.goToScreen('SignIn');
              }}
            >
              <Text style={styles.btnText}>LogIn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnEntry}
              onPress={() => {
                this.goToScreen('SignUp');
              }}
            >
              <Text style={styles.btnText}>Regist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Welcome;

const styles = StyleSheet.create({
  contains: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  img: {
    marginLeft: 20,
    width: width - 40,
    resizeMode: 'contain',
  },
  btnText: {
    textAlign: 'center',
    color: 'rgb(150,150,150)',
  },
  subContain: {
    flex: 1,
    width: width,
    backgroundColor: 'white',
  },
  btnContainer: {
    width: width * 0.3,
    backgroundColor: 'white',
    marginLeft: width / 2 - width * 0.15,
  },
  btnEntry: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(180,180,180)',
  },
});
