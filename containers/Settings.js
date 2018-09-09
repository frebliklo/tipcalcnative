import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Query } from 'react-apollo'

import { GET_LOCAL_CURRENCY } from '../queries/get-local-state'

import ListItem from '../components/ListItem'
import ScrollWrapper from '../components/ScrollWrapper'

import { colors } from '../resources/theme'
import { APP_VERSION } from '../constants'

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 32
  },
  sectionHeadline: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
    color: colors.white,
    opacity: .8
  },
  appVersion: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: colors.white,
    opacity: .6,
    textAlign: 'center',
    marginVertical: 16
  }
})

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings'
  }

  handlePress = (route, props) => {
    this.props.navigation.navigate(route, props)
  }
  
  render() {
    return (
      <ScrollWrapper title="Settings">
        <Query query={GET_LOCAL_CURRENCY}>
          {({ loading, error, data }) => {
            const { base, secondary } = data.currencyLocal
            
            return (
              <View style={{ flexGrow: 1 }}>
                <Text style={[styles.content, styles.sectionHeadline]}>
                  CURRENCY
                </Text>
                <ListItem
                  label="Main"
                  value={base}
                  onPress={() => this.handlePress('EditCurrency', {
                    editCurrency: 'main'
                  })}
                />
                <ListItem
                  label="Secondary"
                  value={secondary}
                  onPress={() => this.handlePress('EditCurrency', {
                    editCurrency: 'secondary'
                  })}
                />
              </View>
            )
          }}
        </Query>
        <Text style={styles.appVersion}>{APP_VERSION}</Text>
      </ScrollWrapper>
    )
  }
}

export default Settings
