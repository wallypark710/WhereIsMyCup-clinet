import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';

const { height, width } = Dimensions.get('window');
class Feedback extends Component {
  state = {
    item: [
      'tag_1',
      'tag_2',
      'tag_3',
      'tag_4',
      'tag_5',
      'tag_6',
      'tag_7',
      'tag_8',
      'tag_9',
      'tag_10',
      'tag_11',
      'tag_12',
    ],
  };

  renderRowItem(itemData) {
    var RandomNumber = Math.floor(Math.random() * 50) + 70;

    return (
      <View style={styles.listSec}>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={{
              backgroundColor: 'orange',
              borderRadius: 50,
              justifyContent: 'center',
              alignSelf: 'center',
              height: itemData.item.length + 50,
              width: RandomNumber + itemData.item.length,
              paddingVertical: 10,
              paddingHorizontal: 10,
              margin: 5,
            }}
          >
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: '500',
                fontSize: RandomNumber / 5,
              }}
            >
              {itemData.item}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1, marginBottom: 20 }}>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: '700' }}>Good</Text>
            </View>
            <FlatList
              data={this.state.item}
              numColumns={3}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderRowItem}
              style={{ width: width }}
            />
          </View>

          <View style={{ flex: 1, marginBottom: 60 }}>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: '700' }}>
                What the Bean!
              </Text>
            </View>

            <FlatList
              data={this.state.item}
              numColumns={3}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderRowItem}
              style={{ width: width }}
            />
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
});
