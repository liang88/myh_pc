
<template>
    <div id="indexslide">
      <div class="content_rg">
        <h2 class="item_title mar_btom">天气<img src="../assets/images/more.png" /></h2>
        <div  class="con_weater">
          <iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=55"  width="255" height="294" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
          <!--<iframe src="http://tianqi.5ikfc.com:90/plugin-code/?style=12&dy=7&cl=000000&th=cc0000" allowTransparency="true" frameborder="0" scrolling="no" width="220" height="350" id="weather_frame"></iframe>-->

        </div>
        <h2 class="item_title mar_top mar_btom">免费看房<img src="../assets/images/more.png" /></h2>
        <div class="publicar">
          <ul>
            <li v-for="(cars,index) in carhousedata">
              <a @click="diancars(index)" href="javascript:;" >{{cars.title}}</a>
              <p>{{cars.address}}</p>
            </li>
          </ul>
        </div>
        <!----------------免费看房弹出层----------------------- -->
        <div class="carscreenall" v-show="carscreens">
        <div class="screen_house"></div>
        <div class="carhouse" >
          <a class="carhouse_close" @click="carcolse" href="javascript:;"><img src="../assets/images/closes.png" width="40"> </a>
          <!--<div class="carhouse_list">-->
            <!--<h2>御道庄园</h2>-->
            <!--<p><img src="../assets/images/pic.jpg" width="400" height="200px"></p>-->
            <!--<p>开盘时间：2018-01-12</p>-->
            <!--<p>楼盘单价：2000-12000元／㎡</p>-->
          <!--</div>-->
          <div class="tijiao_form">
            <h2>免费专车看房-用户提交信息</h2>
            <ul>
              <li><input type="text" class="tjname" v-model="username" placeholder="输入您的姓名" /></li>
              <li><input type="text" class="tjname" v-model="userphone" placeholder="输入您的手机号码" /></li>
              <li><input type="button" @click="userlookhouse" value="提交" class="carhouse_btn"/></li>
              <li class="usercolor">{{usermessage}}</li>
              <li><img src="../assets/images/call.png" /> 咨询电话：400-1133-233</li>
            </ul>
          </div>
        </div>
        </div>
        <!----------------免费看房弹出层----------------------- -->
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'indexslide',
  data (){
    return {
      carhousedata: [],
      username: '',
      userphone: '',
      usermessage: '',
      actid: ''
    }
  },
  computed:mapGetters([
    'carscreens'
  ]),
  mounted(){
    this.carhouseload()
  },
  methods:{
    carhouseload(){
      this.$http.post(myHost+ 'myh_web/viewActivities').then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        this.carhousedata = data
        // console.log(this.carhousedata)
      })
    },
    diancars(e){
      this.$store.dispatch('diancarscreen')
      this.actid = e
    },
    carcolse(){
      this.$store.dispatch('diancarscreen')
      this.username = ''
      this.userphone = ''
    },
    userlookhouse(){
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!this.username) {
        this.usermessage = '亲 用户名不能为空！'
        return
      }
      if (!this.userphone) {
        this.usermessage = '亲 手机号不能为空！'
        return
      }
      if (!reg.test(this.userphone)){
        this.usermessage = '手机号码格式不正确!'
        return
      }
      var act = this.actid + 1
      var userinfos = {
        'activityId': act,
        'pName': this.username,
        'pMobile': this.userphone
      }
      this.$http.post(myHost+'myh_web/insertPartyInfo', userinfos).then((response)=>{
        var data = response.data
        data = data.resultBean
        var mycode = data.code
        console.log(mycode)
        if(mycode == '0'){
          this.usermessage = '提交成功！我们会尽快联系您！'
        }else{
          this.usermessage = '提交失败，请重试'
        }
      })
    }
  }
}
</script>

<style scoped>
.carscreenall{
  display: block;
  overflow: hidden;
  clear: both;
}
.usercolor{
 color: #999999;
}
</style>
