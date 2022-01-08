import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SIZES, PADDING} from '../../constants/Constants';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-paper';
import GeneralButton from '../../components/GeneralButton';
const {width, height} = Dimensions.get('screen');
const {largeFont} = SIZES.largeFontSize;
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <ScrollView>
        {/* View container */}
        <View style={styles.container}>
          {/* View 1 */}
          <View style={styles.view1}>
            <Text style={styles.textTitle}>تسجيل الدخول</Text>
          </View>
          {/* View 2 */}
          <View style={styles.view2}>
            <View style={styles.textInputsView}>
              <TextInput
                style={styles.textInputStyle}
                label={'البريد الالكتروني'}
                selectionColor="#ffcbb8"
                underlineColor="#000"
                activeUnderlineColor="#fb6e3b"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  label={'الرقم السري'}
                  selectionColor="#ffcbb8"
                  underlineColor="#000"
                  activeUnderlineColor="#fb6e3b"
                  secureTextEntry
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: height * 0.009,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: -width * 0.022,
                    }}>
                    <Checkbox
                      color="#fb6e3b"
                      status={this.state.checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({checked: !this.state.checked});
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Tajawal',
                        fontSize: SIZES.smallFontSize,
                      }}>
                      تذكرني؟
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Text style={styles.textPass}>نسيت كلمة المرور؟</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <GeneralButton
              width={width * 0.5}
              height={height * 0.07}
              title="تسجيل"
              BGcolor="#fb6e3b"
              textColor="#ffffff"
              textSize={SIZES.mediumFontSize}
              haveBorder={false}
            />
            <View
              style={{
                alignItems: 'center',
                marginVertical: height * 0.06,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: SIZES.smallFontSize,
                  marginHorizontal: width * 0.01,
                  alignItems: 'center',
                  fontFamily: 'Tajawal',
                }}>
                ليس لديك حساب؟
              </Text>
              <TouchableOpacity>
                <Text style={styles.textPass2}>إنشاء حساب</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconsStyle}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: width * 0.08,
                  height: height * 0.036,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: height * 0.03,
                  backgroundColor: '#4064ac',
                }}>
                <Icon name="facebook" size={height * 0.024} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.iconView}>
                <Image
                  source={require('../../assets/images/google.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.iconView}>
                <Icon name="twitter" size={height * 0.03} color={'#5da9dd'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.95,
    backgroundColor: '#fb6e3b',
    justifyContent: 'flex-end',
  },
  view1: {
    width: width,
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    width: width,
    height: height * 0.7,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: SIZES.largeFontSize,
    color: '#ffffff',
    fontFamily: 'Tajawal',
  },
  textTitle2: {
    fontSize: SIZES.mediumFontSize,
    color: '#ffffff',
    fontFamily: 'Tajawal',
  },
  textInputsView: {
    width: width * 0.9,
    height: height * 0.27,
    backgroundColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: height * 0.06,
    borderRadius: 10,
  },
  textInputStyle: {
    width: width * 0.75,
    height: height * 0.065,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textInput: {
    width: width * 0.75,
    height: height * 0.06,
    marginHorizontal: 5,
  },
  checkBoxStyle: {
    width: width * 0.8,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginBT: {
    width: width * 0.5,
    paddingVertical: height * 0.01,
    backgroundColor: '#fb6e3b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  viewText: {
    marginVertical: height * 0.02,
    marginBottom: height * 0.08,
  },
  textPass: {
    fontSize: SIZES.smallFontSize,
    color: '#fb6e3b',
    fontFamily: 'Tajawal',
  },
  textPass2: {
    fontSize: SIZES.smallFontSize,
    color: '#fb6e3b',
    fontFamily: 'Tajawal',
  },
  iconsStyle: {
    width: width * 0.35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconView: {
    width: width * 0.1,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height * 0.03,
  },
});
export default Login;
