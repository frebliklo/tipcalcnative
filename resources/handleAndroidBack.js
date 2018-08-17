import { BackHandler } from 'react-native'

export const handleAndroidBack = callback => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback()
    return true
  })
}

export const removeHandleAndroidback = callback => {
  BackHandler.removeEventListener('hardwareBackPress', () => {})
}
