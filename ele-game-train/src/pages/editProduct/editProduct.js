import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import {request} from '../../service/request.service';
import { View, Image, Text, Input, Textarea, Button, Form } from '@tarojs/components'
import { showToast } from '../../util/util';

import ModalContainer from "../../components/ModalContainers/ModalContainers"
import ModalContainerService from "../../components/ModalContainerService/ModalContainerService"

import './editProduct.scss'

import { connect } from '@tarojs/redux';
import { setAuthData } from '../../actions/auth';
import { setProductInfo } from '../../actions/productInfo';

@connect(({ authData, productInfo }) => ({
    authData,
    productInfo
}), (dispatch) => ({
    setAuthData (data) {
        dispatch(setAuthData(data));
    },
    setProductInfo (data) {
        dispatch(setProductInfo(data));
    }
}))

class editProduct extends Component {
    config = {
        pages: [
            'pages/editProduct/editProduct'
        ],
        navigationBarTitleText: '修改作品信息'
    }
    constructor(props) {
        super(props);
        this.state = {
            isShowModel: false
        }
    }


    componentDidShow () {

    }

    reSure (e) {
        let value = e.detail.value;
        console.log(value);
        request('/v1/littleApp/modifyWork', {
            method: 'POST',
            data:{
                token: this.props.authData.token,
                workId: this.$router.params.workId,
                workName: value.workName,
                summary: value.summary
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then((res)=> {
            showToast('修改作品信息成功')
            this.setState({
                isShowModel: false,
                transparent: false
            })
            setTimeout(() => {
                Taro.navigateBack({
                    delta: 1
                })
            }, 2000)
        })
    }
    cancel() {
        this.setState({
            isShowModel: !this.state.isShowModel,
        })
        Taro.navigateBack({
            delta: 1
        })
    }
    toggleModel = () => {       // 关闭弹窗
        this.setState({
            isShowModel: !this.state.isShowModel,
            transparent: true
        })
    };
    render() {

        return (
            <View>
                <Form className='editProduct' onSubmit={this.reSure}>
                    <Text className="title-1">我的作品</Text>
                    <Input
                        name='workName'
                        className=""
                        value={this.props.productInfo.workName}
                    />
                    <Text className="title-2">作品简介</Text>
                    <View className="edit-con">
                        <Textarea
                            name='summary'
                            className={this.state.transparent ? 'edit-ctn-transparent' : ''}
                            value={this.props.productInfo.comment}
                            placeholderClass={this.state.transparent ? 'edit-ctn-transparent' : ''}
                        />
                    </View>


                    <View className="btn">
                        <Button className="btn-cancel" onClick={this.toggleModel}>取消</Button>
                        <Button formType="submit" className="btn-submit">确认</Button>
                    </View>
                    <ModalContainer isShow={isShowModel}>
                        <ModalContainerService onCloseModal={this.toggleModel.bind(this)} top={-160}>
                            <View className="modal-tit">温馨提示</View>
                            <View className="modal-con">作品名或作品简介内容已经修改，是否需要保存？</View>
                            <View className="modal-btn2">
                                <Button className="modal-btn2-left" onClick={this.cancel}>取消</Button>
                                <Button className="modal-btn2-right" formType="submit">确认</Button>
                            </View>
                        </ModalContainerService>
                    </ModalContainer>
                </Form>
            </View>

        )
    }
}

// export default editProduct as ComponentClass<PageOwnProps, PageState>
