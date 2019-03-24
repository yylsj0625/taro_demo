import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class CardItem extends Component{
  render() {
    const { cardData } = this.props
    return (
        <View className='card' onClick={this.props.onhandleClick}>
          <View className='card_header'>
            <View className='card_img_box'>
              <Image className='card_img' src={cardData.author.avatar_url}></Image>
            </View>
            <Text>{cardData.author.loginname}</Text>
          </View>
          <View className='card_content'>
            <Text>{cardData.title}</Text>
          </View>
          <View className='card_footer'>
            <Text>{`${cardData.reply_count}/${cardData.visit_count}`}</Text>
            <Text>{cardData.last_reply_at ? cardData.last_reply_at.split('T')[0] : null}</Text>
          </View>
        </View>
    )
  }
}
CardItem.defaultProps = {
  cardData: {}
}
