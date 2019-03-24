import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onGetMovie } from "../../actions";

const API_KEY = '0df993c66c0c636e29ecbb5344252a4a'

@connect(state => state.movie, { onGetMovie })
export default class MovieSearch extends Component{
  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  config = {
    navigationBarTitleText: '搜索',
    backgroundColor:'#346FC2'
  }
  getSearchData () {
    this.props.onGetMovie('search?q=惊奇队长', { count: 10}, 'search', false)
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    this.props.onGetMovie('search?q=神秘巨星', {start:0, count: 10}, 'search', false)
    console.log(this.state.value)
  }
  render() {
    return(
      <View>
        <AtSearchBar
          value={this.state.value}
          actionName='搜一下'
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
      </View>
    )
  }
}
