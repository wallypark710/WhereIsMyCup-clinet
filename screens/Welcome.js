import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  AppState,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';

const Logo = require('../images/LOGO.png');

const { width } = Dimensions.get('window');

class Welcome extends Component {
  state = {
    pendding: true,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const event = navigation.addListener(
      'didFocus',
      this.handleLogin.bind(this),
    );
  }

  goToScreen = screenName => {
    const { navigation } = this.props;
    navigation.navigate(screenName);
  };

  async handleLogin() {
    const isLogin = await AsyncStorage.getItem('isLogin');
    if (isLogin === 'true') {
      this.goToScreen('Home');
    } else {
      this.setState({ pendding: false });
    }
  }

  render() {
    const { pendding } = this.state;
    if (pendding) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 24, fontWeight: '500' }}>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.contains}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={Logo} />
        </View>

        <View style={styles.subContain}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnEntry}
              onPress={() => {
                this.goToScreen('SignIn');
              }}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnEntry}
              onPress={() => {
                this.goToScreen('SignUp');
              }}
            >
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Welcome;

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

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
    width,
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
