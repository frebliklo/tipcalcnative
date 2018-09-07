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
    isLoading: true,
    amount: null,
    tipPercent: 0.18,
    exchangeRate: 6.55
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if(connectionInfo.type !== 'none') {
        return fetch()
          .then(response => response.json())
          .then(responseJson => {
            const dkk = responseJson.currency.rates.find(rate => {
              return rate.currency === 'DKK'
            })

            LayoutAnimation.configureNext(CustomAnimationConfig)
            this.setState({ isLoading: false, exchangeRate: dkk.rate })
          })
          .catch(err => {
            fetchAlert(err)
            this.setState({ isLoading: false })
          })
      }
      return this.setState({ isLoading: false })
    })
  }

  handleChangeText = num => {
    LayoutAnimation.configureNext(CustomAnimationConfig)
    this.setState({ amount: formatNum(num) })
  }

  handleValueChange = num => {
    const value = formatNum(num)
    this.setState({ tipPercent: value })
  }

  renderLoading = () => {
    if(this.state.isLoading) {
      return <Loading>Getting latest exhange rate...</Loading>
    }
    return null
  }

  renderAmounts = () => {
    const { amount, exchangeRate, tipPercent } = this.state
    
    if(amount) (
      <View style={styles.amountContainer}>
        <Amounts 
          exchangeRate={exchangeRate}
          tipPercent={tipPercent}
          amount={amount}
        />
        <TipSlider
          value={tipPercent}
          onValueChange={this.handleValueChange}
          tipPercent={formatNum(tipPercent*100)}
        />
      </View>
    )
    return null
  }
  
  render() {
    return (
      <ScrollWrapper>
        <Input onChangeText={this.handleChangeText} />
        {this.renderAmounts()}
        {this.renderLoading()}
      </ScrollWrapper>
    )
  }
}

export default Tip
