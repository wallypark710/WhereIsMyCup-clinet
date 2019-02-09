import React, { Component } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import axios from 'axios';
import { KEY } from '../config/config.js';

import GoogleMap from './Map';
import UserInfo from './UserInfo';
import Saved from './Saved';
import CafeListEntry from './CafeListEntry';
import SuggestCafeListEntry from './SuggestCafeListEntry';

class Home extends Component {
  state = {
    latitude: 39.7392,
    longitude: -104.9903,
    error: null,
    cafeList: [],
  }

  goToScreen(){
    this.props.navigation.navigate('CafeInfo', {lat: this.state.latitude, lng: this.state.longitude});
  }

  componentDidMount() {

    this.getCurrentPositionCafeList();
  }

  getUrlWithParameters(lat, long, radius, type, API) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const key = `&key=${API}`;
    return `${url}${location}${typeData}${key}`;
  }

  getPlaces() {
    const url = this.getUrlWithParameters(this.state.latitude, this.state.longitude, 500, 'cafe', KEY);
    axios.get(url)
      .then((response) => {
        this.setState({ cafeList: response.data.results });
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


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={ styles.container}>
          <View style={ styles.explore}>
            <View style={ styles.searchBarConatiner}>
              <Icon name="ios-search" size={20} />
              <TextInput placeholder="search awesome cafe" placeholderTextColor="grey" style={styles.searchBar} />
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
  								this.state.cafeList.map((ele, idx) => <CafeListEntry key={idx} cafe={ele} handlePress={this.goToScreen.bind(this)} />)
  						}
            </ScrollView>

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: '700' }}>Just for You</Text>
            </View>

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
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      },
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
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      },
    },
  },
  UserInfo: {
    screen: UserInfo,
    navigationOptions: {
      tabBarLable: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-contact" color={tintColor} size={24} />
      ),
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      },
    },
  },
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
