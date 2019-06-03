import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import png_close from './images/close.png';
import './ModalContainerService.scss'

type PageOwnProps = {
  onCloseModal: () => void,
  top?: number,
  children?: any,
}

interface ModalContainerService {
  props: PageOwnProps;
}

class ModalContainerService extends Component {
  constructor(props){
    super(props);
    this.onCloseModal=this.onCloseModal.bind(this);
  }
  static defaultProps = {
    top: 0,
  }

  onCloseModal(){
    this.props.onCloseModal();
  }

  render () {
    return (
    <View className="modal-container" style={'top:' + this.props.top +'rpx;'}>
      {/*<Image src={png_close} style="width: 60rpx;" mode="widthFix" onClick={this.onCloseModal}></Image>*/}
      {this.props.children}
    </View>
    )
  }
}

export default ModalContainerService as ComponentClass<PageOwnProps, {}>