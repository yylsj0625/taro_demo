import Taro ,{ Component } from '@tarojs/taro'

export default class HttpUtil {
  httpRequest (url, params) {
    Taro.showNavigationBarLoading()
    return new Promise((resolve, reject) => {
      Taro.request({
        url: url,
        data: { ...params },
        header: {
          'content-type': 'application/xml' //  小程序需要设置xml 不然豆瓣报错
        }
      }).then(res => {
        Taro.hideNavigationBarLoading()
        resolve(res)
      })
        .catch((error) => {
          Taro.hideNavigationBarLoading()
          reject(error)
        })
    })
  }
}
