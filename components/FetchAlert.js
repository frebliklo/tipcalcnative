import React from 'react'
import { Alert } from 'react-native'

const FetchAlert = ({ err }) => {
  Alert.alert(
    'Problem fetching',
    'Could not fetch fresh exchange rate;\n\n' + err + '\n\nThe fallback exchange rate still works, so you\'ll still get a rough estimate.',
    [
      { text: 'OK', onPress: () => null, style: 'cancel' }
    ],
  )
  return null
}

export default FetchAlert
