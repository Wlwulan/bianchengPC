import Taro, { Component } from '@tarojs/taro';
import {request} from '../../service/request.service';
import { timestampFormat, showToast } from "../../util/util";
import { View, Image, Text } from '@tarojs/components'

import ModalContainer from "../../components/ModalContainers/ModalContainers"
import ModalContainerService from "../../components/ModalContainerService/ModalContainerService"

import '../myProduct/myProduct.scss';

import { connect } from '@tarojs/redux';

@connect(({ authData, courseData, payInfoData }) => ({
    authData,
}), (dispatch) => ({
    setAuthData (data) {
        dispatch(setAuthData(data));
    },
}))

class myWorks extends Component {

    config = {
        pages: [
            'pages/myWorks/myWorks'
        ],
        navigationBarTitleText: '我的作业',
        onReachBottomDistance: 50
    };

    constructor(props) {
        super(props);
        this.state = {
            myProductList: [],      // 作品列表
            pageNum: 0,
            footerText: '',
            nothing: false,
            isShowModel: false,
            isShowEditToast: false,
            isPublished: '',        // 点击作品是否发布（0-未发布；1-发布）
            menuBtn1: [               // 菜单按钮（未发布）
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/preview.png',
                    'txt': '预览',
                    'disabled': false
                },
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/publish.png',
                    'txt': '发布',
                    'disabled': false
                },
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/change-information-gray.png',
                    'txt': '修改作品信息',
                    'disabled': true
                },
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/delete-gray.png',
                    'txt': '删除',
                    'disabled': true
                }
            ],
            menuBtn2: [               // 菜单按钮（已发布）
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/preview.png',
                    'txt': '预览',
                    'disabled': false
                },
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/undercarriage.png',
                    'txt': '下架',
                    'disabled': false
                },
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/change-information-gray.png',
                    'txt': '修改作品信息',
                    'disabled': true
                },
                {
                    'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/delete-gray.png',
                    'txt': '删除',
                    'disabled': true
                }
            ],
            modalSwitch: '',     // 弹框（1-点击灰色按钮；2-下架确认；3-删除确认）
            currentIndex: ''
        };
    }



    componentDidShow (){
        this.getMyProductList();
    }

    // onHide
    componentDidHide() {
        this.state.isShowModel = false;
        this.state.myProductList = [];
        this.state.pageNum = 0;
        this.state.isShowEditToast = false;
    }

    // onUnload
    componentWillUnmount() {

    }

    onReachBottom() {
        console.log('上拉/')
        this.getMyProductList();
    }

    toggleModel = () => {       // 关闭弹窗
        this.setState({
            isShowModel: !this.state.isShowModel,
        })
    };
    listMenu = (i) => {         // 点击列表作品
        console.log(this.state.myProductList[i].Showstate);
        this.setState({
            isShowEditToast: true,
            // isPublished: this.state.myProductList[i].showStatus
            isPublished: this.state.myProductList[i].Showstate,
            workId: this.state.myProductList[i].Worksid,
            currentIndex: i
        })
    }
    cancel() {                  // 取消菜单编辑
        this.setState({
            isShowEditToast: false
        })
    }
    getMyProductList() {        // 获取作品列表
        this.setState({pageNum: this.state.pageNum + 1 },() => {

            request('/v1/littleApp/getUserWorksList', {
                method: 'POST',
                data:{
                    token: this.props.authData.token,
                    pageNum: this.state.pageNum,
                    workType: 1
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            }).then((res)=>{
                console.log('个人作品', res);
                if(res && res.length){
                    this.setState({
                        myProductList : this.state.myProductList.concat(res)
                    })
                }else if(this.state.pageNum !== 1) {
                    this.setState({
                        footerText: '没有更多作品了'
                    })
                }else if(this.state.pageNum === 1) {
                    this.setState({
                        footerText: '您还没有完成作业哦，快去完成自己的第一份作业吧！',
                        nothing: true
                    })
                }

                if(res && res.length < 20) {
                    this.setState({
                        footerText: '没有更多作品了'
                    })
                }else if(res && res.length === 20) {
                    this.setState({
                        footerText: '上拉加载更多...'
                    })
                }

            })
        });
    };

    operateWork(operation) {            // 编辑作品（0-下架；1-发布；2-删除）
        request('/v1/littleApp/operateWork', {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                token: this.props.authData.token,
                workId: this.state.workId,
                operation: operation
            }
        }).then(res => {
            console.log('operateWork', res);
            let toastTit = '';
            let myProductList = this.state.myProductList;
            switch (operation) {
                case 0:
                    toastTit = '下架成功';
                    this.setState({
                        isShowModel: false
                    });

                    myProductList[this.state.currentIndex].Showstate = 0;
                    this.setState({
                        myProductList: myProductList,
                        isPublished: false
                    })
                    break;
                case 1:
                    toastTit = '发布成功';
                    myProductList[this.state.currentIndex].Showstate = 1;
                    this.setState({
                        myProductList: myProductList,
                        isPublished: true
                    })
                    break;
                case 2:
                    toastTit = '删除成功';
                    myProductList.splice(this.state.currentIndex, 1);
                    this.setState({
                        myProductList: myProductList,
                        isShowModel: false
                    });

            }
            showToast(toastTit)
        });
    }

    select = (el, i) => {       // 点击菜单按钮
        console.log(el, i);
        if(el.disabled) {       // 不可点击
            this.setState({
                isShowModel: true,
                modalSwitch: 1
            })
            return;
        }
        if(i === 0) {           // 预览
            Taro.navigateTo({
                url: '/pages/webView/webView?pageName=index&id=' + this.state.workId
            })
        }else if(i === 1) {     // 发布/下架
            let isPublished = this.state.isPublished;
            if(isPublished) {   // 已发布，需下架
                this.setState({
                    isShowModel: true,
                    modalSwitch: 2
                })
            }else {                             // 未发布，需上架
                // let operation = isPublished ? 1 : 0
                this.operateWork(1)
            }
        }
    }
    render() {

        return (
            <View className='myProduct'>
                {this.state.myProductList.map((el, i) => {
                    let date = timestampFormat(el.UpdateTime);
                    return <View key={i} className="li" onClick={this.listMenu.bind(this, i)}>
                        <Image className={el.Showstate ? 'on-load' : 'under-load'}></Image>
                        <Image className="img" src={el.Worksimage}></Image>
                        <View className="msg">
                            <View className="msg-top">
                                <Text className="txt">{el.Worksname}</Text>
                                <Text className="time">{date}</Text>
                            </View>
                            <View className="msg-bottom">
                                <Image className="zan" src='https://appd.knowbox.cn/ss/miniapp/ele_game_register/like_red.png'></Image>
                                <Text className="time">{el.Praisecount}</Text>
                            </View>
                        </View>
                    </View>
                })}
                <View className={'getMore ' + (this.state.nothing ? 'nothing' : '')}>{ footerText }</View>

                {this.state.isShowEditToast
                && <View className="editToast">
                    <View className="blank" onClick={this.cancel}></View>
                    <View className="select">
                        {(this.state.isPublished ? this.state.menuBtn2 : this.state.menuBtn1).map((el, i) => {
                            return <View className="menuList" key={i} onClick={this.select.bind(this, el, i)}>
                                <Image className="img" src={el.imgUrl}></Image>
                                <Text className={ el.disabled ? 'published' : '' }>{ el.txt }</Text>
                            </View>
                        })}
                    </View>
                    <View className="cancel" onClick={this.cancel}>取消</View>
                </View>
                }


                <ModalContainer isShow={isShowModel}>
                    <ModalContainerService onCloseModal={this.toggleModel.bind(this)} top={-160}>
                        {(this.state.modalSwitch === 1)
                        && <View>
                            <View className="modal-tit">温馨提示</View>
                            <View className="modal-con">暂未开放，敬请期待</View>
                            <View className="modal-btn" onClick={this.toggleModel}>我知道了</View>
                        </View>
                        }
                        {(this.state.modalSwitch === 2)
                        && <View>
                            <View className="modal-tit">温馨提示</View>
                            <View className="modal-con">是否确认下架作品？作品下架后将其他用户将不能再预览该作品</View>
                            <View className="modal-btn2">
                                <Button className="modal-btn2-left" onClick={this.toggleModel}>取消</Button>
                                <Button className="modal-btn2-right" onClick={this.operateWork.bind(this,0)}>确认</Button>
                            </View>
                        </View>
                        }

                    </ModalContainerService>
                </ModalContainer>
            </View>
        )
    }
}
//
// export default myProduct as ComponentClass<PageOwnProps, PageState>
