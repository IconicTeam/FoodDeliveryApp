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
} from 'react-native';

// Theme
import {defaultTheme} from '../../constants/Theme';
// Constants
import {ApiKey, FONTS, PADDINGS, SIZES} from '../../constants/Constants';
// react-native-paper
import {TextInput} from 'react-native-paper';
// Icons
import Icon from 'react-native-vector-icons/FontAwesome5';
// general button
import GeneralButton from '../../components/GeneralButton';
// maps & geolocation & geocoder
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// bottom sheet
import RBSheet from 'react-native-raw-bottom-sheet';
// images picker
import ImagePicker from 'react-native-image-crop-picker';
//activeOpacity
const activeOpacity = 0.4;
// Dimensions
const {width, height} = Dimensions.get('screen');

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_token: '',
      user_image: '',
      user_name: '',
      user_email: '',
      user_password: '',
      user_confirm_password: '',
      user_location: '',
      name_err: '',
      email_err: '',
      pass_err: '',
      confirm_pass_err: '',
      location_err: '',
      // visible_pass
      passSecureTextEntry: true,
      confirmPassSecureTextEntry: true,
      // current location
      initialRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      // current location error
      locError: null,
      // map modal
      modalVisible: false,
      // loading map
      mapLoading: false,
    };
    this.mapRef = React.createRef(null);
    this.markerRef = React.createRef(null);
    this.RBSheetRef = React.createRef(null);
  }

  componentDidMount() {
    // this.mapRef.current
    //   .addressForCoordinate(this.state.initialRegion)
    //   .then(address => {
    //     console.log(address);
    //   });
  }

  // show pass functions
  handleVisiblePass = () =>
    this.setState({passSecureTextEntry: !this.state.passSecureTextEntry});
  handleVisibleConfirmPass = () =>
    this.setState({
      confirmPassSecureTextEntry: !this.state.confirmPassSecureTextEntry,
    });

  // go to login screen
  goToSignupScreen = () => this.props.navigation.navigate('LoginScreen');

  // get current position
  getCurrentPosition = async () => {
    this.setState({mapLoading: true});
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the ACCESS_FINE_LOCATION');
      Geolocation.getCurrentPosition(info => {
        console.log('info: ', info);
        this.setState({
          initialRegion: {
            ...this.state.initialRegion,
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          },
        });
        this.getAddress(info.coords.latitude, info.coords.longitude);
      });
      this.setState({
        mapLoading: false,
        modalVisible: !this.state.modalVisible,
      });
    } else {
      console.log('ACCESS_FINE_LOCATION permission denied');
    }
  };

  // on marker drag end
  onDragEnd = e => {
    this.setState(
      {
        initialRegion: {
          ...this.state.initialRegion,
          ...e.nativeEvent.coordinate,
        },
      },
      () => {
        this.getAddress(
          this.state.initialRegion.latitude,
          this.state.initialRegion.longitude,
        );
        this.mapRef.current.animateToRegion(this.state.initialRegion, 500);
      },
    );
  };

  // on map press
  onMapPress = e => {
    this.markerRef.current.animateMarkerToCoordinate(
      e.nativeEvent.coordinate,
      500,
    );
    this.setState(
      {
        initialRegion: {
          ...this.state.initialRegion,
          ...e.nativeEvent.coordinate,
        },
      },
      () => {
        this.getAddress(
          this.state.initialRegion.latitude,
          this.state.initialRegion.longitude,
        );
        setTimeout(() => {
          this.mapRef.current.animateToRegion(this.state.initialRegion, 500);
        }, 500);
      },
    );
  };

  // get address
  getAddress = async (lat, lng) => {
    await Geocoder.fallbackToGoogle(ApiKey);
    let res = await Geocoder.geocodePosition({lat, lng});
    var address = '';
    if (res[0].streetName != null && res[0].streetName != 'Unnamed Road') {
      address = `${res[0].streetName}, ${res[0].locality}, ${res[0].country}`;
    } else {
      address = `${res[0].locality}, ${res[0].country}`;
    }
    this.setState({user_location: address});
    setTimeout(() => {
      console.log(this.state.user_location);
    }, 5);
  };

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
        this.setState({user_image: image.path});

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
        this.setState({user_image: image.path});

        // close action sheet
        this.RBSheetRef.current.close();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // delete user photo
  deletePhoto = () => {
    this.setState({user_image: ''});

    // close action sheet
    this.RBSheetRef.current.close();
  };

  // submit form
  submitUserData = () => {
    let email = this.state.user_email.trim(),
      password = this.state.user_password.trim(),
      confirmPassword = this.state.user_confirm_password.trim(),
      location = this.state.user_location,
      errors = 0;

    // eamil
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) == false) {
      this.setState({email_err: 'برجاء إدخال بريد الكترونى صحيح!'});
      errors++;
    } else {
      this.setState({email_err: '', user_email: email});
    }

    // password
    if (password.length < 6) {
      this.setState({pass_err: 'يجب تكون كلمة السر أكبر من أو تساوى 6 أحرف!'});
      errors++;
    } else {
      this.setState({pass_err: '', user_password: password});
    }

    // confirm password
    if (confirmPassword != password || confirmPassword.length == 0) {
      this.setState({
        confirm_pass_err: 'كلمة السر غير متطابقة!',
      });
      errors++;
    } else {
      this.setState({
        confirm_pass_err: '',
        user_confirm_password: confirmPassword,
      });
    }

    // signup
    if (errors == 0) {
      this.signup(email, password, confirmPassword);
    }
  };

  // signup
  signup = (name, email, pass, confirm_pass, location) => {
    alert(`${email}\n${pass}\n${confirm_pass}`);
  };

  onEndEditingEmail = value => {
    // eamil
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value.trim()) == false && value.trim().length != 0) {
      this.setState({email_err: 'برجاء إدخال بريد الكترونى صحيح!'});
    } else {
      this.setState({email_err: '', user_email: value});
    }
  };

  onEndEditingPass = value => {
    // password
    if (value.trim().length < 6 && value.trim().length != 0) {
      this.setState({pass_err: 'يجب تكون كلمة السر أكبر من أو تساوى 6 أحرف!'});
    } else {
      this.setState({pass_err: '', user_password: value});
    }
  };

  onEndEditingConfirmPass = value => {
    // confirm password
    if (value.trim() != this.state.user_password && value.trim().length != 0) {
      this.setState({
        confirm_pass_err: 'كلمة السر غير متطابقة!',
      });
    } else {
      this.setState({confirm_pass_err: '', user_confirm_password: value});
    }
  };

  render() {
    // Destructure State
    const {
      user_name,
      user_email,
      user_image,
      user_location,
      user_password,
      user_token,
      user_confirm_password,
      name_err,
      pass_err,
      email_err,
      confirm_pass_err,
      location_err,
      passSecureTextEntry,
      confirmPassSecureTextEntry,
      modalVisible,
      initialRegion,
      mapLoading,
    } = this.state;

    return (
      // Container
      <View style={[styles.container, {backgroundColor: defaultTheme.primary}]}>
        <ScrollView style={{flex: 1}}>
          {/* Header */}
          <View style={[styles.headerContainer, {}]}>
            <View>
              <Text style={[styles.headerText, {color: defaultTheme.white}]}>
                إنشاء حساب
              </Text>
            </View>
          </View>
          {/* Body */}
          <View
            style={[
              styles.bodyContainer,
              {backgroundColor: defaultTheme.white},
            ]}>
            {/* user image */}
            {/* <View
              style={[
                styles.imageContainer,
                {backgroundColor: defaultTheme.whiteGray},
              ]}> */}
            <Pressable
              android_ripple={{
                radius: (width * 0.3) / 2,
                color: '#ddd',
                foreground: true,
              }}
              style={[
                styles.imageContainer,
                {backgroundColor: defaultTheme.whiteGray},
              ]}
              onPress={() => this.RBSheetRef.current.open()}>
              {user_image === '' ? (
                <Icon
                  name="camera"
                  size={SIZES.largeIconSize}
                  color={defaultTheme.gray}
                />
              ) : (
                <>
                  <Image
                    source={{uri: user_image}}
                    // resizeMode="cover"
                    style={styles.selectedUserImage}
                  />
                  <Icon
                    style={{position: 'absolute'}}
                    name="camera"
                    size={SIZES.mediumIconSize}
                    color={`${defaultTheme.white}40`}
                  />
                </>
              )}
              {/* <Pressable
                android_ripple={{radius: 40 / 2, color: defaultTheme.ripple}}
                style={{
                  ...styles.cameraBtn,
                  backgroundColor: defaultTheme.whiteGray,
                }}
                onPress={() => this.RBSheetRef.current.open()}>
                <Icon
                  name="camera"
                  size={SIZES.smallIconSize}
                  color={defaultTheme.gray}
                />
              </Pressable> */}
            </Pressable>
            {/* TextInputs */}
            <View
              style={[
                styles.textInputsContainer,
                {backgroundColor: defaultTheme.whiteGray},
              ]}>
              {/* user name */}
              <View style={{marginBottom: PADDINGS.padding}}>
                <View style={[styles.textInputWithIcon]}>
                  <TextInput
                    maxLength={30}
                    style={[
                      styles.textInputStyle,
                      {
                        backgroundColor: defaultTheme.card,
                      },
                    ]}
                    label={'اسم المستخدم'}
                    value={user_name}
                    onChangeText={value => {
                      this.setState({user_name: value});
                    }}
                    selectionColor={defaultTheme.selectionColor}
                    underlineColor={defaultTheme.black}
                    activeUnderlineColor={defaultTheme.primary}
                    keyboardType="default"
                    autoCapitalize="words"
                    spellCheck={false}
                    autoCorrect={false}
                  />
                  <Text style={[styles.maxLength, {color: defaultTheme.gray}]}>
                    {30 - user_name.length}
                  </Text>
                </View>
                {name_err.length != 0 && (
                  <View style={[styles.errorContainer]}>
                    <Text style={[styles.errText, {color: defaultTheme.error}]}>
                      {name_err}
                    </Text>
                  </View>
                )}
              </View>
              {/* user email */}
              <View style={{marginBottom: PADDINGS.padding}}>
                {/* <View style={[styles.textInputWithIcon]}> */}
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {backgroundColor: defaultTheme.card, paddingRight: 0},
                  ]}
                  label={'البريد الالكترونى'}
                  value={user_email}
                  onChangeText={value => {
                    this.setState({user_email: value});
                  }}
                  selectionColor={defaultTheme.selectionColor}
                  underlineColor={defaultTheme.black}
                  activeUnderlineColor={defaultTheme.primary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  spellCheck={false}
                  autoCorrect={false}
                  onEndEditing={e => this.onEndEditingEmail(e.nativeEvent.text)}
                />
                {/* </View> */}
                {email_err.length != 0 && (
                  <View style={[styles.errorContainer]}>
                    <Text style={[styles.errText, {color: defaultTheme.error}]}>
                      {email_err}
                    </Text>
                  </View>
                )}
              </View>
              {/* password */}
              <View style={{marginBottom: PADDINGS.padding}}>
                <View style={[styles.textInputWithIcon]}>
                  <TextInput
                    secureTextEntry={passSecureTextEntry}
                    style={[
                      styles.textInputStyle,
                      {backgroundColor: defaultTheme.card},
                    ]}
                    label={'كلمة المرور'}
                    value={user_password}
                    onChangeText={value => {
                      this.setState({user_password: value});
                    }}
                    selectionColor={defaultTheme.selectionColor}
                    underlineColor={defaultTheme.black}
                    activeUnderlineColor={defaultTheme.primary}
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoCorrect={false}
                    onEndEditing={e =>
                      this.onEndEditingPass(e.nativeEvent.text)
                    }
                  />
                  <TouchableOpacity
                    style={[styles.showPassBtn]}
                    onPress={this.handleVisiblePass}>
                    <Icon
                      name={passSecureTextEntry ? 'eye-slash' : 'eye'}
                      size={SIZES.smallIconSize}
                      color={
                        passSecureTextEntry
                          ? defaultTheme.gray
                          : defaultTheme.primary
                      }
                    />
                  </TouchableOpacity>
                </View>
                {pass_err.length != 0 && (
                  <View style={[styles.errorContainer]}>
                    <Text style={[styles.errText, {color: defaultTheme.error}]}>
                      {pass_err}
                    </Text>
                  </View>
                )}
              </View>
              {/* confrim password */}
              <View style={{marginBottom: PADDINGS.padding}}>
                <View style={[styles.textInputWithIcon]}>
                  <TextInput
                    secureTextEntry={confirmPassSecureTextEntry}
                    style={[
                      styles.textInputStyle,
                      {backgroundColor: defaultTheme.card},
                    ]}
                    label={'تأكيد كلمة المرور'}
                    value={user_confirm_password}
                    onChangeText={value => {
                      this.setState({user_confirm_password: value});
                    }}
                    selectionColor={defaultTheme.selectionColor}
                    underlineColor={defaultTheme.black}
                    activeUnderlineColor={defaultTheme.primary}
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoCorrect={false}
                    onEndEditing={e =>
                      this.onEndEditingConfirmPass(e.nativeEvent.text)
                    }
                  />
                  <TouchableOpacity
                    style={[styles.showPassBtn]}
                    onPress={this.handleVisibleConfirmPass}>
                    <Icon
                      name={confirmPassSecureTextEntry ? 'eye-slash' : 'eye'}
                      size={SIZES.smallIconSize}
                      color={
                        confirmPassSecureTextEntry
                          ? defaultTheme.gray
                          : defaultTheme.primary
                      }
                    />
                  </TouchableOpacity>
                </View>
                {confirm_pass_err.length != 0 && (
                  <View style={[styles.errorContainer]}>
                    <Text style={[styles.errText, {color: defaultTheme.error}]}>
                      {confirm_pass_err}
                    </Text>
                  </View>
                )}
              </View>
              {/* location */}
              <View style={{marginBottom: PADDINGS.padding}}>
                <TouchableOpacity
                  style={[styles.textInputWithIcon]}
                  activeOpacity={activeOpacity}
                  onPress={() => this.getCurrentPosition()}>
                  <TextInput
                    editable={false}
                    style={[
                      // styles.textInputStyle,
                      {
                        backgroundColor: defaultTheme.card,
                        minHeight: height * 0.065,
                        width: '100%',
                      },
                    ]}
                    label={'العنوان الافتراضى'}
                    value={user_location}
                    onChangeText={value => {
                      this.setState({user_location: value});
                    }}
                    selectionColor={defaultTheme.selectionColor}
                    underlineColor={defaultTheme.black}
                    activeUnderlineColor={defaultTheme.primary}
                    multiline
                  />
                  <View style={[styles.locationBtn]}>
                    <Icon name={'map-marker-alt'} size={SIZES.smallIconSize} />
                  </View>
                </TouchableOpacity>
                {confirm_pass_err.length != 0 && (
                  <View style={[styles.errorContainer]}>
                    <Text style={[styles.errText, {color: defaultTheme.error}]}>
                      {location_err}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={[styles.signupBtnContainer]}>
              <GeneralButton
                width={width * 0.5}
                height={height * 0.065}
                title="إنشاء"
                BGcolor={defaultTheme.primary}
                textColor={defaultTheme.white}
                textSize={SIZES.mediumFontSize}
                haveBorder={false}
                onPress={() => this.submitUserData()}
              />
            </View>
            <View style={[styles.haveAccountContainer]}>
              <Text
                style={[
                  styles.doNotHaveAnAccountText,
                  {
                    color: defaultTheme.gray,
                  },
                ]}>
                لديك حساب بالفعل؟
              </Text>
              <TouchableOpacity
                onPress={this.goToSignupScreen}
                activeOpacity={activeOpacity}>
                <Text
                  style={[
                    styles.createAccountText,
                    {color: defaultTheme.primary},
                  ]}>
                  تسجيل الدخول
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

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
              <Text style={{...styles.RBSheetTitle, color: defaultTheme.text2}}>
                تحميل صورة
              </Text>
              <Text
                style={[styles.RBSheetSubTitle, {color: defaultTheme.gray}]}>
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
              {user_image !== '' && (
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

        {/* loader */}
        {mapLoading && (
          <View style={styles.loaderContainer}>
            <View
              style={[
                styles.loaderView,
                {backgroundColor: defaultTheme.white},
              ]}>
              <ActivityIndicator size="large" color={defaultTheme.primary} />
            </View>
          </View>
        )}

        {/* map modal */}
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: !modalVisible});
          }}>
          <View style={{flex: 1}}>
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              provider={PROVIDER_GOOGLE}
              ref={this.mapRef}
              onPress={this.onMapPress}>
              <Marker
                coordinate={initialRegion}
                draggable
                pinColor={defaultTheme.primary}
                onDragEnd={this.onDragEnd}
                ref={this.markerRef}
                title={this.state.user_location}>
                {/* <Callout>
                <Text style={[styles.calloutText, {color: defaultTheme.text2}]}>
                  {this.state.address}
                </Text>
              </Callout> */}
              </Marker>
            </MapView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.15,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    width,
    minHeight: height * 0.85 - StatusBar.currentHeight,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: PADDINGS.padding,
  },
  scrollViewContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: SIZES.largeFontSize,
    fontFamily: 'Tajawal',
  },
  textInputsContainer: {
    paddingHorizontal: PADDINGS.padding,
    paddingTop: PADDINGS.padding,
    justifyContent: 'space-evenly',
    borderRadius: 10,
    marginVertical: PADDINGS.padding,
  },
  textInputStyle: {
    width: '100%',
    height: height * 0.065,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'right',
    paddingRight: PADDINGS.largePadding,
  },
  errorContainer: {
    marginVertical: 2,
  },
  textInputWithIcon: {
    // height: height * 0.065,
    width: '100%',
    flexDirection: 'row',
  },
  maxLength: {
    fontSize: SIZES.smallFontSize,
    marginLeft: -PADDINGS.largePadding,
    marginTop: height * 0.033,
  },
  errText: {
    fontSize: SIZES.tinyFontSize,
    fontFamily: 'Tajawal',
  },
  showPassBtn: {
    padding: PADDINGS.smallPadding,
    marginLeft: -PADDINGS.padding * 2.5,
    // marginTop: height * 0.017,
    alignSelf: 'flex-end',
  },
  locationBtn: {
    padding: PADDINGS.smallPadding,
    marginLeft: -PADDINGS.padding * 2.27,
    // marginTop: height * 0.017,
    alignSelf: 'flex-end',
  },
  imageContainer: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cameraBtn: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 1.5,
  },
  signupBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: PADDINGS.padding,
  },
  haveAccountContainer: {
    marginBottom: PADDINGS.padding,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createAccountText: {
    fontSize: SIZES.smallFontSize,
    fontFamily: 'Tajawal',
  },
  doNotHaveAnAccountText: {
    fontSize: SIZES.smallFontSize,
    marginHorizontal: width * 0.01,
    fontFamily: 'Tajawal',
  },
  map: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0003',
  },
  loaderView: {
    width: height * 0.08,
    height: height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  calloutText: {
    fontSize: SIZES.smallFontSize,
    fontFamily: FONTS.fontFamily,
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
    width: width * 0.3,
    height: width * 0.3,
    // borderRadius: height / 2,
  },
  RBSheetSubTitle: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
  },
});

export default SignupScreen;
