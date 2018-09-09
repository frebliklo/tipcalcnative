import { createStackNavigator } from 'react-navigation'

import EditCurrency from '../containers/EditCurrency'
import Settings from '../containers/Settings'

export default createStackNavigator(
  {
    Settings,
    EditCurrency: {
      screen: EditCurrency,
      navigationOptions: () => ({
        title: 'Edit Currency',
        gesturesEnabled: true
      })
    }
  },
  {
    initialRouteName: 'Settings',
    headerMode: 'none'
  }
)
