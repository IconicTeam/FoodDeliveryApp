import React, {Component} from 'react';
import {AccessibilityInfo} from 'react-native';
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
} from 'react-native';
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GeneralButton from '../../../components/GeneralButton';

import {SIZES, PADDINGS} from '../../../constants/Constants';
import {defaultTheme, darkTheme} from '../../../constants/Theme';

const {width, height} = Dimensions.get('screen');

export default class OneTimePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Verify_code1: '',
      Verify_code2: '',
      Verify_code3: '',
      Verify_code4: '',
      pressIn: true,
      count: 0,
    };
  }

  componentDidMount = () => {
    this.refs.Verify_code1ref.focus;
  };

  completetextinput() {
    let pin1 = this.state.Verify_code1;
    let pin2 = this.state.Verify_code2;
    let pin3 = this.state.Verify_code3;
    let pin4 = this.state.Verify_code4;
    let press = this.state.pressIn;
    if (
      pin1.length == 1 &&
      pin2.length == 1 &&
      pin3.length == 1 &&
      pin4.length == 1
    ) {
      press = false;
    }
    this.setState({
      Verify_code1: pin1,
      Verify_code2: pin2,
      Verify_code3: pin3,
      Verify_code4: pin4,
      pressIn: press,
    });
  }
  render() {
    return (
      <View style={styles.viewcontiner}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            paddingHorizontal: PADDINGS.padding,
          }}
          keyboardShouldPersistTaps={'handled'}>
          {/* <TouchableOpacity style={styles.touchableopicty1}>
            <FontAwesome5
              name="chevron-right"
              color={'#000'}
              size={SIZES.mediumIconSize}
            />
          </TouchableOpacity> */}
          <View style={styles.view2}>
            <Image
              source={require('../../../assets/images/confirm1.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.view3}>
            <Text style={styles.textstyle1}>قم بتأكيد البريد الإلكتروني</Text>
            <Text style={styles.textstyle5}>
              الرجاء إدخال الرمز المكون من 4 أرقام المرسل إلي رقم الهاتف
            </Text>
          </View>
          <View style={styles.view4}>
            <TextInput
              style={styles.textInput}
              ref={'Verify_code1ref'}
              keyboardType="number-pad"
              maxLength={1}
              value={this.state.Verify_code1}
              onChangeText={value => {
                this.setState({Verify_code1: value});
                if (value != '') {
                  this.refs.Verify_code2ref.focus();
                } else {
                }
              }}
            />
            <TextInput
              style={styles.textInput}
              ref={'Verify_code2ref'}
              keyboardType="number-pad"
              maxLength={1}
              value={this.state.Verify_code2}
              onChangeText={value => {
                this.setState({Verify_code2: value});
                if (value != '') {
                  this.refs.Verify_code3ref.focus();
                } else {
                  this.refs.Verify_code1ref.focus();
                }
              }}
            />
            <TextInput
              style={styles.textInput}
              ref={'Verify_code3ref'}
              keyboardType="number-pad"
              maxLength={1}
              value={this.state.Verify_code3}
              onChangeText={value => {
                this.setState({
                  Verify_code3: value,
                });
                if (value != '') {
                  this.refs.Verify_code4ref.focus();
                } else {
                  this.refs.Verify_code2ref.focus();
                }
              }}
            />
            <TextInput
              style={styles.textInput}
              ref={'Verify_code4ref'}
              keyboardType="number-pad"
              maxLength={1}
              value={this.state.Verify_code4}
              onChangeText={value => {
                this.setState({Verify_code4: value});
                if (value != '') {
                  this.setState({pressIn: false});
                } else {
                  this.refs.Verify_code3ref.focus();
                  this.setState({pressIn: true});
                }
              }}
            />
          </View>
          <View style={styles.view5}>
            <Text style={styles.textstyle2}>ألم تستلم الرمز؟</Text>
            <TouchableOpacity>
              <Text style={styles.textstyle3}>أعد إرسال الرمز</Text>
            </TouchableOpacity>
          </View>
          <GeneralButton
            disabled={this.state.pressIn ? true : false}
            // width={width * 0.5}
            // height={height * 0.065}
            title="تأكيد"
            BGcolor={this.state.pressIn ? '#ccc' : '#fb6e3b'}
            textColor="#ffffff"
            textSize={SIZES.mediumFontSize}
            haveBorder={false}
            otherStyles={{
              marginVertical: PADDINGS.padding,
              alignSelf: 'center',
            }}
            onPress={() => this.props.navigation.navigate('NewPassword')}
          />
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
  viewcontiner: {
    flex: 1,
    backgroundColor: defaultTheme.white,
  },
  touchableopicty1: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    elevation: 3,
    borderRadius: 5,
  },
  view1: {
    width: width * 0.9,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textstyle1: {
    fontSize: SIZES.largeFontSize,
    color: '#000',
    fontFamily: 'Tajawal',
    textAlign: 'center',
  },
  view2: {
    width: width,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: PADDINGS.padding,
    marginTop: height * 0.07,
  },
  view3: {
    width: '100%',
    marginVertical: PADDINGS.largePadding,
  },
  textstyle5: {
    fontSize: SIZES.mediumFontSize,
    color: 'gray',
    fontFamily: 'Tajawal',
    textAlign: 'center',
  },
  view4: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginVertical: PADDINGS.largePadding,
  },
  textInput: {
    width: width * 0.15,
    height: height * 0.07,
    backgroundColor: '#eee',
    borderColor: defaultTheme.border,
    borderRadius: 5,
    textAlign: 'center',
  },
  view5: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textstyle2: {
    fontSize: SIZES.mediumFontSize,
    color: '#000',
    fontFamily: 'Tajawal',
    marginVertical: 10,
    marginRight: 3,
  },
  textstyle3: {
    fontSize: SIZES.mediumFontSize,
    color: defaultTheme.primary,
    fontFamily: 'Tajawal',
    marginVertical: 10,
  },
});
