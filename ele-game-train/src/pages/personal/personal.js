import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Video, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { request } from '../../service/request.service';
import Authorize from "../../components/authorize/authorize"
import ModalContainer from "../../components/ModalContainers/ModalContainers"
import ModalContainerService from "../../components/ModalContainerService/ModalContainerService"

import './personal.scss'

import {
    fetchUnionId,
    fetchUserToken
} from '../../service/api.service';
import { setAuthData } from '../../actions/auth';
@connect(({ authData, courseData, payInfoData }) => ({
    authData,
}), (dispatch) => ({
    setAuthData(data) {
        dispatch(setAuthData(data));
    },
}))
class personal extends Component {
    config = {
        navigationBarTitleText: '我的'
    }
    constructor(props) {
        super(props);
        this.state = {
            myList: [{
                imgUrl: this.getImgUrl('my-product-icon'),
                name: '我的作品'
            }, {
                imgUrl: this.getImgUrl('my-work-icon'),
                name: '我的作业'
            }, {
                imgUrl: this.getImgUrl('my-favor-icon'),
                name: '我的喜欢'
            }, {
                imgUrl: this.getImgUrl('history-icon'),
                name: '浏览历史'
            }],
            detailPath: [
                '/pages/myProduct/myProduct',
                '/pages/myWorks/myWorks',
                '/pages/myFavor/myFavor',
                '/pages/history/history'
            ],
            userInfo: {},
            isShowModel: false,
            showAuthorized: false,
            clickSource: '',
            isRegister: this.props.authData.token && this.props.authData.token !== '',    // 是否已注册          
        }
    }
    componentWillMount() {
        this.isAuthorized();
    }
    componentDidShow(){
        wx.reportAnalytics('personal_onload', {
        });
    }
    getImgUrl(name) {
        return `https://appd.knowbox.cn/ss/miniapp/ele_game_register/personal/${name}.png`
    }
    toMyFavor = () => {
        Taro.navigateTo({
            url: '/pages/likeNotifications/likeNotifications'
        })

    }
    toDetailPage = (i) => {
        if(i === 0) {
            wx.reportAnalytics('myproduct_click', {
            });
        }else if (i === 1) {
            wx.reportAnalytics('myworks_click', {
            });
        }else if(i === 2) {
            wx.reportAnalytics('mylikes_click', {
            });
        }else if(i === 3) {
            wx.reportAnalytics('history_click', {
            });
        }
        Taro.navigateTo({
            url: this.state.detailPath[i]
        })
    }
    async getProductList() {
        const url = '/v1/littleApp/getUserInfo';
        return request(url, {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                token: this.props.authData.token
            }
        });
    }
    toggleModel = (clickSource) => {
        if (this.state.userInfo['isPurchase'] === 1 && clickSource === "isbuyBtn") {
            return;
        }
        if (this.state.userInfo['isPurchase'] === 0 && clickSource === "isbuyBtn") {
            wx.reportAnalytics('join_training', {
            });
        }
        this.setState({
            isShowModel: !this.state.isShowModel,
            clickSource: clickSource
        })

    };
    toPay() {
        Taro.navigateTo({
            url: '/pages/payV2/payV2'
        })
    }
    isAuthorized() {
        // Taro.getSetting().then((res) => {
        //     if (res.authSetting['scope.userInfo'] === true) {
        //         this.getProductList().then((res) => {
        //             this.setState({
        //                 userInfo: res
        //             })
        //         })
        //     } else {
        //         this.setState({ showAuthorized: true })
        //     }
        // })
        if (this.state.isRegister) {
            this.getProductList().then((res) => {
                this.setState({
                    userInfo: res
                })
            })
        } else {
            this.setState({ showAuthorized: true })
        }

    }
    authorizeCallBack = () => {
        this.setState({ showAuthorized: false }, () => {
            this.getProductList().then((res) => {
                this.setState({
                    userInfo: res
                })
            })
        })
    }
    render() {
        const { userInfo, isShowModel, showAuthorized, progressBarWidth, clickSource } = this.state;
        return (
            <View className='personal'>
                <View className="header">
                    <View className="header-left">
                        {
                            userInfo['isPurchase'] === 1
                            && <Image
                                className="title-frame"
                                mode="widthFix"
                                src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/title-frame.png'>
                            </Image>
                        }
                        <Image className="profile-picture" src={userInfo['headPhoto']} />
                    </View>
                    <View className="header-right">
                        <View className="msg-top">
                            <Text className="nick-name">{userInfo['studentName']}</Text>
                            <Text
                                onClick={this.toggleModel.bind(this, 'isbuyBtn')}
                                className="isbuy">
                                {userInfo['isPurchase'] == 0 ? '加入训练营':'训练营小创客'}
                            </Text>
                        </View>
                        <View className="msg-bottom">
                            <View className="progress-warp">
                                <View className="progress">
                                    <Text
                                        className="progress-bar"
                                        style={`width: ${userInfo['upgradeProgress'] && userInfo['upgradeProgress'] * 360}rpx`}
                                    ></Text>
                                </View>
                                <View className="tips-warp" onClick={this.toggleModel.bind(this, 'tipsBtn')}>
                                    <Image className="tips" />
                                </View>
                            </View>
                            <View className="progress-txt">
                                <Text className="level">Lv.{userInfo['abilityLevel']}</Text>
                                <Text className="percent">{userInfo['upgradeProgress'] && parseInt( userInfo['upgradeProgress'] * 100 ) }%</Text>          
                            </View>
                        </View>
                    </View>
                </View>
                <View className="myList">
                    {this.state.myList.map((el, i) => {
                        return !(userInfo['isPurchase'] == 0 && i == 1) &&
                            <View
                                key={i}
                                className="li"
                                onClick={this.toDetailPage.bind(this, i)}
                            >
                                <View className="img-warp">
                                    <Image className="img" src={el['imgUrl']}></Image>
                                </View>
                                <Text className="txt">{el['name']}</Text>
                                <View className="arrow"></View>
                            </View>
                    })}
                </View>
                <ModalContainer isShow={isShowModel}>
                    <ModalContainerService onCloseModal={this.toggleModel.bind(this)} top={-160}>
                        {clickSource === 'isbuyBtn' && <View>
                            <Text className="title">温馨提示</Text>
                            <View className="toastTxt">加入小象编程训练营入门课程即可解锁<Text>训练营小创客</Text>称号哦～</View>
                        </View>
                        }
                        {
                            clickSource === 'tipsBtn' &&
                            <View>
                                <Text className="title">积分说明</Text>
                                <View className="toastTxt score">
                                    <View>1.每获得1个点赞+1分</View>
                                    <View>2.每发布1个作品+2分</View>
                                    <View>3.每通过<Text>小象编程APP</Text>1个关卡+1分</View>
                                    <View>4.加入<Text>小象编程训练营</Text>+50分</View>
                                </View>
                            </View>

                        }
                        {
                            userInfo['isPurchase'] === 1 ?
                                <View className="footerBtn">
                                    <Button className="close" onClick={this.toggleModel.bind(this)}>我知道了</Button>
                                </View> :
                                <View className="footerBtn">
                                    <Button className="cancel" onClick={this.toggleModel.bind(this)}>取消</Button>
                                    <Button className="toPay" onClick={this.toPay}>加入训练营</Button>
                                </View>
                        }

                    </ModalContainerService>
                </ModalContainer>
                <Authorize
                    isShow={showAuthorized}
                    onAuthorize={this.authorizeCallBack.bind(this)}>
                </Authorize>
            </View>
        )
    }
}
