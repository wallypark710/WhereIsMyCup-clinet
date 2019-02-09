import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CafeListEntry from './CafeListEntry';

class CafeList extends Component {
	render(){
		return (
				<View style={styles.container}>
					{
						this.props.cafeList.map( (ele, idx) => 
							<CafeListEntry key={idx} cafe={ele} />
						)
					}
				</View>
			);
	}
}

export default CafeList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems : 'center',
		justifyContent : 'center'
	}
})