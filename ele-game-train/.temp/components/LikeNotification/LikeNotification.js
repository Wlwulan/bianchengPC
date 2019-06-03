import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Image } from '@tarojs/components';
import LeftRight from "../LeftRight/LeftRight";
import LeftPart from "../LeftPart/LeftPart";
import RightPart from "../RightPart/RightPart";
import './LikeNotification.scss';
class LikeNotification extends Component {
  render() {
    const { name, time, src, WorkImg } = this.props;
    return <View>
        <View className="like-notification">
          <LeftRight>
            <View style="justify-content: space-between;">
              <LeftPart>
                <LeftRight>
                  <View>
                    <LeftPart>
                      <Image style="width: 100rpx;border-radius: 100rpx;border: solid 4rpx rgba(225, 225, 225, 0.4);" mode="widthFix" src={src}></Image>
                    </LeftPart>
                    <RightPart paddingLeft={21}>
                      <View className="text-middle">
                        <View>
                          <View className="name">{name}</View>
                          <View className="time">{time}</View>  
                        </View>
                      </View>
                    </RightPart>
                  </View>                
                </LeftRight>
              </LeftPart>
              <RightPart paddingLeft={21} isImage={true}>
                <Image style="width: 132rpx;" mode="widthFix" src={WorkImg}></Image>
              </RightPart>
            </View>                
          </LeftRight>
        </View>
      </View>;
  }
}
LikeNotification.defaultProps = {
  name: ''
};
export default LikeNotification;