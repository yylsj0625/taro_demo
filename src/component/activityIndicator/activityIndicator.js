import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator  } from 'taro-ui'
import './index.scss'

export default class Activity extends Component{
  render() {
    return (
      <View className='activity_wrapper'>
        <AtActivityIndicator className='indicator' mode='center' size={this.props.size} color={this.props.color} content={this.props.content} />
      </View>
    )
  }
}
Activity.defaultProps = {
   size: 50,
   color: '#346FC2',
   content: '正在努力加载内容'
}
