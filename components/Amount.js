import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 8
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  amount: {
    fontSize: 24,
    color: '#FFFFFF'
  }
})

const Amount = ({ label, amount }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.amount}>$ {amount}</Text>
  </View>
)

export default Amount
