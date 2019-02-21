import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class Map extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.props.currentLat,
            longitude: this.props.currentLng,
            latitudeDelta: 0.0062,
            longitudeDelta: 0.0021,
          }}
          style={styles.container}
        >
          {this.props.cafeList.map((ele, idx) => {
            return (
              <Marker
                key={idx}
                coordinate={{
                  latitude: ele.location.lat,
                  longitude: ele.location.lng,
                }}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
