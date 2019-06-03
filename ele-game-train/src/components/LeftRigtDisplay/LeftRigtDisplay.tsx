import { ComponentClass } from 'react'
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './LeftRigtDisplay.scss'

type PageOwnProps = {
  renderLeft?: any,
  renderRight?: any,
}

interface LeftRigtDisplay {
  props: PageOwnProps;
}

class LeftRigtDisplay extends Component {
  render () {
    return (
      <View className="flex"> 
         {this.props.renderLeft}
         {this.props.renderRight}
      </View>
    )
  }
}

export default LeftRigtDisplay as ComponentClass<PageOwnProps, {}>