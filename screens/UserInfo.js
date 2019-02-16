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
  WebView,
  Linking,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

class UserInfo extends Component {
  goToScreen = (screenName) => {
    this.props.navigation.navigate(screenName);
  };

  async handleDeleteAccount() {
    const credentials = await Keychain.getGenericPassword();
    const email = JSON.parse(credentials.username).email;
    AlertIOS.prompt('Enter a your email', null, async (text) => {
      if (text === email) {
        axios
          .delete(`http://13.125.24.9:3000/api/users`, {
            headers: {
              'x-access-token': await AsyncStorage.getItem('access'),
            },
          })
          .then((result) => console.log(result))
          .catch((err) => console.log(err.message));

        this.goToScreen('Welcome');
      } else {
        AlertIOS.alert('email is not correct');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require('../images/symbol.png')} />
        </View>
        <View style={styles.subContain}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 24,
              }}
            >
              Contact us
            </Text>
            <Text>wallypark710@gmail.com</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/whereismycup/Where-s-my-cup-c70c5e8e71e64dc09f27a644dcb2f922',
              )
            }
            style={{ alignItems: 'center', marginVertical: 10 }}
          >
            <Text style={{ color: 'black' }}>개인정보 처리방침</Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnEntry}
              onPress={() => {
                this.goToScreen('SignIn');
              }}
            >
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnEntry}
              onPress={this.handleDeleteAccount.bind(this)}
            >
              <Text style={styles.btnText}>Delete acount</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default UserInfo;

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

    marginTop: 100,
  },
  img: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'cover',
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
  btnText: {
    textAlign: 'center',
    color: 'rgb(150,150,150)',
  },
});
