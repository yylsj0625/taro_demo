import Taro , { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import { AtIcon, AtRate, AtTag, AtDivider }  from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onGetMovie,  onMovieDetail, onCommentLoadingMore} from "../../actions";
import Activity from '../../component/activityIndicator/activityIndicator'
import NetError from '../../component/net_error/netError'

import MovieItem from '../../component/movie/MovieItem'

import './index.scss'

@connect( state => state.movie, { onGetMovie, onMovieDetail, onCommentLoadingMore })
export default class Movie extends Component {
  config = {
    navigationBarTitleText: '豆瓣电影',
    backgroundColor:'#346FC2',
    "enablePullDownRefresh": true,
    onReachBottomDistance:50
  }
  componentDidMount() {
    this.getData()
  }
  getData (flag) {
    this.props.onGetMovie('in_theaters',{count: 30}, 'hot', flag)
    this.props.onGetMovie('weekly', {count: 30}, 'weekly', flag)
  }
  onPullDownRefresh() {
    this.getData(true)
  }
  goSearch () {
    Taro.navigateTo({
      url: '/pages/movieSearch/index'
    })
  }
  handleClick (val) {
    this.props.onMovieDetail(null)
    this.props.onCommentLoadingMore(false)
    Taro.navigateTo({
      url: '/pages/movieDetail/index?id=' + val.id + '&title=' + val.title
    })
  }
  render() {
    console.log(this.props);
    const { hotList, weeklyList, netError } = this.props
    const swiperList = hotList.subjects.length ? hotList.subjects.slice(0,5).map((item, index) => {
      return <SwiperItem className='swiper_item_wrapper' key={index} onClick={() => this.handleClick(item)}>
        <View className='swiper_item'>
          <View className='swiper_left'>
            <Image className='left_img' src={item.images.small} />
          </View>
          <View className='swiper_right'>
            <View className='title'>
              <Text>{item.title}</Text>
            </View>
            <View className='author'>
              {item.directors.map((i, idx) => {
                return <View key={idx} className='author'>
                  <Image className='author_img' src={i.avatars.small} />
                  <Text className='author_name'>{i.name}</Text>
                </View>
              })}
            </View>
            <View className='casts'>
              <Text>主演：</Text>
                {
                  item.casts.map((m, n) => {
                  return <Text key={n}> {n === item.casts.length-1 ?  m.name : m.name + '/'}</Text> })
                }
            </View>
            <View className='collect_count'>
              <Text>{item.collect_count}人看过</Text>
            </View>
            <View className='genres'>
              {item.genres.map((i ,idx) => {
                return  <AtTag key={idx} type='primary' active circle size='small'>{i}</AtTag>
              })}

            </View>
            <View className='rate'>
              <Text>评分：</Text>
              <AtRate
                max={item.rating.max / 2}
                size={15}
                value={item.rating.average / 2}
              />
              <Text className='rate_num'>{ item.rating.average }分</Text>
            </View>
          </View>
        </View>
      </SwiperItem>
    }) : null
    const renderHotList = hotList.subjects.length ? hotList.subjects.map((item, index) => {
      let movie = { img: item.images.large, title: item.title, max: item.rating.max / 2, average: item.rating.average}
      return <MovieItem movieData={movie} key={index} onhandleClick={() => this.handleClick(item)} />
    }) : null
    const weeklyLost = weeklyList.subjects.length ?  weeklyList.subjects.map((item, index) => {
      let movie = { img: item.subject.images.large, title: item.subject.title, max: item.subject.rating.max / 2, average: item.subject.rating.average}
      return <MovieItem key={index} movieData={movie} onhandleClick={() => this.handleClick(item.subject)} />
    }) : null
    return (
      <View>
        { netError ? <NetError /> :  <View>
          { hotList.subjects.length && weeklyList.subjects.length ?  <View className='movie'>
            {/*<View className='search_box' onClick={() => this.goSearch()}>*/}
              {/*<View className='search'>*/}
                {/*<AtIcon value='search' size='24' color='#f5f5f5' />*/}
                {/*<Text className='search_key'>电影名称</Text>*/}
              {/*</View>*/}
            {/*</View>*/}
            <View className='swiper'>
              <Swiper
                indicatorColor='#fff'
                indicatorActiveColor='#f60'
                circular
                indicatorDots
                autoplay
              >
                {swiperList}
              </Swiper>
            </View>
            <View className='hot'>
              <View className='list_title'>
                <Text>热门影片</Text>
                <View>
                  <Text>共{hotList.total}部</Text>
                </View>
              </View>
              <ScrollView scrollX>
                <View className='hot_wrapper'>
                  {renderHotList}
                </View>
              </ScrollView>
            </View>
            <View className='weekly'>
              <View className='title'>
                <AtDivider content='口碑榜' fontColor='#346FC2' lineColor='#346FC2' />
              </View>
              <View className='weekly_wrapper'>
                {weeklyLost}
              </View>
            </View>
          </View>  : <Activity /> }
        </View>}
      </View>
       )
  }
}
