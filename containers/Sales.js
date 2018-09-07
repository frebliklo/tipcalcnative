import React, { Component } from 'react'
import { NativeModules, LayoutAnimation } from 'react-native'

import { Context } from '../App'
import Input from '../components/Input'
import ScrollWrapper from '../components/ScrollWrapper'

import { animation } from '../resources/theme'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

  const springAnimationProperties = {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: animation.springDamping
  }
  
  const CustomAnimationConfig = {
    duration: animation.springDuraion,
    create: springAnimationProperties,
    update: springAnimationProperties,
    delete: springAnimationProperties
  }

class Sales extends Component {
  render() {
    return (
      <ScrollWrapper>
        <Context.Consumer>
          {({ amount, setAmount }) => (
            <Input
              value={amount}
              onChangeText={e => {
                LayoutAnimation.configureNext(CustomAnimationConfig)
                setAmount(e)
              }}
            />
          )}
        </Context.Consumer>
      </ScrollWrapper>
    )
  }
}

export default Sales
