import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Query } from 'react-apollo'

import GET_BASE_CURRENCIES from '../../queries/get-base-currencies'
import GET_SECONDARY_CURRENCIES from '../../queries/get-secondary-currencies'

import { Context } from '../../App'
import Loading from '../../components/Loading'
import SelectItem from './SelectItem'
import ScrollWrapper from '../../components/ScrollWrapper'

import backArrow from '../../resources/assets/icons/arrow-back.png'
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
    fontSize: 24,
    lineHeight: 32,
    color: colors.red['200']
  }
})

class EditCurrency extends Component {
  static navigationOptions = {
    title: 'Edit currency'
  }

  renderEditMain = (base, secondary, updateCurrency) => (
    <Query query={GET_BASE_CURRENCIES} variables={{ secondary }}>
      {({ loading, error, data }) => {
        if(loading) return <Loading>Hold on...</Loading>
        if(error) (
          <Text style={styles.error}>
            Can't find supported currencies :/
          </Text>
        )

        const { currencies } = data

        return currencies.map(({ source, name, exchangeRate }) => {
          if(source === base) {
            return (
              <SelectItem
                key={name}
                source={source}
                name={name}
                selected={true}
                onPress={() => updateCurrency({
                  base: source,
                  exchangeRate: exchangeRate.rate
                })}
              />
            )
          }
          return(
            <SelectItem
              key={name}
              source={source}
              name={name}
              onPress={() => updateCurrency({
                base: source,
                exchangeRate: exchangeRate.rate
              })}
            />
          )
        })
      }}
    </Query>
  )

  renderEditSecondary = (base, secondary, updateCurrency) => (
    <Query query={GET_SECONDARY_CURRENCIES} variables={{ base }}>
      {({ loading, error, data }) => {
        if(loading) return <Loading>Hold on...</Loading>
        if(error) (
          <Text style={styles.error}>
            Can't find supported currencies :/
          </Text>
        )

        const { rates } = data.currency
        
        return rates.map(rate => {
          if(rate.currency === secondary) {
            return (
              <SelectItem
                key={rate.name}
                source={rate.currency}
                name={rate.name}
                selected={true}
                onPress={() => updateCurrency({
                  secondary: rate.currency,
                  exchangeRate: rate.rate
                })}
              />
            )
          }
          return (
            <SelectItem
              key={rate.name}
              source={rate.currency}
              name={rate.name}
              onPress={() => updateCurrency({
                secondary: rate.currency,
                exchangeRate: rate.rate
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
        icon={backArrow}
        iconPress={() => this.props.navigation.goBack()}
      >
        <Context.Consumer>
          {({ currency, updateCurrency }) => {
            const { base, secondary } = currency

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
                    ? this.renderEditMain(base, secondary, updateCurrency)
                    : this.renderEditSecondary(base, secondary, updateCurrency)
                  }
                </View>
              </View>
            )
          }}
        </Context.Consumer>
      </ScrollWrapper>
    )
  }
}

export default EditCurrency
