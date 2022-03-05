import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {PADDINGS, SIZES} from '../../constants/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {defaultTheme} from '../../constants/Theme';

const {width, height} = Dimensions.get('screen');
export class CartScreen extends Component {
  constructor() {
    super();
    this.state = {
      orders: [
        {
          mealName: 'برجر لحمة',
          price: 100,
          image: require('../../assets/images/burger.png'),
        },
        {
          mealName: 'برجر فراخ',
          price: 50,
          image: require('../../assets/images/burger.png'),
        },
        {
          mealName: ' بيتزا جمبري',
          price: 120,
          image: require('../../assets/images/pizzaShrimp.png'),
        },
        {
          mealName: 'بيتزا',
          price: 100,
          image: require('../../assets/images/pizzaMeal.png'),
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.TouchableOpacityStyle}>
            <Icon
              name="chevron-right"
              size={SIZES.mediumIconSize}
              color={defaultTheme.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteTextStyle}>
            <Text style={styles.textStyle}>مسح</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: width * 0.6, marginBottom: PADDINGS.largePadding}}>
          <Text
            style={[
              styles.textStyle,
              {color: '#000', fontSize: SIZES.largeFontSize},
            ]}>
            2 وجبة في السلة 19 جنية
          </Text>
        </View>
        <View style={styles.ViewlineStyle}>
          <Text style={[styles.textStyle, {color: '#aaa'}]}>الوجبات</Text>
        </View>
        {this.state.orders.map((item, index) => {
          return (
            <View style={styles.mealStyle}>
              <View style={styles.ViewMealContainer}>
                <View style={styles.imageMealStyle}>
                  <Image
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                    source={item.image}
                  />
                </View>
                <View style={styles.mealTextStyle}>
                  <Text style={styles.textMealNameStyle}>{item.mealName}</Text>
                  <Text style={styles.priceTextStyle}>{item.price}جنية</Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity>
                  <AntDesign name="delete" size={20} color={'#000'} />
                </TouchableOpacity>
                <View style={styles.plusMinusViewStyle}>
                  <TouchableOpacity style={styles.plusMinusButtonStyle}>
                    <Icon name="plus" size={15} color={'#000'} />
                  </TouchableOpacity>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Tajawal',
                        color: '#000',
                      }}>
                      1
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.plusMinusButtonStyle}>
                    <Icon name="minus" size={15} color={'#000'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
        <View style={[styles.ViewlineStyle]} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.textStyle, {color: '#000'}]}>التوصيل</Text>
          <Text style={[styles.textStyle]}>مجانا</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDINGS.padding,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PADDINGS.largePadding,
  },
  TouchableOpacityStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: defaultTheme.card,
    elevation: 2,
  },
  deleteTextStyle: {
    marginTop: 5,
  },
  textStyle: {
    fontSize: SIZES.mediumFontSize,
    color: '#fb6e3b',
    fontFamily: 'Tajawal',
  },
  ViewlineStyle: {
    borderBottomWidth: 2,
    height: height * 0.05,
    borderBottomColor: '#ddd',
    marginBottom: PADDINGS.largePadding,
  },
  mealStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: PADDINGS.padding,
  },
  imageMealStyle: {
    width: width * 0.2,
    height: height * 0.09,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  ViewMealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealTextStyle: {
    marginLeft: PADDINGS.smallPadding,
  },
  textMealNameStyle: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: 'Tajawal',
    color: '#000',
  },
  priceTextStyle: {
    fontSize: SIZES.smallFontSize,
    fontFamily: 'Tajawal',
    color: '#aaa',
  },
  plusMinusViewStyle: {
    flexDirection: 'row',
    width: width * 0.25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plusMinusButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.08,
    height: height * 0.035,
    backgroundColor: '#eee',
    borderRadius: 15,
    elevation: 2,
  },
});
export default CartScreen;
