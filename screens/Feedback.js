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
      ['전문적', 'professional'],
      ['다양한 메뉴', 'menuVariety'],
      ['심플한 메뉴', 'menuSimple'],
      ['친절해요', 'kindness'],
      ['작업하기 좋은 공간', 'workingSpace'],
      ['다양한 디저트', 'dessertVariety'],
      ['디카페인 메뉴', 'nonCaffeine'],
      ['조용한 음악', 'calmMusic'],
      ['신나는 음악', 'hipMusic'],
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
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.navigation.goBack();
  }

  renderRowItem(itemData) {
    return (
      <View>
        <TouchableOpacity
          style={{
            width: 170,
            paddingLeft: 40,
            paddingRight: 10,
          }}
          onPress={() => {
            let temp = Object.assign({}, this.state.checkTag);
            temp[itemData.item[1]] = !temp[itemData.item[1]];
            this.setState({
              checkTag: temp,
            });
          }}
        >
          <View
            style={{
              backgroundColor: 'orange',
              borderRadius: 50,
              justifyContent: 'center',
              alignSelf: 'center',
              width: 120,
              paddingVertical: 5,
              paddingHorizontal: 7,
              margin: 10,
            }}
          >
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: 13,
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
            <View style={{ marginLeft: 20, padding: 10 }}>
              <Text style={{ fontSize: 30, fontWeight: '700' }}>Good</Text>
            </View>
            <FlatList
              data={this.state.item}
              numColumns={2}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderRowItem.bind(this)}
              style={{ width: width }}
            />
          </View>

          <View style={{ flex: 1, marginBottom: 60 }}>
            <View style={{ marginLeft: 20, padding: 10 }}>
              <Text style={{ fontSize: 30, fontWeight: '700' }}>
                What the Bean!
              </Text>
            </View>

            <FlatList
              data={this.state.item}
              numColumns={2}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderRowItem.bind(this)}
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
    marginLeft: width / 2 - 50,
  },
  btnEntry: {
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(180,180,180)',
  },
});
