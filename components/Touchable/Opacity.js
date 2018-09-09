import { Platform, TouchableOpacity } from 'react-native'

import AndroidWrapper from './AndroidWrapper'

export default Platform.select({
  ios: () => TouchableOpacity,
  android: () => AndroidWrapper
})()
