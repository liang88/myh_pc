<template>
  <div id="login">
    <div class="lg_reg_content">
      <div class="con_widths">
      <div class="lgreg_wid">
      <div class="lg_lef">
        <div class="lg_tit"><a href="#"  @click="showWhich(1)"  :id="showDiv==1?'lg_tita':''">登录</a><b>|</b><a  @click="showWhich(2)" :id="showDiv==2?'lg_tita':''" href="#">注册</a></div>
        <!-----切换登录-------->
        <div v-show="showDiv==1" class="lg_list_slide">
          <div class="ltits">
            <el-radio  @change="lgradio" v-model="radio" label="1">普通用户</el-radio>
            <el-radio   @change="lgradio"    v-model="radio" label="2">满易何经纪人登录</el-radio>
          </div>
          <div class="login"  v-show="this.lgtabs==1">
            <ul class="fromlist">
              <li><input type="text" placeholder="请输入手机号"   v-model="myphone" class="rgphone" /></li>
              <li><input type="password" placeholder="请输入密码" v-model="lpwd"  class="rgpwd" /></li>
              <li><router-link  reg="a" to="/Forgetpasswd" class="rgmm">忘记密码</router-link></li>
              <li><input type="button" value="立即登录" @click="lgbtn"  class="btn_reg" /></li>
              <li><p class="tsmessage">{{tsmessage}}</p></li>
            </ul>
          </div>
          <div class="login" v-show="this.lgtabs==2">
            <ul class="fromlist">
              <li><input type="text" placeholder="请输入手机号"   v-model="lgsphone" class="rgphone" /></li>
              <li><input type="text" placeholder="请输入短信验证码" class="rgma" v-model="lgsyzm" />
                <a class="from_mm"  @click="regtrans" href="#">
                  <span v-if="sendMsgDisabled">{{time+'s重新获取'}}</span>
                  <span v-if="!sendMsgDisabled">发送验证码</span>
                </a>
              </li>
              <li><input type="button" value="立即登录" @click="lgtransgo"  class="btn_reg" /></li>
              <li><p class="tsmessage">{{lgtsmessage}}</p></li>
            </ul>
          </div>
        </div>
        <!-----切换注册-------->
        <div  v-show="showDiv==2"  class="lg_list_slide">
          <div class="regster">
            <ul class="fromlist">
              <li><input type="text" placeholder="请输入手机号" class="rgphone" v-model="addphone" /></li>
              <li><input type="text" placeholder="请输入短信验证码" class="rgma" v-model="addyzm" />
                <a class="from_mm"  @click="regsend" href="#">
                  <span v-if="sendMsgDisabled">{{time+'s重新获取'}}</span>
                  <span v-if="!sendMsgDisabled">发送验证码</span>
                </a>
              </li>
              <li><input type="text" placeholder="请输入昵称" v-model="addname" class="rgname"/></li>
              <li><input type="password" placeholder="请输入密码(6-12位字母数字)" v-model="addpwd" class="rgpwd" /></li>
              <li><input type="password" placeholder="请确认密码" class="rgpwd" v-model="addokpwd" /></li>
              <li><input type="submit" value="注册"  class="btn_reg" @click="regbtn" /></li>
              <li><p class="tsmessage">{{regmessage}}</p></li>
            </ul>
          </div>
        </div>
      </div>
        <div class="lg_rig" style="display:none;">
          <p>使用微信直接登录</p>
          <p><img src="../assets/images/wxico.jpg" /></p>
          <a href="#"><img src="../assets/images/ewm.jpg" /></a>
          <p>{扫描满易何公众号}</p>
        </div>
        <!-----------成功提示弹出层-------------->
      <div class="prop_reg" v-show="prop">
        <div class="screens"></div>
        <div class="regsuccess">
           <!--<a class="regclose" href="#"><img src="../assets/images/close.png" width="30" /></a>-->
           <h2 class="regh2" ><img src="/static/images/success.png" width="60"/> </h2>
           <h2 class="regh2" >帐号注册成功!</h2>
           <a class="regnum" href="#">{{stime+'s后跳转到首页'}}</a>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import {setCookie,getCookie} from '../util/cookie'
import {Radio} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import  qs from 'qs'
export default {
  name: 'login',
  data () {
    return {
      tsmessage: '',
      regmessage: '',
      myphone: '',
      lpwd: '',
      showDiv: '',
      showDib: true,
      addphone: '',
      addyzm: '',
      addname: '',
      addpwd: '',
      addokpwd: '',
      prop: false,
      time: 60,
      sendMsgDisabled: false,
      stime: 3,
      interval: '',
      timeval: null,
      addmingzi: '',
      addshenfenzheng: '',
      radio: 0,
      lgtabs: 1,
      lgsphone: '',
      lgsyzm: '',
      lgtsmessage: ''
    }
  },
  components: {
    'el-radio': Radio
  },
  mounted () {
    this.loadFun()
    this.lgradio(1)
  },
  methods: {
    showWhich(id){
      this.showDiv = id
    },
    // 登录接口数据
    lgbtn () {
      // 验证手机号
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if ( !this.myphone) {
        this.tsmessage = '请输入手机号码!'
        this.clearTsmessage()
        return
      }
      if ( !reg.test(this.myphone)) {
        this.tsmessage = '手机号码格式不正确!'
        this.clearTsmessage()
        return
      }
      if (!this.lpwd)
      {
        this.tsmessage = '请输入密码!'
        this.clearTsmessage()
        return
      }
      if (6 > this.lpwd.length || 12 < this.lpwd.length) {
        this.tsmessage = '密码输入不正确!'
        this.clearTsmessage()
        return
      }

      var infos = {
        'mobile': this.myphone,
        'password': md5(this.lpwd)
      }
      this.$http.post(myHost+ 'myh_web/login', infos).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var mydate = data.object
        var res = data.code
        if (res == '1') {
          // alert(data.message)
          this.tsmessage = data.message
        } else if (res == '0') {
          this.$router.push('/')
          setCookie('sessionId',data.sessionId,5)
          setCookie('lgif',this.lgtabs)
          setCookie('userId',mydate.id,5)
          setCookie('myhPhone',this.myphone,5)
          this.$store.dispatch('loginSave',{'sessionId':data.sessionId,myhPhone:this.myphone,userId:mydate.id,'lgif':this.lgtabs})
        }
      })
    },
    // 注册验证码接口
    regsend () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.addphone == '') {
        this.regmessage = '手机号不能为空！'
        this.clearRegMessage()
        return
      }
      if (!reg.test(this.addphone)){
        this.regmessage = '手机号码格式不正确!'
        clearRegMessage()
        return
      }
      var addfrom = {
        mobile: this.addphone,
        type: 'regist'
      }
      this.$http.post(myHost+ 'myh_web/getValiCode', addfrom).then((response) => {
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        if (yzm == '1') {
          this.regmessage = data.message
        }else if (yzm == '0') {
          let me = this
          me.sendMsgDisabled = true
          this.timeval = window.setInterval(function () {
            if ((me.time--) <= 0) {
              me.time = 60
              me.sendMsgDisabled = false
              window.clearInterval(timeval)
            }
          }, 1000)
        }
      })
    },
    // 注册列表接口
    regbtn () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.addphone == '') {
        this.regmessage = '手机号不能为空！'
        this.clearRegMessage()
        return
      }
      if (!reg.test(this.addphone)){
        this.regmessage = '手机号码格式不正确!'
        clearRegMessage()
        return
      }
      if (this.addyzm == ''){
        this.regmessage = '验证码不能为空!'
        clearRegMessage()
        return
      }
      if (this.addname == ''){
        this.regmessage = '昵称不能为空!'
        clearRegMessage()
        return
      }
      if (this.addpwd.length < 6 || this.addpwd.length > 12){
        this.regmessage = '密码输入不正确!'
        clearRegMessage()
        return
      }
      if (this.addpwd != this.addokpwd) {
        this.regmessage = '两次密码输入不一致!'
        clearRegMessage()
        return
      }
      var addlist = {
        mobile: this.addphone,
        valiCode: this.addyzm,
        name: this.addname,
        password: md5(this.addpwd),
        password2: md5(this.addokpwd)
      }
      this.$http.post(myHost+ 'myh_web/register', addlist).then((response) => {
        var regdata = response.data
        regdata = regdata.resultBean
        var  rcs = regdata.code
        if (rcs == '1') {
          console.log(regdata.message)
          this.regmessage = regdata.message
        } else if (rcs == '0') {
          let rths = this
          rths.prop = true
          rths.interval = window.setInterval(function () {
            if ((rths.stime--) <= 1) {
              window.clearInterval(rths.interval)
              rths.prop = false
              rths.showDiv = true
            }
          },1000)
        }
      })
    },
    loadFun () {
      var cate = this.$route.params.cate
      console.log(this.$route.params.cate)
      cate = parseInt(cate)
      if (cate === 2) {
        this.showDiv = 2
      }
      if (cate === 1) {
        this.showDiv = 1
      }
    },
    clearRegMessage () {
      var that = this
      setTimeout(function () {
        that.regmessage = ''
      }, 3000)
    },
    clearRegMessage2 () {
      var that = this
      setTimeout(function () {
        that.lgtsmessage = ''
      }, 3000)
    },
    lgradio(es){
      this.lgtabs = es
      console.log(this.lgtabs)
    },
    regtrans(){
      var reg2 = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!this.lgsphone) {
        this.lgtsmessage = '请输入手机号码!'
        this.clearRegMessage2()
        return
      }
      if (!reg2.test(this.lgsphone)) {
        this.lgtsmessage = '手机号码格式不正确!'
        this.clearRegMessage2()
        return
      }
      if (this.sendMsgDisabled) {
        return
      }
      var addfrom = {
        mobile: this.lgsphone,
        type: 'logAgent'
      }
      this.$http.post(myHost+ 'myh_web/getValiCode', addfrom).then((response) => {
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        if (yzm == '1') {
          this.lgtsmessage = data.message
        }else if (yzm == '0') {
          let me = this
          me.sendMsgDisabled = true
          this.timeval = window.setInterval(function () {
            if ((me.time--) <= 0) {
              me.time = 60
              me.sendMsgDisabled = false
              // window.clearInterval(timeval)
            }
          }, 1000)
        }
      })
    },
    lgtransgo(){
      var reg2 = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if ( !this.lgsphone) {
        this.lgtsmessage = '请输入手机号码!'
        this.clearRegMessage2()
        return
      }
      if ( !reg2.test(this.lgsphone)) {
        this.lgtsmessage = '手机号码格式不正确!'
        this.clearRegMessage2()
        return
      }
      if (this.lgsyzm == ''){
        this.lgtsmessage = '验证码不能为空!'
        this.clearRegMessage2()
        return
      }
      var addfrom = {
        mobile: this.lgsphone,
        type: 'logAgent',
        code: this.lgsyzm
      }
      console.log(addfrom)
      this.$http.post(myHost+ 'myh_web/seleloginAgent', addfrom).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var yzm2 = data.code
        var mydate = data.object
        console.log(yzm2)
        if (yzm2 == '1') {
          this.lgtsmessage = data.message
        }else if (yzm2 == '0') {
          setCookie('sessionId',data.sessionId,5)
          setCookie('userId',mydate.id,5)
          setCookie('myhPhone',mydate.mobile,5)
          this.$store.dispatch('loginSave',{'sessionId':data.sessionId,myhPhone:mydate.mobile,userId:mydate.id})
          this.$router.push('/')
        }
      })
    },
    clearTsmessage () {
      var that = this
      setTimeout(function () {
        that.tsmessage = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
.ltits{
  display: block;
  overflow: hidden;
  margin-bottom: 20px;
}
.ltits a{
  text-decoration: none;
  margin-right: 15px;
}
.el-radio__input.is-checked+.el-radio__label{
  color: #66CC33;
}
.el-radio__input.is-checked .el-radio__inner{
  border-color: #66CC33;
  background: #66CC33;
}
</style>
