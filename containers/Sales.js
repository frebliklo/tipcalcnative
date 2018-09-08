import React, { Component } from 'react'
import { NativeModules, LayoutAnimation, View } from 'react-native'

import { Context } from '../App'

import Amount from '../components/Amount'
import Input from '../components/Input'
import Seperator from '../components/Seperator'
import ScrollWrapper from '../components/ScrollWrapper'

import { animation } from '../resources/theme'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

  const springAnimationProperties = {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: animation.springDamping
  }
  
  const CustomAnimationConfig = {
    duration: animation.springDuraion,
    create: springAnimationProperties,
    update: springAnimationProperties,
    delete: springAnimationProperties
  }

class Sales extends Component {
  state = {
    salesTax: .08
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
    return (
      <ScrollWrapper>
        <Context.Consumer>
          {({ amount, setAmount, currency }) => {
            const { base, secondary, exchangeRate } = currency
            
            return (
              <View>
                <Input
                  value={amount}
                  onChangeText={e => {
                    LayoutAnimation.configureNext(CustomAnimationConfig)
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
