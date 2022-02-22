import React, { Component } from "react";
import { AccessibilityInfo, FlatList } from "react-native";
import { Text, View, Dimensions, TextInput, TouchableOpacity, Image, ImageBackground, Alert, ScrollView, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import GeneralButton from "../../components/GeneralButton";
import { SIZES, PADDINGS } from "../../constants/Constants"
import { defaultTheme, darkTheme } from "../../constants/Theme"
const { width, height } = Dimensions.get("screen")
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [
        {
          id: 1,
          name: "البرجر ",
          image: require('../../assets/images/123.jpg'),
          price: "40 جنيها",
          wight: "245 جرام",
          show: true
        }, {
          id: 2,
          name: "البيتزا",
          image: require('../../assets/images/pizza.jpg'),
          price: "60 جنيها",
          wight: "250 جرام",
          show: true
        }, {
          id: 3,
          name: "ستيك لحمة",
          image: require('../../assets/images/steak.jpg'),
          price: "70 جنيها",
          wight: "200 جرام",
          show: true
        }, {
          id: 4,
          name: "جمبري",
          image: require('../../assets/images/جمبري.jpg'),
          price: "45 جنيها",
          wight: "190 جرام",
          show: true
        }, {
          id: 5,
          image: require('../../assets/images/كفتة-مشوية-.jpg'),
          name: "كفتة مشوية",
          price: "45 جنيها",
          wight: "190 جرام",
          show: true
        }, {
          id: 6,
          name: "دجاج",
          image: require('../../assets/images/دجاج.jpg'),
          price: "45 جنيها",
          wight: "190 جرام",
          show: true
        }
      ],
      liked: true,
      press: true,


      catories: [
        {
          id: 1,
          name: "الاكثر شهرة",
          catory_selected: false,
          pressIn1: false,

        }, {
          id: 2,
          name: "اللحوم",
          catory_selected: false,
          pressIn1: false,

        }, {
          id: 3,
          name: "البرجر",
          catory_selected: false,
          pressIn1: false,

        }, {
          id: 4,
          name: "الخضار",
          catory_selected: false,
          pressIn1: false,

        }, {
          id: 5,
          name: "البيتزا",
          catory_selected: false,
          pressIn1: false,

        }
      ],
      seletedName: ''

    };

  }

  search(item) {
    let list = this.state.products

    if (this.state.seletedName == item) {
      for (let j = 0; j < list.length; j++) {
        list[j].show = true
      }
      this.setState({seletedName: ''})
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].name.toLowerCase().includes(item.toLowerCase())) {
          list[i].show = true
        } else {
          list[i].show = false
        }
      }
      this.setState({seletedName: item})
    }

    this.setState({ products: list})
  }

  render() {
    return (
      <View style={styles.viewcontiner}>
        <ImageBackground
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxRRZWuwISCnYGxt6MPL6M1rOF7yjbJsO5aw&usqp=CAU" }}
          style={styles.imageBackgroundstyle}>
          <View style={styles.view1}>
            <TouchableOpacity style={styles.touchableopicty1}>
              <FontAwesome5 name="chevron-right" color={"#000"} size={SIZES.mediumIconSize} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableopicty1}
              onPress={() => {
                if (this.state.liked == true) {
                  this.setState({ liked: false })

                } else {
                  this.setState({ liked: true })
                }
              }}
            >
              <FontAwesome5 name="heart" color={this.state.liked ? "#000" : "#f00"} size={SIZES.mediumIconSize} />
            </TouchableOpacity>
          </View>
          <View style={styles.view2}>
            <Image source={{ uri: "https://gfx4arab.com/wp-content/uploads/wpdm-cache/appetizing-burger-background_23-2147635650-900x0.jpg" }}
              style={styles.image1} />
            <View style={{ marginTop: 10, alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.text1}> المأكولات</Text>
            </View>
            <View style={styles.view3}>
              <TouchableOpacity style={styles.view4}>
                <FontAwesome5 name="motorcycle" style={{ marginRight: 4 }} color="#fb6e3b" size={SIZES.mediumIconSize} />
                <Text style={styles.text2}>مجاني</Text></TouchableOpacity>
              <TouchableOpacity style={styles.view4}>
                <FontAwesome5 name="clock" style={{ marginRight: 4 }} color="#fb6e3b" size={SIZES.mediumIconSize} />
                <Text style={styles.text2}>25-30 دقيقة</Text></TouchableOpacity>
              <TouchableOpacity style={styles.view4}>
                <FontAwesome5 name="star" style={{ marginRight: 4 }} color="#fb6e3b" size={SIZES.mediumIconSize} />
                <Text style={styles.text2}>تقييم</Text></TouchableOpacity>
            </View>
            <View style={styles.view5}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: PADDINGS.padding }}>
                {this.state.catories.map((catogery, index) => {

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        let categories = this.state.catories;

                        if (categories[index].catory_selected) {
                          for (let i = 0; i < categories.length; i++) {
                            categories[i].catory_selected = false
                          }
                        } else {

                          for (let i = 0; i < categories.length; i++) {
                            if (index == i) {
                              categories[i].catory_selected = true;
                            } else {
                              categories[i].catory_selected = false
                            }
                          }
                        }


                        this.setState({ catories: categories });
                        this.search(catogery.name)
                      }}
                      key={index}
                    >
                      <View style={[styles.view6, { backgroundColor: catogery.catory_selected ? defaultTheme.primary : '#ddd' }]} >
                        <Text style={[styles.text3, { color: catogery.catory_selected ? defaultTheme.white : defaultTheme.gray }]}> {catogery.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
            <View style={styles.items_continer}>
              <FlatList numColumns={2} showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                columnWrapperStyle={{ justifyContent: 'space-between', marginTop: PADDINGS.padding }}
                contentContainerStyle={{ paddingBottom: PADDINGS.padding }}
                data={this.state.products}
                renderItem={({ item, index }) => (
                  item.show ?

                    <View style={styles.item_continer}>
                      <Image source={item.image}
                        style={{ width: 120, height: 120, borderRadius: 60 }} />
                      <Text style={styles.text2}>{item.name}</Text>
                      <Text>{item.wight}</Text>
                      <TouchableOpacity style={styles.touchableopicty2}>
                        <Text>{item.price}</Text>
                      </TouchableOpacity>
                    </View>
                    : null
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewcontiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  }, view1: {
    width: width,
    height: height * .09,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: PADDINGS.padding,
    marginTop: 20
  }, touchableopicty1: {
    width: 40,
    height: 40,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 15
  }, imageBackgroundstyle: {
    flex: 1
  }, view2: {
    width: width,
    backgroundColor: "#f4f4f4",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    alignSelf: "center",
    marginTop: 10
  }, image1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: -40,

  }, text1: {
    fontSize: 30,
    color: '#000',
    fontFamily: 'Tajawal',
  }, view3: {
    width: width - (2 * PADDINGS.padding),
    height: height * .06,
    backgroundColor: "#f4f4f4",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  }, view4: {
    width: ((width - (2 * PADDINGS.padding)) / 3) - PADDINGS.padding / 3,
    height: height * 0.054,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 2
  }, text2: {
    fontSize: SIZES.smallFontSize,
    color: "#000",
    fontFamily: 'Tajawal',
  }, view5: {
    width: width,
    height: height * 0.08,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  }, view6: {
    width: width * .25,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ddd',
    borderRadius: 30,
    marginRight: PADDINGS.padding
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
    paddingHorizontal: PADDINGS.padding
  }, item_continer: {
    width: ((width - (2 * PADDINGS.padding)) / 2) - PADDINGS.padding / 2,
    height: height * .3,
    backgroundColor: "#FFF",
    // marginBottom: 5,
    borderRadius: 15,
    // marginTop: 5,
    // marginRight: 5,
    alignItems: "center",
    elevation: 3,
    justifyContent: "center"
  }, touchableopicty2: {
    width: width * 0.3,
    height: height * .05,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  }, text3: {
    fontSize: SIZES.smallFontSize,
    color: "#ccc",
    fontFamily: 'Tajawal',

  }
})