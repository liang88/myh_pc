<template>
    <div id="membermenu">
      <div class="my-l-top">
        <div class="my-pic">
          <img :src="touxinagnew"  alt="">
        </div>
        <p>欢迎您,你好</p>
      </div>
      <div class="my-l-bottom">
        <ul class="clear">
          <li v-show="mbr01" @click="mythis('1')"  :class="this.mymenu==1?'my_classa':''" ><router-link to="/Memberindex/Memberbasic"><img src="../assets/images/wode.png" alt=""><p>个人信息</p></router-link></li>
          <li v-show="mbr02"  @click="mythis('2')"  :class="this.mymenu==2?'my_classa':''"  ><router-link to="/Memberindex/Memberadmin"><img src="../assets/images/guanli.png" alt=""><p>房源管理</p></router-link></li>
          <li v-show="mbr03"  @click="mythis('3')"  :class="this.mymenu==3?'my_classa':''"  ><router-link to="/Memberindex/Memberhouserecord"><img src="../assets/images/jilu.png" alt=""><p>看房纪录</p></router-link></li>
          <li v-show="mbr04"  @click="mythis('4')"   :class="this.mymenu==4?'my_classa':''" ><router-link to="/Memberindex/Memberpinglun"><img src="../assets/images/pinglun.png" alt=""><p>我的评论</p></router-link></li>
          <li v-show="mbr05"  @click="mythis('5')"  :class="this.mymenu==5?'my_classa':''"  ><router-link to="/Memberindex/Memberlookhouse"><img src="../assets/images/baoming.png" alt=""><p>我的报名</p></router-link></li>
          <li v-show="mbr06"  @click="mythis('6')" :class="this.mymenu==6?'my_classa':''"   ><router-link to="/Memberindex/Memberfeedback"><img src="../assets/images/fankui.png" alt=""><p>用户反馈</p></router-link></li>
          <li><router-link to="/Counter"><img src="../assets/images/fangdai.png" alt=""><p>房贷计算器</p></router-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
import {getCookie} from "../util/cookie"
export default {
  name: 'membermenu',
  data(){
    return{
      mymenu: '',
      mbr01: true,
      mbr02: true,
      mbr03: true,
      mbr04: true,
      mbr05: true,
      mbr06: true,
      touxinagnew: ''
    }
  },
  mounted(){
    this.loadfunmeu()
    this.touxiangnew()
  },
  methods: {
    mythis(e){
      this.mymenu = e
    },
    loadfunmeu(){
      var funmenu =  getCookie ('lgif')
      if(funmenu==1){
        this.mbr01 = true
        this.mbr02 = false
        this.mbr03 = true
        this.mbr04 = true
        this.mbr05 = true
        this.mbr06 = true
      }else if(funmenu==2){
        this.mbr01 = false
        this.mbr02 = true
        this.mbr03 = false
        this.mbr04 = false
        this.mbr05 = false
        this.mbr06 = true
      }
    },
    touxiangnew(){
      var txg = {
        id: getCookie('userId')
      }
      this.$http.post(myHost+'myh_web/selectUser', txg).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        this.touxinagnew = data.headUrl
      })
    }
  }
}
</script>

<style scoped>

</style>
