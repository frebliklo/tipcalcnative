import React from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  seperator: {
    marginTop: 8,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: colors.teal['200'],
    borderRadius: 2,
    opacity: .5
  }
})

const Seperator = () => <View style={styles.seperator} />

export default Seperator
