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
})

class App extends Component {
  constructor(props) {
    super(props)

    this.setAmount = amount => {
      this.setState({ amount })
    }

    this.state = {
      amount: null,
      setAmount: this.setAmount,
      exchangeRate: 6.5
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
