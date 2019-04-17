import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  AlertIOS,
  AsyncStorage,
  Linking,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import PropTypes from 'prop-types';

const Logo = require('../images/symbol.png');

const { width } = Dimensions.get('window');

class UserInfo extends Component {
  state = {
    email: '',
  };

  componentDidMount = () => {
    this.getUserInfo();
  };

  getUserInfo = async () => {
    const credentials = await Keychain.getGenericPassword();
    const { email } = JSON.parse(credentials.username);

    this.setState({
      email,
    });
  };

  goToScreen = screenName => {
    const { navigation } = this.props;
    navigation.navigate(screenName);
  };

  handleDeleteAccount = () => {
    const { email } = this.state;
    AlertIOS.prompt('Enter a your email', null, async text => {
      if (text === email) {
        axios
          .delete(`https://www.sunjae-kim.com/api/users`, {
            headers: {
              'x-access-token': await AsyncStorage.getItem('access'),
            },
          })
          .then(result => console.log(result))
          .catch(err => console.log(err.message));

        this.goToScreen('Welcome');
      } else {
        AlertIOS.alert('email is not correct');
      }
    });
  };

  render = () => {
    const { email } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={Logo} />
        </View>
        <View style={styles.subContain}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 24,
                marginBottom: 10,
              }}
            >
              {email}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/whereismycup/Where-s-my-cup-c70c5e8e71e64dc09f27a644dcb2f922',
              )
            }
            style={{ alignItems: 'center', paddingVertical: 7 }}
          >
            <Text style={{ color: 'black' }}>개인정보 처리방침</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/whereismycup/Support-396bcbf99dfd4bd893b68f23cdace975',
              )
            }
            style={{ alignItems: 'center', paddingVertical: 7 }}
          >
            <Text style={{ color: 'black' }}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnEntry}
            onPress={async () => {
              await AsyncStorage.setItem('saved', '[]');
              await AsyncStorage.setItem('isLogin', 'false');
              this.goToScreen('Welcome');
            }}
          >
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnEntry}
            onPress={this.handleDeleteAccount}
          >
            <Text style={styles.btnText}>Delete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

export default UserInfo;

UserInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 80,
  },
  img: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'cover',
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
    marginTop: 10,
  },
  btnEntry: {
    paddingVertical: 7,
  },
  btnText: {
    textAlign: 'center',
    color: 'red',
  },
});
