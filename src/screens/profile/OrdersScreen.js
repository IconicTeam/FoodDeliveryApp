import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SIZES, PADDINGS} from '../../constants/Constants';
import {defaultTheme} from '../../constants/Theme';
import {TextInput} from 'react-native-paper';
import GeneralButton from '../../components/GeneralButton';
import {color} from 'react-native-reanimated';
// import { ScrollView } from "react-native-gesture-handler"

const {width, height} = Dimensions.get('screen');

export default class OrdersScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Orders: [
        {
          order_id: '1',
          order_rest_name: 'كبابجى أبو محمد',
          order_rest_image: require('../../assets/images/4.jpg'),
          order_date: new Date().toLocaleString(),
          order_support_number: '01019112065',
          order_current_state: 1, // 0 or 1 or 2 or 3 -> indexes for "labels" array
          order_status: 'فى المطبخ',
          order_delivery_man_name: 'عدى حاتم',
          order_delivery_man_number: '01019112065',
          order_delivery_man_rate: 4.7,
          order_delivery_man_image:
            'https://i.ytimg.com/vi/fU7txqHLuJA/maxresdefault.jpg',
          // order items
          order_items: [
            {
              item_id: '1',
              item_name: 'ساندوتش كبده',
              item_price: 10,
              item_count: 2,
            },
            {
              item_id: '2',
              item_name: 'وجبة فراخ كاملة',
              item_price: 20,
              item_count: 1,
            },
            {
              item_id: '3',
              item_name: 'وجبة لحمة كاملة',
              item_price: 30,
              item_count: 3,
            },
          ],
        },
        {
          order_id: '1',
          order_rest_name: 'مطعم الشيخ سعيد',
          order_rest_image: require('../../assets/images/5.jpg'),
          order_date: new Date().toLocaleString(),
          order_support_number: '01019112065',
          order_current_state: 1, // 0 or 1 or 2 or 3 -> indexes for "labels" array
          order_status: 'فى المطبخ',
          order_delivery_man_name: 'عدى حاتم',
          order_delivery_man_number: '01019112065',
          order_delivery_man_rate: 4.7,
          order_delivery_man_image:
            'https://i.ytimg.com/vi/fU7txqHLuJA/maxresdefault.jpg',
          // order items
          order_items: [
            {
              item_id: '1',
              item_name: 'وجبة فراخ كاملة',
              item_price: 20,
              item_count: 1,
            },
            {
              item_id: '2',
              item_name: 'ساندوتش كبده',
              item_price: 10,
              item_count: 2,
            },
          ],
        },
        {
          order_id: '1',
          order_rest_name: 'مطعم الشيخ سعيد',
          order_rest_image: require('../../assets/images/5.jpg'),
          order_date: new Date().toLocaleString(),
          order_support_number: '01019112065',
          order_current_state: 1, // 0 or 1 or 2 or 3 -> indexes for "labels" array
          order_status: 'فى المطبخ',
          order_delivery_man_name: 'عدى حاتم',
          order_delivery_man_number: '01019112065',
          order_delivery_man_rate: 4.7,
          order_delivery_man_image:
            'https://i.ytimg.com/vi/fU7txqHLuJA/maxresdefault.jpg',
          // order items
          order_items: [
            {
              item_id: '1',
              item_name: 'وجبة فراخ كاملة',
              item_price: 20,
              item_count: 1,
            },
            {
              item_id: '2',
              item_name: 'ساندوتش كبده',
              item_price: 10,
              item_count: 2,
            },
          ],
        },
        {
          order_id: '1',
          order_rest_name: 'مطعم الشيخ سعيد',
          order_rest_image: require('../../assets/images/5.jpg'),
          order_date: new Date().toLocaleString(),
          order_support_number: '01019112065',
          order_current_state: 1, // 0 or 1 or 2 or 3 -> indexes for "labels" array
          order_status: 'فى المطبخ',
          order_delivery_man_name: 'عدى حاتم',
          order_delivery_man_number: '01019112065',
          order_delivery_man_rate: 4.7,
          order_delivery_man_image:
            'https://i.ytimg.com/vi/fU7txqHLuJA/maxresdefault.jpg',
          // order items
          order_items: [
            {
              item_id: '1',
              item_name: 'وجبة فراخ كاملة',
              item_price: 20,
              item_count: 1,
            },
            {
              item_id: '2',
              item_name: 'ساندوتش كبده',
              item_price: 10,
              item_count: 2,
            },
          ],
        },
        {
          order_id: '1',
          order_rest_name: 'مطعم الشيخ سعيد',
          order_rest_image: require('../../assets/images/5.jpg'),
          order_date: new Date().toLocaleString(),
          order_support_number: '01019112065',
          order_current_state: 1, // 0 or 1 or 2 or 3 -> indexes for "labels" array
          order_status: 'فى المطبخ',
          order_delivery_man_name: 'عدى حاتم',
          order_delivery_man_number: '01019112065',
          order_delivery_man_rate: 4.7,
          order_delivery_man_image:
            'https://i.ytimg.com/vi/fU7txqHLuJA/maxresdefault.jpg',
          // order items
          order_items: [
            {
              item_id: '1',
              item_name: 'وجبة فراخ كاملة',
              item_price: 20,
              item_count: 1,
            },
            {
              item_id: '2',
              item_name: 'ساندوتش كبده',
              item_price: 10,
              item_count: 2,
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: defaultTheme.background,
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={defaultTheme.background}
        />

        <View
          style={{
            alignItems: 'center',
            padding: PADDINGS.padding,
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: width,
          }}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={{
              width: height * 0.055,
              height: height * 0.055,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 1,
              borderRadius: 15,
              alignSelf: 'flex-start',
              backgroundColor: defaultTheme.white,
            }}
            onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5
              name="chevron-right"
              size={SIZES.mediumIconSize}
              color={defaultTheme.icon}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: 'Tajawal',
              fontSize: SIZES.largeFontSize,
              color: defaultTheme.text2,
            }}>
            الطلبات
          </Text>

          {/* to center the text we but a fake view */}
          <View
            style={{
              width: height * 0.055,
              height: height * 0.055,
              alignItems: 'center',
              justifyContent: 'center',
              // elevation: 1,
              borderRadius: 15,
              alignSelf: 'flex-start',
              // backgroundColor: defaultTheme.white,
            }}></View>
        </View>
        <ScrollView
          style={{height: '100%'}}
          showsVerticalScrollIndicator={false}>
          {this.state.Orders.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.4}
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: defaultTheme.white,
                // height: 180,
                elevation: 3,
                marginBottom: PADDINGS.padding,
                borderRadius: 20,
                padding: PADDINGS.padding,
              }}
              onPress={() =>
                this.props.navigation.navigate('OrderDetailsScreen')
              }>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    borderRadius={20}
                    source={item.order_rest_image}
                  />
                </View>
                <View
                  style={{
                    padding: PADDINGS.smallPadding,
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    flex: 1,
                    justifyContent: 'space-evenly',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Tajawal',
                      fontSize: SIZES.mediumFontSize,
                      color: defaultTheme.text2,
                    }}>
                    {item.order_rest_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Tajawal',
                      fontSize: SIZES.smallFontSize,
                      color: defaultTheme.gray,
                      // paddingTop: PADDINGS.smallPadding,
                    }}>
                    {item.order_date}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: PADDINGS.padding,
                  // backgroundColor: 'red',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Tajawal',
                      fontSize: SIZES.smallFontSize + 2,
                      color: defaultTheme.text2,
                    }}>
                    {item.order_items[0].item_name} x
                    {item.order_items[0].item_count}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Tajawal',
                      fontSize: SIZES.smallFontSize + 2,
                      color: defaultTheme.text2,
                    }}>
                    {item.order_items[0].item_price *
                      item.order_items[0].item_count}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Tajawal',
                      fontSize: SIZES.smallFontSize,
                      color: defaultTheme.gray,
                    }}>
                    و {item.order_items.length} طلبات اخرى
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Tajawal',
                      fontSize: SIZES.smallFontSize,
                      color: defaultTheme.primary,
                    }}>
                    {item.order_status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
