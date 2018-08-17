import React from 'react'
import { Slider, StyleSheet, Text, View } from 'react-native'

import { colors } from '../constants/theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 48
  },
  adjustText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 20
  },
  slider: {
    width: '100%',
    paddingVertical: 16
  },
  tipText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600'
  }
})

const TipSlider = ({ value, onValueChange, tipPercent }) => (
  <View style={styles.container}>
    <Text style={styles.adjustText}>ADJUST TIP PERCENTAGE</Text>
    <Slider 
      style={styles.slider}
      value={value}
      onValueChange={onValueChange}
      thumbTintColor={colors.white}
      minimumTrackTintColor={colors.red['300']}
    />
    <Text style={styles.tipText}>{tipPercent} % tip</Text>
  </View>
)

export default TipSlider
