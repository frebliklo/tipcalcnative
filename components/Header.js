import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import Touchable from './Touchable/Opacity'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 24
  },
  gapSm: {
    paddingVertical: 16,
    paddingHorizontal: 0
  },
  gapLg: {
    paddingVertical: 16,
    paddingHorizontal: 32
  },
  icon: {
    tintColor: colors.white,
    width: 32,
    height: 32,
    opacity: .8
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.white
  }
})

class Header extends Component {
  renderIcon = (icon, iconPress, title) => (
    <View style={[styles.container, styles.gapSm]}>
      <Touchable
        useForeground
        underlayColor={colors.indigo['600']}
        onPress={iconPress}
        style={{ borderRadius: 200 }}
      >
        <Image source={icon} style={styles.icon} />
      </Touchable>
      <Text style={styles.title} onPress={iconPress}>{title}</Text>
    </View>
  )

  renderNoIcon = title => (
    <View style={[styles.container, styles.gapLg]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )

  render() {
    const { title, icon, iconPress } = this.props
    
    return icon 
      ? this.renderIcon(icon, iconPress, title) 
      : this.renderNoIcon(title)
  }
}

export default Header
