import { Platform, TouchableHighlight } from 'react-native'

import AndroidWrapper from './AndroidWrapper'

export default Platform.select({
  ios: () => TouchableHighlight,
  android: () => AndroidWrapper
})()
