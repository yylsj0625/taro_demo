import Taro, { Component } from '@tarojs/taro'
import { View, Text, WebView, Image  } from '@tarojs/components'
import HttpUtil from '../../service/httpUtil'
import { getTopicDetail, WEB_URL } from "../../service/api";
import WxParse from '../../component/wxParse/wxParse'
import Activity from '../../component/activityIndicator/activityIndicator'

import './index.scss'

const http = new HttpUtil()
export default class DetailPage  extends Component{
  constructor() {
    super(...arguments);
    this.state = {
      pageData: null,
      url: null
    }
  }
 config = {
   navigationBarTitleText: '正在加载'
 }
  componentDidMount() {
    this.setState({
      url: WEB_URL + 'topic/' + this.$router.params.id
    })
    // 请求页面数据
    this.getData()
  }
  getData () {
    http.httpRequest(getTopicDetail + this.$router.params.id).then(res => {
      if (res.statusCode === 200) {
        Taro.setNavigationBarTitle({
          title: res.data.data.title
        })
        this.setState({
          pageData: res.data.data
        })
        WxParse.wxParse('article', 'md', res.data.data.content, this.$scope, 5)
      }
    })
  }
  render() {
    const { pageData, url } = this.state
    return(
      <View className='detail_page'>
        {/*方法一： 使用html解析*/}
        { pageData ? <View>
          <View className='detail_title'>
            <Image className='avatar_img' src={pageData.author.avatar_url} />
            <View  className='name'>
              <Text>{pageData.title}</Text>
            </View>
            <View className='desc'>
              <Text>{pageData.author.loginname}/</Text>
              <Text>{pageData && pageData.create_at ? pageData.create_at.split('T')[0] : null}</Text>
            </View>
          </View>
          <View>
            <import src='../../component/wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}'></template>
          </View>
        </View>  : <Activity /> }
        {/*方法二： 使用webView*/}
        {/*{ url ? <WebView src={url} /> : <Activity />}*/}
      </View>
    )
  }
}
