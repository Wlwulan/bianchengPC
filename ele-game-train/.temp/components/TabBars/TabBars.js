import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Text } from '@tarojs/components';
import './TabBars.scss';
import { connect } from "@tarojs/redux-h5";
import { setCurrentTab } from "../../actions/globalData";

@connect(({ globalData }) => ({
  globalData
}), dispatch => ({
  setCurrentTab(data) {
    dispatch(setCurrentTab(data));
  }
}))
class tabBar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    currentId: 0
  };
  componentWillMount() {}
  handleIndex(index) {
    this.setState({
      currentId: index
    });
    this.props.setCurrentTab(index);
    Taro.setNavigationBarTitle({
      title: this.props.list[index]
    });
  }
  render() {
    const currentId = this.state.currentId;
    const listItems = this.props.list.map((el, index) => {
      return <Text key={index} className={`li ${currentId == index && 'active'}`} onClick={this.handleIndex.bind(this, index)}>{el}</Text>;
    });
    return <View>
                <View className="tabBar">
                    {listItems}
                </View>
            </View>;
  }
}