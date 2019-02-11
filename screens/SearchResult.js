import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import SuggestCafeListEntry from './SuggestCafeListEntry';

class SearchResult extends Component {
  state={
    searchCafeList: [],
    target: this.props.navigation.getParam('target'),
    latitude: this.props.navigation.getParam('lat'),
    longitude: this.props.navigation.getParam('lng'),

  }

  handleGoBack(){
    this.props.navigation.goBack();
  }

  requestSearchResult(){
    axios.get(`http://13.125.24.9:3000/api/cafe/search/${this.state.target}`, {
      headers: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    })
    .then( result => {
      this.setState({searchCafeList: result});
    })
    .catch( err => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.requestSearchResult();
  }

  render() {
    const props = this.props.navigation.getParam('target');
    console.log(props)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={ styles.container}>
          <View style={ styles.explore}>
            <View style={ styles.searchBarConatiner}>
              <Icon name="ios-arrow-back" size={20} onPress={this.handleGoBack.bind(this)} />
              <TextInput value={props} placeholder="Search Awesome Cafe" placeholderTextColor="grey" style={styles.searchBar} />
            </View>
          </View>


          <ScrollView>
            {
              this.state.searchCafeList.map( ele => <SuggestCafeListEntry cafe={ele} /> )
            }

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchResult;

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
  }
});