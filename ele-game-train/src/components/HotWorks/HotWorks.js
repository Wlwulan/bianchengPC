import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import WEB_API from '../../config/url';
import HotWork from "../HotWork/HotWork"
import { timestampFormat, paging } from "../../util/util"
import './HotWorks.scss'
class HotWorks extends Component {
	constructor(props) {
        super(props);
    }
	state = {
	}
	componentWillMount() {
        wx.reportAnalytics('hotworks_onload', {
        });
	}
	componentWillReceiveProps(nextProps){	
	}
	componentWillUnmount(){
    }
	render() {
		const {rankList}= this.props;
		const videos = rankList && rankList.map((el, i) => {
			return <View className="hot-work" key={i}>
				<HotWork
					userInfo={{
						src: el['headPhoto'],
						name: el['authorName'],
						level: el['abilityLevel'],
						studentId: el['studentId']
					}}
					workImage={el['workImage']}
					likeNum={el['praiseCount']}
					time={timestampFormat(el['createDate'])}
					title={el['workName']}
					workerId={el['workId']}
				>
					<Text className={`ranking ${'active-' + i}`}>No.{i + 1}</Text>
				</HotWork>
			</View>
		})
		return (
			<View >
				<View className="index">
					{videos}
				</View>
			</View>
		)
	}
}

// export default HotWorks as ComponentClass<PageOwnProps, {}>