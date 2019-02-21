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

const { height, width } = Dimensions.get('window');

class UserInfo extends Component {
  state = {
    email: '',
  };

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const credentials = await Keychain.getGenericPassword();
    const email = JSON.parse(credentials.username).email;

    this.setState({
      email: email,
    });
  }

  goToScreen = (screenName) => {
    this.props.navigation.navigate(screenName);
  };

  handleDeleteAccount() {
    AlertIOS.prompt('Enter a your email', null, async (text) => {
      if (text === this.state.email) {
        axios
          .delete(`https://www.sunjae-kim.com/api/users`, {
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
                fontWeight: '600',
                fontSize: 24,
                marginBottom: 10,
              }}
            >
              {this.state.email}
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
            onPress={this.handleDeleteAccount.bind(this)}
          >
            <Text style={styles.btnText}>Delete account</Text>
          </TouchableOpacity>
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
