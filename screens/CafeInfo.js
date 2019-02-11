import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GoogleMap from './Map';

const { height, width } = Dimensions.get('window');

class CafeInfo extends Component {

  static navigationOptions={
    header: null,
  }
  

  render(){
    const props = this.props.navigation.state.params;
    const img = props.cafe.images[0] ? {uri: props.cafe.images[0] } : require('../images/cafe.jpg');
    console.log(this.props.navigation.state.params);
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={ styles.container }>
        <Image source={img} style={ styles.img } />   
        
        <View style={styles.scrollContainer}>
          <ScrollView style={{flex:1}} bounces={false} >

            <View style={styles.view} />

            <View style={ styles.infoContainer }>
              <View style={{flex: 1}}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 35, fontWeight: '400', backgroundColor: 'white',paddingLeft: 20, }}>{props.cafe.title}</Text>
                  <Text style={{paddingLeft: 20}}>{props.cafe.addresses[0]}</Text>
                </View>

                <View style={styles.infoBody}>
                  <View style={styles.bodyContents}>

                  </View>
                </View>
              </View>
            </View>

            <View style={ styles.mapContainer }>
              
              <View style={styles.map}>
                <GoogleMap cafeList={[props.cafe]} currentLat={props.lat} currentLng={props.lng}/>
              </View>

            </View>

          </ScrollView>
        </View>
      
      </View>
      </SafeAreaView>
    );
  }
}

export default CafeInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    position:'absolute',
    height: height, 
    width: width
  },
  view: {
    flex:1, 
    paddingVertical: 115, 
    backgroundColor: 'green', 
    opacity: 0,
  },
  infoContainer: {
    flex:2,
  },
  infoTitle: {
    flex:1, 
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoBody: {
    flex:2, 
    // paddingVertical: 190, 
    backgroundColor: 'white'
  },
  bodyContents: {
    width:width-40,
    height: 230,
    marginBottom:30,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius:5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'gray',
    shadowOpacity: 0.2,
    elevation: 1
  },
  mapContainer: {
    flex:1,
  },
  img: {
    height: 300,
    width: width,
  },
  map: {
    width: width,
    height: width - 110,
    marginBottom: 20

  }
});
