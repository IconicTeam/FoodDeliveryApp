import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';

import {defaultTheme} from '../../constants/Theme';

import {ApiKey, FONTS, PADDINGS, SIZES} from '../../constants/Constants';
import {TextInput} from 'react-native-paper';

import GeneralButton from '../../components/GeneralButton';

const {width, height} = Dimensions.get('screen');

class ChangeAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 30.9399,
        longitude: 30.8176,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      address: '',
    };

    // map ref
    this.mapRef = React.createRef(null);
    // marker erf
    this.markerRef = React.createRef(null);
  }

  // get current position //! not used here
  // getCurrentPosition = async () => {
  //   this.setState({mapLoading: true});
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   );

  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     console.log('You can use the ACCESS_FINE_LOCATION');
  //     Geolocation.getCurrentPosition(info => {
  //       console.log('info: ', info);
  //       this.setState({
  //         location: {
  //           ...this.state.location,
  //           latitude: info.coords.latitude,
  //           longitude: info.coords.longitude,
  //         },
  //       });
  //       this.getAddress(info.coords.latitude, info.coords.longitude);
  //     });
  //     this.setState({
  //       mapLoading: false,
  //       modalVisible: !this.state.modalVisible,
  //     });
  //   } else {
  //     console.log('ACCESS_FINE_LOCATION permission denied');
  //   }
  // };

  // on marker drag end
  onDragEnd = e => {
    this.setState(
      {
        location: {
          ...this.state.location,
          ...e.nativeEvent.coordinate,
        },
      },
      () => {
        this.getAddress(
          this.state.location.latitude,
          this.state.location.longitude,
        );
        this.mapRef.current.animateToRegion(this.state.location, 500);
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
        location: {
          ...this.state.location,
          ...e.nativeEvent.coordinate,
        },
      },
      () => {
        this.getAddress(
          this.state.location.latitude,
          this.state.location.longitude,
        );
        setTimeout(() => {
          this.mapRef.current.animateToRegion(this.state.location, 500);
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
    this.setState({address: address});
    // setTimeout(() => {
    //   console.log(this.state.address);
    // }, 5);
  };

  // update address
  updateAddress = address => {
    // update address in database (use this function later when use backend)
    alert('تم حفظ العنوان الجديد: ' + address);
    console.log(height);
  };

  render() {
    const {location, address} = this.state;

    return (
      <View style={[styles.container, {backgroundColor: defaultTheme.white}]}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <MapView
            style={styles.map}
            initialRegion={location}
            provider={PROVIDER_GOOGLE}
            ref={this.mapRef}
            onPress={this.onMapPress}
            loadingEnabled={true}
            loadingIndicatorColor={defaultTheme.primary}
            onMapLoaded={() => {
              this.getAddress(
                this.state.location.latitude,
                this.state.location.longitude,
              );
            }}>
            <Marker
              coordinate={location}
              draggable
              pinColor={defaultTheme.primary}
              onDragEnd={this.onDragEnd}
              ref={this.markerRef}
              title={this.state.address}>
              {/* <Callout>
                <Text style={[styles.calloutText, {color: defaultTheme.text2}]}>
                  {this.state.address}
                </Text>
              </Callout> */}
            </Marker>
          </MapView>
          {/* bottom section */}
          <View
            style={[
              styles.bottomSection,
              {backgroundColor: defaultTheme.white},
            ]}>
            <Text
              style={[styles.bottomSectionTitle, {color: defaultTheme.text2}]}>
              تعديل العنوان
            </Text>
            <View
              style={[
                styles.textInputsContainer,
                {backgroundColor: defaultTheme.whiteGray},
              ]}>
              <TextInput
                // editable={false}
                autoCorrect={false}
                style={[
                  styles.textInputStyle,
                  {
                    backgroundColor: defaultTheme.card,
                  },
                ]}
                label={'العنوان الجديد'}
                value={address}
                onChangeText={value => {
                  this.setState({address: value});
                }}
                selectionColor={defaultTheme.selectionColor}
                underlineColor={defaultTheme.black}
                activeUnderlineColor={defaultTheme.primary}
                // multiline
              />
            </View>

            {/* update location button */}
            <GeneralButton
              // width={width * 0.5}
              // height={height * 0.065}
              title="حفظ العنوان"
              BGcolor={defaultTheme.primary}
              textColor={defaultTheme.white}
              textSize={SIZES.mediumFontSize}
              haveBorder={false}
              onPress={() => this.updateAddress(address)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height: height < 500 ? height * 0.6 : height * 0.7,
  },
  bottomSection: {
    width,
    height: height < 500 ? height * 0.4 : height * 0.3,
    padding: PADDINGS.padding,
    elevation: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInputStyle: {
    width: '100%',
    height: 55,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'right',
    // paddingRight: PADDINGS.largePadding,
  },
  textInputsContainer: {
    width: '100%',
    padding: PADDINGS.padding,
    // justifyContent: 'space-evenly',
    borderRadius: 10,
    // marginVertical: PADDINGS.padding,
  },
  bottomSectionTitle: {
    fontSize: SIZES.mediumFontSize,
    fontFamily: FONTS.fontFamily,
    // alignSelf: 'flex-start',
  },
});

export default ChangeAddressScreen;
