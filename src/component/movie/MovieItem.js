import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'

import './index.scss'

export default class MovieItem extends Component{
  render() {
    const { movieData } = this.props
    return (
      <View className='movie_item' onClick={this.props.onhandleClick}>
        <Image src={movieData.img} className='movie_img' />
        <View className='title'>
          <Text>{movieData.title}</Text>
        </View>
        <View className='rate'>
          <AtRate
            max={movieData.rate}
            size={12}
            value={movieData.average / 2}
          />
          <Text className='rate_num'>{ movieData.average }分</Text>
        </View>
      </View>
    )
  }
}
MovieItem.defaultProps = {
  movieData: {

  }
}
