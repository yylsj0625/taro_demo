import '@tarojs/async-await'
// import 'taro-ui/dist/style/index.scss'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/movie'

import configStore from './store'

import './app.scss'



// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/movie/index',
      'pages/index/index',
      'pages/detail/index',
      'pages/movieDetail/index',
      'pages/movieSearch/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#346FC2',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#346FC2',
      color: '#bfbfbf',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/movie/index',
          text: '电影',
          iconPath: 'assets/img/movie.png',
          selectedIconPath: 'assets/img/movie_active.png'
        },
        {
          pagePath: 'pages/index/index',
          text: 'node',
          iconPath: 'assets/img/node_js.png',
          selectedIconPath: 'assets/img/node_js_active.png'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
