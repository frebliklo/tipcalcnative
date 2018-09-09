import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Touchable from '../../components/Touchable/Highlight'

import { colors } from '../../resources/theme'

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
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  selectedItem: {
    backgroundColor: colors.cyan['700']
  },
  text: {
    fontSize: 20,
    lineHeight: 24,
    color: colors.white
  },
  sourceTxt: {
    fontWeight: '700',
    marginRight: 12
  },
  nameTxt: {

  }
})

const SelectItem = ({ source, name, selected, onPress }) => {
  const { container, row, selectedItem, text, sourceTxt } = styles
  const containerStyle = selected ? [container,row,selectedItem] : [container,row]

  return (
    <Touchable
      useForeground
      activeOpacity={1}
      underlayColor={colors.indigo['600']}
      onPress={onPress}
    >
      <View style={containerStyle}>
        <View style={[{ flex: 1 }, row]}>
          <Text style={[text, sourceTxt]}>{source}</Text>
          <Text style={[text]}>{name}</Text>
        </View>
      </View>
    </Touchable>
  )
}

export default SelectItem
