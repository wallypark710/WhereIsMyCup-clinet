import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  findNodeHandle,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Keychain from 'react-native-keychain';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height, width } = Dimensions.get('window');
class SignUp extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    isSignUp: false,
  };

  handlePost = async () => {
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
    } else {
      await axios
        .post(`https://www.sunjae-kim.com/oauth/local/register`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        })
        .then(async (result) => {
          const firstKeyChain = JSON.stringify({
            email: this.state.email,
            pw: this.state.password,
          });
          const secondKeyChain = result.headers['x-refresh-token'];

          await Keychain.setGenericPassword(firstKeyChain, secondKeyChain);

          await AsyncStorage.setItem(
            'access',
            result.headers['x-access-token'],
          );

          this.setState({ isSignUp: true });
        })
        .catch((err) => {
          switch (err.response.status) {
            case 403:
              Alert.alert('입력하신 정보가 형식 맞지 않습니다.');
              break;

            case 400:
              Alert.alert('이미 존재하는 이메일 입니다.');
              break;

            default:
              break;
          }
        });

      if (this.state.isSignUp) {
        this.props.navigation.navigate('Intro_1');
      }
    }
  };

  _scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.scrollContainer}>
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={styles.container}
              scrollEnabled={false}
              enableAutomaticScroll={true}
              extraHeight={180}
              innerRef={(ref) => {
                this.scroll = ref;
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'flex-end',
                    marginTop: height * 0.06,
                  }}
                >
                  <Image
                    style={styles.img}
                    source={require('../images/LOGO.png')}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.input}>
                    <Icon name="ios-mail" size={20} />
                    <TextInput
                      style={styles.inputElement}
                      placeholder="Email"
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={(email) => {
                        this.setState({ email });
                      }}
                      returnKeyType={'next'}
                      onSubmitEditing={() => {
                        this.secondTextInput.focus();
                      }}
                      blurOnSubmit={false}
                      onFocus={(event) => {
                        this._scrollToInput(findNodeHandle(event.target));
                      }}
                    />
                  </View>

                  <View style={styles.input}>
                    <Icon
                      name="ios-person"
                      size={20}
                      style={{ paddingRight: 4, paddingLeft: 4 }}
                    />
                    <TextInput
                      style={styles.inputElement}
                      placeholder="Username"
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={(name) => {
                        this.setState({ name });
                      }}
                      ref={(input) => {
                        this.secondTextInput = input;
                      }}
                      returnKeyType={'next'}
                      onSubmitEditing={() => {
                        this.thirdTextInput.focus();
                      }}
                      blurOnSubmit={false}
                      onFocus={(event) => {
                        this._scrollToInput(findNodeHandle(event.target));
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
                      placeholder="Password"
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      secureTextEntry={true}
                      onChangeText={(password) => {
                        this.setState({ password });
                      }}
                      ref={(input) => {
                        this.thirdTextInput = input;
                      }}
                      returnKeyType={'next'}
                      onSubmitEditing={() => {
                        this.fourthTextInput.focus();
                      }}
                      blurOnSubmit={false}
                      onFocus={(event) => {
                        this._scrollToInput(findNodeHandle(event.target));
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
                      placeholder="Confirm Password"
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      secureTextEntry={true}
                      onChangeText={(confirmPassword) => {
                        this.setState({ confirmPassword });
                      }}
                      ref={(input) => {
                        this.fourthTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.handlePost();
                      }}
                      onFocus={(event) => {
                        this._scrollToInput(findNodeHandle(event.target));
                      }}
                    />
                  </View>

                  <View style={styles.btn}>
                    <TouchableOpacity
                      style={styles.btnEntry}
                      onPress={() => {
                        this.handlePost();
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'rgb(150,150,150)',
                        }}
                      >
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SignUp;

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
  },
  inputContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    // paddingBottom: 220,
  },
  input: {
    flexDirection: 'row',
    width: width * 0.55,
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  inputElement: {
    fontWeight: 'bold',
    width: 200,
    paddingLeft: 10,
  },
  scrollContainer: {
    flex: 1,
    height: height,
    backgroundColor: 'white',
  },
  btnEntry: {
    marginBottom: 80,
    marginTop: 40,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(180,180,180)',
  },
});
