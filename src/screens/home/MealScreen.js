import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {SIZES, PADDINGS} from '../../constants/Constants';
import {defaultTheme} from '../../constants/Theme';
import GeneralButton from '../../components/GeneralButton';

const {width, height} = Dimensions.get('screen');

export class MealScreen extends Component {
  constructor() {
    super();
    this.state = {
      heartColor: false,
      count: 1,
      click: false,
      color: false,
      color2: true,
      color3: false,
      addTometo: false,
      addCheese: false,
      addOnion: false,
      addShrimp: false,
      defaultRating: 2,
      maxRating: [1, 2, 3, 4, 5],
      addions: [
        {
          image: require('../../assets/images/tomato.png'),
        },
        {
          image: require('../../assets/images/cheese.png'),
        },
        {
          image: require('../../assets/images/shrimp.png'),
        },
        {
          image: require('../../assets/images/potatoes.png'),
        },
        {
          image: require('../../assets/images/onion.png'),
        },
      ],
      showModal: false,
      pizzaType: [
        {
          type: 'بيتزا مشكل جبن',
          check: false,
        },
        {
          type: 'بيتزا لحوم ',
          check: false,
        },
        {
          type: 'بيتزا جمبري',
          check: false,
        },
        {
          type: 'بيتزا مشروم ',
          check: false,
        },
      ],
      clickedItemIndex: 0,
    };
  }

  add() {
    let count = this.state.count;
    this.setState({count: count + 1, click: false});
  }

  minus() {
    let count = this.state.count;
    let click = this.state.click;
    if (count > 0) {
      count = count - 1;
    } else {
      click = true;
    }
    this.setState({count: count, click: click});
  }
  render() {
    return (
      <View
        style={[styles.container, {backgroundColor: defaultTheme.background}]}>
        <ScrollView
          contentContainerStyle={{paddingBottom: height * 0.1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.viewImage1}>
            <ImageBackground
              resizeMode="contain"
              source={require('../../assets/images/pizza.png')}
              style={styles.imageBG}>
              <View style={styles.view2}>
                <TouchableOpacity
                  onPress={() => {
                    this.add();
                  }}>
                  <Icon2 name="plus" size={20} color="#000" />
                </TouchableOpacity>
                <Text style={styles.smallText}>{this.state.count}</Text>
                <TouchableOpacity
                  disabled={this.state.click}
                  onPress={() => {
                    this.minus();
                  }}>
                  <Icon2 name="minus" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.view3}>
            <Text style={styles.text1}>بيتزا ايطالي</Text>
            <Text style={styles.text2}>
              بيتزا ايطالي مع الجبنة والطماطم اللذيذة وتحتوي علي الكثير من
              المكونات اللذيذة
            </Text>
          </View>
          <View style={styles.view4}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  color: true,
                  color2: false,
                  color3: false,
                });
              }}
              style={[
                styles.view5,
                {backgroundColor: this.state.color ? '#fff' : '#eee'},
              ]}>
              <Text style={styles.smallText}>كبير</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  color: false,
                  color2: true,
                  color3: false,
                });
              }}
              style={[
                styles.view5,
                {backgroundColor: this.state.color2 ? '#fff' : '#eee'},
              ]}>
              <Text style={styles.smallText}>وسط</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  color: false,
                  color2: false,
                  color3: true,
                });
              }}
              style={[
                styles.view5,
                {backgroundColor: this.state.color3 ? '#fff' : '#eee'},
              ]}>
              <Text style={styles.smallText}>صغير</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: width * 0.05, marginBottom: height * 0.03}}>
            <Text style={[styles.text1, {fontSize: SIZES.mediumFontSize}]}>
              اضف الي البيتزا
            </Text>
          </View>
          <View style={styles.viewContainer3}>
            {this.state.addions.map((item, index) => {
              return (
                <TouchableOpacity style={styles.viewIconImage}>
                  <ImageBackground
                    resizeMode="cover"
                    source={item.image}
                    style={styles.image}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.pizzaTypeStyle}>
            <Text style={[styles.text1, {fontSize: SIZES.mediumFontSize}]}>
              طعم البيتزا
            </Text>
          </View>
          <View style={styles.pizzas}>
            {this.state.pizzaType.map((item, index) => {
              return (
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({clickedItemIndex: index});
                    }}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: '#fb6e3b',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {index == this.state.clickedItemIndex ? (
                      <View
                        style={{
                          backgroundColor: '#fb6e3b',
                          width: 14,
                          height: 14,
                          borderRadius: 7,
                        }}></View>
                    ) : null}
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.text1,
                      {
                        fontSize: SIZES.smallFontSize,
                        marginLeft: 10,
                      },
                    ]}>
                    {item.type}
                  </Text>
                </View>
              );
            })}
          </View>
          {/* <View style={styles.CustomRatingBarStyle}>
            {this.state.maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={item}
                  onPress={() => {
                    this.setState({defaultRating: item});
                  }}>
                  <Image
                    style={styles.StarImgStyle}
                    source={
                      item <= this.state.defaultRating
                        ? require('../assets/images/filled.png')
                        : require('../assets/images/corner.png')
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View> */}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.4}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: defaultTheme.card,
            elevation: 2,
            position: 'absolute',
            margin: PADDINGS.padding,
          }}
          onPress={() => this.props.navigation.goBack()}>
          <Icon2
            name="chevron-right"
            size={SIZES.mediumIconSize}
            color={defaultTheme.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({heartColor: !this.state.heartColor});
          }}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: defaultTheme.card,
            elevation: 2,
            position: 'absolute',
            margin: PADDINGS.padding,
            right: 0,
          }}>
          <Icon
            name={this.state.heartColor ? 'heart' : 'hearto'}
            size={SIZES.mediumIconSize}
            color={this.state.heartColor ? '#d00' : '#000'}
          />
        </TouchableOpacity>
        <View style={styles.viewPayButton}>
          <TouchableOpacity
            onPress={() => {
              this.setState({showModal: true});
            }}
            style={styles.payButtonStyle}>
            <Text style={{fontSize: 24, fontFamily: 'Tajawal', color: '#fff'}}>
              اضف الي العربة{' '}
              {this.state.color
                ? 15 * this.state.count
                : this.state.color2
                ? 10 * this.state.count
                : 5 * this.state.count}
              {' جنية'}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => {
            this.setState({showModal: false});
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.text1}>Food : Pizza</Text>
            <Text style={styles.text1}>count : {this.state.count}</Text>
            <Text style={styles.text1}>
              price :{' '}
              {this.state.color
                ? this.state.count * 15
                : this.state.color2
                ? this.state.count * 10
                : this.state.count * 5}
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: PADDINGS.padding,
  },
  viewIcon: {
    position: 'absolute',
    left: width * 0.05,
    top: height * 0.01,
    width: width * 0.1,
    height: height * 0.045,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  viewIcon2: {
    position: 'absolute',
    right: width * 0.05,
    top: height * 0.01,
    width: width * 0.1,
    height: height * 0.045,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  viewImage1: {
    width: width * 0.6,
    height: height * 0.25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: PADDINGS.padding,
  },
  imageBG: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  view2: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  view3: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  text1: {
    fontFamily: 'Tajawal',
    color: '#000',
    fontSize: SIZES.largeFontSize,
    marginBottom: height * 0.01,
  },
  text2: {
    fontFamily: 'Tajawal',
    width: width * 0.8,
    textAlign: 'center',
    color: '#bbb',
    fontSize: SIZES.smallFontSize,
  },
  view4: {
    width: width * 0.9,
    height: height * 0.06,
    padding: 1,
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    marginBottom: height * 0.03,
  },
  smallText: {
    fontFamily: 'Tajawl',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  view5: {
    width: width * 0.25,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width * 0.9,
    height: height * 0.057,
    marginBottom: height * 0.03,
  },
  image: {
    width: '95%',
    height: '90%',
    alignSelf: 'center',
  },
  viewIconImage: {
    width: width * 0.12,
    height: height * 0.055,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CustomRatingBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  StarImgStyle: {
    width: width * 0.1,
    height: height * 0.04,
    resizeMode: 'cover',
  },
  viewPayButton: {
    position: 'absolute',
    width: width,
    height: height * 0.1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    // borderTopColor: '#ddd',
    elevation: 5,
    // borderTopWidth: 0.5,
  },
  payButtonStyle: {
    width: width * 0.8,
    height: height * 0.07,
    backgroundColor: '#fb6e3b',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pizzaTypeStyle: {
    marginLeft: width * 0.05,
    marginBottom: height * 0.03,
  },
  pizzas: {
    marginLeft: width * 0.05,
  },
});
export default MealScreen;
