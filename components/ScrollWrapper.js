import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { LinearGradient } from 'expo'

import { colors } from '../resources/theme'
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  contentContainer: {
    flexGrow: 1,
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
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.white,
    marginTop: 40,
    marginBottom: 16,
    marginLeft: 32
  }
})

const ScrollWrapper = ({ children, title, style, icon, iconPress }) => (
  <SafeAreaView style={styles.safeArea}>
    <LinearGradient
      colors={[colors.secondary,colors.primary]}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" />
      <Header title={title} icon={icon} iconPress={iconPress} />
      {/* <Text style={styles.title}>{title}</Text> */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, style]}
        scrollEnabled={true}
        overScrollMode="auto"
      >
        {children}
      </ScrollView>
    </LinearGradient>
  </SafeAreaView>
)

export default ScrollWrapper
