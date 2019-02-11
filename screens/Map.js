import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class Map extends Component {

	render(){
		console.log(this.props.cafeList);
		return (
				<View style={styles.container}>
					<MapView
						provider = { PROVIDER_GOOGLE }
						region={{
							latitude: this.props.currentLat,
							longitude: this.props.currentLng,
							latitudeDelta: 0.0092,
							longitudeDelta: 0.0021
						}}
						style = { styles.container }
					>
						{ this.props.cafeList.map( (ele,idx) => {
              console.log('title : ',ele.title,'lat : ',ele.location.lat,' lng : ', ele.location.lng);
							return (<Marker key={idx} coordinate={{
									latitude: ele.location.lat,
									longitude: ele.location.lng
								}}
                onPress={()=>{console.log(ele.title)}}
								/>)
							})
						}
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
		alignItems : 'center',
		justifyContent : 'center'
	}
})