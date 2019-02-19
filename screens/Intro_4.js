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

class Intro_4 extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 20,
          }}
          onPress={navigation.getParam('prePage')}
        >
          <Icon name="ios-arrow-back" size={20} />
        </TouchableOpacity>
      ),
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
      headerTitle: <Text style={{ color: '#333' }}>○○○●○</Text>,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ nextPage: this._nextPage.bind(this) });
    this.props.navigation.setParams({ prePage: this._prePage.bind(this) });
  }

  _nextPage() {
    this.props.navigation.navigate('Intro_5');
  }

  _prePage() {
    this.props.navigation.goBack();
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
          <Text style={styles.text}>
            다양한 태그를 통해 카페를 평가해보세요.
          </Text>
          <Text>평가가 쌓일수록 똑똑한 추천 시스템이</Text>
          <Text>당신의 취향을 더 자세히분석합니다. </Text>
        </View>
        <View style={styles.container}>
          <Image style={styles.img} source={require('../images/4-1.png')} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Intro_4;

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
