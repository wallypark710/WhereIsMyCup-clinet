import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

class Feedback extends Component {
  state = {
    item: [
      ['넉넉한 공간', 'spaceL'],
      ['아담한 공간', 'spaceS'],
      ['조용한 음악', 'calmMusic'],
      ['작업하기 좋은 공간', 'workingSpace'],
      ['심플한 메뉴', 'menuSimple'],
      ['친절해요', 'kindness'],
      ['다양한 메뉴', 'menuVariety'],
      ['다양한 디저트', 'dessertVariety'],
      ['디카페인 메뉴', 'nonCaffeine'],
      ['전문적', 'professional'],
      ['신나는 음악', 'hipMusic'],
      ['사진찍기 좋아요', 'photoZone'],
    ],

    checkTag: {
      spaceL: false,
      spaceS: false,
      professional: false,
      menuVariety: false,
      menuSimple: false,
      kindness: false,
      workingSpace: false,
      dessertVariety: false,
      nonCaffeine: false,
      calmMusic: false,
      hipMusic: false,
      photoZone: false,
    },
    tagColor: {
      spaceL: '#F6B352',
      spaceS: '#F6B352',
      professional: '#F6B352',
      menuVariety: '#F6B352',
      menuSimple: '#F6B352',
      kindness: '#F6B352',
      workingSpace: '#F6B352',
      dessertVariety: '#F6B352',
      nonCaffeine: '#F6B352',
      calmMusic: '#F6B352',
      hipMusic: '#F6B352',
      photoZone: '#F6B352',
    },
  };

  async handleGet() {
    const feedback = {};
    const id = this.props.navigation.state.params.cafe._id;
    for (let key in this.state.checkTag) {
      if (this.state.checkTag[key]) {
        feedback[key] = this.state.checkTag[key];
      }
    }

    const token = await AsyncStorage.getItem('access');

    await axios
      .post(
        `http://13.125.24.9:3000/api/cafe/feedback/${id}`,
        {
          feedback: feedback,
        },
        {
          headers: { 'x-access-token': token },
        },
      )
      .then((result) => {
        alert('Thank you.');
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.navigation.goBack();
  }

  tagToggleHandler(itemData) {
    let temp = Object.assign({}, this.state.checkTag);
    temp[itemData.item[1]] = !temp[itemData.item[1]];

    let color = Object.assign({}, this.state.tagColor);
    color[itemData.item[1]] =
      this.state.tagColor[itemData.item[1]] === '#F6B352'
        ? '#881600'
        : '#F6B352';

    this.setState({
      checkTag: temp,
      tagColor: color,
    });
  }

  renderRowItem(itemData) {
    return (
      <View>
        <TouchableOpacity
          style={{ marginLeft: width * 0.0077 }}
          onPress={() => {
            this.tagToggleHandler.call(this, itemData);
          }}
        >
          <View
            style={{
              backgroundColor: this.state.tagColor[itemData.item[1]],
              borderRadius: 50,
              justifyContent: 'center',
              alignSelf: 'center',
              width: itemData.item[0].length * 10 + 40,
              height: 40,
              paddingVertical: 5,
              paddingHorizontal: 7,
              margin: 7,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: '600',
              }}
            >
              {itemData.item[0]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(this.state.checkTag);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1, marginBottom: 20 }}>
            <View
              style={{
                marginLeft: width * 0.0077,
                padding: 10,
                marginBottom: 30,
              }}
            >
              <Text style={{ fontSize: 35, fontWeight: '700' }}>
                What makes you happy?
              </Text>
            </View>
            <FlatList
              data={this.state.item}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderRowItem.bind(this)}
              style={{ width: width, backgroundColor: 'white' }}
            />
          </View>

          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.btnEntry}
              onPress={() => {
                this.handleGet();
              }}
            >
              <Text style={{ textAlign: 'center', color: 'rgb(150,150,150)' }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    width: width * 0.3,
    backgroundColor: 'white',
    marginTop: 20,
    margin: 30,
    marginLeft: width / 2 - (width * 0.3) / 2,
  },
  btnEntry: {
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(180,180,180)',
  },
});
