import React from 'react'
import { StyleSheet, View } from 'react-native'

import Amount from './Amount'

import { colors } from '../constants/theme'
import { formatNum } from '../utils/formatNum'

const styles = StyleSheet.create({
  container: {
    marginTop: 48
  },
  seperator: {
    marginTop: 8,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 2,
    opacity: .15
  }
})

const Amounts = ({ amount, tipPercent, exchangeRate }) => {
  const numAmount = formatNum(amount)
  const tip = formatNum(amount*tipPercent)
  const total = formatNum(numAmount+tip)
  
  return (
    <View style={styles.container}>
      <Amount 
        label="Amount"
        amount={numAmount} 
        amountDKK={formatNum(numAmount*exchangeRate)} 
      />
      <Amount 
        label="Tip"
        amount={tip} 
        amountDKK={formatNum(tip*exchangeRate)} 
      />
      <View style={styles.seperator} />
      <Amount 
        label="Total" 
        amount={total} 
        amountDKK={formatNum(total*exchangeRate)} 
      />
    </View>
  )
}

export default Amounts
