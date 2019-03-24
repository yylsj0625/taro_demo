import Taro from '@tarojs/taro'
import Types from '../constants/index.js'
import HttpUtil from '../service/httpUtil'
import { getMovie } from "../service/api";


const http = new HttpUtil()

export const refreshHotData = (val) => {
  return { type: Types.REFRESH_HOT_MOVIE, payload: val }
}
export const refreshWeeklyData = (val) => {
  return { type: Types.REFRESH_WEEKLY_MOVIE, payload: val }
}
export const onMovieDetail = (val) => {
  return {type: Types.MOVIE_DETAIL, payload: val}
}
export const movieComment = (val) => {
  return {type: Types.MOVIE_COMMENT, payload: val}
}
export const onCommentLoadingMore = (val) => {
  return {type: Types.MOVIE_COMMENT_LOADING_MORE, payload: val}
}
export const netError = () => {
  return {type: Types.NET_ERROR}
}
//  异步的action
export const onGetMovie= (url, params, type, flag) => {
  return dispatch => {
    if (type === 'movieComment') {
      dispatch(onCommentLoadingMore(true))
    }
    http.httpRequest(getMovie+ url, { ...params }).then(res => {
      if (flag) {
        Taro.stopPullDownRefresh()
      }
      if (res.statusCode === 200) {
        switch (type) {
          case 'hot':
            dispatch(refreshHotData(res.data))
                break
          case 'weekly':
            dispatch(refreshWeeklyData(res.data))
                break
          case 'movieDetail':
            dispatch(onMovieDetail(res.data))
                break
          case 'movieComment':
            dispatch(movieComment(res.data))
            dispatch(onCommentLoadingMore(false))
                break
        }
      } else {
        dispatch(netError())
      }
    })
  }
}
