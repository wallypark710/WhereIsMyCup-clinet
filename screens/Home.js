import React, { Component } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, AppState, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { KEY } from '../config/config.js';

import GoogleMap from './Map';
import UserInfo from './UserInfo';
import Saved from './Saved';
import CafeListEntry from './CafeListEntry';
import SuggestCafeListEntry from './SuggestCafeListEntry';
import {Login} from '../modules/Login';
import SearchResult from './SearchResult';

class Home extends Component {
  state = {
    latitude: 39.7392,
    longitude: -104.9903,
    error: null,
    cafeList: [],
    appState: AppState.currentState,
    timeOut: null,
    searchKeyword: '',
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppState.bind(this));
    this.getCurrentPositionCafeList();
  }

  async getPlaces() {
    axios.post(`http://13.125.24.9:3000/api/cafe/curLoc`,{
      headers: {
        'x-access-token': await AsyncStorage.getItem('access')
      },
      latitude: this.state.latitude,
      longitude: this.state.longitude
    })
    .then((response) => {
      console.log(response);
      this.setState({ cafeList: response.data});
    })
    .catch(err => console.log(err));
  }

  getCurrentPositionCafeList() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.getPlaces();
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuray: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  goToScreen(cafe) {
    console.log(cafe);
    this.props.navigation.navigate('CafeInfo', {lat: this.state.latitude, lng: this.state.longitude, cafe: cafe});
  }

  async handleAppState(currentAppState) {
    console.log(currentAppState);
    this.setState({ appState: currentAppState });

    if (currentAppState === 'active') {
      //refresh token 전송. 3600000
      let currentTime = new Date().getTime();

      if ((currentTime - this.state.timeOut) > 10000) {
        console.log('토큰 만료');
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
          await axios.get(`http://13.125.24.9:3000/oauth/access`,{
            headers: {
              'x-refresh-token' : credentials.password,
            },
          })
            .then(async (result) => {
              console.log('access token renewal success');
              await AsyncStorage.setItem('access', result.headers['x-access-token']);
            })
            .catch(async () => {
              console.log('auto login part');
              const email = JSON.parse(credentials.username).email;
              const pw = JSON.parse(credentials.username).pw;
              const temp = await Login(email , pw);
            });
        } else {
          console.log('credentials error');
        }
      }
    } else {
      this.setState({ timeOut: new Date().getTime() });
    }
  }

  searchSubmit(){
    this.props.navigation.navigate('SearchResult', {target : this.state.searchKeyword});
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={ styles.container}>
          <View style={ styles.explore}>
            <View style={ styles.searchBarConatiner}>
              <Icon name="ios-search" size={20} />
              <TextInput placeholder="search awesome cafe" placeholderTextColor="grey" returnKeyType="search" style={styles.searchBar} onSubmitEditing={this.searchSubmit.bind(this)} onChangeText={(searchKeyword)=>{this.setState({searchKeyword})}} />
            </View>

          </View>

          <ScrollView>
            <View style={styles.mapContainer}>
              <GoogleMap cafeList={this.state.cafeList} currentLat={this.state.latitude} currentLng={this.state.longitude}/>
            </View>

            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: '700' }}>Nearby Cafe</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
              {
  								this.state.cafeList.slice(0,8).map((ele, idx) => <CafeListEntry key={idx} cafe={ele} handlePress={this.goToScreen.bind(this)} />)
  						}
            </ScrollView>

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: '700' }}>Just for You</Text>
            </View>

            <SuggestCafeListEntry />
            <SuggestCafeListEntry />

          </ScrollView>

        </View>
      </SafeAreaView>
    );
  }
}

// export default Home;

export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLable: 'HOME',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-cafe" color={tintColor} size={24} />
      ),
      header: {
        visible: false,
      },
    },
  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      tabBarLable: 'SAVED',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-heart" color={tintColor} size={24} />
      ),
    },
  },
  UserInfo: {
    screen: UserInfo,
    navigationOptions: {
      tabBarLable: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-contact" color={tintColor} size={24} />
      ),
    },
  },
},{
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      shadowOffset: {width: 5, height: 3},
      shadowColor:'black',
      shadowOpacity: 0.5,
      elevation: 5
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  explore: {
    height: 80,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  searchBarConatiner: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,

  },
  searchBar: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  scroll: {
    marginVertical: 20,
  },
  mapContainer: {
    height: 300,
    // marginHorizontal: 20,
  },
});
