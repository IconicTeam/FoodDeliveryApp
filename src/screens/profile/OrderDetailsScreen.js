import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  StatusBar,
  Modal,
  ActivityIndicator,
  Pressable,
  Button,
  Animated as RNAnimated,
  Easing,
  FlatList,
  Linking,
} from 'react-native';

// Theme
import {defaultTheme} from '../../constants/Theme';

// Constants
import {ApiKey, FONTS, PADDINGS, SIZES} from '../../constants/Constants';

// maps & geolocation & geocoder
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';

// bottom sheet
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

// icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';

// step indicator
import StepIndicator from 'react-native-step-indicator';

// activityIndicator
import {BallIndicator} from 'react-native-indicators';

// map directions //! Not Used
import MapViewDirections from 'react-native-maps-directions';

// google maps directions
import getDirections from 'react-native-google-maps-directions';

//activeOpacity
const activeOpacity = 0.4;

// Dimensions
const {width, height} = Dimensions.get('screen');

const labels = ['قبول الطلب', 'جارى الطبخ', 'جارى التوصيل', 'التسليم'];
const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: defaultTheme.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: defaultTheme.primary,
  stepStrokeUnFinishedColor: defaultTheme.gray,
  separatorFinishedColor: defaultTheme.primary,
  separatorUnFinishedColor: defaultTheme.gray,
  stepIndicatorFinishedColor: defaultTheme.primary,
  stepIndicatorUnFinishedColor: defaultTheme.gray,
  stepIndicatorCurrentColor: defaultTheme.primary,
  stepIndicatorLabelFontSize: SIZES.smallFontSize,
  currentStepIndicatorLabelFontSize: SIZES.smallFontSize,
  stepIndicatorLabelCurrentColor: defaultTheme.white,
  stepIndicatorLabelFinishedColor: defaultTheme.white,
  stepIndicatorLabelUnFinishedColor: defaultTheme.gray,
  labelColor: defaultTheme.gray,
  labelSize: SIZES.smallFontSize,
  labelFontFamily: FONTS.fontFamily,
  labelAlign: 'center',
  currentStepLabelColor: defaultTheme.primary,
};

class OrderDetailsScreen extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      // home region
      homeRegion: {
        latitude: 30.9399,
        longitude: 30.8176,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      // delivery region
      deliveryRegion: {
        latitude: 30.7865,
        longitude: 31.0004,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      // restaurant region
      restaurantRegion: {
        latitude: 30.0444,
        longitude: 31.2357,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      // home address
      home_address: '',
      // delivery address
      delivery_address: '',
      // restaurant address
      restaurant_address: '',
      // loading map
      mapLoading: true,
      // open and close the bottom sheet
      isBSOpend: false,
      // animation value
      valueAnim: new RNAnimated.Value(0),
      // animated value
      rotateX: new RNAnimated.Value(0),
      // step indicator
      currentPosition: 1,
      // order details
      order_details: {
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
    };

    // map ref
    this.mapRef = React.createRef(null);
    // marker ref
    this.markerRef1 = React.createRef(null);
    // bottom sheet ref
    this.bottomSheetRef = React.createRef(null);
    // scrollView ref
    this.scrollViewRef = React.createRef(null);
  }

  componentDidMount() {
    this.getAddress(
      this.state.homeRegion.latitude,
      this.state.homeRegion.longitude,
    );
    this.getDeliveryAddress(
      this.state.deliveryRegion.latitude,
      this.state.deliveryRegion.longitude,
    );
    this.getRestAddress(
      this.state.restaurantRegion.latitude,
      this.state.restaurantRegion.longitude,
    );
  }

  // get current position //! Not Used
  getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(info => {
      // console.log('info: ', info);
      this.setState({
        initialRegion: {
          ...this.state.homeRegion,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },
      });
      this.getAddress(info.coords.latitude, info.coords.longitude);
    });
  };

  // on marker drag end //! Not Used
  onDragEnd = e => {
    this.setState(
      {
        homeRegion: {
          ...this.state.homeRegion,
          ...e.nativeEvent.coordinate,
        },
      },
      () => {
        this.getAddress(
          this.state.homeRegion.latitude,
          this.state.homeRegion.longitude,
        );
        this.mapRef.current.animateToRegion(this.state.homeRegion, 500);
      },
    );
  };

  // on map press //! Not Used
  onMapPress = e => {
    this.markerRef1.current.animateMarkerToCoordinate(
      e.nativeEvent.coordinate,
      500,
    );
    this.setState(
      {
        homeRegion: {
          ...this.state.homeRegion,
          ...e.nativeEvent.coordinate,
        },
      },
      () => {
        this.getAddress(
          this.state.homeRegion.latitude,
          this.state.homeRegion.longitude,
        );
        setTimeout(() => {
          this.mapRef.current.animateToRegion(this.state.homeRegion, 500);
        }, 500);
      },
    );
  };

  // get home address
  getAddress = async (lat, lng) => {
    await Geocoder.fallbackToGoogle(ApiKey);
    let res = await Geocoder.geocodePosition({lat, lng});
    var address = '';
    if (res[0].streetName != null && res[0].streetName != 'Unnamed Road') {
      address = `${res[0].streetName}, ${res[0].locality}, ${res[0].country}`;
    } else {
      address = `${res[0].locality}, ${res[0].country}`;
    }
    this.setState({home_address: address});
  };

  // get restaurant address
  getRestAddress = async (lat, lng) => {
    await Geocoder.fallbackToGoogle(ApiKey);
    let res = await Geocoder.geocodePosition({lat, lng});
    // console.log(res[0]);
    var address = '';
    if (res[0].streetName != null && res[0].streetName != 'Unnamed Road') {
      address = `${res[0].streetName}, ${res[0].locality}, ${res[0].country}`;
    } else {
      address = `${res[0].locality}, ${res[0].country}`;
    }
    this.setState({restaurant_address: address});
  };

  // get delivery address
  getDeliveryAddress = async (lat, lng) => {
    await Geocoder.fallbackToGoogle(ApiKey);
    let res = await Geocoder.geocodePosition({lat, lng});
    // console.log(res[0]);
    var address = '';
    if (res[0].streetName != null && res[0].streetName != 'Unnamed Road') {
      address = `${res[0].streetName}, ${res[0].locality}, ${res[0].country}`;
    } else {
      address = `${res[0].locality}, ${res[0].country}`;
    }
    this.setState({delivery_address: address});
  };

  // render bottom sheet header
  _renderHeader = () => {
    return (
      <View
        style={[
          styles.bsHeaderContainer,
          {backgroundColor: defaultTheme.background},
        ]}>
        <TouchableOpacity
          style={[styles.bsHeaderTextContainer]}
          activeOpacity={activeOpacity}
          onPress={this.handleShowBS}>
          <RNAnimated.Text
            style={[
              styles.bsHeaderText,
              {
                color: defaultTheme.text2,
              },
            ]}>
            {this.state.isBSOpend ? 'إخفاء التفاصيل' : 'إظهار التفاصيل'}
          </RNAnimated.Text>
          <RNAnimated.View
            style={{
              transform: [
                {
                  rotate: this.state.valueAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}>
            <Icon
              name="chevron-up"
              size={SIZES.smallIconSize}
              color={defaultTheme.icon}
            />
          </RNAnimated.View>
        </TouchableOpacity>
      </View>
    );
  };

  // render bottom sheet content
  _renderContent = () => {
    return (
      <View
        style={[
          styles.bsContentContainer,
          {backgroundColor: defaultTheme.background},
        ]}>
        <ScrollView
          ref={this.scrollViewRef}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: PADDINGS.padding}}>
          <View style={[styles.timeAndLocationContainer]}>
            <Text style={[styles.smallText, {color: defaultTheme.gray}]}>
              مكان التوصيل
            </Text>
            <Text
              style={[
                styles.largeText,
                {color: defaultTheme.text2, marginBottom: PADDINGS.padding},
              ]}>
              {this.state.home_address}
            </Text>
            <Text style={[styles.smallText, {color: defaultTheme.gray}]}>
              وقت التوصيل المقدر
            </Text>
            <Text style={[styles.largeText, {color: defaultTheme.text2}]}>
              2:45PM - 3:10PM
            </Text>
          </View>

          {/* step indicator */}
          <View style={[styles.stepIndicatorContainer]}>
            <StepIndicator
              stepCount={4}
              customStyles={customStyles}
              currentPosition={this.state.currentPosition}
              labels={labels}
              direction="horizontal"
              renderStepIndicator={({position, stepStatus}) => {
                // console.log(stepStatus);
                if (stepStatus == 'current') {
                  return (
                    // <View
                    //   style={{
                    //     width: 30,
                    //     height: 30,
                    //     alignItems: 'center',
                    //     justifyContent: 'center',
                    //   }}>
                    <BallIndicator color={defaultTheme.white} size={13} />
                    // </View>
                  );
                } else if (stepStatus == 'unfinished') {
                  return (
                    <View
                      style={[
                        styles.unFinishedStatus,
                        {backgroundColor: defaultTheme.white},
                      ]}
                    />
                  );
                } else if (stepStatus == 'finished') {
                  return (
                    <Icon name="check" size={10} color={defaultTheme.white} />
                  );
                }
              }}
              renderLabel={({position, currentPosition, label, stepStatus}) => {
                if (stepStatus == 'current') {
                  return (
                    <Text
                      style={[
                        styles.currentLabelStyle,
                        {color: defaultTheme.primary},
                      ]}>
                      {label}
                    </Text>
                  );
                } else {
                  return (
                    <Text
                      style={[
                        styles.otherLabelStyle,
                        {color: defaultTheme.gray},
                      ]}>
                      {label}
                    </Text>
                  );
                }
              }}
            />
          </View>

          {/* order details */}
          <View
            style={[
              styles.orderDetailsContainer,
              {backgroundColor: defaultTheme.card},
            ]}>
            <View style={[styles.orderHeaderContainer]}>
              <View
                style={[
                  styles.restaurantLogoContainer,
                  {backgroundColor: defaultTheme.whiteGray},
                ]}>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    overflow: 'hidden',
                    borderRadius: 25,
                  }}>
                  <Image
                    source={{
                      uri: this.state.order_details.order_rest_image,
                    }}
                    style={styles.restaurantLogo}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.restaurantTitleAndDateContainer}>
                <Text
                  style={[styles.restaurantTitle, {color: defaultTheme.text2}]}>
                  {this.state.order_details.order_rest_name}
                </Text>
                <Text style={[styles.orderDate, {color: defaultTheme.gray}]}>
                  {this.state.order_details.order_date}
                </Text>
              </View>
            </View>
            <View style={styles.orderItemsContainer}>
              <FlatList
                data={this.state.order_details.order_items}
                renderItem={this._renderItem}
                keyExtractor={this.keyExtractor}
              />
            </View>
            <View
              style={[
                styles.seperator,
                {backgroundColor: defaultTheme.whiteGray},
              ]}
            />
            <View style={styles.totalPriceContainer}>
              <Text
                style={[
                  styles.orderItemNameAndPrice,
                  {color: defaultTheme.text2, fontSize: SIZES.mediumFontSize},
                ]}>
                السعر الكلى
              </Text>
              <Text
                style={[
                  styles.orderItemNameAndPrice,
                  {color: defaultTheme.text2, fontSize: SIZES.mediumFontSize},
                ]}>
                {this.totalPrice()}
              </Text>
            </View>

            {/* call support */}
            <TouchableOpacity
              activeOpacity={activeOpacity}
              style={[
                styles.callSupportBtn,
                {backgroundColor: defaultTheme.whiteGray},
              ]}
              onPress={() =>
                Linking.openURL(
                  `tel:${this.state.order_details.order_support_number}`,
                )
              }>
              <Icon
                name="phone"
                size={SIZES.smallIconSize}
                color={defaultTheme.icon}
              />
              <Text
                style={[styles.supportBtnLabel, {color: defaultTheme.text2}]}>
                اتصل بالدعم
              </Text>
            </TouchableOpacity>
          </View>

          {/* Delivery man info */}
          <View
            style={[
              styles.deliveryDetailsContainer,
              {backgroundColor: defaultTheme.card},
            ]}>
            <View style={styles.deliveryManInfoContainer}>
              <Image
                source={{
                  uri: this.state.order_details.order_delivery_man_image,
                }}
                style={styles.deliveryManImage}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  // backgroundColor: '#f0f',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.restaurantTitleAndDateContainer}>
                  <Text
                    style={[
                      styles.deliveryManName,
                      {color: defaultTheme.text2},
                    ]}>
                    {this.state.order_details.order_delivery_man_name}
                  </Text>
                  <Text
                    style={[styles.deliveryManJob, {color: defaultTheme.gray}]}>
                    عامل توصيل
                  </Text>
                </View>
                <View style={styles.restaurantTitleAndDateContainer}>
                  <View style={styles.deliveryRate}>
                    <Icon2
                      name="star"
                      size={SIZES.smallIconSize}
                      color={defaultTheme.primary}
                    />
                    <Text
                      style={[styles.rateNumber, {color: defaultTheme.text2}]}>
                      {this.state.order_details.order_delivery_man_rate}
                    </Text>
                  </View>
                  <Text style={styles.deliveryManJob}></Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                style={[
                  styles.button,
                  {backgroundColor: defaultTheme.whiteGray},
                ]}
                onPress={() =>
                  Linking.openURL(
                    `tel:${this.state.order_details.order_delivery_man_number}`,
                  )
                }>
                <Icon
                  name="phone"
                  size={SIZES.smallIconSize}
                  color={defaultTheme.icon}
                />
                <Text
                  style={[
                    styles.deliveryBtnLabel,
                    {color: defaultTheme.text2},
                  ]}>
                  اتصال
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                style={[
                  styles.button,
                  {backgroundColor: defaultTheme.whiteGray},
                ]}
                onPress={() => this.updateDeliveryLocation()}>
                <Icon
                  name="location-arrow"
                  size={SIZES.smallIconSize}
                  color={defaultTheme.icon}
                />
                <Text
                  style={[
                    styles.deliveryBtnLabel,
                    {color: defaultTheme.text2},
                  ]}>
                  الموقع
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // key extractor
  keyExtractor = (item, index) => index.toString();

  // render item
  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.orderItemContainer]}>
        <Text
          style={[
            styles.orderItemNameAndPrice,
            {color: defaultTheme.text2},
          ]}>{`${item.item_count}x ${item.item_name}`}</Text>
        <Text
          style={[styles.orderItemNameAndPrice, {color: defaultTheme.text2}]}>
          {item.item_price * item.item_count}
        </Text>
      </View>
    );
  };

  // total price
  totalPrice = () => {
    let totalPrice = 0;
    let orderItems = this.state.order_details.order_items;

    for (let i = 0; i < orderItems.length; i++) {
      totalPrice += orderItems[i].item_price * orderItems[i].item_count;
    }

    return totalPrice;
  };

  // handle bottom sheet show
  handleShowBS = async () => {
    if (!this.state.isBSOpend) {
      RNAnimated.timing(this.state.valueAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      await this.bottomSheetRef.current.snapTo(0);
      this.setState({isBSOpend: true});
    } else {
      RNAnimated.timing(this.state.valueAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      await this.bottomSheetRef.current.snapTo(1);
      this.setState({isBSOpend: false});
    }
  };

  // handle on bottom sheet start open //! Not Used
  handleOnOpenStart = () => {
    RNAnimated.timing(this.state.valueAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    this.setState({isBSOpend: true});
  };

  // handle on bottom sheet start close //! Not Used
  handleOnCloseStart = () => {
    RNAnimated.timing(this.state.valueAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    this.setState({isBSOpend: false});
  };

  // handle get directions on gogle maps
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.state.deliveryRegion.latitude,
        longitude: this.state.deliveryRegion.longitude,
      },
      destination: {
        latitude: this.state.homeRegion.latitude,
        longitude: this.state.homeRegion.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  // update the delivery location
  updateDeliveryLocation = async () => {
    RNAnimated.timing(this.state.valueAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    this.scrollViewRef.current.scrollTo({y: 0, animated: true}); // scroll bottom sheet content to top
    await this.bottomSheetRef.current.snapTo(1); // close bottom sheet
    this.setState({isBSOpend: false});
    this.mapRef.current.animateToRegion(this.state.deliveryRegion, 500); // animate to delivery location on the map
  };

  render() {
    // state
    const {homeRegion, home_address, restaurantRegion, restaurant_address} =
      this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <MapView
          style={styles.map}
          initialRegion={this.state.deliveryRegion}
          provider={PROVIDER_GOOGLE}
          ref={this.mapRef}
          // onPress={this.onMapPress}
          loadingEnabled={true}
          loadingIndicatorColor={defaultTheme.primary}>
          <Marker
            coordinate={homeRegion}
            // draggable
            pinColor={defaultTheme.primary}
            // onDragEnd={this.onDragEnd}
            ref={this.markerRef1}
            image={require('../../assets/images/home_image.png')}>
            <Callout onPress={this.handleGetDirections}>
              <Text style={[styles.calloutText, {color: defaultTheme.text2}]}>
                {home_address}
              </Text>
            </Callout>
          </Marker>
          <Marker
            coordinate={this.state.deliveryRegion}
            // draggable
            pinColor={defaultTheme.primary}
            // onDragEnd={this.onDragEnd}
            image={require('../../assets/images/delivery_image.png')}>
            <Callout onPress={this.handleGetDirections}>
              <Text style={[styles.calloutText, {color: defaultTheme.text2}]}>
                {this.state.delivery_address}
              </Text>
            </Callout>
          </Marker>
          <Marker
            coordinate={restaurantRegion}
            pinColor={defaultTheme.primary}
            image={require('../../assets/images/rest_image.png')}>
            <Callout>
              <Text style={[styles.calloutText, {color: defaultTheme.text2}]}>
                {restaurant_address}
              </Text>
            </Callout>
          </Marker>

          {/* <MapViewDirections
            origin={{
              latitude: this.state.restaurantRegion.latitude,
              longitude: this.state.restaurantRegion.longitude,
            }}
            destination={{
              latitude: this.state.homeRegion.latitude,
              longitude: this.state.homeRegion.longitude,
            }}
            apikey={ApiKey}
            strokeWidth={3}
            strokeColor={defaultTheme.primary}
          /> */}
        </MapView>
        <BottomSheet
          ref={this.bottomSheetRef}
          snapPoints={[height * 0.8, height * 0.2]}
          initialSnap={1}
          callbackNode={this.fall}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          // onOpenStart={this.handleOnOpenStart}
          // onCloseStart={this.handleOnCloseStart}
          // onOpenEnd={this.handleOnOpenStart}
          // onCloseEnd={this.handleOnCloseStart}
          enabledGestureInteraction={false}
          // enabledContentGestureInteraction={false}
          // enabledHeaderGestureInteraction={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bsHeaderContainer: {
    width,
    height: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: defaultTheme.gray,
    borderLeftWidth: 0.5,
    borderLeftColor: defaultTheme.gray,
    borderRightWidth: 0.5,
    borderRightColor: defaultTheme.gray,
  },
  bsHeaderTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bsHeaderText: {
    fontSize: SIZES.smallFontSize,
    fontFamily: FONTS.fontFamily,
    marginRight: PADDINGS.smallPadding,
  },
  bsContentContainer: {
    width,
    minHeight: height * 0.8 - 40,
    // elevation: 10,
  },
  timeAndLocationContainer: {
    width: '100%',
    // alignItems: 'center',
  },
  smallText: {
    fontSize: SIZES.smallFontSize,
    fontFamily: FONTS.fontFamily,
    textAlign: 'center',
  },
  largeText: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
    textAlign: 'center',
  },
  stepIndicatorContainer: {
    width: '100%',
    // backgroundColor: '#f00',
    marginVertical: PADDINGS.padding,
  },
  unFinishedStatus: {
    width: 5,
    height: 5,
    borderRadius: 5,
  },
  currentLabelStyle: {
    fontSize: SIZES.smallFontSize,
    fontFamily: FONTS.fontFamily,
    marginTop: PADDINGS.padding,
  },
  otherLabelStyle: {
    fontSize: SIZES.tinyFontSize,
    fontFamily: FONTS.fontFamily,
    marginTop: -PADDINGS.smallPadding,
  },
  orderDetailsContainer: {
    width: '100%',
    padding: PADDINGS.padding,
    borderRadius: 25,
    elevation: 4,
    marginBottom: PADDINGS.padding,
  },
  orderHeaderContainer: {
    flexDirection: 'row',
    marginBottom: PADDINGS.padding,
    alignItems: 'center',
  },
  restaurantLogoContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: PADDINGS.padding,
  },
  restaurantLogo: {
    width: 45,
    height: 45,
    // borderRadius: 20,
  },
  restaurantTitleAndDateContainer: {
    height: 53,
    justifyContent: 'space-evenly',
    // backgroundColor: '#f00',
  },
  restaurantTitle: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
  },
  orderDate: {
    fontSize: SIZES.tinyFontSize,
    fontFamily: FONTS.fontFamily,
  },
  orderItemsContainer: {
    width: '100%',
  },
  orderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: PADDINGS.smallPadding,
    alignItems: 'center',
  },
  orderItemNameAndPrice: {
    fontSize: SIZES.smallFontSize,
    fontFamily: FONTS.fontFamily,
  },
  seperator: {
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    marginBottom: PADDINGS.smallPadding,
  },
  callSupportBtn: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  supportBtnLabel: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
    marginLeft: PADDINGS.smallPadding,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: PADDINGS.padding,
    alignItems: 'center',
  },
  calloutText: {
    fontSize: SIZES.smallFontSize,
    fontFamily: FONTS.fontFamily,
  },
  deliveryDetailsContainer: {
    width: '100%',
    padding: PADDINGS.padding,
    borderRadius: 25,
    elevation: 4,
  },
  deliveryManInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: PADDINGS.padding,
  },
  deliveryManImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: PADDINGS.padding,
  },
  deliveryManName: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
  },
  deliveryManJob: {
    fontSize: SIZES.tinyFontSize,
    fontFamily: FONTS.fontFamily,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: (width - 4 * PADDINGS.padding) / 2 - PADDINGS.padding / 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  deliveryBtnLabel: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
    marginLeft: PADDINGS.smallPadding,
  },
  deliveryRate: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'flex-start',
  },
  rateNumber: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
    marginLeft: PADDINGS.smallPadding,
  },
});

export default OrderDetailsScreen;
