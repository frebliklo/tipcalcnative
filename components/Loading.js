import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFF',
    margin: 8
  }
})

const Loading = ({ children }) => (
  <View styles={styles.container}>
    <ActivityIndicator style={{ marginTop: 32 }} size="small" color="#F5AF24" />
    <Text style={styles.text}>{children}</Text>
  </View>
)

export default Loading
