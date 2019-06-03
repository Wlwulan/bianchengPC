import { ComponentClass } from 'react'
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './LeftRight.scss'

type PageOwnProps = {
  children?: any,
}

interface LeftRight {
  props: PageOwnProps;
}

class LeftRight extends Component {
  render () {
    return (
      <View className="flex"> 
         {this.props.children}
      </View>
    )
  }
}

export default LeftRight as ComponentClass<PageOwnProps, {}>