import React, { Component } from 'react'
import { Text } from 'react-native'

import ScrollWrapper from '../components/ScrollWrapper'

class Settings extends Component {
  render() {
    return (
      <ScrollWrapper>
        <Text>This is the settings screen!</Text>
      </ScrollWrapper>
    )
  }
}

export default Settings
