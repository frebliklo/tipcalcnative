import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Touchable from './Touchable/Highlight'

import chevron from '../assets/chevron.png'
import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 32,
    backgroundColor: 'rgba(0,0,0,.15)',
    borderBottomColor: 'rgba(0,0,0,.2)',
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: colors.white
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24
  },
  value: {
    fontSize: 20,
    lineHeight: 24,
    opacity: .95
  },
  chevron: {
    tintColor: colors.white,
    opacity: .6,
    marginLeft: 8
  }
})

const ListItem = ({ label, onPress, value }) => (
  <Touchable
    useForeground
    activeOpacity={1}
    underlayColor={colors.indigo['600']}
    onPress={onPress}
  >
    <View style={[styles.container, styles.row]}>
      <Text style={[styles.label, styles.text]}>{label}</Text>
      <View style={styles.row}>
        <Text style={[styles.value, styles.text]}>{value}</Text>
        <Image style={styles.chevron} source={chevron} />
      </View>
    </View>
  </Touchable>
)

export default ListItem
