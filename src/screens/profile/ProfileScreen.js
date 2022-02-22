import React, { Component } from 'react';
import { AccessibilityInfo, StatusBar } from 'react-native';
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
  PermissionsAndroid,
  Pressable,
} from 'react-native';

// import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import GeneralButton from '../../components/GeneralButton';

import { SIZES, PADDINGS, FONTS } from '../../constants/Constants';
import { defaultTheme, darkTheme } from '../../constants/Theme';

import ImagePicker from 'react-native-image-crop-picker';

import RBSheet from 'react-native-raw-bottom-sheet';

const { width, height } = Dimensions.get('screen');
export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_uri: '',
      // categories
      catogires: [
        {
          id: 1,
          name: 'طلباتي',
          icon1: 'chevron-left',
          icon2: 'motorcycle',
          screen: 'OrdersScreen'
        },
        {
          id: 2,
          name: 'اعدادات الحساب',
          icon1: 'chevron-left',
          icon2: 'user',
          screen: ''
        },
        {
          id: 3,
          name: 'الدفع',
          icon1: 'chevron-left',
          icon2: 'credit-card',
          screen: ''
        },
        // {
        //   id: 4,
        //   name: 'الإشعارات',
        //   icon1: 'chevron-left',
        //   icon2: 'bell',
        // },
        // {
        //   id: 5,
        //   name: 'الإشعارات',
        //   icon1: 'chevron-left',
        //   icon2: 'bell',
        // },
        // {
        //   id: 6,
        //   name: 'الإشعارات',
        //   icon1: 'chevron-left',
        //   icon2: 'bell',
        // },
        // {
        //   id: 7,
        //   name: 'الإشعارات',
        //   icon1: 'chevron-left',
        //   icon2: 'bell',
        // },
        // {
        //   id: 8,
        //   name: 'الإشعارات',
        //   icon1: 'chevron-left',
        //   icon2: 'bell',
        // },
      ],
      tabs: [
        {
          id: 1,
          name: 'utensils',
          press: true,
        },
        {
          id: 2,
          name: 'heart',
          press: true,
        },
        {
          id: 3,
          name: 'shopping-bag',
          press: true,
        },
        {
          id: 4,
          name: 'user',
          press: true,
        },
      ],

      // user image
      user_image: '',
    };

    // bottom sheet ref
    this.RBSheetRef = React.createRef(null);
  }

  changecolortabs(index) {
    let list = this.state.tabs;
    if (list[index].press == false) {
      for (let i = 0; i < list.length; i++) {
        list[i].press = true;
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        if (index == i) {
          list[i].press = false;
        } else {
          list[i].press = true;
        }
      }
    }
    this.setState({ tabs: list });
  }

  // request camera permission
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Take a photo
  takePhoto = () => {
    ImagePicker.openCamera({
      // width: 300,
      // height: 300,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
      cropperStatusBarColor: defaultTheme.black,
      cropperActiveWidgetColor: defaultTheme.primary,
      cropperToolbarTitle: 'تعديل الصىورة',
      cropperToolbarColor: defaultTheme.background,
      cropperToolbarWidgetColor: defaultTheme.text2,
    })
      .then(image => {
        // console.log(image);
        this.setState({ user_image: image.path });

        // close action sheet
        this.RBSheetRef.current.close();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // select photo from gallery
  selectFromGallery = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
      cropperStatusBarColor: defaultTheme.black,
      cropperActiveWidgetColor: defaultTheme.primary,
      cropperToolbarTitle: 'تعديل الصىورة',
      cropperToolbarColor: defaultTheme.background,
      cropperToolbarWidgetColor: defaultTheme.text2,
    })
      .then(image => {
        // console.log(image);
        this.setState({ user_image: image.path });

        // close action sheet
        this.RBSheetRef.current.close();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // delete user photo
  deletePhoto = () => {
    this.setState({ user_image: '' });

    // close action sheet
    this.RBSheetRef.current.close();
  };

  render() {
    return (
      <View style={styles.view_continer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={defaultTheme.primary}
        />
        <View style={styles.view1}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={[
              styles.touchableopicty1,
              { backgroundColor: defaultTheme.white },
            ]}>
            <FontAwesome5
              name="sign-out-alt"
              size={SIZES.smallIconSize}
              color={defaultTheme.icon}
            />
          </TouchableOpacity>
          <Pressable
            android_ripple={{
              radius: (width * 0.4) / 2,
              color: '#ddd',
              foreground: true,
            }}
            style={[
              styles.imageContainer,
              { backgroundColor: defaultTheme.white },
            ]}
            onPress={() => this.RBSheetRef.current.open()}>
            {this.state.user_image === '' ? (
              <FontAwesome5
                name="camera"
                size={SIZES.largeIconSize}
                color={defaultTheme.gray}
              />
            ) : (
              <>
                <Image
                  source={{ uri: this.state.user_image }}
                  // resizeMode="cover"
                  style={styles.selectedUserImage}
                />
                <FontAwesome5
                  style={{ position: 'absolute' }}
                  name="camera"
                  size={SIZES.mediumIconSize}
                  color={`${defaultTheme.white}40`}
                />
              </>
            )}
          </Pressable>
          <Text style={[styles.text1, { color: defaultTheme.white }]}>
            Youssef Mohamed
          </Text>
        </View>
        <View
          style={[styles.view2, { backgroundColor: defaultTheme.background }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: PADDINGS.padding }}>
            {this.state.catogires.map((catogery, index) => (
              <TouchableOpacity
                style={styles.view3}
                key={index}
                activeOpacity={0.4}
                onPress={() => this.props.navigation.navigate(catogery.screen)}
              >
                <View
                  style={[
                    styles.touchableopicty2,
                    { backgroundColor: defaultTheme.whiteGray },
                  ]}>
                  <FontAwesome5
                    name={catogery.icon2}
                    size={SIZES.smallFontSize}
                    color={defaultTheme.icon}
                  />
                </View>
                <View
                  style={[
                    styles.view4,
                    {
                      borderBottomColor: '#ccc',
                    },
                  ]}>
                  <Text style={[styles.text3, { color: defaultTheme.text2 }]}>
                    {catogery.name}
                  </Text>
                  <FontAwesome5
                    name={catogery.icon1}
                    size={SIZES.smallIconSize}
                    color={defaultTheme.gray}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* <View style={styles.view5}>
          {this.state.tabs.map((tab, index) => (
            <TouchableOpacity
              onPress={() => {
                this.changecolortabs(index);
              }}
              key={index}>
              <FontAwesome5
                name={tab.name}
                size={SIZES.mediumIconSize}
                color={tab.press ? defaultTheme.gray : defaultTheme.primary}
              />
            </TouchableOpacity>
          ))}
        </View> */}

        {/* bottom sheet */}
        <RBSheet
          ref={this.RBSheetRef}
          height={SIZES.bottomSheetHeight}
          animationType="fade"
          closeOnDragDown
          closeOnPressMask
          closeOnPressBack
          openDuration={700}
          closeDuration={700}
          dragFromTopOnly
          customStyles={{
            draggableIcon: {
              backgroundColor: defaultTheme.gray,
            },
            container: {
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              backgroundColor: defaultTheme.card,
              elevation: 1,
            },
          }}>
          <View style={styles.RBSheetContentContainer}>
            <View style={styles.RBSheetTitleView}>
              <Text style={{ ...styles.RBSheetTitle, color: defaultTheme.text2 }}>
                تحميل صورة
              </Text>
              <Text
                style={[styles.RBSheetSubTitle, { color: defaultTheme.gray }]}>
                قم باختيار الصورة الشخصية
              </Text>
            </View>
            <View style={styles.RBSheetBtnsView}>
              <TouchableOpacity
                activeOpacity={0.4}
                style={{
                  ...styles.RBSheetBtn,
                  backgroundColor: defaultTheme.primary,
                }}
                onPress={this.takePhoto}>
                <Text
                  style={{
                    ...styles.RBSheetBtnText,
                    color: defaultTheme.background,
                  }}>
                  التقاط صورة
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.4}
                style={{
                  ...styles.RBSheetBtn,
                  backgroundColor: defaultTheme.primary,
                  marginTop: PADDINGS.smallPadding,
                }}
                onPress={this.selectFromGallery}>
                <Text
                  style={{
                    ...styles.RBSheetBtnText,
                    color: defaultTheme.background,
                  }}>
                  اختيار من المعرض
                </Text>
              </TouchableOpacity>
              {this.state.user_image !== '' && (
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={{
                    ...styles.RBSheetBtn,
                    backgroundColor: defaultTheme.primary,
                    marginTop: PADDINGS.smallPadding,
                  }}
                  onPress={this.deletePhoto}>
                  <Text
                    style={{
                      ...styles.RBSheetBtnText,
                      color: defaultTheme.background,
                    }}>
                    مسح الصورة
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => this.RBSheetRef.current.close()}
                style={{
                  ...styles.RBSheetBtn,
                  backgroundColor: defaultTheme.primary,
                  marginTop: PADDINGS.smallPadding,
                }}>
                <Text
                  style={{
                    ...styles.RBSheetBtnText,
                    color: defaultTheme.background,
                  }}>
                  إلغاء
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view_continer: {
    flex: 1,
    backgroundColor: defaultTheme.primary,
  },
  touchableopicty1: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  view1: {
    alignItems: 'center',
    padding: PADDINGS.padding,
  },
  image1: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: 'center',
    borderColor: defaultTheme.primary,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: PADDINGS.padding,
  },
  text1: {
    fontSize: SIZES.largeFontSize,
    fontFamily: FONTS.fontFamily,
  },
  view2: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  view3: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchableopicty2: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // elevation: 0.3,
    marginRight: PADDINGS.padding,
  },
  view4: {
    width: width - 3 * PADDINGS.padding - 40,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  text2: {
    fontSize: SIZES.mediumFontSize,
    color: '#000',
    fontFamily: 'Tajawal',
    marginLeft: 5,
  },
  text3: {
    fontSize: 15,
    fontFamily: 'Tajawal',
  },
  view5: {
    width: width,
    height: height * 0.1,
    padding: PADDINGS.padding,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  RBSheetContentContainer: {
    height: SIZES.bottomSheetHeight - PADDINGS.padding,
    width: width,
  },
  RBSheetTitleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  RBSheetTitle: {
    fontSize: SIZES.largeFontSize,
    fontFamily: FONTS.fontFamily,
  },
  RBSheetBtnsView: {
    flex: 4.5,
    // justifyContent: 'space-around',
    paddingHorizontal: PADDINGS.padding,
    justifyContent: 'center',
    // backgroundColor: '#f00',
  },
  RBSheetBtn: {
    width: '100%',
    height: SIZES.buttonsHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  RBSheetBtnText: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
  },
  defaultUserImage: {
    width: width * 0.25,
    height: width * 0.25,
  },
  selectedUserImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
  },
  RBSheetSubTitle: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
  },
  imageContainer: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: PADDINGS.padding,
  },
});
