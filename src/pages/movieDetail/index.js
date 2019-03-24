import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Video } from '@tarojs/components'
import { AtRate, AtTag, AtButton   } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onGetMovie, } from "../../actions";
import Activity from '../../component/activityIndicator/activityIndicator'



import './index.scss'

@connect(state => state.movie, {onGetMovie})
export default class MovieDetail extends Component{
  constructor() {
    super(...arguments)
    this.state = {
      isSpread: false,
      count: 0
    }
  }
  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: this.$router.params.title
    })
    this.getData()
    this.getMovieCommit()
  }
 getData () {
   this.props.onGetMovie('subject/'+this.$router.params.id,{}, 'movieDetail',false)
 }
 getMovieCommit () {
    this.setState({
      count: this.state.count + 10
    }, () => {
      this.props.onGetMovie('subject/'+this.$router.params.id + '/comments',{count: this.state.count}, 'movieComment',false)
    })
 }
  spread () {
    this.setState({
      isSpread: !this.state.isSpread
    })
  }
  render() {
    const { movieDetail, movieComment, commentLoadingMore } = this.props
    return(
      <View>
        { movieDetail ? <View className='detail_wrapper'>
          <View className='title'>
            <Text>{movieDetail.title}</Text>
          </View>
          <View className='desc_wrapper'>
            <View className='desc_content'>
              <View className='rate_box'>
                <View className='rate'>
                  <AtRate value={movieDetail.rating.average / 2} size={15} />
                  <Text>{movieDetail.rating.average} 分</Text>
                </View>
                <View className='comment'>
                  <Text>{movieDetail.ratings_count} 评价过</Text>
                </View>
              </View>
              <View>
                <Text>{movieDetail.durations[0]}/</Text>
                {movieDetail.genres.map((i, idx) => {
                  return <Text key={idx}>{i}/</Text>
                })}
                {movieDetail.writers.map((i, idx) => {
                  return <Text key={idx}>{i.name}/</Text>
                })}
                <Text>{movieDetail.pubdates[1]}上映</Text>
              </View>
            </View>
            <View className='desc_img'>
              <Image className='img' src={movieDetail.images.large} />
            </View>
          </View>
          <View className='tags_box'>
            <View className='sub_title'>
              <Text>所属频道</Text>
            </View>
           <View className='tags_content'>
             { movieDetail.tags.map((i, idx) => {
               return <AtTag className='tag' size='small' type='primary' circle key={idx} active>{i}</AtTag>
             }) }
           </View>
          </View>
          <View className='summary'>
            <View className='sub_title'>
              <Text>简介</Text>
            </View>
            <View className='content'>
              { movieDetail ? this.state.isSpread ? <Text>{movieDetail.summary}</Text> :  <Text>{ movieDetail && movieDetail.summary.length > 50 ? movieDetail.summary.substring(0,50)+ '...' : movieDetail ?  movieDetail.summary : null }</Text> : null}
              <Text className='more' onClick={() => this.spread()}>{!this.state.isSpread ? '更多' : '收起'}</Text>
            </View>
          </View>
          {movieDetail.writers.length ?  <View className='movie_people'>
            <View className='sub_title'>
              <Text>影人</Text>
            </View>
            <ScrollView
              scrollX
            >
              <View className='photo_box'>
                {movieDetail.writers.map((item, idx) => {
                  return <View key={idx} className='people_photo'>
                    <Image className='img' src={item.avatars.large}></Image>
                    <Text>{item.name}</Text>
                  </View>
                })}
              </View>
            </ScrollView>
          </View> : null}
          {movieDetail.trailers.length ?  <View className='trailers_wrapper'>
            <View className='sub_title'>
              <Text>预告片</Text>
            </View>
            <ScrollView
              scrollX
            >
              <View className='video_box'>
                {movieDetail.trailers.map((item, idx) => {
                  return <View className='video'  key={idx} >
                    <Video title={item.title} src={item.resource_url} poster={item.medium}></Video>
                  </View>
                })}
              </View>
            </ScrollView>
          </View> : null}
          <View className='all_photo'>
            <View className='sub_title'>
              <Text>剧照</Text>
            </View>
            <ScrollView
              scrollX
            >
              <View className='photos_box'>
                {movieDetail.photos.map((item, idx) => {
                  return <View className='photo' key={idx}>
                    <Image src={item.image} className='img'></Image>
                  </View>
                })}
              </View>
            </ScrollView>
          </View>
          <View className='comment_wrapper'>
            <View className='sub_title'>
              <Text>短评（{movieComment.total}条）</Text>
            </View>
            <View className='comment_box'>
              {movieComment.comments.map((item, idx) => {
                return <View key={idx} className='comment_item'>
                  <View className='comment_avatar'>
                    <Image src={item.author.avatar} />
                  </View>
                  <View className='comment_content'>
                    <View className='name'>
                      <Text>{item.author.name}</Text>
                      <AtRate max={5} size={10} value={item.rating.value} />
                      <Text className='rate_num'>{item.rating.value}分</Text>
                    </View>
                    <View className='time'>
                      <Text>{item.created_at}</Text>
                    </View>
                    <View className='content'>
                      <Text>{item.content }</Text>
                    </View>
                  </View>
                </View>
              })}
            </View>
            {
              this.state.count > movieComment.total ?
              <AtButton type='secondary' disabled>已全部加载完毕</AtButton> :
              <AtButton onClick={() => this.getMovieCommit()} loading={commentLoadingMore} type='secondary'>{commentLoadingMore ? '正在加载' : '加载更多'}</AtButton>
            }
          </View>
        </View> : <Activity />}
      </View>
    )
  }

}
