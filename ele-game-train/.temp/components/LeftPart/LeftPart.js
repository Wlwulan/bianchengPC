import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './LeftPart.scss';
class LeftPart extends Component {
  render() {
    return <View className="flex-container-left">
      {this.props.children}
    </View>;
  }
}
export default LeftPart;