import React, { Component } from 'react'
import { NativeModules, LayoutAnimation, View } from 'react-native'

import { Context } from '../App'

import Amount from '../components/Amount'
import Input from '../components/Input'
import Seperator from '../components/Seperator'
import ScrollWrapper from '../components/ScrollWrapper'

import { CustomAnimationConfig } from '../resources/theme'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

class Sales extends Component {
  static navigationOptions = {
    title: 'Sales'
  }

  state = {
    salesTax: .08,
    amountsShown: false
  }
  
  renderAmounts = amount => {
    const { salesTax } = this.state
    const taxAmount = parseFloat(amount)*salesTax
    const totalAmount = parseFloat(amount)+taxAmount

    return (
      <View style={{ 
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 48
      }}>
        <Amount label="Amount" amount={amount} />
        <Amount label="Tax" amount={taxAmount} />
        <Seperator />
        <Amount label="Total" amount={totalAmount} />
      </View>
    )
  }
  
  render() {
    const { amountsShown } = this.state

    return (
      <ScrollWrapper title="Sales">
        <Context.Consumer>
          {({ amount, setAmount, currency }) => {
            const { base, secondary, exchangeRate } = currency
            
            return (
              <View style={{ paddingHorizontal: 32 }}>
                <Input
                  value={amount}
                  onChangeText={e => {
                    if(!e) {
                      LayoutAnimation.configureNext(CustomAnimationConfig)
                      this.setState({ amountsShown: false })
                    } else {
                      this.setState({ amountsShown: true })
                    }
                    if(!amountsShown) { LayoutAnimation.configureNext(CustomAnimationConfig) }
                    setAmount(e)
                  }}
                />
                {amount ? this.renderAmounts(amount, exchangeRate) : null}
              </View>
            )
          }}
        </Context.Consumer>
      </ScrollWrapper>
    )
  }
}

export default Sales
