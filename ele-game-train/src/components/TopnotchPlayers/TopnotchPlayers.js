import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import WEB_API from '../../config/url';
import './TopnotchPlayers.scss'
import { toAuthorize } from '../../util/util'
import { connect } from '@tarojs/redux'
import { setPageNum } from '../../actions/globalData';

@connect(({ globalData }) => ({
    globalData
}), (dispatch) => ({
 setPageNum(data){
     dispatch(setPageNum(data));
 }
}))

class TopnotchPlayers extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    componentWillMount() {
        wx.reportAnalytics('topnotchplayers_onload', {
        });
    }
    componentWillReceiveProps(nextProps){

    }
    componentWillUnmount(){
    }

    toAuthorize(source, id) {
        toAuthorize(source, id)
    }
    render() {
        const {goodList, isGood}= this.props;
        return (
            <View className= { `TopnotchPlayers` }>
                {goodList.map((el, i) => {
                    return <View key={i} className="li" onClick={this.toAuthorize.bind(this, 'allworks', el['StudentId'])}>
                        <View className="img-warp">
                            {
                               el['isPurchase'] === 1
                                && <Image
                                    className="title-frame"
                                    mode="widthFix"
                                    src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/title-frame.png'>
                                </Image>
                            }
                            <Image className="img" src={el['HeadPhoto']}></Image>
                        </View>
                        <View className="msg">
                            <View className="msg-top">
                                <Text className="txt">{el['StudentName']}</Text>
                                <Text className="time">Lv.{el['AbilityLevel']}</Text>
                            </View>
                            <View className="msg-bottom">
                                {/* <Image className="zan" src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/like_red.png'></Image> */}
                                <Text className="time">总获赞量：{el['PraiseCount']}</Text>
                            </View>
                        </View>
                    </View>
                })}
            </View>

        )
    }
}
