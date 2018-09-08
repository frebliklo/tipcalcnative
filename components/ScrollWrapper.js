import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native'
import { LinearGradient } from 'expo'

import { colors } from '../resources/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  safeArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.white,
    marginTop: 40,
    marginLeft: 32
  }
})

const ScrollWrapper = ({ children, title }) => (
  <SafeAreaView style={styles.safeArea}>
    <LinearGradient
      colors={[colors.secondary,colors.primary]}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  </SafeAreaView>
)

export default ScrollWrapper
