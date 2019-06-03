import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './RightPart.scss'

type PageOwnProps = {
  children?: any,
  isImage?: boolean,
  paddingLeft?: number,
}

interface RightPart {
  props: PageOwnProps;
}

class RightPart extends Component {
  static defaultProps = {
    paddingLeft: 0,
    isImage: false,

  } as PageOwnProps

  render () {
    const imageClass = this.props.isImage ? 'vertical-center' : '';
    
    return (
      <View className={"flex-container-right " + imageClass}
            style={"padding-left: "+ this.props.paddingLeft +"rpx;"}>
        {this.props.children}
      </View>
    )
  }
}

export default RightPart as ComponentClass<PageOwnProps, {}>