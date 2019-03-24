import Taro, { Component } from '@tarojs/taro'
import {View, Text } from '@tarojs/components'

import { AtIcon } from 'taro-ui'

import './index.scss'

export default class NetError extends Component{
  render() {
    return(
      <View className='error_net'>
        <View className='error_text'>
          <AtIcon size={50} value='streaming' color='#bfbfbf' />
          <View>
            <Text>网络故障请稍后重试！</Text>
          </View>
        </View>
      </View>
    )
  }
}
