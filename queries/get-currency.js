import { gql } from 'apollo-boost'

const GET_CURRENCY = gql`
  query getCurrency($base: String!, $secondary: String!){
    currency(source: $base) {
      source
      exchangeRate(currency: $secondary) {
        currency
        rate
      }
    }
  }
`

export default GET_CURRENCY
