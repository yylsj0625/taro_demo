import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtToast, AtActivityIndicator  } from 'taro-ui'
import { getTopics } from "../../service/api";
import HttpUtil from '../../service/httpUtil'
import Card from '../../component/card/card'
import Activity from '../../component/activityIndicator/activityIndicator'


import './index.scss'

const http = new HttpUtil()
class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      renderData: [],
      tab: '',
      page: 1,
      limit: 10,
      isFixed: false
    }
  }
  config = {
    navigationBarTitleText: 'node社区',
    backgroundColor:'#346FC2',
    "enablePullDownRefresh": true,
    onReachBottomDistance:50
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getData({page: 1, limit: 10}, 'refresh')
  }
 getData (params,type, flag=false) {
   http.httpRequest(getTopics, { ...params}).then(res => {
     if (res.statusCode === 200) {
       if (type === 'refresh') {
         this.setState({
           renderData: res.data.data
         })
       } else {
         this.setState({
           renderData: [ ...this.state.renderData,...res.data.data]
         })
       }
       if (flag) {
         Taro.stopPullDownRefresh()
       }
     }
   })
 }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh () {
    this.getData({tab: this.state.tab, page: 1, limit: 10}, 'refresh', true)
  }
   onReachBottom () {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.getData({tab: this.state.tab, page: this.state.page, limit: this.state.limit}, 'onload')
    })

  }
  handleTab (val, idx) {
    this.setState({
      current: idx,
      tab: val.id,
      renderData: [],
      page: 1
    }, () => {
      this.getData({tab: val.id, page: 1, limit: 10})
    })
  }
  gotoDetail (val) {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + val.id
    })
  }
  onPageScroll(event) {
      this.setState({
        isFixed: event.scrollTop > 0
    })
  }
  render () {
    const tabList = [{ title: '全部', id: '' }, { title: '精华', id: 'good' }, { title: '分享', id: 'share' }, { title: '问答', id: 'ask' }, { title: '招聘', id: 'job' }, { title: '客户端测试', id: 'dev' }]
    return (
      <View className='list_wrapper'>
        <View className={this.state.isFixed ? 'tab_box tab_fixed' : 'tab_box'}>
          {tabList.map((item, index) => {
            return <View key={index} className={this.state.current === index ?  'tab_item tab_item_active' : 'tab_item'} onClick={() => this.handleTab(item, index)}>
              <Text>{item.title}</Text>
            </View>
          })}
        </View>
        <ScrollView
          scrollY
        >
          <View className='list_box'>
            { this.state.renderData.length ? this.state.renderData.map((i, index) => {
              return <Card cardData={i} key={index} onhandleClick={() => this.gotoDetail(i)} />
            }) : <Activity /> }
          </View>
        </ScrollView>

      </View>
    )
  }
}

export default Index
