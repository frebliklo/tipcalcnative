import React from 'react'
import { Slider, StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 48
  },
  adjustText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 12
  },
  slider: {
    width: '100%',
    paddingVertical: 16
  },
  tipText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16
  }
})

const TipSlider = ({ value, onValueChange, tipPercent }) => (
  <View style={styles.container}>
    <Text style={styles.adjustText}>ADJUST TIP PERCENTAGE</Text>
    <Slider 
      style={styles.slider}
      value={value}
      onValueChange={onValueChange}
      thumbTintColor="#FFF"
      minimumTrackTintColor="#F5AF24"
    />
    <Text style={styles.tipText}>{tipPercent} % tip</Text>
  </View>
)

export default TipSlider
