import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './LeftRigtDisplay.scss';
class LeftRigtDisplay extends Component {
  render() {
    return <View className="flex"> 
         {this.props.renderLeft}
         {this.props.renderRight}
      </View>;
  }
}
export default LeftRigtDisplay;