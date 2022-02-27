import * as React from 'react';
import {
  Text,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SIZES, PADDINGS, FONTS} from '../../../constants/Constants';
import {defaultTheme} from '../../../constants/Theme';
import {TextInput} from 'react-native-paper';
import GeneralButton from '../../../components/GeneralButton';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: '',
      sendCodeLoading: false,
    };
  }

  validateEmail = email => {
    var em =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(email.trim());
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: defaultTheme.white,
          paddingHorizontal: PADDINGS.padding,
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={defaultTheme.white}
        />
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'} // to press on button while textinput is focus
        >
          <View
            style={{
              height: height / 3,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginBottom: PADDINGS.padding,
              marginTop: height * 0.07,
            }}>
            <Image
              source={require('../../../assets/images/email.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
            />
          </View>
          <View style={{width: '100%', marginVertical: PADDINGS.largePadding}}>
            <Text
              style={{
                fontSize: SIZES.largeFontSize,
                fontFamily: 'Tajawal',
                color: defaultTheme.text2,
                textAlign: 'center',
                marginBottom: PADDINGS.smallPadding,
              }}>
              هل نسيت كلمه المرور
            </Text>

            <Text
              style={{
                fontSize: SIZES.mediumFontSize,
                fontFamily: 'Tajawal',
                textAlign: 'center',
                color: defaultTheme.gray,
              }}>
              الرجاء ادخال البريد الالكترونى الخاص بك لارسال كود التاكيد
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              padding: PADDINGS.largePadding,
              backgroundColor: defaultTheme.whiteGray,
              borderRadius: 10,
              marginVertical: PADDINGS.padding,
            }}>
            <TextInput
              label="البريد الالكترونى"
              value={this.state.email}
              onChangeText={value => {
                this.setState({
                  email: value,
                });

                if (this.validateEmail(value)) {
                  this.setState({emailError: ''});
                }
              }}
              underlineColor={defaultTheme.gray}
              activeUnderlineColor={defaultTheme.primary}
              selectionColor={defaultTheme.selectionColor}
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                backgroundColor: defaultTheme.white,
                width: '100%',
                borderRadius: 5,
                fontFamily: 'Tajawal',
                overflow: 'hidden',
                height: height * 0.065,
              }}
            />

            {this.state.emailError.length > 0 && (
              <Text
                style={{
                  fontSize: SIZES.smallFontSize,
                  color: defaultTheme.error,
                  fontFamily: FONTS.fontFamily,
                  marginTop: 4,
                }}>
                {this.state.emailError}
              </Text>
            )}
          </View>
          <GeneralButton
            disabled={this.state.email != '' ? false : true}
            title={'إرسال'}
            BGcolor={
              this.state.email != '' ? defaultTheme.primary : defaultTheme.gray
            }
            // width={width * 0.5}
            // height={height * 0.065}
            textColor={defaultTheme.white}
            textSize={SIZES.mediumFontSize}
            haveBorder={false}
            onPress={() => {
              this.setState({sendCodeLoading: true});

              let emailError = this.state.emailError;
              let email = this.state.email;
              if (email.length > 70) {
                emailError = 'البريد الإليكتروني يجب ألا يزيد عن 70 حرف ورقم';
              } else {
                if (!this.validateEmail(email)) {
                  // not a valid email

                  emailError = 'أدخل بريد إليكتروني صالح';
                } else {
                  // valid email
                  emailError = '';
                  // alert(' تم ارسال كود التاكيد');
                  console.log('تم ارسال كود التاكيد');
                  Linking.openURL(`mailto:${this.state.email}?subject:Test`);
                  this.props.navigation.navigate('OneTimePassword');
                }
              }

              this.setState({
                emailError: emailError,
                sendCodeLoading: false,
              });
            }}
            otherStyles={{
              alignSelf: 'center',
              marginBottom: PADDINGS.padding,
            }}
          />
        </ScrollView>

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
            position: 'absolute',
            margin: PADDINGS.padding,
          }}
          onPress={() => this.props.navigation.goBack()}>
          <FontAwesome5 name="chevron-right" size={SIZES.mediumIconSize} />
        </TouchableOpacity>

        {/* loader */}
        {this.state.sendCodeLoading && (
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
