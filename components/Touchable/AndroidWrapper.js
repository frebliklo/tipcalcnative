import React from 'react'
import { Platform, TouchableNativeFeedback, View } from 'react-native'

const AndroidWrapper = props => {
  const { style, children, useForeground, ...rest } = props
  const NativeFeedbackConfig = {}
  if (!!useForeground && Platform.Version >= 23) {
    NativeFeedbackConfig['useForeground'] = true
  }
  if (Platform.Version >= 21) {
    NativeFeedbackConfig['background'] = TouchableNativeFeedback.SelectableBackgroundBorderless()
  }
  return (
    <TouchableNativeFeedback {...NativeFeedbackConfig} {...rest}>
      <View style={style}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )
}

export default AndroidWrapper
