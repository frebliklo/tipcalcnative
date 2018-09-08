import React, { Component } from 'react'
import { NativeModules, LayoutAnimation, StyleSheet, View } from 'react-native'
import { Query } from 'react-apollo'

import { Context } from '../App'
import GET_CURRENCY from '../queries/get-currency'

import Input from '../components/Input'
import Amounts from '../components/Amounts'
import FetchAlert from '../components/FetchAlert'
import Loading from '../components/Loading'
import ScrollWrapper from '../components/ScrollWrapper'
import TipSlider from '../components/TipSlider'

import { animation } from '../resources/theme'
import { formatNum } from '../resources/formatNum'

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

const styles = StyleSheet.create({
  amountContainer: {
    justifyContent: 'space-between',
    width: '100%'
  }
})

class Tip extends Component {
  state = {
    tipPercent: 0.18,
    queryHandled: false
  }

  handleValueChange = num => {
    const value = formatNum(num)
    this.setState({ tipPercent: value })
  }

  renderAmounts = (amount, exchangeRate) => (
    <View style={styles.amountContainer}>
      <Amounts 
        amount={amount}
        exchangeRate={exchangeRate}
        tipPercent={this.state.tipPercent}
      />
      <TipSlider
        value={this.state.tipPercent}
        onValueChange={this.handleValueChange}
        tipPercent={formatNum(this.state.tipPercent*100)}
      />
    </View>
  )

  handleQuery = (base, secondary, updateCurrency) =>  (
    <Query 
      query={GET_CURRENCY}
      variables={{ base, secondary }}
    >
      {({ loading, error, data }) => {
        if(loading) {
          LayoutAnimation.configureNext(CustomAnimationConfig)
          return <Loading>Getting latest currency...</Loading>
        }
        if(error) {
          this.setState(() => ({ queryHandled: true }))
          return <FetchAlert err={error} />
        }
        console.log(data)
        const { currency } = data
        const { exchangeRate } = currency

        updateCurrency({ 
          base: currency.source,
          secondary: exchangeRate.currency,
          exchangeRate: exchangeRate.rate
        })
        this.setState(() => ({ queryHandled: true }))
        LayoutAnimation.configureNext(CustomAnimationConfig)
        return null
      }}
    </Query>
  )
  
  render() {
    const { queryHandled } = this.state

    return (
      <ScrollWrapper>
        <Context.Consumer>
          {({ amount, setAmount, currency, updateCurrency }) => {
            const { base, secondary, exchangeRate } = currency
            
            return(
              <View>
                <Input
                  value={amount}
                  onChangeText={e => {
                    LayoutAnimation.configureNext(CustomAnimationConfig)
                    setAmount(e)
                  }}
                />
                {amount ? this.renderAmounts(amount, exchangeRate) : null}
                {!queryHandled ? this.handleQuery(base, secondary, updateCurrency) : null}
              </View>
            )
          }}
        </Context.Consumer>
      </ScrollWrapper>
    )
  }
}

export default Tip
