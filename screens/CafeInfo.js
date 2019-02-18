import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Linking,
  FlatList,
  AsyncStorage,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GoogleMap from './Map';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

class CafeInfo extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    top3Tags: this.props.navigation.state.params.cafe.top3Tags || [],
    openingHours: this.props.navigation.state.params.cafe.openingHours || [],
    contact: this.props.navigation.state.params.cafe.contact || '',
    convenience: this.props.navigation.state.params.cafe.convenience || '',
    description: this.props.navigation.state.params.cafe.description || '',
    view: true,
    tag: {
      spaceL: '넉넉한 공간',
      spaceS: '아담한 공간',
      professional: '전문적',
      menuVariety: '다양한 메뉴',
      menuSimple: '심플한 메뉴',
      kindness: '친절해요',
      workingSpace: '작업하기 좋은 공간',
      dessertVariety: '다양한 디저트',
      nonCaffeine: '디카페인 메뉴',
      calmMusic: '조용한 음악',
      hipMusic: '신나는 음악',
      photoZone: '사진찍기 좋아요',
    },
    feedbackView: true,
    timer: null,
    isSaved: null,
  };

  goToScreen() {
    this.props.navigation.navigate('Feedback', {
      cafe: this.props.navigation.state.params.cafe,
    });
  }

  renderTag(itemData) {
    return (
      <View
        key={itemData.toString()}
        style={{
          margin: 2,
          marginRight: 10,
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{
            fontWeight: '700',
            color: 'black',
          }}
        >
          #{this.state.tag[itemData]}
        </Text>
      </View>
    );
  }

  renderOpeningHours() {
    return this.state.openingHours.length !== 0 ? (
      <View key={'openingHours'} style={{ margin: 10 }}>
        <View>
          <Text style={styles.bodyContentTitle}>Opening Hours</Text>
        </View>
        {this.state.openingHours.map((ele, idx) => (
          <Text key={idx.toString()}>{ele.time}</Text>
        ))}
      </View>
    ) : (
      0
    );
  }

  renderContact() {
    return this.state.contact ? (
      <View key={'contact'} style={{ margin: 10 }}>
        <View>
          <Text style={styles.bodyContentTitle}>Contact</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.onPressCall(this.state.contact);
          }}
        >
          <Text>{this.state.contact}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      0
    );
  }

  renderConvevience() {
    return this.state.convenience ? (
      <View key={'convevience'} style={{ margin: 10 }}>
        <View>
          <Text style={styles.bodyContentTitle}>Convenience</Text>
        </View>
        <Text>{this.state.convenience}</Text>
      </View>
    ) : (
      0
    );
  }

  renderDiscription() {
    return this.state.description ? (
      <View key={'discription'} style={{ margin: 10 }}>
        <View>
          <Text style={styles.bodyContentTitle}>About</Text>
        </View>
        <Text>{this.state.description}</Text>
      </View>
    ) : (
      0
    );
  }

  onPressCall(phoneNumber) {
    const url = `tel:+${phoneNumber}`;
    Linking.canOpenURL(url).then(async (supported) => {
      if (supported) {
        try {
          return await Linking.openURL(url);
        } catch (e) {
          return null;
        }
      }
    });
  }

  async handleSaved() {
    if (this.state.isSaved) {
      const cafeId = this.props.navigation.state.params.cafe._id;
      axios
        .delete(
          `https://www.sunjae-kim.com/api/users/favorites/${cafeId}`,

          {
            headers: {
              'x-access-token': await AsyncStorage.getItem('access'),
            },
          },
        )
        .then(async (result) => {
          const {
            data: {
              user: { favorites },
            },
          } = result;

          await AsyncStorage.setItem('saved', JSON.stringify(favorites));

          this.setState({ isSaved: false });
        })
        .catch((err) => console.log(err.message));
    } else {
      axios
        .post(
          'https://www.sunjae-kim.com/api/users/favorites',
          {
            cafeId: this.props.navigation.state.params.cafe._id,
          },
          {
            headers: {
              'x-access-token': await AsyncStorage.getItem('access'),
            },
          },
        )
        .then(async (result) => {
          const {
            data: {
              user: { favorites },
            },
          } = result;
          await AsyncStorage.setItem('saved', JSON.stringify(favorites));

          this.setState({ isSaved: true });
        })
        .catch((err) => console.log(err.message));
    }
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y > 20) {
      this.setState({ view: false });
    }

    if (event.nativeEvent.contentOffset.y <= 20) {
      this.setState({ view: true });
    }
  }

  blinkText() {
    const pid = setInterval(() => {
      this.setState({ feedbackView: !this.state.feedbackView });
    }, 800);

    this.setState({ timer: pid });
  }
  async componentDidMount() {
    this.props.navigation.addListener('didFocus', this.blinkText.bind(this));
    this.props.navigation.addListener('willBlur', () => {
      clearInterval(this.state.timer);
    });
    const savedList = await AsyncStorage.getItem('saved');
    this.setState({
      isSaved: JSON.parse(savedList).includes(
        this.props.navigation.state.params.cafe._id,
      ),
    });
  }

  render() {
    const props = this.props.navigation.state.params;
    const img = props.cafe.images[0]
      ? { uri: props.cafe.images[0] }
      : require('../images/cafe.jpg');

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={img} style={styles.img} />

          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              right: 0,
              display: this.state.view ? 'flex' : 'none',
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                marginRight: 20,
                borderRadius: 100,
                borderWidth: 2,
                backgroundColor: 'white',
                borderColor: 'white',
                width: 35,
                height: 35,
                alignItems: 'center',
                opacity: 0.8,
              }}
              onPress={this.handleSaved.bind(this)}
            >
              <Icon
                name={this.state.isSaved ? 'ios-heart' : 'ios-heart-empty'}
                size={27}
                style={{
                  marginTop: 2,
                  color: '#B60010',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.scrollContainer}>
            <ScrollView
              style={{ flex: 1 }}
              bounces={false}
              onScroll={this.handleScroll.bind(this)}
              scrollEventThrottle={16}
            >
              <View style={styles.view} />

              <View style={styles.infoContainer}>
                <View style={{ flex: 1 }}>
                  {/**/}
                  <View style={styles.infoTitle}>
                    <View style={{ width: width * 0.7 }}>
                      <Text
                        style={{
                          fontSize: 35,
                          fontWeight: '400',
                          backgroundColor: 'white',
                          paddingLeft: 20,
                        }}
                      >
                        {props.cafe.title}
                      </Text>
                      <Text style={{ paddingLeft: 20 }}>
                        {props.cafe.addresses[0]}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={this.goToScreen.bind(this)}>
                        <Image
                          source={require('../images/symbol.png')}
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'cover',
                            backgroundColor: 'white',
                            marginRight: 20,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={{ backgroundColor: 'white', height: 20 }}>
                        <Text
                          style={{
                            alignSelf: 'flex-end',
                            marginRight: 20,
                            marginTop: 5,
                            fontSize: 14,
                            display: this.state.feedbackView ? 'flex' : 'none',
                          }}
                        >
                          feedback!
                        </Text>
                      </View>
                    </View>
                  </View>

                  {this.state.top3Tags.length !== 0 ? (
                    <View style={{ backgroundColor: 'white', width: width }}>
                      <View
                        style={{
                          width: width - 40,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'stretch',
                          marginHorizontal: 20,
                        }}
                      >
                        {this.state.top3Tags.map((ele) => this.renderTag(ele))}
                      </View>
                    </View>
                  ) : (
                    <Text style={{ backgroundColor: 'white' }} />
                  )}

                  <View style={styles.infoBody}>
                    <View style={styles.bodyContents}>
                      {[
                        this.renderOpeningHours(),
                        this.renderContact(),
                        this.renderConvevience(),
                        this.renderDiscription(),
                      ].filter((ele) => ele !== 0)}
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.mapContainer}>
                <View style={styles.map}>
                  <GoogleMap
                    cafeList={[props.cafe]}
                    currentLat={props.cafe.location.lat}
                    currentLng={props.cafe.location.lng}
                  />
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
    position: 'absolute',
    zIndex: 0,
    height: height,
    width: width,
  },
  view: {
    flex: 1,
    paddingVertical: 115,
    backgroundColor: 'green',
    opacity: 0,
  },
  infoContainer: {
    flex: 2,
  },
  infoTitle: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'gray',
    shadowOpacity: 0.6,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBody: {
    flex: 2,
    backgroundColor: 'white',
  },
  bodyContents: {
    width: width - 40,
    minHeight: 130,
    marginBottom: 30,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'gray',
    shadowOpacity: 0.2,
    elevation: 1,
  },
  mapContainer: {
    flex: 1,
    marginBottom: 40,
  },
  img: {
    height: 300,
    width: width,
  },
  map: {
    width: width,
    height: width - 110,
    marginBottom: 20,
  },
  bodyContentTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
});
