import React from 'react'
import { StyleSheet, View } from 'react-native'

import Amount from './Amount'

import { formatNum } from '../utils/formatNum'

const styles = StyleSheet.create({
  container: {
    marginTop: 48
  },
  seperator: {
    marginTop: 8,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2,
    opacity: .15
  }
})

const Amounts = ({ amount, tipPercent }) => {
  const numAmount = formatNum(amount)
  const tip = formatNum(amount*tipPercent)
  const total = formatNum(numAmount+tip)
  
  return (
    <View style={styles.container}>
      <Amount label="Amount" amount={numAmount} />
      <Amount label="Tip" amount={tip} />
      <View style={styles.seperator} />
      <Amount label="Total" amount={total} />
    </View>
  )
}

export default Amounts