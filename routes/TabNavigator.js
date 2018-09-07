import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

import Tip from '../containers/Tip'
import Sales from '../containers/Sales'
import Settings from '../containers/Settings'

import tipIcon from '../resources/assets/icons/tab-icon--tip.png'
import salesIcon from '../resources/assets/icons/tab-icon--sales.png'
import settingsIcon from '../resources/assets/icons/tab-icon--settings.png'

import { colors } from '../resources/theme'

export default createBottomTabNavigator(
  {
    Tip,
    Sales,
    Settings
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if(routeName === 'Tip') {
          iconName = tipIcon
        } else if(routeName === 'Sales') {
          iconName = salesIcon
        } else if(routeName === 'Settings') {
          iconName = settingsIcon
        }
        return <Image style={{ width: 28, height: 28, tintColor, marginBottom: 4 }} source={iconName} />
      }
    }),
    tabBarOptions: {
      allowFontScaling: true,
      activeBackgroundColor: 'rgba(0,0,0,.05)',
      activeTintColor: colors.cyan['000'],
      inactiveTintColor: colors.indigo['300'],
      pressColor: colors.cyan['000'],
      labelStyle: {
        fontSize: 14
      },
      style: {
        backgroundColor: colors.primary
      }
    }
  }
)