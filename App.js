import React, { Component, createContext } from 'react'

import TabNavigator from './routes/TabNavigator'

export const Context = createContext({
  amount: null,
  setAmount: amount => amount,
  currency: {
    base: 'USD',
    secondary: 'DKK',
    exchangeRate: 6.5
  },
  updateCurrency: currency => currency,
})

class App extends Component {
  constructor(props) {
    super(props)

    this.setAmount = amount => {
      if(amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState({ amount })
      }
    }

    this.updateCurrency = update => {
      const updatedCurrency = { ...this.state.currency, ...update }
      this.setState({ currency: updatedCurrency })
    }

    this.state = {
      amount: null,
      setAmount: this.setAmount,
      currency: {
        base: 'USD',
        secondary: 'DKK',
        exchangeRate: 6.5
      },
      updateCurrency: this.updateCurrency
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <TabNavigator />
      </Context.Provider>
    )
  }
}

export default App
