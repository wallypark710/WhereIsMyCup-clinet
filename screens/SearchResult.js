import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SearchResult extends Component {
  state={
    searchCafeList: []
  }

  handleGoBack(){
    this.props.navigation.goBack();
  }

  requestSearchResult(){

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