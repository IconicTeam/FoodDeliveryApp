import * as React from "react"
import {
    Text,
    View,
    TouchableOpacity,
    Image,
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
                    order_rest_image:
                        'https://scontent.fcai19-1.fna.fbcdn.net/v/t1.6435-9/190896978_139700408216877_7037998798904860139_n.png?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=islCm9sSCxAAX8c72IN&_nc_ht=scontent.fcai19-1.fna&oh=00_AT918bTxKDjadaui3mawzmg010Xcys-3P_vjKEbx9EvTrQ&oe=6234F708',
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

            ]
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.Orders.map((item, index) => (
                    <View style={{
                        width: "90%",
                        alignSelf: "center",
                        backgroundColor: defaultTheme.white,
                        height: 150,
                        elevation: 3,
                        marginTop: 10,
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
                                    }}>may 19,2022 - 3:30 pm</Text>

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
                                }}>{item.item_name}</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: "Tajawal",
                                    fontSize: SIZES.mediumFontSize,
                                    color: defaultTheme.text2
                                }}>{item.item_price}</Text>
                            </View>
                        </View>
                    </View>



                ))}
            </View>
        )
    }
}
