import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SIZES, PADDINGS } from '../../constants/Constants';
import { defaultTheme } from '../../constants/Theme';
import GeneralButton from '../../components/GeneralButton';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      Cart_arr: [
        {
          name: 'برجر حار نار',
          count: 1,
          price: 100,
          image: require('../../assets/images/burger.png'),
        },
        // {
        //   name: 'Virginia',
        //   count: 1,
        //   price: 200,
        //   image: require("../../assets/images/3.jpg"),

        // },
      ],

      sumOfItem: 100,
    };
  }

  delete() {
    let item = this.state.Cart_arr;
    var length = item.length;
    item.splice(0, length);
    total = 0;

    this.setState({
      Cart_arr: item,
      sumOfItem: total,
    });
  }

  min(index) {
    let item = this.state.Cart_arr;
    if (item[index].count > 1) {
      item[index].count--;
      total = item[index].count * item[index].price;
    } else {
      item.splice(index, 1);
      total = 0;
    }

    this.setState({
      Cart_arr: item,
      sumOfItem: total,
    });
  }

  plus(index) {
    let item = this.state.Cart_arr;
    if (item[index].count >= 1) {
      item[index].count++;

      total = item[index].count * item[index].price;
    }

    this.setState({
      Cart_arr: item,
      sumOfItem: total,
    });
  }

  // total() {
  //     let item = this.state.Cart_arr
  //     let total = this.state.sumOfItem
  //     for (let i = 0; i < item.length; i++) {
  //         total = item[i].count * item[i].price
  //     }
  //     this.setState({
  //         sumOfItem: total,
  //         Cart_arr: item
  //     })
  // }

  render() {
    return (

      <View
        style={{
          flex: 1,
          // backgroundColor: defaultTheme.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: PADDINGS.padding,
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 1,
              borderRadius: 15,
              alignSelf: 'flex-start',
              backgroundColor: defaultTheme.white,
            }}>
            <FontAwesome5 name="chevron-right" size={SIZES.smallIconSize} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.delete();
            }}
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: '20%',
            }}>
            <Text
              style={{
                fontFamily: 'Tajawal',
                fontSize: SIZES.mediumFontSize,
              }}>
              حذف
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: SIZES.mediumFontSize,
              fontFamily: 'Tajawal',
            }}>
            {this.state.Cart_arr.length} من الطلبات فى السله يساوى{' '}
            {this.state.sumOfItem}$
          </Text>
        </View>


        {this.state.Cart_arr.map((item, index) => (

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              width: '95%',
              height: 100,
              padding: PADDINGS.smallPadding,
              justifyContent: 'space-between',
              backgroundColor: defaultTheme.border,
              borderRadius: 20,
              alignSelf: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: 70,
                    height: 70,
                  }}
                  borderRadius={20}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingHorizontal: PADDINGS.smallPadding,
                }}>
                <Text
                  style={{
                    fontFamily: 'Tajawal',
                    fontSize: SIZES.mediumFontSize,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal',
                    fontSize: SIZES.mediumFontSize,
                  }}>
                  السعر: {item.price}$
                </Text>
                <Text
                  style={{
                    fontFamily: 'Tajawal',
                    fontSize: SIZES.mediumFontSize,
                  }}>
                  السعر الكلى: {item.price * item.count}$
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '40%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.plus(index);
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  width: 25,
                  height: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: defaultTheme.border,
                }}>
                <FontAwesome5 name="plus" size={SIZES.smallIconSize} />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontFamily: 'Tajawal',
                    fontSize: SIZES.mediumFontSize,
                  }}>
                  {item.count}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.min(index);
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  width: 25,
                  height: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome5 name="minus" size={SIZES.smallIconSize} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          <GeneralButton
            title={"الطلب مقابل  " + (this.state.sumOfItem) + "$"}
            BGcolor={defaultTheme.primary}
            // width={width * 0.5}
            // height={height * 0.065}
            textColor={defaultTheme.white}
            textSize={SIZES.mediumFontSize}
            haveBorder={false}

            otherStyles={{
              alignSelf: 'center',
              marginTop: PADDINGS.padding,
            }}
          />

        </View>

      </View >

    );
  }

}
