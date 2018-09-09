import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Context } from '../App'

import ListItem from '../components/ListItem'
import ScrollWrapper from '../components/ScrollWrapper'

import { colors } from '../resources/theme'

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
        <Context.Consumer>
          {({ currency }) => {
            const { base, secondary } = currency

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
        </Context.Consumer>
        <Text style={styles.appVersion}>APP V 1.2.0</Text>
      </ScrollWrapper>
    )
  }
}

export default Settings
