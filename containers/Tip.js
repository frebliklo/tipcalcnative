import React, { Component } from 'react'
import { NativeModules, LayoutAnimation, StyleSheet, View } from 'react-native'
import { Query } from 'react-apollo'

import { Context } from '../App'
import GET_CURRENCY from '../queries/get-currency'

import Amount from '../components/Amount'
import Input from '../components/Input'
import FetchAlert from '../components/FetchAlert'
import Loading from '../components/Loading'
import ScrollWrapper from '../components/ScrollWrapper'
import Seperator from '../components/Seperator'
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

  setErrorState = () => {
    this.setState(() => ({ queryHandled: true }))
  }

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
          this.setErrorState()
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

        this.setErrorState()
        LayoutAnimation.configureNext(CustomAnimationConfig)
        return null
      }}
    </Query>
  )
  
  renderAmounts = amount => {
    const { tipPercent } = this.state
    const tipAmount = parseFloat(amount)*tipPercent
    const totalAmount = parseFloat(amount)+tipAmount

    return (
      <View style={styles.amountContainer}>
        <View style={{ marginTop: 48 }}>
          <Amount label="Amount" amount={amount} />
          <Amount label="Tip" amount={tipAmount} />
          <Seperator />
          <Amount label="Total" amount={totalAmount} />
        </View>
        <TipSlider
          value={tipPercent}
          onValueChange={this.handleValueChange}
          tipPercent={formatNum(tipPercent*100)}
        />
      </View>
    )
  }

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
