import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  AppState,
  AsyncStorage,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import axios from 'axios';

import GoogleMap from './Map';
import UserInfo from './UserInfo';
import Saved from './Saved';
import CafeListEntry from './CafeListEntry';
import SuggestCafeListEntry from './SuggestCafeListEntry';
import { Login } from '../modules/Login';
import SearchResult from './SearchResult';

class Home extends Component {
  state = {
    latitude: 37.5461212,
    longitude: 126.9934138,
    error: null,
    cafeList: [],
    suggestCafeList: [],
    appState: AppState.currentState,
    timeOut: null,
    searchKeyword: '',
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppState.bind(this));
    this.getCurrentPositionCafeList();
  }

  async getPlaces() {
    axios
      .get(`http://13.125.24.9:3000/api/cafe/curLoc`, {
        headers: {
          'x-access-token': await AsyncStorage.getItem('access'),
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      })
      .then((response) => {
        console.log(response.data.cafeAround, response.data.recommendations);
        this.setState({
          cafeList: response.data.cafeAround,
          suggestCafeList: response.data.recommendations,
        });
      })
      .catch((err) => console.log(err));
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
      (error) => this.setState({ error: error.message }),
      { enableHighAccuray: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  goToScreen(cafe) {
    this.props.navigation.navigate('CafeInfo', {
      lat: this.state.latitude,
      lng: this.state.longitude,
      cafe: cafe,
    });
  }

  async handleAppState(currentAppState) {
    this.setState({ appState: currentAppState });

    if (currentAppState === 'active') {
      //refresh token 전송. 3600000
      let currentTime = new Date().getTime();

      if (currentTime - this.state.timeOut > 3600000) {
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
          await axios
            .get(`http://13.125.24.9:3000/oauth/access`, {
              headers: {
                'x-refresh-token': credentials.password,
              },
            })
            .then(async (result) => {
              await AsyncStorage.setItem(
                'access',
                result.headers['x-access-token'],
              );
            })
            .catch(async () => {
              const email = JSON.parse(credentials.username).email;
              const pw = JSON.parse(credentials.username).pw;
              const temp = await Login(email, pw);
            });
        } else {
          console.log('credentials error');
        }
      }
    } else {
      this.setState({ timeOut: new Date().getTime() });
    }
  }

  searchSubmit(list) {
    this.props.navigation.navigate('SearchResult', {
      lat: this.state.latitude,
      lng: this.state.longitude,
      target: this.state.searchKeyword,
      handlePress: this.goToScreen.bind(this),
      list: list,
    });
    this.setState({ searchKeyword: '' });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.explore}>
            <View style={styles.searchBarConatiner}>
              <Icon
                name="ios-search"
                size={20}
                onPress={this.searchSubmit.bind(this)}
              />
              <TextInput
                value={this.state.searchKeyword}
                placeholder="search awesome cafe"
                placeholderTextColor="grey"
                returnKeyType="search"
                style={styles.searchBar}
                onSubmitEditing={this.searchSubmit.bind(this)}
                onChangeText={(searchKeyword) => {
                  this.setState({ searchKeyword });
                }}
              />
            </View>
          </View>

          <ScrollView>
            <View style={styles.mapContainer}>
              <GoogleMap
                cafeList={this.state.cafeList}
                currentLat={this.state.latitude}
                currentLng={this.state.longitude}
              />
            </View>

            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: '700' }}>
                Nearby Cafe
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scroll}
            >
              {this.state.cafeList.slice(0, 8).map((ele, idx) => (
                <CafeListEntry
                  key={idx}
                  cafe={ele}
                  handlePress={this.goToScreen.bind(this)}
                />
              ))}

              <TouchableWithoutFeedback
                onPress={() => {
                  this.searchSubmit(this.state.cafeList);
                }}
              >
                <View
                  style={{
                    height: 130,
                    width: 130,
                    marginLeft: 20,
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      paddingTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        fontWeight: 'bold',
                        paddingTop: 50,
                        height: 110,
                      }}
                    >
                      See all List
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: '700' }}>
                Just for You
              </Text>
            </View>

            {this.state.suggestCafeList.map((ele, idx) => (
              <SuggestCafeListEntry
                key={idx}
                cafe={ele}
                handlePress={this.goToScreen.bind(this)}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

// export default Home;

export default createBottomTabNavigator(
  {
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
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

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
