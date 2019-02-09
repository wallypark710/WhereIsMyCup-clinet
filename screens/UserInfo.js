import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class UserInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> UserInfo </Text>
      </View>
    );
  }
}

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
