import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Query } from 'react-apollo'

import { GET_LOCAL_CURRENCY } from '../queries/get-local-state'

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

class Amount extends Component {
  formatCurrency = (currency, amount) => {
    let formattedCurrency

    switch (currency) {
      case 'GBP':
        formattedCurrency = `£ ${parseFloat(amount).toFixed(2)}`
        break
      case 'EUR':
        formattedCurrency = `€ ${parseFloat(amount).toFixed(2)}`
        break
      case 'DKK':
        formattedCurrency = `${parseFloat(amount).toFixed(2)} DKK`
        break
      default:
        formattedCurrency = `$ ${parseFloat(amount).toFixed(2)}`
        break
    }

    return formattedCurrency
  }
  
  renderAmount = (currency, amount, style) => {
    const content = this.formatCurrency(currency, amount)
    const amountStyle = style ? style : styles.amount

    return <Text style={amountStyle}>{content}</Text>
  }
  
  render() {
    const { label, amount } = this.props
    
    return (
      <Query query={GET_LOCAL_CURRENCY}>
        {({ loading, error, data }) => {
          const { base, secondary, exchangeRate } = data.currencyLocal
          const exchangeAmount = amount*exchangeRate

          return (
            <View style={styles.container}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.amountContainer}>
                {secondary 
                  ? this.renderAmount(secondary, exchangeAmount, styles.amountSecondary) 
                  : null
                }
                {this.renderAmount(base, amount)}
              </View>
            </View>
          )
        }}
      </Query>
    )
  }
}

export default Amount
