import React from 'react'
import { ActivityIndicator, NativeModules, NetInfo, LayoutAnimation, StyleSheet, Text, View } from 'react-native'

import Amounts from './components/Amounts'
import Input from './components/Input'
import Loading from './components/Loading'
import ScrollWrapper from './components/ScrollWrapper'
import TipSlider from './components/TipSlider'

import { fetchAlert } from './utils/alerts'
import { formatNum } from './utils/formatNum'

import { CURRENCY_LAYER_API_KEY } from './keys'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const springAnimationProperties = {
  type: LayoutAnimation.Types.spring,
  property: LayoutAnimation.Properties.opacity,
  springDamping: 0.85
}

const CustomAnimationConfig = {
  duration: 800,
  create: springAnimationProperties,
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.85
  },
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
      isLoading: true,
      amount: null,
      tipPercent: 0.18,
      exchangeRate: 6.55 
    }
  }

  componentDidMount() {
    const url = `http://www.apilayer.net/api/live?access_key=${CURRENCY_LAYER_API_KEY}&currencies=DKK`

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if(connectionInfo.type !== 'none') {
        return fetch(url)
          .then(response => response.json())
          .then(responseJson => {
            LayoutAnimation.configureNext(CustomAnimationConfig)
            this.setState({ isLoading: false, exchangeRate: responseJson.quotes.USDDKK })
          })
          .catch(err => {
            fetchAlert(err)
            this.this.setState({ isLoading: false })
          })
      } else {
        this.setState({ isLoading: false })
      }
    })
  }

  onChangeText = num => {
    LayoutAnimation.configureNext(CustomAnimationConfig)
    this.setState({ amount: formatNum(num) })
  }

  onValueChange = num => {
    const value = formatNum(num)
    this.setState({ tipPercent: value })
  }

  loadingIndicator = () => {
    if(this.state.isLoading === true) {
      return <Loading>Fetching exchange rate...</Loading>
    }
    return null
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
        {this.loadingIndicator()}
      </ScrollWrapper>
    )
  }
}

export default App
