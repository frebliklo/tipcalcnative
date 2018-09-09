import ApolloClient, { InMemoryCache } from 'apollo-boost'

import { GRAPHQL_URI } from './constants'

const defaults = {
  input: {
    value: '',
    __typename: 'InputValue'
  },
  currencyLocal: {
    base: 'USD',
    secondary: 'DKK',
    exchangeRate: 6.5,
    __typename: 'CurrencyLocal'
  },
  gratuity: {
    percent: .18,
    __typename: 'GratuityPercent'
  },
  location: {
    lat: '',
    lng: '',
    address: '',
    __typename: 'Location'
  },
  salesTax: {
    average: .08,
    __typename: 'SalesTax'
  }
}

const resolvers = {
  Mutation: {
    updateInput: (_, params, { cache }) => {
      const data = {
        input: {
          value: '',
          __typename: 'InputValue'
        }
      }

      cache.writeData(({ data }))
      return null
    }
  }
}

const typeDefs = `
  type Input {
    value: Float!
  }
  type CurrencyLocal {
    base: String!
    secondary: String!
    exchangeRate: Float!
  }
  type Gratuity {
    percent: Float!
  }
  type Location {
    lat: String!
    lng: String!
    address: String!
  }
  type SalesTax {
    average: Float!
  }
  type Query {
    input: Input
    currencyLocal: CurrencyLocal
    gratuity: Gratuity
    location: Location
    salesTax: SalesTax
  }
`

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  clientState: {
    defaults,
    resolvers,
    typeDefs
  },
  cache: new InMemoryCache
})

export default client
