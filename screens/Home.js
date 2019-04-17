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
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import * as Keychain from 'react-native-keychain';
import PropTypes from 'prop-types';

import GoogleMap from './Map';
import UserInfo from './UserInfo';
import Saved from './Saved';
import CafeListEntry from './CafeListEntry';
import SuggestCafeListEntry from './SuggestCafeListEntry';
import { Login } from '../modules/Login';

const { width } = Dimensions.get('window');
class Home extends Component {
  state = {
    latitude: 37.5461212,
    longitude: 126.9934138,
    latitudeDelta: 0.0062,
    longitudeDelta: 0.0021,
    error: null,
    cafeList: [],
    suggestCafeList: [],
    // appState: AppState.currentState,
    searchKeyword: '',
  };

  componentDidMount = () => {
    const { navigation } = this.props;

    AppState.addEventListener('change', this.handleAppState.bind(this));
    this.getCurrentPositionCafeList();
    navigation.addListener(
      'didFocus',
      this.getCurrentPositionCafeList.bind(this),
    );
  };

  getPlaces = async () => {
    const { latitude, longitude } = this.state;
    axios
      .get(`https://www.sunjae-kim.com/api/cafe/curLoc`, {
        headers: {
          'x-access-token': await AsyncStorage.getItem('access'),
          latitude,
          longitude,
        },
      })
      .then(response => {
        this.setState({
          cafeList: response.data.cafeAround,
          suggestCafeList: response.data.recommendations,
        });
      })
      .catch(err => console.log(err.message));
  };

  getCurrentPositionCafeList = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
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
  };

  goToScreen = cafe => {
    const { navigation } = this.props;
    const { latitude, longitude } = this.state;

    navigation.navigate('CafeInfo', {
      lat: latitude,
      lng: longitude,
      cafe,
    });
  };

  handleAppState = async currentAppState => {
    if (currentAppState === 'active') {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        await axios
          .get(`https://www.sunjae-kim.com/oauth/access`, {
            headers: {
              'x-refresh-token': credentials.password,
            },
          })
          .then(async result => {
            const {
              data: {
                user: { favorites },
              },
            } = result;

            await AsyncStorage.setItem('saved', JSON.stringify(favorites));

            await AsyncStorage.setItem(
              'access',
              result.headers['x-access-token'],
            );
          })
          .catch(async () => {
            const { email } = JSON.parse(credentials.username);
            const { pw } = JSON.parse(credentials.username);

            try {
              await Login(email, pw);
            } catch (err) {
              console.log(err.message);
            }
          });
      } else {
        console.log('credentials error');
      }
    }
  };

  searchSubmit = list => {
    const { navigation } = this.props;
    const { latitude, longitude, searchKeyword } = this.state;

    navigation.navigate('SearchResult', {
      lat: latitude,
      lng: longitude,
      target: searchKeyword,
      handlePress: this.goToScreen.bind(this),
      list,
    });
    this.setState({ searchKeyword: '' });
  };

  renderItem = ({ item, index }) => (
    <View style={{ height: 300 }}>
      <SuggestCafeListEntry
        key={index}
        cafe={item}
        handlePress={this.goToScreen}
      />
    </View>
  );

  handlePressMarker = cafe => {
    this.setState({
      latitude: cafe.location.lat,
      longitude: cafe.location.lng,
    });
  };

  handleMapMove = position => {
    this.setState({
      latitude: position.latitude,
      longitude: position.longitude,
      latitudeDelta: position.latitudeDelta,
      longitudeDelta: position.longitudeDelta,
    });
  };

  handleMapBtn = () => {
    this.getCurrentPositionCafeList();
  };

  render = () => {
    const {
      searchKeyword,
      cafeList,
      latitude,
      longitude,
      suggestCafeList,
      latitudeDelta,
      longitudeDelta,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.explore}>
            <View style={styles.searchBarConatiner}>
              <Icon name="ios-search" size={20} onPress={this.searchSubmit} />
              <TextInput
                value={searchKeyword}
                placeholder="search awesome cafe"
                placeholderTextColor="grey"
                returnKeyType="search"
                style={styles.searchBar}
                onSubmitEditing={this.searchSubmit}
                onChangeText={searchKeyword => {
                  this.setState({ searchKeyword });
                }}
              />
            </View>
          </View>

          <ScrollView style={{ position: 'relative' }}>
            <View style={styles.mapContainer}>
              <View style={{ position: 'absolute', zIndex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleMapBtn();
                  }}
                  style={styles.mapBtn}
                >
                  {/*
                  <Text
                    style={{ color: 'white', fontSize: 11, fontWeight: '700' }}
                  >
                    Current Location
                  </Text>
                */}

                  <Icon name="ios-navigate" size={32} color="#0C5336" />
                </TouchableOpacity>
              </View>
              <GoogleMap
                cafeList={cafeList}
                currentLat={latitude}
                currentLng={longitude}
                currentLatDelta={latitudeDelta}
                currentLngDelta={longitudeDelta}
                handlePressMarker={this.handlePressMarker}
                handleMapMove={this.handleMapMove}
              />
            </View>

            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontSize: 27, fontWeight: '700' }}>
                Nearby Cafe
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scroll}
            >
              {cafeList.slice(0, 8).map((ele, idx) => (
                <CafeListEntry
                  key={idx.toString()}
                  cafe={ele}
                  handlePress={this.goToScreen}
                />
              ))}

              <TouchableWithoutFeedback
                onPress={() => {
                  this.searchSubmit(cafeList);
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
              <Text style={{ fontSize: 28, fontWeight: '700' }}>
                Just for You
              </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={suggestCafeList}
                renderItem={this.renderItem}
                sliderWidth={width}
                itemWidth={width * 0.8}
                layout={'default'}
                layoutCardOffset={20}
                sliderHeight={270}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

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
    borderRadius: 3,
  },
  searchBar: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  scroll: {
    marginTop: 20,
    marginBottom: 10,
  },
  mapContainer: {
    height: 230,
    zIndex: 0,
  },
  mapBtn: {
    margin: 7,
  },
});
