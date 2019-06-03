import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './HotWork.scss'
import { toAuthorize } from '../../util/util'

type UserInfo = {
  src: string,
  name: string,
  level: number,
  studentId: number,
}

type PageOwnProps = {
  userInfo: UserInfo,
  title: string,
  likeNum: number,
  time: string,
  globalData?: object
  children?: any,
  workImage: string,
  workerId: number,
}

type IProps = PageOwnProps

interface RecommendedLogos {
  props: IProps;
}

class RecommendedLogos extends Component {
  static defaultProps = {
    likeNum: 0,
  } as PageOwnProps
  toAuthorize(source,id){
    toAuthorize(source,id)
  }
  render() {
    const { userInfo, likeNum, title, time, workImage,workerId } = this.props;
    return (
      <View className="hotWork" >
        {this.props.children}
        <View className="li" onClick={this.toAuthorize.bind(this,'index',workerId)}>
          <Image className="img" src={workImage}></Image>
          <View className="msg">
            <View className="msg-top">
              <Text className="txt">{title}</Text>
              <Text className="time">{time}</Text>
            </View>
          </View>
        </View>
        <View className="msg-bottom" onClick={this.toAuthorize.bind(this,'allworks',userInfo.studentId)}>
              <View className="msg-bottom-info">
                <Image className="avatar" src={userInfo['src']}></Image> 
                <Text className="name">{userInfo['name']}</Text>
                <Text className="level">Lv.{userInfo['level']}</Text>
              </View>
              <View className="msg-bottom-zan">
                <Image className="zan" src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/like_red.png'></Image>
                <Text className="num">{likeNum}</Text>                
              </View>
            </View>
      </View>
    )
  }
}


export default RecommendedLogos as ComponentClass<PageOwnProps, {}>