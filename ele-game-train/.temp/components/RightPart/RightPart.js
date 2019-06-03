import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './RightPart.scss';
class RightPart extends Component {
  render() {
    const imageClass = this.props.isImage ? 'vertical-center' : '';
    return <View className={"flex-container-right " + imageClass} style={"padding-left: " + this.props.paddingLeft + "rpx;"}>
        {this.props.children}
      </View>;
  }
}
RightPart.defaultProps = {
  paddingLeft: 0,
  isImage: false
};
export default RightPart;