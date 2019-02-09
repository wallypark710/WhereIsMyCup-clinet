import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

class CafeListEntry extends Component {
	render(){
		let temp = this.props.cafe.photos === undefined ? "" : this.props.cafe.photos[0].photo_reference;
		let temp2 = this.props.cafe.photos === undefined ? "" : /https.*photos/.exec(this.props.cafe.photos[0].html_attributions[0])[0];
		// console.log(`${temp2}/data=${temp}`)
		console.log(this.props.handlePress)
		return (
			<TouchableWithoutFeedback onPress={()=>{ this.props.handlePress()}}>
				<View style={styles.container} >
					<View style={{flex:2}}>
						<Image style={styles.img} source={require('../images/cafe.jpg')} />
					</View>
					
					<View style={{flex: 1, paddingLeft: 10, paddingTop: 10 }} >
						<Text> {this.props.cafe.name} </Text>
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