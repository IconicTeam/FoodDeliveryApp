import * as React from "react"
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { SIZES, PADDINGS } from "../constants/Constants"
import { defaultTheme } from "../constants/Theme"
import { TextInput } from 'react-native-paper';
import GeneralButton from '../components/GeneralButton';
import { color } from "react-native-reanimated"
export default class Order extends React.Component {



    constructor() {
        super();
        this.state = {
            Orders: [
                {



                }
            ]
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
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
                                source={require("../assets/images/1.jpg")}
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
                                }}>كبابجى ابو محمد</Text>
                            <Text
                                style={{
                                    fontFamily: "Tajawal",
                                    fontSize: SIZES.mediumFontSize
                                }}>febrauary 19,2022 - 3:30 pm</Text>

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
                            }}>ساندوتش كبده </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontFamily: "Tajawal",
                                fontSize: SIZES.mediumFontSize,
                                color: defaultTheme.text2
                            }}>20</Text>
                        </View>
                    </View>
                </View>


            </View>
        )
    }
}
