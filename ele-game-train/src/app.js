import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import gio from './util/gio-minp'
import { Provider, connect } from '@tarojs/redux'
import Index from './pages/works'
import configStore from './store'
import {
  setRouterParams
} from './actions/routerParams';

gio('init', '804ab161f8d7bdf5', 'wx543b1c372161fcab', {
  version: '1.0',
  taro: Taro
});

const store = configStore();
@connect(() => ({

}), (dispatch) => ({
  setRouterParams(data) {
    dispatch(setRouterParams(data));
  }
}))
class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/works/works',
      'pages/payV2/payV2',
      'pages/payChoice/payChoice',
      'pages/paySuccess/paySuccess',
      'pages/creatClass/creatClass',
      'pages/personal/personal',
      'pages/editProduct/editProduct',
      'pages/likeNotifications/likeNotifications',
      'pages/myProduct/myProduct',
      'pages/webView/webView',
      'pages/history/history',
      'pages/myFavor/myFavor',
      'pages/authorize/authorize',
      'pages/myWorks/myWorks',
      "pages/protocol/protocol"
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "color":"#a5a5a5",
      "selectedColor": "#5ca7ff",
      "list": [{
        "pagePath": "pages/works/works",
        "text": "作品集",
        "iconPath": "static/images/tabBar_default1.png",
        "selectedIconPath": "static/images/tabBar_selected1.png"
      }, {
        "pagePath": "pages/creatClass/creatClass",
        "text": "创作课堂",
        "iconPath": "static/images/tabBar_default2.png",
        "selectedIconPath": "static/images/tabBar_selected2.png"
      }, {
        "pagePath": "pages/personal/personal",
        "text": "我的创作",
        "iconPath": "static/images/tabBar_default3.png",
        "selectedIconPath": "static/images/tabBar_selected3.png"
      }]
    },
    onReachBottomDistance:80,
  }
  constructor() {
    super();
  }
  componentWillMount(){

  }
  componentDidMount() {}

  componentDidShow() {
    const params = this.$router.params;//获取所有参数
    if (JSON.stringify(params.query)==="{}") return;
    this.props.setRouterParams(params);
  }
  componentDidHide() { }

  componentCatchError() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
