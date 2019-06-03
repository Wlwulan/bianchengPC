import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './LeftRight.scss';
class LeftRight extends Component {
  render() {
    return <View className="flex"> 
         {this.props.children}
      </View>;
  }
}
export default LeftRight;