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

class Intro_2 extends Component {
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
      headerTitle: <Text style={{ color: '#333' }}>○●○○○</Text>,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ nextPage: this._nextPage.bind(this) });
    this.props.navigation.setParams({ prePage: this._prePage.bind(this) });
  }

  _nextPage() {
    this.props.navigation.navigate('Intro_3');
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
          <Text style={styles.text}>반경 200m 이내의</Text>
          <Text style={styles.text}>모든 카페를 보여드립니다.</Text>
        </View>
        <View style={styles.container}>
          <Image style={styles.img} source={require('../images/2.png')} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Intro_2;

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
