import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './ModalContainerService.scss';
class ModalContainerService extends Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onCloseModal() {
    this.props.onCloseModal();
  }
  render() {
    return <View className="modal-container" style={'top:' + this.props.top + 'rpx;'}>
      
      {this.props.children}
    </View>;
  }
}
ModalContainerService.defaultProps = {
  top: 0
};
export default ModalContainerService;