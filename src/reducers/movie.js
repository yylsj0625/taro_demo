import Types from '../constants/index'

const InitState = {
  hotList: {
    subjects: [],
    total: 0
  },
  weeklyList: {
    subjects: [],
    total: 0
  },
  movieDetail: null,
  movieComment: [],
  commentLoadingMore: false,
  netError: false
}

export default function movie (state=InitState, action) {
  switch (action.type) {
    case Types.REFRESH_HOT_MOVIE:
      return { ...state, hotList: action.payload, netError: false }
    case Types.REFRESH_WEEKLY_MOVIE:
      return { ...state, weeklyList: action.payload, netError: false}
    case Types.NET_ERROR:
      return {...state, netError: true}
    case Types.MOVIE_DETAIL:
      return { ...state, movieDetail: action.payload }
    case Types.MOVIE_COMMENT:
      return { ...state, movieComment: action.payload}
    case Types.MOVIE_COMMENT_LOADING_MORE:
      return { ...state, commentLoadingMore: action.payload }
    default:
      return state
  }
}
