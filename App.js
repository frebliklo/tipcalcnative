import React from 'react'
import { NativeModules, LayoutAnimation, StyleSheet, Text, View } from 'react-native'

import Amounts from './components/Amounts'
import Input from './components/Input'
import ScrollWrapper from './components/ScrollWrapper'
import TipSlider from './components/TipSlider'

import { formatNum } from './utils/formatNum'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const springAnimationProperties = {
  type: 'spring',
  springDamping: 0.4,
  property: 'opacity',
}

const animationConfig = {
  duration: 1000,
  create: springAnimationProperties,
  update: springAnimationProperties,
  delete: springAnimationProperties,
}

const styles = StyleSheet.create({
  amountContainer: {
    justifyContent: 'space-between',
    width: '100%'
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: null,
      tipPercent: 0.18,
      exchangeRate: 6.37 
    }
  }

  onChangeText = num => {
    LayoutAnimation.configureNext(animationConfig)
    this.setState({ amount: formatNum(num) })
  }

  onValueChange = num => {
    const value = formatNum(num)
    this.setState({ tipPercent: value })
  }

  renderAmounts = () => {
    const { amount, tipPercent, exchangeRate } = this.state

    if(amount) {
      return (
        <View style={styles.amountContainer}>
          <Amounts
            amount={amount} 
            tipPercent={tipPercent}
            exchangeRate={exchangeRate}
          />
          <TipSlider 
            value={tipPercent} 
            onValueChange={this.onValueChange}
            tipPercent={formatNum(tipPercent*100)}
          />
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <ScrollWrapper>
        <Input onChangeText={this.onChangeText} />
        {this.renderAmounts()}
      </ScrollWrapper>
    )
  }
}

export default App
