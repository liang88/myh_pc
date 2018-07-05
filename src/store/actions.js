export default {
  lgchou: ({commit}) => {
    // console.log('zhu')
    commit('lgchou')
  },
  loginSave:({commit},data)=>{
    commit('loginSave',data)
  },
  addSearchData: ({commit},data)=>{
    commit('addSearchData',data)
  },
  diancarscreen: ({commit},data)=>{
    commit('carscreens')
  }
}
