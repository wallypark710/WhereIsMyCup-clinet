import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { Login } from '../modules/Login';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height, width } = Dimensions.get('window');
class SignIn extends Component {
  static navigationOptions = {};

  state = {
    email: '',
    password: '',
    login: false,
  };

  goToScreen = (screenName) => {
    this.props.navigation.navigate(screenName);
  };

  handleGet = async () => {
    console.log(this.state.email, this.state.password);
    await axios
      .post(`http://13.125.24.9:3000/oauth/local/login`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(async (result) => {
        this.setState({
          login: true,
        });

        await Login(this.state.email, this.state.password);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 400:
            alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
            break;
        }
      });

    if (this.state.login) {
      console.log('login Success : ', this.state.login);
      this.goToScreen('Home');
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.setState({ login: false });
      console.log('Login on');
    });
    this.props.navigation.addListener('willBlur', () => {
      console.log('Login off');
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        extraScrollHeight={140}
      >
        <View style={styles.container}>
          <View
            style={{
              flex: 3,
              backgroundColor: 'white',
              justifyContent: 'flex-end',
            }}
          >
            <Image style={styles.img} source={require('../images/LOGO.png')} />
          </View>

          <View style={{ flex: 4, justifyContent: 'flex-start' }}>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <Icon name="ios-mail" size={20} />
                <TextInput
                  style={styles.inputElement}
                  placeholder="input your email"
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onChangeText={(email) => {
                    this.setState({ email });
                  }}
                />
              </View>

              <View style={styles.input}>
                <Icon
                  name="ios-lock"
                  size={20}
                  style={{ paddingRight: 4, paddingLeft: 4 }}
                />
                <TextInput
                  style={styles.inputElement}
                  placeholder="input your password"
                  secureTextEntry={true}
                  onChangeText={(password) => {
                    this.setState({ password });
                  }}
                />
              </View>

              <View style={styles.btn}>
                <TouchableOpacity
                  style={styles.btnEntry}
                  onPress={() => {
                    this.handleGet();
                  }}
                >
                  <Text
                    style={{ textAlign: 'center', color: 'rgb(150,150,150)' }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    marginLeft: 20,
    width: width - 40,
    resizeMode: 'contain',
  },
  btn: {
    flex: 1,
    width: width * 0.3,
    backgroundColor: 'white',
    marginTop: 40,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    width: width * 0.55,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  inputElement: {
    fontWeight: 'bold',
    width: width * 0.55,
    paddingLeft: 10,
  },
  btnEntry: {
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(180,180,180)',
  },
});
