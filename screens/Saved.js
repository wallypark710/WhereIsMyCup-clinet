import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SuggestCafeListEntry from './SuggestCafeListEntry';

class Saved extends Component {
	render(){
		return (
				<View style={styles.container}>
					<ScrollView>
						
					</ScrollView>
				</View>
			);
	}
}

export default Saved;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})