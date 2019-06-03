import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { connect } from "@tarojs/redux-h5";
import { doPay, advertBack } from '../../../../service/api.service';
import { redirectTo } from '../../../../service/utils.service';

import '../modal.scss';

@connect(({ authData, courseData }) => ({
  authData,
  courseData
}), dispatch => ({}))
class ModalPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellphone: '',
      isCellphoneValid: false,
      inPurchasing: false
    };
  }

  // 检测手机输入
  handleCellPhoneInput(e) {
    const cellPhoneRegExp = /^1[3|4|5|8][0-9]\d{4,8}$/;
    const val = e.detail.value;
    if (val.length === 11 && cellPhoneRegExp.test(val)) {
      this.setState({
        isCellphoneValid: true,
        cellphone: val
      });
    } else {
      this.setState({ isCellphoneValid: false });
    }
  }

  async handleDoPay() {
    const { openid, token } = this.props.authData;
    const phaseId = this.props.courseData[0].PhaseList[0].Phaseid;
    const { inPurchasing } = this.state;

    if (inPurchasing) return;
    this.setState({ inPurchasing: true });
    const resp = await doPay({
      phaseId,
      token,
      openId: openid,
      mobile: this.state.cellphone
    });
    if (this.props.gdt_vid && this.props.adId) {
      await advertBack({
        orderId: resp.orderId,
        adId: this.props.adId,
        clickId: this.props.gdt_vid
      });
    }
    Taro.requestPayment({ ...resp }).then(() => {
      redirectTo('paySuccess');
    }, () => {
      this.setState({ inPurchasing: false });
    });
  }

  closeModal() {
    Taro.eventCenter.trigger('modalCloseEvent', 'isModalPayShow');
  }

  render() {
    return <View className="modal-wrapper">
                <View className="modal-container modal-pay">
                    <View className="modal-btn-close" onClick={this.closeModal}></View>
                    <View className="title">家长手机号</View>
                    <Input className="input-cellphone" type="number" placeholder="请输入家长的手机号" value={this.state.cellphone} onInput={this.handleCellPhoneInput} />
                    <Button className="btn-pay" disabled={!this.state.isCellphoneValid} onClick={this.handleDoPay}>立即支付</Button>
                </View>
            </View>;
  }
}

export default ModalPay;