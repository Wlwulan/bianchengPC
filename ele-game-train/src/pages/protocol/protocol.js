import Taro , { Component } from '@tarojs/taro';
class protocol extends Component {
    constructor(props) {
        super(props)
    }
    config = {
        pages: [
            'pages/webView/webView'
        ]
    };
    render() {
        return (
            <WebView src='https://ssweb.knowbox.cn/protocol/little-elephant-coding.html '></WebView>
        )
    }
}