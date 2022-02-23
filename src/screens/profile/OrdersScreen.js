import * as React from "react"
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar
} from "react-native"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { SIZES, PADDINGS } from "../../constants/Constants"
import { defaultTheme } from "../../constants/Theme"
import { TextInput } from 'react-native-paper';
import GeneralButton from '../../components/GeneralButton';
import { color } from "react-native-reanimated"
export default class OrdersScreen extends React.Component {



    constructor() {
        super();
        this.state = {
            Orders: [
                {
                    order_id: '1',
                    order_rest_name: 'كبابجى أبو محمد',
                    order_rest_image: require("../../assets/images/4.jpg"),
                    order_date: 'febraury 19, 2022 - 3:30 PM',
                    order_support_number: '01019112065',
                    order_current_state: 1, // 0 or 1 or 2 or 3 -> indexes for "labels" array
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
                    order_rest_image: require("../../assets/images/5.jpg"),
                    order_date: 'may 19, 2022 - 3:30 PM',
                    order_support_number: '01019112065',
                    order_current_state: 1, // 0 or 1 or 2 or 3 -> indexes for "labels" array
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
            ]
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                // backgroundColor: defaultTheme.primary
            }}>


                <StatusBar
                    barStyle="light-content"
                    backgroundColor={defaultTheme.primary}
                />

                <View style={{
                    alignItems: 'center',
                    padding: PADDINGS.padding,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "70%"
                }}>
                    <TouchableOpacity
                        activeOpacity={0.4}
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
                        <FontAwesome5
                            name="chevron-right"
                            size={SIZES.smallIconSize}
                            color={defaultTheme.icon}
                        />
                    </TouchableOpacity>
                    <View style={{
                        alignItems: "center",
                        alignSelf: "center",
                        backgroundColor: defaultTheme.white,
                        elevation: 1,
                        borderRadius: 15,
                        width: 130,
                        height: 50,
                        justifyContent: "center"

                    }}>
                        <Text
                            style={{
                                fontFamily: "Tajawal",
                                fontSize: SIZES.largeFontSize,
                                color: defaultTheme.text2
                            }}>الطلبات</Text>
                    </View>
                </View>

                {this.state.Orders.map((item, index) => (
                    <TouchableOpacity style={{
                        width: "90%",
                        alignSelf: "center",
                        backgroundColor: defaultTheme.white,
                        height: 150,
                        elevation: 3,
                        marginTop: 20,
                        borderRadius: 20,
                        padding: PADDINGS.padding
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <View style={{
                                width: 80,
                                height: 80,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Image
                                    style={{
                                        resizeMode: "cover",
                                        width: "100%",
                                        height: "100%",

                                    }}
                                    borderRadius={20}
                                    source={item.order_rest_image}
                                />
                            </View>
                            <View style={{
                                padding: PADDINGS.smallPadding,


                            }}>
                                <Text
                                    style={{
                                        fontFamily: "Tajawal",
                                        fontSize: SIZES.mediumFontSize,
                                        color: defaultTheme.text2
                                    }}>{item.order_rest_name}</Text>
                                <Text
                                    style={{
                                        fontFamily: "Tajawal",
                                        fontSize: SIZES.mediumFontSize
                                    }}>{item.order_date}</Text>

                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10
                        }}>
                            <View>
                                <Text style={{
                                    fontFamily: "Tajawal",
                                    fontSize: SIZES.mediumFontSize,
                                    color: defaultTheme.text2
                                }}>{item.order_items[index].item_name}x{item.order_items[index].item_count}</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: "Tajawal",
                                    fontSize: SIZES.mediumFontSize,
                                    color: defaultTheme.text2
                                }}>{item.order_items[index].item_price * item.order_items[index].item_count}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>



                ))}
            </View>

        )
    }
}
