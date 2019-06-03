import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';

import { doPay, advertBack } from '../../service/api.service';

import './payChoice.scss';
import {
    redirectTo,
    formatTime,
    navigateTo
} from "../../service/utils.service";

@connect(({ authData, courseData }) => ({
    authData,
    courseData
}), (dispatch) => ({

}))

class PayChoice extends Component {
    config = {
        pages: [
            'pages/payChoice/payChoice'
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            cellphone: '',
            isCellphoneValid: false,
            activeClassId: '',
            activeTimeId: '',
            productListData: [],
            inPurchasing: false,
            isCheckedProtocol: true
        };
    }

    // onLoad
    async componentWillMount() {
        const courseData = this.props.courseData;
        this.setState({
            productListData: courseData,
            activeClassId: courseData[0].GroupId,
            activeTimeId: courseData[0].PhaseList[0].Phaseid
        });
    }

    // onReady
    componentDidMount() { }

    // onShow
    componentDidShow() { }

    // onHide
    componentDidHide() { }

    // onUnload
    componentWillUnmount() { }

    // 检测手机输入
    handleCellPhoneInput(e) {
        const cellPhoneRegExp = /^1[3|4|5|8][0-9]\d{4,8}$/;
        const val = e.detail.value;
        if(val.length === 11 && cellPhoneRegExp.test(val)) {
            this.setState({
                isCellphoneValid: true,
                cellphone: val
            });
        } else {
            this.setState({isCellphoneValid: false});
        }
    }

    handleClassSelected(e) {
        const {id, timeId} = e.currentTarget.dataset;
        if(id === this.state.activeClassId) return;
        this.setState({
            activeClassId: id,
            activeTimeId: timeId
        });
    }

    handleTimeSelected(e) {
        const {id} = e.currentTarget.dataset;
        if(id === this.state.activeTimeId) return;
        this.setState({activeTimeId: id});
    }

    filterTimeList() {
        const timeList = this.state.productListData.find(item => {
            return item.GroupId === this.state.activeClassId;
        });

        return (timeList ? timeList.PhaseList : []);
    }

    async handleDoPay() {
        const {cellphone, activeTimeId, inPurchasing} = this.state;
        const {token, openid} = this.props.authData;
        if(inPurchasing) return;
        this.setState({inPurchasing: true});
        const resp = await doPay({
            phaseId: activeTimeId,
            mobile: cellphone,
            openId: openid,
            token
        });
        const {gdt_vid, adId} = this.$router.params;
        if (gdt_vid && adId) {
            await advertBack({
                orderId: resp.orderId,
                adId: adId,
                clickId: gdt_vid
            })
        }
        Taro.requestPayment({...resp}).then(() => {
            redirectTo('paySuccess');
        }, () => {
            this.setState({inPurchasing: false});
        });
    }
    handleCheckboxChange (e){
        this.setState({isCheckedProtocol: e.detail.value.length == 0 ? false : true}) 
    }
    toProtocol(){
        navigateTo('protocol');
    }
    render() {
        const classList = this.state.productListData.map(item => {
            return (
                <View
                    className={'choice-item choice-item--class ' + (item.GroupId === this.state.activeClassId ? 'choice-item--active' : '')}
                    data-id={item.GroupId}
                    data-time-id={item.PhaseList[0].Phaseid}
                    key={item.GroupId}
                    onClick={this.handleClassSelected}
                >
                    <Text>{item.GroupName}</Text>
                </View>
            );
        });

        const timeList = this.filterTimeList().map(item => {
            return (
                <View
                    className={'choice-item choice-item--time ' + (item.Phaseid === this.state.activeTimeId ? 'choice-item--active' : '')}
                    data-id={item.Phaseid}
                    key={item.Phaseid}
                    onClick={this.handleTimeSelected}
                >
                    <Text
                        space="emsp"
                        decode={true}
                    >{item.Phasename}&middot;{formatTime(item.Starttime)}开课&middot;{item.Summary}</Text>
                </View>
            );
        });

        return (
            <View className="wrapper">
                <View className="choice-content">
                    <View className="title">
                        <Text>1.选择班级类型</Text>
                    </View>
                    <View>{classList}</View>
                </View>

                <View className="choice-content">
                    <View className="title">
                        <Text>2.选择上课时间</Text>
                    </View>
                    <View>{timeList}</View>
                </View>

                <View className="choice-content">
                    <View className="title">
                        <Text>3.填写家长手机号</Text>
                    </View>

                    <View>
                        <Input
                            type="number"
                            maxLength="11"
                            className="input-cellphone"
                            placeholderClass="input-cellphone--placeholder"
                            placeholder="手机号仅用于开通课程，无电话销售"
                            value={this.state.cellphone}
                            onInput={this.handleCellPhoneInput}
                        />
                    </View>
                </View>
                <View className="footer">
                    <View className="checkbox-wrap">
                        <CheckboxGroup class="checkbox-group" onChange={this.handleCheckboxChange}>
                            <Label>
                                <Checkbox value="protocol" checked/>
                            </Label>
                        </CheckboxGroup>
                        <Text>购买前我已阅读:</Text>
                        <Text className="toProtocol" onClick={this.toProtocol}>
                            《用户需知和守候服务条款》
                        </Text>                        
                    </View>
                    <Button
                        className="pay-btn"
                        disabled={!(this.state.isCellphoneValid && this.state.isCheckedProtocol)}
                        onClick={this.handleDoPay}
                    >立即支付</Button>                    
                </View>

            </View>
        );
    }
}
