import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  AsyncStorage,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import SuggestCafeListEntry from './SuggestCafeListEntry';

class SearchResult extends Component {
  state = {
    cafeList: this.props.navigation.getParam('list') || [],
    target: this.props.navigation.getParam('target'),
    latitude: this.props.navigation.getParam('lat'),
    longitude: this.props.navigation.getParam('lng'),
    newSearchKeyword: '',
    end: 5,
  };

  handleGoBack() {
    this.setState({ cafeList: [] });
    this.props.navigation.goBack();
  }

  async requestSearchResult() {
    axios
      .get(`http://13.125.24.9:3000/api/cafe/search/${this.state.target}`, {
        headers: {
          'x-access-token': await AsyncStorage.getItem('access'),
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      })
      .then((result) => {
        console.log(this.state.target);
        this.setState({
          cafeList: result.data,
          viewCafeList: result.data.slice(0, 5),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    if (this.state.target) {
      this.requestSearchResult();
    }
  }

  render() {
    const props = this.props.navigation.getParam('target');

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.explore}>
            <View style={styles.searchBarConatiner}>
              <Icon
                name="ios-arrow-back"
                size={20}
                onPress={this.handleGoBack.bind(this)}
              />
              <TextInput
                value={this.state.target}
                placeholder="Search Awesome Cafe"
                placeholderTextColor="grey"
                onSubmitEditing={this.requestSearchResult.bind(this)}
                onChangeText={(target) => {
                  this.setState({ target });
                }}
                style={styles.searchBar}
              />
            </View>
          </View>
          <ScrollView>
            <FlatList
              data={this.state.cafeList}
              numColumns={1}
              keyExtractor={this._keyExtractor}
              renderItem={(itemData) => (
                <SuggestCafeListEntry
                  cafe={itemData.item}
                  handlePress={this.props.navigation.getParam('handlePress')}
                />
              )}
            />
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
  },
});
