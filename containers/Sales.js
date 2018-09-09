import React, { Component } from 'react'
import { 
  NativeModules,
  LayoutAnimation,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Location, Permissions } from 'expo'
import { Query } from 'react-apollo'

import GET_LOCATION from '../queries/get-location'
import { GET_LOCAL_STATE_SALES } from '../queries/get-local-state'

import ActionButton from '../components/ActionButton'
import Amount from '../components/Amount'
import Input from '../components/Input'
import Seperator from '../components/Seperator'
import ScrollWrapper from '../components/ScrollWrapper'

import { CustomAnimationConfig, colors } from '../resources/theme'
import Loading from '../components/Loading';

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  columnContainer: {
    
  },
  txt: {
    color: colors.white,
    textAlign: 'left'
  },
  helpTxt: {
    fontSize: 12,
    lineHeight: 16,
    opacity: .8,
    marginBottom: 4
  },
  mainTxt: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24
  }
})

class Sales extends Component {
  static navigationOptions = {
    title: 'Sales'
  }

  state = {
    locationFound: false,
    location: {
      lat: undefined,
      lng: undefined,
      address: undefined
    },
    error: undefined
  }

  componentDidMount() {
    this.getLocationAsync()
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    console.log(status)

    let location = await Location.getCurrentPositionAsync({})
    
    const { latitude, longitude } = location.coords

    this.setState({
      locationFound: true,
      location: {
        lat: latitude,
        lng: longitude,
        address: this.state.location.address
      }
    })
  }

  handleValueChange = (num, client) => {
    if(!num || num.match(/^\d{1,}(\.\d{0,2})?$/)) {
      client.writeData({
        data: { input: { value: num, __typename: 'InputValue' } }
      })
    }
  }
  
  renderAmounts = (amount, salesTax) => {
    const { average } = salesTax
    const taxAmount = parseFloat(amount)*average
    const totalAmount = parseFloat(amount)+taxAmount

    if(!amount) {
      return null
    }

    return (
      <View style={{ 
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 48
      }}>
        <Amount label="Amount" amount={amount} />
        <Amount label="Tax" amount={taxAmount} />
        <Seperator />
        <Amount label="Total" amount={totalAmount} />
      </View>
    )
  }

  renderLocation = () => {
    const {
      rowContainer,
      columnContainer,
      txt,
      helpTxt,
      mainTxt
    } = styles
    const { lat, lng, address } = this.state.location
    
    return (
      <Query query={GET_LOCATION} variables={{ lat, lng }}>
        {({ loading, error, data }) => {
          if(loading || !this.state.locationFound) {
            LayoutAnimation.configureNext(CustomAnimationConfig)
            return <Loading>Finding your location...</Loading>
          }

          const { country, state, salesTax } = data.address
          
          let currentLocation
          if(country.shortName !== 'US') {
            currentLocation = country.longName
          } else {
            currentLocation = `${state.longName}, ${country.shortName}`
          }

          LayoutAnimation.configureNext(CustomAnimationConfig)

          return (
            <View style={[rowContainer, { marginVertical: 24 }]}>
              <View style={columnContainer}>
                <Text style={[txt, helpTxt]}>{currentLocation}</Text>
                <Text style={[txt, mainTxt]}>{(salesTax.average*100).toFixed(2)} %</Text>
              </View>
              <ActionButton
                onPress={() => null}
              />
            </View>
          )
        }}
      </Query>
    )
  }
  
  render() {
    let amountsShown = false

    return (
      <ScrollWrapper title="Sales">
        <Query query={GET_LOCAL_STATE_SALES}>
          {({ loading, error, data, client }) => {
            const { input, salesTax } = data

            return (
              <View style={{ flexGrow: 1, paddingHorizontal: 32 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Input
                    value={input.value}
                    onChangeText={e => {
                      if(!e && !amountsShown) {
                        LayoutAnimation.configureNext(CustomAnimationConfig)
                        amountsShown = false
                      } else if(e && !amountsShown) {
                        LayoutAnimation.configureNext(CustomAnimationConfig)
                        amountsShown = true
                      } else if(!e && amountsShown) {
                        LayoutAnimation.configureNext(CustomAnimationConfig)
                        amountsShown = false
                      } else {
                        amountsShown = true
                      }
                      this.handleValueChange(e, client)
                    }}
                  />
                  {this.renderAmounts(input.value,salesTax)}
                </View>
                {this.renderLocation()}
              </View>
            )
          }}
        </Query>
      </ScrollWrapper>
    )
  }
}

export default Sales
