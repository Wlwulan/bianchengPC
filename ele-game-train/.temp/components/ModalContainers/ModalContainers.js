import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './ModalContainer.scss';
class ModalContainer extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      isHideModel: true
    };
  }
  render() {
    let isShow = this.props.isShow;
    let isHideModel = this.state.isHideModel;
    let className = isShow ? 'show' : 'hide';
    className = className + ' ' + 'flex';
    if (!isShow && !isHideModel) {
      setTimeout(() => {
        this.setState({
          isHideModel: true
        });
      }, 200);
    } else if (isShow && isHideModel) {
      this.setState({
        isHideModel: false
      });
    }
    return <View className={className} style={isHideModel ? "display: none;" : ""}>
      {this.props.children}
    </View>;
  }
}
export default ModalContainer;