import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  textInput: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 8,
    width: '100%',
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: .3
  }
})

const InputAmount = ({ onChangeText }) => (
  <TextInput 
    style={styles.textInput}
    placeholder="Input amount"
    placeholderTextColor="rgba(0,0,0,.6)"
    keyboardType="numeric"
    maxLength={6}
    clearButtonMode="never"
    underlineColorAndroid="rgba(0,0,0,0)"
    autoCorrect={false}
    onChangeText={onChangeText}
  />
)

export default InputAmount
