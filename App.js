import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Asset } from 'expo'

import TabNavigator from './routes/TabNavigator'

import client from './client'

// Force expo to load assets (needed due to lazy-loading assets but in Expo SDK 29)
Asset

const App = () => (
  <ApolloProvider client={client}>
    <TabNavigator />
  </ApolloProvider>
)

export default App
