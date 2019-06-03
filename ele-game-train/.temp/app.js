import '@tarojs/async-await';
import { Component } from "@tarojs/taro-h5";
import Nerv, { Config } from "nervjs";
import gio from "./util/gio-minp";
import { Provider, connect } from "@tarojs/redux-h5";

import configStore from "./store/index";
import { setRouterParams } from "./actions/routerParams";

import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import Taro from '@tarojs/taro-h5';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/pages/index/index"
});

mountApis(_taroHistory);
gio('init', '804ab161f8d7bdf5', 'wx543b1c372161fcab', {
  version: '1.0',
  taro: Taro
});

const store = configStore();

@connect(() => ({}), dispatch => ({
  setRouterParams(data) {
    dispatch(setRouterParams(data));
  }
}))
class App extends Component {
  state = {
    __tabs: {
      "color": "#a5a5a5",
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
      }],
      mode: "hash",
      basename: "/",
      customRoutes: {}
    }
  };

  config = {
    pages: ["/pages/index/index", "/pages/works/works", "/pages/payV2/payV2", "/pages/payChoice/payChoice", "/pages/paySuccess/paySuccess", "/pages/creatClass/creatClass", "/pages/personal/personal", "/pages/editProduct/editProduct", "/pages/likeNotifications/likeNotifications", "/pages/myProduct/myProduct", "/pages/webView/webView", "/pages/history/history", "/pages/myFavor/myFavor", "/pages/authorize/authorize", "/pages/myWorks/myWorks", "/pages/protocol/protocol"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    },
    "tabBar": { "color": "#a5a5a5", "selectedColor": "#5ca7ff", "list": [{ "pagePath": "pages/works/works", "text": "作品集", "iconPath": "static/images/tabBar_default1.png", "selectedIconPath": "static/images/tabBar_selected1.png" }, { "pagePath": "pages/creatClass/creatClass", "text": "创作课堂", "iconPath": "static/images/tabBar_default2.png", "selectedIconPath": "static/images/tabBar_selected2.png" }, { "pagePath": "pages/personal/personal", "text": "我的创作", "iconPath": "static/images/tabBar_default3.png", "selectedIconPath": "static/images/tabBar_selected3.png" }], mode: "hash",
      basename: "/",
      customRoutes: {}
    },
    onReachBottomDistance: 80
  };
  constructor() {
    super();
    Taro._$app = this;
  }
  componentWillMount() {
    Taro.initTabBarApis(this, Taro);
  }
  componentDidMount() {
    this.componentDidShow();
  }

  componentDidShow() {
    const params = this.$router.params; //获取所有参数
    if (JSON.stringify(params.query) === "{}") return;
    this.props.setRouterParams(params);
  }
  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>
                
                <TabbarContainer>

                  <TabbarPanel>
                    
            <Router history={_taroHistory} routes={[{
            path: '/pages/index/index',
            componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
            isIndex: true
          }, {
            path: '/pages/works/works',
            componentLoader: () => import( /* webpackChunkName: "works_works" */'./pages/works/works'),
            isIndex: false
          }, {
            path: '/pages/payV2/payV2',
            componentLoader: () => import( /* webpackChunkName: "payV2_payV2" */'./pages/payV2/payV2'),
            isIndex: false
          }, {
            path: '/pages/payChoice/payChoice',
            componentLoader: () => import( /* webpackChunkName: "payChoice_payChoice" */'./pages/payChoice/payChoice'),
            isIndex: false
          }, {
            path: '/pages/paySuccess/paySuccess',
            componentLoader: () => import( /* webpackChunkName: "paySuccess_paySuccess" */'./pages/paySuccess/paySuccess'),
            isIndex: false
          }, {
            path: '/pages/creatClass/creatClass',
            componentLoader: () => import( /* webpackChunkName: "creatClass_creatClass" */'./pages/creatClass/creatClass'),
            isIndex: false
          }, {
            path: '/pages/personal/personal',
            componentLoader: () => import( /* webpackChunkName: "personal_personal" */'./pages/personal/personal'),
            isIndex: false
          }, {
            path: '/pages/editProduct/editProduct',
            componentLoader: () => import( /* webpackChunkName: "editProduct_editProduct" */'./pages/editProduct/editProduct'),
            isIndex: false
          }, {
            path: '/pages/likeNotifications/likeNotifications',
            componentLoader: () => import( /* webpackChunkName: "likeNotifications_likeNotifications" */'./pages/likeNotifications/likeNotifications'),
            isIndex: false
          }, {
            path: '/pages/myProduct/myProduct',
            componentLoader: () => import( /* webpackChunkName: "myProduct_myProduct" */'./pages/myProduct/myProduct'),
            isIndex: false
          }, {
            path: '/pages/webView/webView',
            componentLoader: () => import( /* webpackChunkName: "webView_webView" */'./pages/webView/webView'),
            isIndex: false
          }, {
            path: '/pages/history/history',
            componentLoader: () => import( /* webpackChunkName: "history_history" */'./pages/history/history'),
            isIndex: false
          }, {
            path: '/pages/myFavor/myFavor',
            componentLoader: () => import( /* webpackChunkName: "myFavor_myFavor" */'./pages/myFavor/myFavor'),
            isIndex: false
          }, {
            path: '/pages/authorize/authorize',
            componentLoader: () => import( /* webpackChunkName: "authorize_authorize" */'./pages/authorize/authorize'),
            isIndex: false
          }, {
            path: '/pages/myWorks/myWorks',
            componentLoader: () => import( /* webpackChunkName: "myWorks_myWorks" */'./pages/myWorks/myWorks'),
            isIndex: false
          }, {
            path: '/pages/protocol/protocol',
            componentLoader: () => import( /* webpackChunkName: "protocol_protocol" */'./pages/protocol/protocol'),
            isIndex: false
          }]} customRoutes={{}} />
            
                  </TabbarPanel>

                  <Tabbar conf={this.state.__tabs} homePage="pages/index/index" router={Taro} />

                </TabbarContainer>
              </Provider>;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

}

Nerv.render(<App />, document.getElementById('app'));