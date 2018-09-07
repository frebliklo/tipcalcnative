import React, { Component } from 'react'
import { NativeModules, NetInfo, LayoutAnimation, StyleSheet, View } from 'react-native'

import Input from '../components/Input'
import Amounts from '../components/Amounts'
import Loading from '../components/Loading'
import ScrollWrapper from '../components/ScrollWrapper'
import TipSlider from '../components/TipSlider'

import { animation } from '../resources/theme'
import { usdExhangeRateEndpoint } from '../resources/constants'
import { fetchAlert } from '../resources/alerts'
import { formatNum } from '../resources/formatNum'
import { Context } from '../App';

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
    tipPercent: 0.18
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
  
  render() {
    return (
      <ScrollWrapper>
        <Context.Consumer>
          {({ amount, setAmount, currency }) => (
            <View>
              <Input
                value={amount}
                onChangeText={e => {
                  LayoutAnimation.configureNext(CustomAnimationConfig)
                  setAmount(e)
                }}
              />
              {amount ? this.renderAmounts(amount,currency.exchangeRate) : null}
            </View>
          )}
        </Context.Consumer>
      </ScrollWrapper>
    )
  }
}

export default Tip
