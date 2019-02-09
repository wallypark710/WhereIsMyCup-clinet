import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');
class SignUp extends Component {

  state={
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  }

  handlePost = () => {
    if( this.state.password !== this.state.confirmPassword ){
      alert('password is not correct');
    } else {
      axios.post(`http://ec2-13-125-24-9.ap-northeast-2.compute.amazonaws.com:3000/oauth/local/register`, { name: this.state.name, email: this.state.email, password: this.state.password })
        .then(result => {
          alert(JSON.stringify(result))
          

        })
        .catch(err => alert(err));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 5, backgroundColor: 'white', justifyContent: 'flex-end'}}>
            <Image style={styles.img} source={require('../images/LOGO.png')} />
          </View>

          <View style={styles.scrollContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <View style={styles.input}>
                  <Icon name="ios-mail" size={20} />
                  <TextInput style={styles.inputElement} placeholder="Email" autoCapitalize={ 'none' } autoCorrect={false} onChangeText={(email) => { this.setState({email})}} />
                </View>

                <View style={styles.input}>
                  <Icon name="ios-person" size={20} style={{ paddingRight: 4, paddingLeft: 4 }} />
                  <TextInput style={styles.inputElement} placeholder="Username" onChangeText={(password) => { this.setState({password})}} />
                </View>

                <View style={styles.input}>
                  <Icon name="ios-lock" size={20} style={{ paddingRight: 4, paddingLeft: 4 }} />
                  <TextInput style={styles.inputElement} placeholder="Password" secureTextEntry={true} onChangeText={(password) => { this.setState({password})}} />
                </View>

                <View style={styles.input}>
                  <Icon name="ios-lock" size={20} style={{ paddingRight: 4, paddingLeft: 4 }} />
                  <TextInput style={styles.inputElement} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(password) => { this.setState({password}) }} />
                </View>

                <View style={styles.btn}>
                  <TouchableOpacity
                    style={styles.btnEntry}
                    onPress={() => {
                      this.handlePost();
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: 'rgb(150,150,150)' }}> Regist </Text>
                  </TouchableOpacity>
                </View>

              </View>


            </ScrollView>
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
    resizeMode:'contain'
  },
  btn: {
    flex:1,
    width: width * 0.3,
    backgroundColor: 'white',
  },
  inputContainer: {
    alignItems: 'center'
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
    flex: 6,
    height: 100,
    backgroundColor: "white"
  },
  btnEntry: {
    marginBottom: 80,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(180,180,180)',
  },
});