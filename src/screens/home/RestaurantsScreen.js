import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

// Constants
import {defaultTheme} from '../../constants/Theme';
import {FONTS, PADDINGS, SIZES} from '../../constants/Constants';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

// Dimensions
const {width, height} = Dimensions.get('screen');

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          cat_id: '1',
          cat_name: 'برجر',
          cat_image: require('../../assets/images/burger.png'),
          cat_selected: false,
        },
        {
          cat_id: '2',
          cat_name: 'بيتزا',
          cat_image: require('../../assets/images/pizza.png'),
          cat_selected: false,
        },
        {
          cat_id: '3',
          cat_name: 'مقبلات',
          cat_image: require('../../assets/images/snacks.png'),
          cat_selected: false,
        },
        {
          cat_id: '4',
          cat_name: 'سوشى',
          cat_image: require('../../assets/images/sushi.png'),
          cat_selected: false,
        },
        {
          cat_id: '5',
          cat_name: 'لحمة',
          cat_image: require('../../assets/images/meat.png'),
          cat_selected: false,
        },
        {
          cat_id: '6',
          cat_name: 'كبدة',
          cat_image: require('../../assets/images/liver.png'),
          cat_selected: false,
        },
        {
          cat_id: '7',
          cat_name: 'كفتة',
          cat_image: require('../../assets/images/kofta.png'),
          cat_selected: false,
        },
        {
          cat_id: '8',
          cat_name: 'وجبات',
          cat_image: require('../../assets/images/meals.png'),
          cat_selected: false,
        },
      ],
      restaurants: [
        {
          rest_id: '1',
          rest_name: 'كوكى',
          rest_image: '',
          rest_cover_image:
            'https://saidaonline.com/new/uploads/news/1200x630/21/07/mcdonaldsglobal.jpg',
          rest_rate: 4.7,
          rest_delivery: 'مجانى',
          rest_delivery_time: '20-30 دقيقة',
          rest_prices: 1, // 1 => $ | 2 => $$ | 3 => $$$
          rest_meals: 'برجر - بيتزا - مقبلات',
        },
        {
          rest_id: '2',
          rest_name: 'أبو محمد',
          rest_image: '',
          rest_cover_image:
            'https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/842849976/greasy-fast-food.jpg?quality=82&strip=all',
          rest_rate: 4.7,
          rest_delivery: 'مجانى',
          rest_delivery_time: '15-20 دقيقة',
          rest_prices: 3, // 1 => $ | 2 => $$ | 3 => $$$
          rest_meals: 'لحمة - وجبات - مقبلات',
        },
        {
          rest_id: '3',
          rest_name: 'الخير والبركة',
          rest_image: '',
          rest_cover_image:
            'https://www.lantmannen-unibake.com/globalassets/_global-en/decks--images/f-1140x400---limit-spot-1/1140x400---category----fastfood.jpg',
          rest_rate: 4.7,
          rest_delivery: 'مجانى',
          rest_delivery_time: '25-30 دقيقة',
          rest_prices: 1, // 1 => $ | 2 => $$ | 3 => $$$
          rest_meals: 'كبدة - كفتة - مقبلات',
        },
        {
          rest_id: '4',
          rest_name: 'الشيخ سعيد',
          rest_image: '',
          rest_cover_image:
            'https://vistapointe.net/images/fast-food-wallpaper-9.jpg',
          rest_rate: 4.7,
          rest_delivery: 'مجانى',
          rest_delivery_time: '20-30 دقيقة',
          rest_prices: 2, // 1 => $ | 2 => $$ | 3 => $$$
          rest_meals: 'كبدة -كفتة - مقبلات',
        },
      ],

      selected_cat_name: '',
    };
  }

  // render header
  _renderHeader() {
    return (
      <View style={[styles.headerContainer]}>
        {/* header title */}
        <View style={[styles.headerTitleContainer]}>
          <Text style={[styles.headerTitle, {color: defaultTheme.text2}]}>
            المطاعم والفئات
          </Text>
        </View>
        {/* notifications */}
        <View style={[styles.headerIconContainer]}>
          <Pressable
            style={[styles.IconBtn]}
            android_ripple={{
              color: defaultTheme.ripple,
              radius: (height * 0.055) / 2,
            }}>
            <Icon
              name="notifications-outline"
              size={SIZES.mediumIconSize}
              color={defaultTheme.icon}
            />
          </Pressable>
        </View>
        {/* search */}
        <View style={[styles.headerIconContainer]}>
          <Pressable
            style={[styles.IconBtn]}
            android_ripple={{
              color: defaultTheme.ripple,
              radius: (height * 0.055) / 2,
            }}>
            <Icon
              name="search"
              size={SIZES.mediumIconSize}
              color={defaultTheme.icon}
            />
          </Pressable>
        </View>
      </View>
    );
  }

  // select category
  selectCategory = index => {
    let selectedCatName = this.state.categories[index].cat_name;

    if (selectedCatName == this.state.selected_cat_name) {
      this.setState({selected_cat_name: ''});
    } else {
      this.setState({selected_cat_name: selectedCatName});
    }
  };

  // render categories
  _renderCategories() {
    return (
      <View style={{marginTop: PADDINGS.padding}}>
        <View style={[styles.subTitleContainer]}>
          <Text style={[styles.subTitle, {color: defaultTheme.text2}]}>
            الفئات الرئيسية
          </Text>
        </View>
        <View style={{width: width}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.categoriesContainer]}>
              {this.state.categories.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.selectCategory(index)}
                    activeOpacity={0.4}
                    style={[
                      styles.categoryContainer,
                      {
                        backgroundColor:
                          this.state.selected_cat_name == item.cat_name
                            ? defaultTheme.primary
                            : defaultTheme.card,
                        marginRight:
                          index == this.state.categories.length - 1
                            ? PADDINGS.largePadding
                            : PADDINGS.smallPadding,
                      },
                    ]}>
                    <View
                      style={[
                        styles.categoryImageContainer,
                        {
                          backgroundColor:
                            this.state.selected_cat_name == item.cat_name
                              ? defaultTheme.card
                              : defaultTheme.whiteGray,
                        },
                      ]}>
                      <Image
                        source={item.cat_image}
                        resizeMode="center"
                        style={{flex: 0.7}}
                      />
                    </View>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.categoryName,
                        {
                          color:
                            this.state.selected_cat_name == item.cat_name
                              ? defaultTheme.white
                              : defaultTheme.gray,
                        },
                      ]}>
                      {item.cat_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  // render header
  _renderRestaurants() {
    let filteredRestaurants = [];
    if (this.state.selected_cat_name != '') {
      filteredRestaurants = this.state.restaurants.filter(item =>
        item.rest_meals.includes(this.state.selected_cat_name),
      );
    } else {
      filteredRestaurants = this.state.restaurants;
    }

    return (
      <View style={{marginTop: PADDINGS.padding, flex: 1}}>
        <View style={[styles.subTitleContainer]}>
          <Text style={[styles.subTitle, {color: defaultTheme.text2}]}>
            المطاعم
          </Text>
        </View>
        {/* <ScrollView style={{flex: 1}}> */}
        <View style={{width: width, flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            data={filteredRestaurants}
            renderItem={this.renderItem}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }

  // render item
  renderItem = ({item, index, separators}) => {
    return (
      <View style={styles.restaurantContainer}>
        <TouchableOpacity
          style={styles.imageCoverContainer}
          activeOpacity={0.4}
          onPress={() =>
            this.props.navigation.navigate('RestaurantScreen', {
              restaurant: item,
              restaurant_index: index, // if we need it
            })
          }>
          <Image
            source={{uri: item.rest_cover_image}}
            resizeMode="cover"
            style={{flex: 1}}
          />
        </TouchableOpacity>
        <View style={styles.restuarantNameContainer}>
          <Text style={[styles.restuarantName, {color: defaultTheme.text2}]}>
            {item.rest_name}
          </Text>
        </View>
        <View style={styles.restuarantDetailsContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon2
              name="star"
              size={SIZES.smallIconSize}
              color={defaultTheme.primary}
            />
            <Text
              style={[styles.restuarantDetails, {color: defaultTheme.gray}]}>
              {` (${item.rest_rate})  ${item.rest_meals} - ${
                item.rest_prices == 1
                  ? '$'
                  : item.rest_prices == 2
                  ? '$$'
                  : '$$$'
              }`}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={[styles.container, {backgroundColor: defaultTheme.background}]}>
        {/* StatusBar */}
        <StatusBar
          barStyle="dark-content"
          backgroundColor={defaultTheme.background}
          animated={true}
          showHideTransition="fade"
        />

        {/* Header */}
        {this._renderHeader()}

        {/* body */}
        {/* Categories */}
        {this._renderCategories()}

        {/* Restaurants */}
        {this._renderRestaurants()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: width,
    height: height * 0.085,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: PADDINGS.padding,
    paddingRight: (height * 0.055) / 2 - PADDINGS.padding,
    // backgroundColor: '#f00',
  },
  headerTitleContainer: {
    flex: 5,
    justifyContent: 'center',
    // backgroundColor: '#0f0',
  },
  headerIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: SIZES.largeFontSize,
    fontFamily: FONTS.fontFamily,
  },
  IconBtn: {
    width: height * 0.055,
    height: height * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (height * 0.055) / 2,
  },
  subTitleContainer: {
    paddingHorizontal: PADDINGS.padding,
    marginBottom: PADDINGS.padding,
  },
  subTitle: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingLeft: PADDINGS.largePadding,
  },
  categoryContainer: {
    width: width / 5.5,
    height: (width / 5.5) * 1.6,
    padding: PADDINGS.smallPadding,
    borderRadius: width,
    marginRight: PADDINGS.smallPadding,
    // alignItems: 'center',
  },
  categoryName: {
    fontSize: SIZES.tinyFontSize,
    fontFamily: FONTS.fontFamily,
    textAlign: 'center',
  },
  categoryImageContainer: {
    width: width / 5.5 - PADDINGS.smallPadding * 2,
    height: width / 5.5 - PADDINGS.smallPadding * 2,
    borderRadius: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: PADDINGS.smallPadding / 2,
  },
  flatListContainer: {
    paddingHorizontal: PADDINGS.largePadding,
    // paddingBottom: PADDINGS.padding,
  },
  restaurantContainer: {
    width: '100%',
    height: height * 0.3,
    // backgroundColor: '#f00',
    marginBottom: PADDINGS.padding,
  },
  imageCoverContainer: {
    flex: 5,
    borderRadius: 20,
    // backgroundColor: '#ff0',
    overflow: 'hidden',
  },
  restuarantName: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
  },
  restuarantNameContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#ff0',
  },
  restuarantDetailsContainer: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#00f',
  },
  restuarantDetails: {
    fontSize: SIZES.smallFontSize,
    fontFamily: FONTS.fontFamily,
  },
});

export default Restaurants;
