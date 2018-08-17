import React from 'react'
import { StyleSheet, View } from 'react-native'

import Amount from './Amount'

import { colors } from '../resources/theme'
import { formatNum } from '../resources/formatNum'

const styles = StyleSheet.create({
  container: {
    marginTop: 48
  },
  seperator: {
    marginTop: 8,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: colors.teal['200'],
    borderRadius: 2,
    opacity: .5
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
        amountDKK={numAmount*exchangeRate}
      />
      <Amount 
        label="Tip"
        amount={tip} 
        amountDKK={tip*exchangeRate}
      />
      <View style={styles.seperator} />
      <Amount 
        label="Total" 
        amount={total} 
        amountDKK={total*exchangeRate}
      />
    </View>
  )
}

export default Amounts
