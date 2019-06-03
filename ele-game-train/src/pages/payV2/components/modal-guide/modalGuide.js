import Taro, { Component } from '@tarojs/taro';
import Guide from '../guide/guide';

import '../modal.scss';

class ModalGuide extends Component {
    constructor(props) {
        super(props);
    }

    closeModal() {
        Taro.eventCenter.trigger('modalCloseEvent', 'isModalGuideShow');
    }

    render() {
        return (
            <View className="modal-wrapper">
                <View className="modal-container modal-guide">
                    <View
                        className="modal-btn-close"
                        onClick={this.closeModal}
                    ></View>
                    <View className="title">{this.props.title}</View>
                    <Guide></Guide>
                </View>
            </View>
        );
    }
}

export default ModalGuide;
