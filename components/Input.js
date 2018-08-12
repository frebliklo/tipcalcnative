import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  textInput: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    color: '#222',
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '100%',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: .3
  }
})

const InputAmount = ({ value, onChangeText }) => (
  <TextInput 
    value={value}
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