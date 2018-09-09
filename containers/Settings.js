import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Context } from '../App'

import ListItem from '../components/ListItem'
import ScrollWrapper from '../components/ScrollWrapper'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
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
      <ScrollWrapper
        title="Settings"
        style={styles.container}
      >
        <Context.Consumer>
          {({ currency }) => {
            const { base, secondary } = currency

            return (
              <View>
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
      </ScrollWrapper>
    )
  }
}

export default Settings
