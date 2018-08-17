import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 8
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline'
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.white
  },
  amount: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'right',
    color: colors.white
  },
  amountSecondary: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
    color: colors.white,
    opacity: .8,
    marginRight: 8
  }
})

const Amount = ({ label, amount, amountDKK }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.amountContainer}>
      <Text style={styles.amountSecondary}>{amountDKK.toFixed(2)} DKK</Text>
      <Text style={styles.amount}>$ {amount.toFixed(2)}</Text>
    </View>
  </View>
)

export default Amount
