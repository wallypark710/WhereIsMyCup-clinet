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

class Intro_3 extends Component {
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
      headerTitle: <Text style={{ color: '#333' }}>○○●○○</Text>,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ nextPage: this._nextPage.bind(this) });
    this.props.navigation.setParams({ prePage: this._prePage.bind(this) });
  }

  _nextPage() {
    this.props.navigation.navigate('Intro_4');
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
          <Text style={styles.text}>찾고 싶은 카페를 검색해보세요.</Text>
          <Text>서울의 모든 카페중에서 찾아드립니다.</Text>
        </View>
        <View style={styles.container}>
          <Image style={styles.img} source={require('../images/3.png')} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Intro_3;

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
