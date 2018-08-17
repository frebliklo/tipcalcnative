import { Alert, BackHandler } from 'react-native'

export const fetchAlert = err => {
  return Alert.alert(
    'Problem fetching',
    'Could not fetch fresh exchange rate;\n\n' + err + '\n\nThe fallback exchange rate still works, so you\'ll still get a rough estimate.',
    [
      { text: 'That sucks...', onPress: () => null, style: 'cancel' }
    ],
  )
}

export const backHandlerAlert = callback => {
  return Alert.alert(
    'Exit app',
    'Finished calculating? Do you want to exit the app?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', onPress: () => BackHandler.exitApp() }
    ]
  )
}
