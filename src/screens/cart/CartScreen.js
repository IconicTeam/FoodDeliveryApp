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

          product_name: "البرجر",

          product_arr: [
            {
              name: 'برجر حار نار',
              count: 1,
              price: 100,
              image: require('../../assets/images/burger.png'),
            },
            {
              name: 'برجر حار نار',
              count: 1,
              price: 100,
              image: require('../../assets/images/burger-king-veggie-burger-11562993225drer5ymmrx.png'),
            },
            {
              name: 'برجر حار نار',
              count: 1,
              price: 100,
              image: require('../../assets/images/123.jpg'),
            },

          ]

        },
        {

          product_name: "البيتزا",

          product_arr: [
            {
              name: "بيتزا مارجيريتا",
              count: 1,
              price: 50,
              image: require('../../assets/images/pizza.png'),
            },
            {
              name: "بيتزا لحوم",
              count: 1,
              price: 150,
              image: require('../../assets/images/pizzaMeal.png'),
            },

          ]

        }



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
    if (item[index].product_arr[index].count > 1) {
      item[index].product_arr[index].count--;


      // total = item[index].product_arr[index].count * item[index].product_arr[index].price;

    }

    this.setState({
      Cart_arr: item,
      // sumOfItem: total,
    });
  }

  plus(index, product_index) {
    let item = this.state.Cart_arr;
    if (item[index].product_arr[product_index].count >= 1) {
      item[index].product_arr[product_index].count++;

      // total = item[index].product_arr[index].count * item[index].product_arr[index].price;
    }



    this.setState({
      Cart_arr: item,
      // sumOfItem: total,
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
          padding: PADDINGS.padding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

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
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 1,
              borderRadius: 15,
              width: '20%',
              backgroundColor: defaultTheme.white,
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

        {/* <View
          style={{
            alignItems: "flex-start",
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: SIZES.largeFontSize,
              fontFamily: 'Tajawal',
              color: defaultTheme.text2
            }}>
            {this.state.Cart_arr.length} من الطلبات فى السله يساوى {this.state.sumOfItem}$
          </Text>
        </View> */}


        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.Cart_arr.map((item, index) => (
            <View>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderColor: defaultTheme.gray,

                }}>
                <Text
                  style={{
                    fontSize: SIZES.mediumFontSize,
                    fontFamily: 'Tajawal',
                    marginBottom: PADDINGS.smallPadding,
                    marginTop: PADDINGS.padding

                  }}>
                  محل {item.product_name}
                </Text>
              </View>
              {this.state.Cart_arr[index].product_arr.map((item, product_index) => (
                <View
                  style={{
                    marginTop: PADDINGS.padding,
                    flexDirection: 'row',
                    width: '100%',
                    height: 100,
                    justifyContent: 'space-between',
                    // backgroundColor: defaultTheme.white,
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
                          width: 80,
                          height: 80,
                          backgroundColor: defaultTheme.border
                        }}
                        borderRadius={20}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginHorizontal: PADDINGS.smallPadding

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
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: '35%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.plus(product_index);
                      }}
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        width: 35,
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: defaultTheme.border,
                        borderColor: defaultTheme.border

                      }}>
                      <FontAwesome5 name="plus" size={SIZES.smallIconSize} />
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Tajawal',
                          fontSize: SIZES.mediumFontSize,
                          color: defaultTheme.text2
                        }}>
                        {item.count}
                      </Text>
                    </View>
                    <TouchableOpacity
                      disabled={item.count == 1}
                      onPress={() => {
                        this.min(product_index);
                      }}
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        width: 35,
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: defaultTheme.border,
                        borderColor: defaultTheme.border
                      }}>
                      <FontAwesome5 name="minus" size={SIZES.smallIconSize} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: PADDINGS.largePadding
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


            }}
          />

        </View>

      </View >

    );
  }

}
