import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Video } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {formatTime} from '../../service/utils.service';

import LeftRigtDisplay from "../../components/LeftRigtDisplay/LeftRigtDisplay"
import LeftPart from "../../components/LeftPart/LeftPart"
import RightPart from "../../components/RightPart/RightPart"

import {getPayInfo} from '../../service/api.service';

import './paySuccess.scss'

type PageStateProps = {
  globalData: {
    videoURL: string,
    videoBg: string,
    boughtStartTime: string,
    boughtPhaseName: string,
    teacherModel: string,
  }
}

type PageOwnProps = {}

type PageState = {
  askTeacher: Array<string>
}

type IProps = PageStateProps & PageOwnProps

interface paySuccess {
  props: IProps;
}

@connect(({ globalData, authData }) => ({
  globalData,
  authData
}))
class paySuccess extends Component {
  config = {
    navigationBarTitleText: '小象编程'
  }

  state = {
    askTeacher: [
      "1.点击小程序右上角的 [...]",
      "2.点击 [关于小象编程训练营]",
      "3.点击 [相关公众号]",
      "4.关注后，可以直接咨询老师",
    ],
    courseName: '',
    courseTime: '',
    teacherMobile: ''
  }

  copyText = () => {
    Taro.setClipboardData({data: this.state.teacherMobile}).then(() => {
      Taro.showToast({
        title: '复制成功'
      })
    })
  }

  async getPayInfo(token) {
    const resp = await getPayInfo({token});
    if(resp) {
      this.setState({
        courseName: resp.Classname,
        courseTime: formatTime(resp.Starttime),
        teacherMobile: resp.Teachermobile
      });
    }
  }

  componentDidMount() {
    this.getPayInfo(this.props.authData.token);
  }

  render () {
    const askTeacherBox = this.state.askTeacher.map((text, i) => {
      return <View key={i}>
              <View className="circle">
                <Text className="left-circle"></Text>
                <Text>{text}</Text>
              </View>
            </View>
    })

    return (
      <View className='index'>
        <View className="registration_success">
          <View>
            <Image src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/right.png' mode="widthFix" style="width: 40rpx;"></Image>
            <Text>报名成功</Text>
          </View>
        </View>
        <View className="describe">
          <View>
            <Text className="price">价格：¥98</Text>
            <Text>{this.state.courseName}{this.state.courseTime}开课</Text>
          </View>
        </View>
        <View style="padding: 0 40rpx;">
          <View style="height: 2px; background-color: #e9eef6;"></View>
          <View style="padding: 40rpx 10rpx;">
            <View className="to-do">
              <View>
                <Image className="left-image" src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/blue.png' mode="widthFix" style="width: 16rpx;"></Image>
                <Text>【您需要先完成两件事】</Text>
                <Image className="right-image" src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/blue.png' mode="widthFix" style="width: 16rpx;"></Image>
              </View>
            </View>
            <View>
              <LeftRigtDisplay
                renderLeft={
                  <LeftPart>
                    <View className="section" style="background-image: url('https://appd.knowbox.cn/ss/miniapp/ele_game_register/orange.png')">1</View>
                  </LeftPart>
                }
                renderRight={
                  <RightPart>
                    <Text className="section-text">关注公众号【小象编程训练营】</Text>
                  </RightPart>
                }>
              </LeftRigtDisplay>
            </View>
            <View className="consult-video">
                <Video poster={this.props.globalData.videoBg} src="https://appd.knowbox.cn/codebox/video/followUs.mp4" showFullscreenBtn={false} autoplay={true} loop={true} objectFit="fill">
                </Video>
              </View>
            <View className="ask-teacher">
              {askTeacherBox}
            </View>
            <View>
              <LeftRigtDisplay
                renderLeft={
                  <LeftPart>
                    <View className="section" style="background-image: url('https://appd.knowbox.cn/ss/miniapp/ele_game_register/orange.png')">2</View>
                  </LeftPart>
                }
                renderRight={
                  <RightPart>
                    <Text className="section-text">复制并搜索添加班主任微信，方可上课</Text>
                  </RightPart>
                }>
              </LeftRigtDisplay>
            </View>
            <View className="charge-teacher">{'[ 您的班主任微信：' + this.state.teacherMobile + ' ]'}</View>
            <View className="copy">
              <View onClick={this.copyText}>复制班主任微信</View></View>
            <View className="maybe">因微信限制老师可能会延迟1-2天响应</View>
          </View>
        </View>
      </View>
    )
  }
}

export default paySuccess as ComponentClass<PageOwnProps, PageState>
