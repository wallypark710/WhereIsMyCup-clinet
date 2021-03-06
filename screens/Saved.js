import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import axios from 'axios';

import SlimCafeListEntry from './SlimCafeListEntry';

class Saved extends Component {
  state = {
    savedList: [],
  };

  componentDidMount() {
    this.requestUserGetSavedCafes();
    this.props.navigation.addListener(
      'didFocus',
      this.requestUserGetSavedCafes.bind(this),
    );
  }

  goToScreen(cafe) {
    this.props.navigation.navigate('CafeInfo', {
      cafe: cafe, // this merges into this screen's props.
    });
  }

  handleGoBack() {
    this.props.navigation.goBack();
  }

  async requestUserGetSavedCafes() {
    axios
      .get(`https://www.sunjae-kim.com/api/users/favorites`, {
        headers: {
          'x-access-token': await AsyncStorage.getItem('access'),
        },
      })
      .then((response) => {
        this.setState({ savedList: response.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ marginVertical: 20, marginLeft: 20 }}>
            <Text style={{ fontSize: 28, fontWeight: '700' }}>Saved Cafes</Text>
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.savedList.map((ele, idx) => (
                <SlimCafeListEntry
                  key={idx}
                  cafe={ele}
                  handlePress={this.goToScreen.bind(this)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
