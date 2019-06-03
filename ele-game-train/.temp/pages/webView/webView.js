import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";

import { WebView, PullDownRefresh } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import WEB_API from "../../config/url";
import { redirectTo } from '../../service/utils.service';


var shareMsg = {
  authorid: '',
  imgUrl: '',
  title: '',
  page: '',
  clockIn: false
};


@connect(({ authData, courseData, payInfoData }) => ({
  authData
}), dispatch => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  }
}))
class webView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: ''
    };
  }
  config = {
    pages: ['pages/webView/webView']
  };
  switchUrl() {
    let { pageName, authorid } = this.$router.params,
        authorId = authorid ? '&authorid=' + authorid : '',
        src = '';
    switch (pageName) {
      case 'index':
        // 预览页
        src = WEB_API.webviewUrl + 'scratch/index.html?workId=' + this.$router.params.id + '&token=' + this.props.authData.token + '&fullscreen=true&sourceh5=miniProgram' + authorId;
        break;
      case 'allworks':
        // 个人主页
        src = WEB_API.webviewUrl + 'activity/allworks/allworks.html?studentId=' + this.$router.params.id + '&token=' + this.props.authData.token + '&source=miniProgram';
    }
    this.setState({
      src: src
    });
  }

  componentWillMount() {
    this.switchUrl();
  }
  onShareAppMessage(res) {
    // console.log(res);
    const { webViewUrl } = res;
    const { page, clockIn } = shareMsg;
    const { authorid, id } = this.$router.params;
    let authorId = authorid ? '&authorid=' + authorid : '';

    switch (page) {
      case 'index':
        if (clockIn) {
          this.clockIn(webViewUrl, this.getId(webViewUrl, 'workId'));
        } else {
          setTimeout(() => {
            redirectTo('webView', `pageName=index&id=${this.getId(webViewUrl, 'workId')}&${authorId}`);
          }, 2000);
        }
        return {
          title: shareMsg.title,
          path: '/pages/index/index?id=' + this.getId(webViewUrl, 'workId') + '&source=index' + shareMsg.authorid,
          imageUrl: shareMsg.imgUrl
        };
        break;
      case 'allworks':
        setTimeout(() => {
          redirectTo('webView', `pageName=allworks&id=${this.getId(webViewUrl, 'studentId')}`);
        }, 2000);
        return {
          title: shareMsg.title,
          path: '/pages/index/index?id=' + this.getId(webViewUrl, 'studentId') + '&source=allworks',
          imageUrl: shareMsg.imgUrl

        };
        break;
    }
  }
  clockIn(webViewUrl, id) {
    const url = '/v1/homework/clockIn';
    Taro.request({
      method: 'POST',
      url: WEB_API.baseUrl + url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        token: this.props.authData.token,
        workId: this.getId(webViewUrl, 'workId')
      }
    }).then(res => {
      redirectTo('webView', `pageName=index&id=${id}`);
    });
  }

  getId(url, name) {
    const index = url.indexOf('?');
    const params = url.substring(index + 1, url.length);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = params.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  handleMsg(e) {
    const data = e.detail.data[e.detail.data.length - 1];
    const { imgUrl, title, page } = data;
    let authorid = '';
    let clockIn = false;

    if (data.authorid) {
      authorid = data.authorid;
    };
    if (data.clockIn) {
      clockIn = data.clockIn;
    };
    shareMsg = {
      authorid: authorid ? '&authorid=' + authorid : '',
      imgUrl,
      title,
      page,
      clockIn
    };
  }
  render() {
    return <WebView src={this.state.src} onMessage={this.handleMsg}></WebView>;
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

}