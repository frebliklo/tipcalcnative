import { gql } from 'apollo-boost'

const GET_BASE_CURRENCIES = gql`
  query getBaseCurrencies($secondary: String!){
    currencies {
      source
      name
      exchangeRate(currency: $secondary) {
        rate
      }
    }
  }
`

export default GET_BASE_CURRENCIES
