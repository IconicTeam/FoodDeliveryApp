import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {SIZES, PADDINGS} from '../../constants/Constants';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {defaultTheme} from '../../constants/Theme';

const {width, height} = Dimensions.get('screen');
class FavoritesScreen extends Component {
  constructor() {
    super();
    this.state = {
      choose1: true,
      choose2: false,
      favMeals: [
        {
          image: require('../../assets/images/pizzaMeal.png'),
          name: 'بيتزا لحمة',
          evaluation: 4.7,
          price: 10,
          restaurant: 'ابو محمد',
          show: true,
        },
        {
          image: require('../../assets/images/cheesePizza.png'),
          name: 'بيتزا جبنة',
          evaluation: 4.5,
          price: 7,
          restaurant: 'كوكي',
          show: true,
        },
        {
          image: require('../../assets/images/pizzaShrimp.png'),
          name: 'بيتزا جمبري',
          evaluation: 4.6,
          price: 20,
          restaurant: 'ايطاليانو',
          show: true,
        },
        {
          image: require('../../assets/images/pizza.png'),
          name: 'بيتزا تونة',
          evaluation: 4.1,
          price: 12,
          restaurant: 'ايطاليانو ',
          show: true,
        },
      ],
      favRestaurant: [
        {
          restaurant: 'ابو محمد',
          evaluation: 4.1,
          show: true,
        },
        {
          restaurant: 'ايطاليانو',
          evaluation: 4.5,
          show: true,
        },
        {
          restaurant: 'كوكي',
          evaluation: 3.6,
          show: true,
        },
      ],
      favRestaurants: true,
      meals: false,
      searchKey: '',
    };
  }

  deleteRestaurant(index) {
    let items = this.state.favRestaurant;
    items.splice(index, 1);
    this.setState({
      favRestaurant: items,
    });
  }
  deleteMeals(index) {
    let items = this.state.favMeals;
    items.splice(index, 1);
    this.setState({
      favMeals: items,
    });
  }

  searchRestaurant(word) {
    let item = this.state.favRestaurant;
    for (let i = 0; i < item.length; i++) {
      if (item[i].restaurant.includes(word)) {
        item[i].show = true;
      } else {
        item[i].show = false;
      }
    }
    this.setState({favRestaurant: item});
  }
  searchMeals(word) {
    let item = this.state.favMeals;
    for (let i = 0; i < item.length; i++) {
      if (item[i].name.includes(word)) {
        item[i].show = true;
      } else {
        item[i].show = false;
      }
    }
    this.setState({favMeals: item});
  }

  testDelete(index) {
    let item = this.state.favRestaurant;
    let newItems = item.filter(parameter => parameter !== item[index]);
    this.setState({favRestaurant: newItems});
  }

  render() {
    return (
      <View
        style={[styles.container, {backgroundColor: defaultTheme.background}]}>
        <View style={styles.topView}>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.9,
              height: height * 0.055,
              borderRadius: 15,
              backgroundColor: '#eee',
              paddingLeft: PADDINGS.padding,
              alignItems: 'center',
            }}>
            <Icon name="search1" size={25} color="#000" />
            <TextInput
              onChangeText={value => {
                this.setState({searchKey: value});
                this.state.favRestaurants
                  ? this.searchRestaurant(value)
                  : this.searchMeals(value);
              }}
              placeholder="البحث"
              selectionColor={defaultTheme.selectionColor}
              style={{
                flex: 1,
                borderRadius: 15,
                backgroundColor: '#eee',
                paddingHorizontal: PADDINGS.padding,
                fontFamily: 'Tajawal',
              }}
            />
          </View>
        </View>
        <View style={styles.TextView}>
          <Text
            style={{
              fontSize: SIZES.largeFontSize,
              color: '#000',
              fontFamily: 'Tajawal',
            }}>
            المطاعم المفضلة
          </Text>
        </View>
        <View style={styles.chooseView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                choose1: true,
                choose2: false,
                favRestaurants: true,
                meals: false,
              });
            }}
            style={[
              styles.chooseView2,
              {backgroundColor: this.state.choose1 ? '#fff' : '#eee'},
            ]}>
            <Text style={{fontFamily: 'Tajawal', color: '#000'}}>المطاعم</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                choose2: true,
                choose1: false,
                meals: true,
                favRestaurants: false,
              });
            }}
            style={[
              styles.chooseView2,
              {backgroundColor: this.state.choose2 ? '#fff' : '#eee'},
            ]}>
            <Text style={{fontFamily: 'Tajawal', color: '#000'}}>الوجبات</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{paddingBottom: PADDINGS.largePadding}}
            showsVerticalScrollIndicator={false}>
            {this.state.meals
              ? this.state.favMeals.map((item, index) => {
                  return (
                    <>
                      {item.show ? (
                        <>
                          <View style={styles.favRestaurants}>
                            <ImageBackground
                              resizeMode="contain"
                              source={item.image}
                              style={{width: '100%', height: '100%'}}>
                              <View
                                style={{
                                  width: width * 0.2,
                                  height: height * 0.04,
                                  backgroundColor: '#fb6e3b',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderTopLeftRadius: 25,
                                  borderBottomRightRadius: 25,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Tajawal',
                                    color: '#fff',
                                    fontSize: 12,
                                  }}>
                                  30-20 دقيقة
                                </Text>
                              </View>
                            </ImageBackground>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: PADDINGS.smallPadding,
                              marginHorizontal: width * 0.05,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Tajawal',
                                color: '#000',
                                fontSize: SIZES.mediumFontSize,
                              }}>
                              {item.name}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                this.deleteMeals(index);
                              }}>
                              <Icon2 name="delete" color={'#aaa'} size={30} />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              marginLeft: width * 0.05,
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: PADDINGS.largePadding,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Tajawal',
                                color: '#000',
                                marginRight: 4,
                                fontSize: 16,
                              }}>
                              {item.evaluation}
                            </Text>
                            <Icon name="star" color={'#fb6e3b'} size={16} />
                            <Text
                              style={{
                                fontFamily: 'Tajawal',
                                color: '#000',
                                marginLeft: 10,
                                fontSize: 16,
                              }}>
                              {item.price}$
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Tajawal',
                                color: '#aaa',
                                marginLeft: 10,
                                fontSize: 16,
                              }}>
                              مطعم {item.restaurant}
                            </Text>
                          </View>
                        </>
                      ) : null}
                    </>
                  );
                })
              : this.state.favRestaurant.map((item, index) => {
                  return (
                    <>
                      {item.show ? (
                        <>
                          <TouchableOpacity
                            activeOpacity={0.55}
                            style={[
                              styles.favRestaurants,
                              {
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop:
                                  index == 0
                                    ? PADDINGS.largePadding -
                                      PADDINGS.smallPadding
                                    : PADDINGS.largePadding,
                              },
                            ]}>
                            <Text
                              style={{
                                fontSize: SIZES.largeFontSize,
                                fontFamily: 'Tajawal',
                                color: '#000',
                              }}>
                              {item.restaurant}
                            </Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: PADDINGS.smallPadding,
                              marginHorizontal: width * 0.05,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  marginLeft: width * 0.05,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Tajawal',
                                    color: '#000',
                                    marginRight: 4,
                                    fontSize: 16,
                                  }}>
                                  {item.evaluation}
                                </Text>
                                <Icon name="star" color={'#fb6e3b'} size={16} />
                              </View>
                              <Text
                                style={{
                                  fontFamily: 'Tajawal',
                                  marginLeft: 10,
                                  color: '#aaa',
                                }}>
                                مطعم {item.restaurant}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                this.testDelete(index);
                              }}>
                              <Icon2 name="delete" color={'#aaa'} size={30} />
                            </TouchableOpacity>
                          </View>
                        </>
                      ) : null}
                    </>
                  );
                })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: PADDINGS.largePadding,
  },
  TextView: {
    marginLeft: width * 0.045,
    width: width,
    marginBottom: PADDINGS.largePadding,
  },
  chooseView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.06,
    borderRadius: 30,
    backgroundColor: '#eee',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 1,
    marginBottom: PADDINGS.smallPadding,
  },
  chooseView2: {
    width: width * 0.44,
    height: height * 0.058,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favRestaurants: {
    width: width * 0.9,
    height: height * 0.24,
    borderRadius: 25,
    backgroundColor: '#eee',
    alignSelf: 'center',
    // marginTop: PADDINGS.largePadding,
  },
});

export default FavoritesScreen;
