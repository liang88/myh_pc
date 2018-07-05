<template>
    <div id="top">
      <!-------------top------------>
      <header class="headers">
        <div class="row">
          <div class="head_lf">{{welcame}}</div>
          <div class="head_rg" v-if="isLog">
            <router-link tag="a" to="/Login/1"><img src="../../src/assets/images/icon2.png" >
              <router-link style="display: inline-table;" tag="p" to="/Memberindex/1">{{nowphone}}</router-link>
              <a href="javascript:;" @click="logout">退出登录</a>
            </router-link>
          </div>

          <div class="head_rg" v-else>
            <router-link tag="a" to="/Login/1"><img src="../../src/assets/images/icon2.png" >登录</router-link>
            <router-link  tag="a" to="/Login/2"><img src="../../src/assets/images/icon1.png" >注册</router-link>
          </div>
        </div>
      </header>
    </div>
</template>

<script>
// import Loginview from './backup'
import {getCookie,delCookie} from '../util/cookie'

export default {
  name: 'top',
  data () {
    return {
      welcame: '欢迎来到满易何！',
      nowphone: '',
      isLog: false

    }
  },
  mounted () {
    this.loadfunt()
  },
  methods: {
    // lgchou () {
    //   console.log('jiaojiao')
    //   this.$store.dispatch('lgchou')
    // }
    loadfunt () {
      var mobile =  getCookie ('myhPhone')
      var sessionId =  getCookie ('sessionId')
      var userIds =  getCookie ('userId')
      // console.log(userIds)
      if (sessionId) {
        this.isLog = true
        this.nowphone = mobile
      }
    },
    logout () {
      delCookie('sessionId')
      delCookie('myhPhone')
      delCookie('userIds')
      this.isLog = false
    }

  },
  computed:{
    isLogin(){
      return this.$store.getters.isLogin
    }
  },
  watch: {
    isLogin(val){
     var sessionId =  getCookie ('sessionId')
     if(sessionId){
       this.isLog = true
     }
     this.isLog = val?true:this.isLog
     this.nowphone = this.$store.getters.myhPhone
    }
  }
}
</script>

<style scoped>
#top{
  background: #f1f1f1;
}
</style>
