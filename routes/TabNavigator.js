import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

import Tip from '../containers/Tip'
import Sales from '../containers/Sales'

import SettingsNavigator from '../routes/SettingsNavigator'

import { colors } from '../resources/theme'

export default createBottomTabNavigator(
  {
    Tip,
    Sales,
    Settings: SettingsNavigator
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if(routeName === 'Tip') {
          iconName = require('../assets/icons/tab-icon--tip.png')
        } else if(routeName === 'Sales') {
          iconName = require('../assets/icons/tab-icon--sales.png')
        } else if(routeName === 'Settings') {
          iconName = require('../assets/icons/tab-icon--settings.png')
        }
        return <Image style={{ width: 28, height: 28, tintColor, paddingVertical: 6 }} source={iconName} />
      }
    }),
    tabBarOptions: {
      allowFontScaling: true,
      activeBackgroundColor: 'rgba(0,0,0,.05)',
      activeTintColor: colors.cyan['000'],
      inactiveTintColor: colors.indigo['300'],
      pressColor: colors.cyan['800'],
      labelStyle: {
        fontSize: 14
      },
      style: {
        backgroundColor: colors.primary,
      }
    }
  }
)
