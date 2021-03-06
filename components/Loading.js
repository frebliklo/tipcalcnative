import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.teal['100'],
    margin: 8
  }
})

const Loading = ({ children }) => (
  <View styles={styles.container}>
    <ActivityIndicator style={{ marginTop: 32 }} size="small" color={colors.fuschia['200']} />
    <Text style={styles.text}>{children}</Text>
  </View>
)

export default Loading
