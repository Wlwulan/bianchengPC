import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import ModalContainer from "../../components/ModalContainers/ModalContainers"
import ModalContainerService from "../../components/ModalContainerService/ModalContainerService"


import './creatClass.scss'

type PageStateProps = {
    globalData: {

    }
}

type PageOwnProps = {}

type PageState = {
    cardCtn: Array<object>,
    isShowClassModel: boolean,
    currTxtId: Number,
}

type IProps = PageStateProps & PageOwnProps

interface creatClass {
    props: IProps;
}

@connect(({ globalData }) => ({
    globalData
}))
class creatClass extends Component {
    config = {
        navigationBarTitleText: '创作课堂'
    }
    state = {
        cardCtn: [
            {
                title: "体验编程",
                imgUrl: "https://appd.knowbox.cn/ss/miniapp/ele_game_register/card_bg1.png"
            }, {
                title: "自由创作",
                imgUrl: "https://appd.knowbox.cn/ss/miniapp/ele_game_register/card_bg2.png"
            }, {
                title: "开始闯关",
                imgUrl: "https://appd.knowbox.cn/ss/miniapp/ele_game_register/card_bg3.png"
            }],
        currTxtId: -1,
        isShowClassModel: false,
    }
    componentDidShow(){
        wx.reportAnalytics('creatclass_onload', {
        });
    }
    toggleClassModel = (i) => {
        if(i === 0) {
            wx.reportAnalytics('experience_program_click', {
            });
        }else if(i === 1) {
            wx.reportAnalytics('free_writing_click', {
            });
        }else if(i === 2) {
            wx.reportAnalytics('start_breaking_click', {
            });
        }
        if(i === 0 ){
            Taro.navigateTo({
                url: '/pages/payV2/payV2'
            })
            return;
        }
        this.setState({
          isShowClassModel: !this.state.isShowClassModel,
          currTxtId: i
        })
      };
    render() {
        const { isShowClassModel, currTxtId } = this.state;       
        const cardCtnBox = this.state.cardCtn.map((el, i) => {
            return <View className="card" key={i} onClick={this.toggleClassModel.bind(this,i)}>
                <Text>{el['title']}</Text>
                <Image src={el['imgUrl']} />
            </View>
        })
        return (
            <View className='creatClass'>
                {cardCtnBox}
                <ModalContainer isShow={isShowClassModel}>
                    <ModalContainerService
                        onCloseModal={this.toggleClassModel.bind(this)}
                        top={-160}>
                        <Text className="title">温馨提示</Text>
                        {   currTxtId === 0 && 
                            <View className="toastTxt">
                                <Text>前往官网</Text>
                                <Text className="red">code.knowbox.cn</Text> 
                                <Text>学习编程</Text>
                            </View>
                        }
                        {   currTxtId === 1 && 
                            <View className="toastTxt">
                                <View>
                                    <Text>1.在浏览器输入</Text>
                                    <Text className="red">code.knowbox.cn/ide</Text>
                                </View>
                                <Text>2.创作完成后提交作品可在小程序中查看</Text>
                            </View>}
                        {currTxtId === 2 && 
                        <View className="toastTxt">
                            <Text>iOS用户请在AppStore/安卓用户请在应用商店搜索</Text>
                            <Text className="red" decode={true}>“小象编程”</Text>
                            <Text>下载小象编程APP进行编程闯关实践</Text>
                        </View>
                        }
                        <Button className="cancel" onClick={this.toggleClassModel.bind(this)}>我知道了</Button>
                    </ModalContainerService>
                </ModalContainer>
            </View>
        )
    }
}

export default creatClass as ComponentClass<PageOwnProps, PageState>
