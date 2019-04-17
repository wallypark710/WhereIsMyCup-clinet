import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class Map extends Component {
  state = {
    latDelta: 0.0062,
    lngDelta: 0.0021,
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.props.currentLat,
            longitude: this.props.currentLng,
            latitudeDelta: this.props.currentLatDelta,
            longitudeDelta: this.props.currentLngDelta,
          }}
          style={styles.container}
          onRegionChangeComplete={point => {
            this.props.handleMapMove(point);
          }}
        >
          {this.props.cafeList.map((ele, idx) => {
            return (
              <Marker
                key={idx}
                coordinate={{
                  latitude: ele.location.lat,
                  longitude: ele.location.lng,
                }}
                title={ele.title}
                onPress={() => {
                  this.props.handlePressMarker(ele);
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
