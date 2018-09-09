import { gql } from 'apollo-boost'

export const GET_LOCAL_STATE_ITP = gql`
  query getLocalStateTip{
    input @client {
      value
    }
    gratuity @client {
      percent
    }
    currencyLocal @client {
      base
      secondary
      exchangeRate
    }
  }
`

export const GET_LOCAL_STATE_SALES = gql`
  query getLocalStateSales{
    input @client {
      value
    }
    salesTax @client {
      average
    }
  }
`

export const GET_LOCAL_CURRENCY = gql`
  query getLocalCurrency{
    currencyLocal @client {
      base
      secondary
      exchangeRate
    }
  }
`
