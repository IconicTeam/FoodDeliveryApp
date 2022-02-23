import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import React, {Component} from 'react';

import GeneralButton from '../../../components/GeneralButton';
import {SIZES, PADDINGS} from '../../../constants/Constants';
import {defaultTheme} from '../../../constants/Theme';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');

class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      newPass: '',
      conNewPass: '',
    };
  }
  render() {
    return (
      <View style={[styles.container, {backgroundColor: defaultTheme.white}]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={styles.view1}>
            <View
              style={{
                width: width,
                height: height * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assets/images/confirm.png')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
            <View style={styles.view2}>
              <Text style={styles.text1}>انشاء رقم سري جديد ؟</Text>
              <Text style={styles.text2}>
                يجب ان يكون الرقم السري الجديد مختلف عن المستخدم سابقا
              </Text>
            </View>
            <View style={styles.view3}>
              <View style={{marginBottom: PADDINGS.padding}}>
                <TextInput
                  value={this.state.newPass}
                  onChangeText={value => {
                    this.setState({newPass: value});
                  }}
                  style={[styles.textInputStyle]}
                  label={' الرقم السري الجديد '}
                  selectionColor="#ffcbb8"
                  underlineColor="#000"
                  activeUnderlineColor="#fb6e3b"
                  secureTextEntry
                />
                {this.state.newPass.length == 0 ? null : (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Tajawal',
                      color: this.state.newPass.length < 8 ? 'red' : 'green',
                    }}>
                    {this.state.newPass.length < 8 ? (
                      <Text>لابد ان يحتوي الرقم السري على الاقل 8 حروف</Text>
                    ) : (
                      <Text>الرقم السري يطابق الشروط</Text>
                    )}
                  </Text>
                )}
              </View>
              <View>
                <TextInput
                  onChangeText={value => {
                    this.setState({conNewPass: value});
                  }}
                  style={styles.textInputStyle}
                  label={' تأكيد الرقم السري '}
                  selectionColor="#ffcbb8"
                  underlineColor="#000"
                  activeUnderlineColor="#fb6e3b"
                  secureTextEntry
                />
                {this.state.conNewPass.length == 0 ? null : this.state
                    .conNewPass != this.state.newPass ? (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Tajawal',
                      color: 'red',
                    }}>
                    الرقم السري غير متطابق
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Tajawal',
                      color: 'green',
                    }}>
                    الرقم السري متطابق
                  </Text>
                )}
              </View>
            </View>
            <GeneralButton
              // width={width * 0.5}
              // height={height * 0.065}
              title="تأكيد"
              BGcolor="#fb6e3b"
              textColor="#ffffff"
              textSize={SIZES.mediumFontSize}
              haveBorder={false}
              otherStyles={{
                marginBottom: PADDINGS.padding,
              }}
            />
          </View>
        </ScrollView>

        {/* Back Button */}
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
            left: 0,
            top: 0,
          }}
          onPress={() => this.props.navigation.goBack()}>
          <FontAwesome5 name="chevron-right" size={SIZES.mediumIconSize} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: PADDINGS.padding,
  },
  view2: {
    alignItems: 'center',
  },
  text1: {
    fontSize: SIZES.largeFontSize,
    color: '#000',
    fontFamily: 'Tajawal',
    marginBottom: PADDINGS.smallPadding,
  },
  text2: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: 'Tajawal',
    textAlign: 'center',
  },
  view3: {
    width: width * 0.9,
    backgroundColor: '#eee',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    marginVertical: height * 0.06,
    borderRadius: 10,
    padding: PADDINGS.padding,
  },
  textInputStyle: {
    width: '100%',
    height: height * 0.065,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default NewPassword;
