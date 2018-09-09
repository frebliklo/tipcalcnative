import React, { Component } from 'react'
import { LayoutAnimation, NativeModules, View } from 'react-native'
import { Query } from 'react-apollo'

import GET_CURRENCY from '../queries/get-currency'
import { GET_LOCAL_STATE_ITP } from '../queries/get-local-state'

import Amount from '../components/Amount'
import Input from '../components/Input'
import Loading from '../components/Loading'
import ScrollWrapper from '../components/ScrollWrapper'
import Seperator from '../components/Seperator'
import TipSlider from '../components/TipSlider'

import { CustomAnimationConfig } from '../resources/theme'
import { formatNum } from '../resources/formatNum'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

class Tip extends Component {
  static navigationOptions = {
    title: 'Tip'
  }

  state = {
    amountsShown: false
  }

  handleValueChange = (num, client) => {
    if(!num || num.match(/^\d{1,}(\.\d{0,2})?$/)) {
      client.writeData({
        data: { input: { value: num, __typename: 'InputValue' } }
      })
    }
  }

  renderAmounts = (amount, gratuity, currencyLocal) => {
    const { percent } = gratuity
    const { base, secondary } = currencyLocal
    
    const tipAmount = parseFloat(amount)*percent
    const totalAmount = parseFloat(amount)+tipAmount

    return (
      <Query query={GET_CURRENCY} variables={{ base, secondary }}>
        {({ loading, error, data, client }) => {
          if(loading) {
            LayoutAnimation.configureNext(CustomAnimationConfig)
            return <Loading>Getting latest exchange rate...</Loading>
          }
          const { rate } = data.currency.exchangeRate

          client.writeData({
            data: { currencyLocal: { exchangeRate: rate, __typename: 'CurrencyLocal' } }
          })

          if(!amount) {
            return null
          }
          
          return (
            <View style={{ justifyContent: 'space-between', width: '100%' }}>
              <View style={{ marginTop: 48 }}>
                <Amount label="Amount" amount={amount} />
                <Amount label="Tip" amount={tipAmount} />
                <Seperator />
                <Amount label="Total" amount={totalAmount} />
              </View>
              <TipSlider
                value={percent}
                onValueChange={e => {
                  const percent = e.toFixed(2)
                  client.writeData({
                    data: { gratuity: { percent, __typename: 'GratuityPercent' } }
                  })
                }}
                tipPercent={formatNum(percent*100)}
              />
            </View>
          )
        }}
      </Query>
    )
  }

  render() {
    let amountsShown = false

    return (
      <ScrollWrapper title="Tip">
        <Query query={GET_LOCAL_STATE_ITP}>
          {({ loading, error, data, client }) => {
            const { input, gratuity, currencyLocal } = data

            return (
              <View style={{ paddingHorizontal: 32 }}>
                <Input
                  value={input.value}
                  onChangeText={e => {
                    if(!e && !amountsShown) {
                      LayoutAnimation.configureNext(CustomAnimationConfig)
                      amountsShown = false
                    } else if(e && !amountsShown) {
                      LayoutAnimation.configureNext(CustomAnimationConfig)
                      amountsShown = true
                    } else if(!e && amountsShown) {
                      LayoutAnimation.configureNext(CustomAnimationConfig)
                      amountsShown = false
                    } else {
                      amountsShown = true
                    }
                    this.handleValueChange(e, client)
                  }}
                />
                {this.renderAmounts(input.value, gratuity, currencyLocal)}
              </View>
            )
          }}
        </Query>
      </ScrollWrapper>
    )
  }
}

export default Tip
