import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './LeftPart.scss'

type PageOwnProps = {
  children?: any,
}

interface LeftPart {
  props: PageOwnProps;
}

class LeftPart extends Component {
  render () {
    return (
    <View className="flex-container-left">
      {this.props.children}
    </View>
    )
  }
}

export default LeftPart as ComponentClass<PageOwnProps, {}>