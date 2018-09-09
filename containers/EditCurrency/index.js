import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Query } from 'react-apollo'

import GET_BASE_CURRENCIES from '../../queries/get-base-currencies'
import GET_SECONDARY_CURRENCIES from '../../queries/get-secondary-currencies'
import { GET_LOCAL_CURRENCY } from '../../queries/get-local-state'

import Loading from '../../components/Loading'
import SelectItem from './SelectItem'
import ScrollWrapper from '../../components/ScrollWrapper'

import { colors } from '../../resources/theme'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  content: {
    paddingHorizontal: 32
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
    opacity: .8,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24
  },
  error: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    color: colors.red['200']
  }
})

class EditCurrency extends Component {
  static navigationOptions = {
    title: 'Edit currency'
  }

  renderEditMain = (base, secondary, client) => (
    <Query query={GET_BASE_CURRENCIES} variables={{ secondary }}>
      {({ loading, error, data }) => {
        if(loading) return <Loading>Hold on...</Loading>
        if(error) {
          return (
            <Text style={[styles.error, styles.content]}>
              Can't find supported currencies :/
            </Text>
          )
        }

        const { currencies } = data

        return currencies.map(({ source, name, exchangeRate }) => {
          if(source === base) {
            return (
              <SelectItem
                key={name}
                source={source}
                name={name}
                selected={true}
                onPress={() => client.writeData({
                  data: {
                    currencyLocal: {
                      base: source,
                      exchangeRate: exchangeRate.rate,
                      __typename: 'CurrencyLocal'
                    }
                  }
                })
              }/>
            )
          }
          return(
            <SelectItem
              key={name}
              source={source}
              name={name}
              onPress={() => client.writeData({
                data: {
                  currencyLocal: {
                    base: source,
                    exchangeRate: exchangeRate.rate,
                    __typename: 'CurrencyLocal'
                  }
                }
              })}
            />
          )
        })
      }}
    </Query>
  )

  renderEditSecondary = (base, secondary, client) => (
    <Query query={GET_SECONDARY_CURRENCIES} variables={{ base }}>
      {({ loading, error, data }) => {
        if(loading) return <Loading>Hold on...</Loading>
        if(error) {
          return (
            <Text style={[styles.error, styles.content]}>
              Can't find supported currencies :/
            </Text>
          )
        }

        const { rates } = data.currency
        
        return rates.map(rate => {
          if(rate.currency === secondary) {
            return (
              <SelectItem
                key={rate.name}
                source={rate.currency}
                name={rate.name}
                selected={true}
                onPress={() => client.writeData({
                  data: {
                    currencyLocal: {
                      secondary: rate.currency,
                      exchangeRate: rate.rate,
                      __typename: 'CurrencyLocal'
                    }
                  }
                })}
              />
            )
          }
          return (
            <SelectItem
              key={rate.name}
              source={rate.currency}
              name={rate.name}
              onPress={() => client.writeData({
                data: {
                  currencyLocal: {
                    secondary: rate.currency,
                    exchangeRate: rate.rate,
                    __typename: 'CurrencyLocal'
                  }
                }
              })}
            />
          )
        })
      }}
    </Query>
  )

  render() {
    const { editCurrency } = this.props.navigation.state.params
    const title = editCurrency === 'main'
      ? 'Main currency'
      : 'Secondary currency'

    return (
      <ScrollWrapper
        title={title}
        style={styles.container}
        icon={require('../../assets/icons/arrow-back.png')}
        iconPress={() => this.props.navigation.goBack()}
      >
        <Query query={GET_LOCAL_CURRENCY}>
          {({ loading, error, data, client }) => {
            const { base, secondary } = data.currencyLocal

            return (
              <View>
                <Text style={[styles.content, styles.desc]}>
                  {editCurrency === 'main' 
                    ? 'Change the main currency'
                    : 'Change the secondary currency'
                  }
                </Text>
                <View style={{ flexGrow: 1 }}>
                  {editCurrency === 'main'
                    ? this.renderEditMain(base, secondary, client)
                    : this.renderEditSecondary(base, secondary, client)
                  }
                </View>
              </View>
            )
          }}
        </Query>
      </ScrollWrapper>
    )
  }
}

export default EditCurrency
