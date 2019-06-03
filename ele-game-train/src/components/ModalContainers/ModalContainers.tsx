import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './ModalContainer.scss'

type PageOwnProps = {
  isShow: boolean,
  children?: any,
}

type PageState = {
  isHideModel: boolean
}

interface ModalContainer {
  props: PageOwnProps;
}


class ModalContainer extends Component {
  state = {
    isHideModel: true,
  }

  constructor(porps) {
    super(porps);
  }

  render () {
    let isShow = this.props.isShow;
    let isHideModel = this.state.isHideModel;
    let className =  isShow ? 'show' : 'hide';
    className = className + ' ' + 'flex';

    if(!isShow && !isHideModel) {
      setTimeout(() => {
        this.setState({
          isHideModel: true
        })
      }, 200);
    } else if (isShow && isHideModel) {
      this.setState({
        isHideModel: false
      })
    }

    return (
    <View className={className} style={isHideModel ? "display: none;" : ""}>
      {this.props.children}
    </View>
    )
  }
}

export default ModalContainer as ComponentClass<PageOwnProps, PageState>