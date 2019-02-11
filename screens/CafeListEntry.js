import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

class CafeListEntry extends Component {
	render(){
    const img = this.props.cafe.images[0] ? {uri: this.props.cafe.images[0] } : require('../images/cafe.jpg');
		return (
			<TouchableWithoutFeedback onPress={()=>{ this.props.handlePress(this.props.cafe)}}>
				<View style={styles.container} >
					<View style={{flex:2}}>
						<Image style={styles.img} source={img} />
					</View>
					
					<View style={{flex: 1, paddingLeft: 10, paddingTop: 10 }} >
						<Text> {this.props.cafe.title} </Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
			);
	}
}

export default CafeListEntry; 

const styles = StyleSheet.create({
	container: {
		height: 130,
		width: 130,
		marginLeft: 20,
		borderWidth: 0.5, borderColor: '#dddddd'
	},
	img: {
		flex:1,
		width: null,
		height: null,
		resizeMode: 'cover' 
	}
})