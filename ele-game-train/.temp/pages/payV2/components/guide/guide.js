import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";

import './guide.scss';

class Guide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View className={'guide-wrapper ' + (this.props.classname || '')}>
                <Video className="video-guide" objectFit="contain" showFullscreenBtn={false} src="https://appd.knowbox.cn/codebox/video/followUs.mp4"></Video>
                <View className="guide-list">
                    <Text>1.点击小程序右上角的 [...]</Text>
                    <Text>2.点击 [关于小象编程]</Text>
                    <Text>3.点击 [相关公众号]</Text>
                    <Text>4.点击 [小象编程训练营]</Text>
                    <Text>5.关注后，可以直接咨询老师</Text>
                </View>
            </View>;
  }
}

export default Guide;