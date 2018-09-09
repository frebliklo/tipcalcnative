import { gql } from 'apollo-boost'

const GET_SECONDARY_CURRENCIES = gql`
  query getSecondaryCurrencies($base: String!){
    currency(source: $base) {
      rates {
        currency
        name
        rate
      }
    }
  }
`

export default GET_SECONDARY_CURRENCIES
