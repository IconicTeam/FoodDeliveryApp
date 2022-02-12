import React, {Component, useEffect, useMemo, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  LogBox,
} from 'react-native';

// bottom tabs
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import RestaurantsScreen from '../../screens/home/RestaurantsScreen';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';
import CartScreen from '../../screens/cart/CartScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// constants
import {SIZES} from '../../constants/Constants';
import {defaultTheme} from '../../constants/Theme';

// svg
import Svg, {Path} from 'react-native-svg';

// dimensions
const {width, height} = Dimensions.get('screen');

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({
  accessibilityState,
  children,
  onPress,
  accessibilityLabel,
}) => {
  var selected = accessibilityState.selected;
  var route = accessibilityLabel.slice(0, accessibilityLabel.indexOf(','));
  const scalAnim = useRef(new Animated.Value(0)).current;

  console.log(route);

  useEffect(() => {
    if (selected) {
      Animated.spring(scalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selected]);

  // && route != 'CartScreen'
  if (selected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: defaultTheme.white}} />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              fill={defaultTheme.white}
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: defaultTheme.white}} />
        </View>

        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.tabBarButton,
              {
                backgroundColor: defaultTheme.white,
                top: -(height * 0.065) / 2 + 2.5,
                transform: [{scale: scalAnim}],
              },
            ]}>
            {children}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: defaultTheme.white,
          flex: 1,
          height: height * 0.075,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

class BottomTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            ...styles.bttomTabsContainer,
          },
        }}>
        <Tab.Screen
          name="RestaurantsScreen"
          component={RestaurantsScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="silverware-clean"
                size={SIZES.mediumIconSize + 3}
                color={focused ? defaultTheme.primary : defaultTheme.gray}
              />
            ),
            tabBarButton: props => <TabBarCustomButton {...props} />,
          }}
        />
        <Tab.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="heart"
                size={SIZES.mediumIconSize + 3}
                color={focused ? defaultTheme.primary : defaultTheme.gray}
              />
            ),
            tabBarButton: props => <TabBarCustomButton {...props} />,
          }}
        />
        <Tab.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="shopping"
                size={SIZES.mediumIconSize + 3}
                color={focused ? defaultTheme.primary : defaultTheme.gray}
              />
            ),
            tabBarButton: props => <TabBarCustomButton {...props} />,
            // tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="account"
                size={SIZES.mediumIconSize + 3}
                color={focused ? defaultTheme.primary : defaultTheme.gray}
              />
            ),
            tabBarButton: props => <TabBarCustomButton {...props} />,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bttomTabsContainer: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    height: height * 0.075,
  },
  tabBarButton: {
    width: height * 0.065,
    height: height * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (height * 0.065) / 2,
  },
});

export default BottomTabs;
