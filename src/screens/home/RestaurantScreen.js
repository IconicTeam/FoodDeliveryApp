import React, { Component } from 'react';
import { AccessibilityInfo, FlatList } from 'react-native';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  StyleSheet,
  StatusBar
} from 'react-native';
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GeneralButton from '../../components/GeneralButton';
import { SIZES, PADDINGS } from '../../constants/Constants';
import { defaultTheme, darkTheme } from '../../constants/Theme';

import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('screen');
export default class RestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          meal_id: 1,
          meal_name: 'البرجر ',
          meal_image: require('../../assets/images/123.jpg'),
          meal_price: 17 + "جنية",
          meal_wight: 230 + "جرام",
          show: true,


          //Ady
          
          meal_sizes:[
            {
              size_id:1,
              size:"صغير",
              size_name:"برجر سنجل",
            }, {
              size_id:2,
              size:"وسط",
              size_name:"برجر دابل",
            },{
              
                size_id:3,
                size:"كبير",
                size_name:"برجر تريبل",
              
            }
          ],meal_type:[
            {
              type_id:1,
              type_name:"برجر لحمة",
              type_small:17,
              type_meduim:35,
              type_large:70
            }
          ],



          // youssef
          KindAndPrice: [
            {
              size1: "برجر سنجل ",
              size2: "برجر دابل ",
              size3: "برجر تريبل ",
              PriceofKind1: 17 + "جنية",
              PriceofKind2: 35 + "جنية",
              PriceofKind3: 70 + "جنية",
              type_name:" برجر لحمة",
            },{
              size1: "برجر سنجل ",
              size2: "برجر دابل ",
              size3: "برجر تريبل ",
              PriceofKind1: 17 + "جنية",
              PriceofKind2: 35 + "جنية",
              PriceofKind3: 70 + "جنية",
              type_name:" برجر تشيز جبن",
            },{
              size1: "برجر سنجل ",
              size2: "برجر دابل ",
              size3: "برجر تريبل ",
              PriceofKind1: 17 + "جنية",
              PriceofKind2: 35 + "جنية",
              PriceofKind3: 70 + "جنية",
              type_name:" برجر بيف",
            },{
              size1: "برجر سنجل ",
              size2: "برجر دابل ",
              size3: "برجر تريبل ",
              PriceofKind1: 17 + "جنية",
              PriceofKind2: 35 + "جنية",
              PriceofKind3: 70 + "جنية",
              type_name:" برجر تشيز جبن",
            }
          ],
        },

        {
          meal_id: 2,
          meal_name: 'البيتزا',
          meal_image: require('../../assets/images/pizza.jpg'),
          meal_price: 41 + "جنية",
          meal_wight: 200 + "جرام",
          show: true,
          KindAndPrice: [
            {
              size1: "بيتيزا صغيرة",
              size2: "بيتيزا وسط ",
              size3: "بيتيزا كبيرة",
              PriceofKind1: 41 + "جنية",
              PriceofKind2: 47 + "جنية",
              PriceofKind3: 59 + "جنية",
              type1_name:" بيتيزا مشكل جبن",
            },{
              size1: "بيتيزا صغيرة",
              size2: "بيتيزا وسط ",
              size3: "بيتيزا كبيرة",
              PriceofKind1: 41 + "جنية",
              PriceofKind2: 47 + "جنية",
              PriceofKind3: 59 + "جنية",
              type2_name:" بيتيزا لحوم",
            },{
              size1: "بيتيزا صغيرة",
              size2: "بيتيزا وسط ",
              size3: "بيتيزا كبيرة",
              PriceofKind1: 41 + "جنية",
              PriceofKind2: 47 + "جنية",
              PriceofKind3: 59 + "جنية",
              type3_name:" بيتيزا جمبري",
            },{
              size1: "بيتيزا صغيرة",
              size2: "بيتيزا وسط ",
              size3: "بيتيزا كبيرة",
              PriceofKind1: 41 + "جنية",
              PriceofKind2: 47 + "جنية",
              PriceofKind3: 59 + "جنية",
              type4_name:" بيتيزا مشروم",
            },{
              size1: "بيتيزا صغيرة",
              size2: "بيتيزا وسط ",
              size3: "بيتيزا كبيرة",
              PriceofKind1: 41 + "جنية",
              PriceofKind2: 47 + "جنية",
              PriceofKind3: 59 + "جنية",
              type5_name:" بيتزا مارجريتا",

            },{
              size1: "بيتيزا صغيرة",
              size2: "بيتيزا وسط ",
              size3: "بيتيزا كبيرة",
              PriceofKind1: 41 + "جنية",
              PriceofKind2: 47 + "جنية",
              PriceofKind3: 59 + "جنية",
              type6_name:"بيتزا الباربكيو"
            }
          ],
        },
        {
          meal_id: 3,
          meal_name: 'ستيك لحمة',
          meal_image: require('../../assets/images/steak.jpg'),
          meal_price: 75 + "جنية",
          meal_wight: 250 + "جرام",
          show: true,
          KindAndPrice: [
            {
              kind1: "ربع كليو",
              kind2: "نص كليو",
              kind3: "كليو ",
              PriceofKind1: 75 + "جنية",
              PriceofKind2: 150 + "جنية",
              PriceofKind3: 300 + "جنية",
            }
          ]
        },
        {
          meal_id: 4,
          meal_name: 'جمبري',
          meal_image: require('../../assets/images/جمبري.jpg'),
          meal_price: 90 + "جنية",
          meal_wight: 250 + "جرام",
          show: true,
          KindAndPrice: [
            {
              kind1: "ربع كليو",
              kind2: "نص كليو",
              kind3: "كليو ",
              PriceofKind1: 90 + "جنية",
              PriceofKind2: 180 + "جنية",
              PriceofKind3: 360 + "جنية",
            }
          ]
        },
        {
          meal_id: 5,
          meal_image: require('../../assets/images/كفتة-مشوية-.jpg'),
          meal_name: 'كفتة مشوية',
          meal_price: 55 + "جنية",
          meal_wight: 250 + "جرام",
          show: true,
          KindAndPrice: [
            {
              kind1: "ربع كليو",
              kind2: "نص كليو",
              kind3: "كليو ",
              PriceofKind1: 55 + "جنية",
              PriceofKind2: 110 + "جنية",
              PriceofKind3: 220 + "جنية",
            }
          ]
        },
        {
          meal_id: 6,
          meal_name: 'دجاج',
          meal_image: require('../../assets/images/دجاج.jpg'),
          meal_price: 95 + "جنية",
          meal_wight: '190 جرام',
          show: true,
          KindAndPrice: [
            {
              kind1: "دجاج مشوي  ",
              kind2: "دجاج طاووق",
              kind3: "دجاج كنتاكي  ",
              PriceofKind1: 95 + "جنية",
              PriceofKind2: 160 + "جنية",
              PriceofKind3: 180 + "جنية",
            }
          ]
        },
      ],
      liked: true,
      press: true,

      catories: [
        {
          id: 1,
          name: 'الاكثر شهرة',
          catory_selected: false,
          pressIn1: false,
        },
        {
          id: 2,
          name: 'اللحوم',
          catory_selected: false,
          pressIn1: false,
        },
        {
          id: 3,
          name: 'البرجر',
          catory_selected: false,
          pressIn1: false,
        },
        {
          id: 4,
          name: 'الخضار',
          catory_selected: false,
          pressIn1: false,
        },
        {
          id: 5,
          name: 'البيتزا',
          catory_selected: false,
          pressIn1: false,
        },
      ],
      seletedName: '',

      restaurant: {
        ...this.props.route.params.restaurant,
      },

      heartColor: false,
    };
  }

  // componentDidMount() {
  //   console.log(this.state.restaurant);
  // }

  search(item) {
    let list = this.state.products;

    if (this.state.seletedName == item) {
      for (let j = 0; j < list.length; j++) {
        list[j].show = true;
      }
      this.setState({ seletedName: '' });
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].name.toLowerCase().includes(item.toLowerCase())) {
          list[i].show = true;
        } else {
          list[i].show = false;
        }
      }
      this.setState({ seletedName: item });
    }

    this.setState({ products: list });
  }

  render() {
    return (
      <View style={styles.viewcontiner}>
        <StatusBar
          translucent={true}


        />
        <ImageBackground
          source={{
            uri: 'https://c8.alamy.com/comp/MTH543/burger-and-fries-on-wooden-board-on-dark-stone-background-homemade-burger-or-cheeseburger-french-fries-and-ketchup-tasty-sandwich-top-view-with-co-MTH543.jpg',
          }}
          style={styles.imageBackgroundstyle}>
          <View style={styles.view1}>
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
                marginTop: PADDINGS.padding + StatusBar.currentHeight

              }}
              onPress={() => this.props.navigation.goBack()}>
              <FontAwesome5
                name="chevron-right"
                size={SIZES.mediumIconSize}
                color={defaultTheme.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ heartColor: !this.state.heartColor });
              }}
              style={styles.touchableopicty1}>
              <Icon
                name={this.state.heartColor ? 'heart' : 'hearto'}
                size={SIZES.mediumIconSize}
                color={this.state.heartColor ? '#d00' : defaultTheme.icon}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.view2}>
          <Image
            source={{
              uri: 'https://gfx4arab.com/wp-content/uploads/wpdm-cache/appetizing-burger-background_23-2147635650-900x0.jpg',
            }}
            style={styles.image1}
          />
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.text1}> المأكولات</Text>
          </View>
          <View style={styles.view3}>
            <TouchableOpacity style={styles.view4}>
              <FontAwesome5
                name="motorcycle"
                style={{ marginRight: 4 }}
                color="#fb6e3b"
                size={SIZES.smallIconSize}
              />
              <Text style={styles.text2}>مجاني</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.view4}>
              <FontAwesome5
                name="clock"
                style={{ marginRight: 4 }}
                color="#fb6e3b"
                size={SIZES.smallIconSize}
              />
              <Text style={styles.text2}>25-30 دقيقة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.view4}>
              <FontAwesome5
                name="star"
                style={{ marginRight: 4 }}
                color="#fb6e3b"
                size={SIZES.smallIconSize}
              />
              <Text style={styles.text2}>تقييم</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view5}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: PADDINGS.padding }}>
              {this.state.catories.map((catogery, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let categories = this.state.catories;

                      if (categories[index].catory_selected) {
                        for (let i = 0; i < categories.length; i++) {
                          categories[i].catory_selected = false;
                        }
                      } else {
                        for (let i = 0; i < categories.length; i++) {
                          if (index == i) {
                            categories[i].catory_selected = true;
                          } else {
                            categories[i].catory_selected = false;
                          }
                        }
                      }

                      this.setState({ catories: categories });
                      this.search(catogery.name);
                    }}
                    key={index}>
                    <View
                      style={[
                        styles.view6,
                        {
                          backgroundColor: catogery.catory_selected
                            ? defaultTheme.primary
                            : '#ddd',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.text3,
                          {
                            color: catogery.catory_selected
                              ? defaultTheme.white
                              : defaultTheme.gray,
                          },
                        ]}>
                        {catogery.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.items_continer}>
            <FlatList
              numColumns={2}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginTop: PADDINGS.padding,
              }}
              contentContainerStyle={{ paddingBottom: PADDINGS.padding }}
              data={this.state.products}
              renderItem={({ item, index }) =>
                item.show ? (
                  <TouchableOpacity
                    style={styles.item_continer}
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('MealScreen')
                    }>
                    <Image
                      source={item.meal_image}
                      style={{ width: 120, height: 120, borderRadius: 60 }}
                    />
                    <Text style={styles.text2}>{item.meal_name}</Text>
                    <Text>{item.meal_wight}</Text>
                    <TouchableOpacity style={styles.touchableopicty2}>
                      <Text>{item.meal_price}</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : null
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewcontiner: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  view1: {
    width: width,
    height: height * 0.09,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: PADDINGS.padding,
    // marginTop: 20,
  },
  touchableopicty1: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 15,
    marginTop: PADDINGS.padding + StatusBar.currentHeight
  },
  imageBackgroundstyle: {
    flex: 1,
    width: width,
    height: height * 0.24
  },
  view2: {
    width: width,
    backgroundColor: "#f4f4f4",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 4,
    alignSelf: 'center',
    marginTop: -22,
  },
  image1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: -40,
  },
  text1: {
    fontSize: 30,
    color: '#000',
    fontFamily: 'Tajawal',
  },
  view3: {
    width: width - 2 * PADDINGS.padding,
    height: height * 0.06,
    backgroundColor: '#f4f4f4',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  view4: {
    width: (width - 2 * PADDINGS.padding) / 3 - PADDINGS.padding / 3,
    height: height * 0.054,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 2,
  },
  text2: {
    fontSize: SIZES.smallFontSize,
    color: '#000',
    fontFamily: 'Tajawal',
    marginLeft: 4
  },
  view5: {
    width: width,
    height: height * 0.08,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  view6: {
    width: width * 0.25,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 30,
    marginRight: PADDINGS.padding,
  },
  items_continer: {
    // width: width,
    // height: height,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    flex: 1,
    // marginTop: 5,
    // backgroundColor: "#f4F4F4",
    paddingHorizontal: PADDINGS.padding,
  },
  item_continer: {
    width: (width - 2 * PADDINGS.padding) / 2 - PADDINGS.padding / 2,
    height: height * 0.3,
    backgroundColor: '#FFF',
    // marginBottom: 5,
    borderRadius: 15,
    // marginTop: 5,
    // marginRight: 5,
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
  },
  touchableopicty2: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  text3: {
    fontSize: SIZES.smallFontSize,
    color: '#ccc',
    fontFamily: 'Tajawal',
  },
});
