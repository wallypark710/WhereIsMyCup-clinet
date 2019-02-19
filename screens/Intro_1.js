import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

class Intro extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginRight: 20,
          }}
          onPress={navigation.getParam('nextPage')}
        >
          <Icon name="ios-arrow-forward" size={20} />
        </TouchableOpacity>
      ),
      headerTitle: <Text style={{ color: '#333' }}>●○○○○</Text>,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ nextPage: this._nextPage.bind(this) });
  }

  _nextPage() {
    this.props.navigation.navigate('Intro_2');
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.text}>당신만의 카페를 찾아보세요.</Text>
          <Text style={styles.text}>
            당신에게 꼭 맞는 카페를 추천해 드립니다.
          </Text>
        </View>
        <View style={styles.container}>
          <Image style={styles.img} source={require('../images/1.png')} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {
    justifyContent: 'flex-end',
    resizeMode: 'contain',
    width: width - 120,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 7,
  },
});
