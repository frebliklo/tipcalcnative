import { gql } from 'apollo-boost'

const GET_LOCATION = gql`
  query getLocation($lat: String, $lng: String, $address: String){
    address(lat: $lat, lng: $lng, address: $address) {
    formattedAddress
      country {
        shortName
        longName
      }
      state {
        shortName
        longName
      }
      salesTax {
        average
      }
    }
  }
`

export default GET_LOCATION
