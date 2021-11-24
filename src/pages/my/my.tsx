import { Component } from "react";
import { View, Text } from "@tarojs/components";

export default class my extends Component {
	constructor(props) {
		super(props);
		console.log('构造器', props);
		console.log('构造器', new.target.name);
	}
	state = {
		name: 'jack',
	}
	componentWillMount() {
		console.log('componentWillMount', this.state.name);
	}

	componentDidMount() {
		console.log('componentDidMount', this);
	}

	componentWillUnmount() {
		console.log('componentWillUnmount', this);
	}

	componentDidShow() {
		console.log('显示');
	}

	componentDidHide() {
		console.log('隐藏');
	}
	render() {
		console.log('执行render');
		return(
			<View>
				<Text>我的页面</Text>
			</View>
		)
	}
}