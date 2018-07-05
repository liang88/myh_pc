import getters from './getters'

const state = {
  'lgben': false,
  'sessionId': '',
  'myhPhone': '',
  'userId': '',
  'isLogin': false,
  'searchHistory': '',
  'carscreen': false,
  'lgif': '',
  'picurl': ''
}

const mutations = {
  lgchou (state) {
    state.lgben = !state.lgben
  },
  loginSave (state, data) {
    state.sessionId = data.sessionId
    state.userId = data.userId
    state.myhPhone = data.myhPhone
    state.isLogin = true
    state.lgif = data.lgtabs
  },
  addSearchData (state,data){
    state.searchHistory = data
  },
  carscreens(state){
    state.carscreen = !state.carscreen
  }
}

export default {
  state,
  mutations,
  getters
}
