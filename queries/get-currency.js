import { gql } from 'apollo-boost'

const GET_CURRENCY = gql`
  query getCurrency{
    currency(source:"usd") {
      source
      exchangeRate(currency:"dkk") {
        currency
        rate
      }
    }
  }
`

export default GET_CURRENCY
