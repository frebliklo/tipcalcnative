import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 32,
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
  }
})

const ScrollWrapper = ({ children }) => (
  <SafeAreaView style={styles.safeArea}>
    <LinearGradient
      colors={['#944AFC','#151F8C']}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" />
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