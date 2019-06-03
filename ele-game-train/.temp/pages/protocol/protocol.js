import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
class protocol extends Component {
  constructor(props) {
    super(props);
  }
  config = {
    pages: ['pages/webView/webView']
  };
  render() {
    return <WebView src="https://ssweb.knowbox.cn/protocol/little-elephant-coding.html "></WebView>;
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

}