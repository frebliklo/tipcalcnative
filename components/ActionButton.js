import React, { Component } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.violet['000'],
    borderRadius: 200,
    elevation: 5
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.primary
  }
})

class ActionButton extends Component {
  state = {
    pressed: false
  }

  render() {
    const { onPress } = this.props
    const { pressed } = this.state

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={() => { if(onPress) this.setState({ pressed: true }) }}
        onPressOut={() => { if(onPress) this.setState({ pressed: false }) }}
        style={{ width: 48, height: 48, overflow: 'visible' }}
      >
        <View style={[
          styles.button,
          pressed ? { opacity: .8 } : null,
          pressed ? { transform: [{ scale: 0.95 }] } : null
        ]}>
          <Image source={require('../assets/icons/location.png')} style={styles.icon} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ActionButton
