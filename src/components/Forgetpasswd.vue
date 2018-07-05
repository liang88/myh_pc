<template>
    <div id="forgetpasswd">
      <div class="forgetpass">
        <h2 class="fr_h2">忘记密码</h2>
        <ul  class="fromlist frul">
          <li><input type="text" placeholder="请输入手机号" class="rgphone" v-model="fphone" /></li>
          <li><input type="text" placeholder="请输入短信验证码" class="rgma" v-model="fddyzm" />
            <a class="from_mm"  @click="fsend" href="#">
              <span v-if="sendMsgDisabled">{{time+'s重新获取'}}</span>
              <span v-if="!sendMsgDisabled">发送验证码</span>
            </a>
          </li>
          <li><input type="password" placeholder="请输入新密码 6到12位之间" class="rgpwd" v-model="fokpwd" /></li>
          <li><input type="submit" value="确认"  class="btn_reg" @click="fbtn" /></li>
          <li><p class="tsmessage">{{fmessage}}</p></li>
        </ul>
      </div>
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'forgetpasswd',
  data(){
    return {
      fphone: '',
      fddyzm: '',
      fokpwd: '',
      sendMsgDisabled: '',
      fmessage: '',
      time: 60,
      timeval: null,
      frgpwd: true
    }
  },
  mounted(){
  },
  methods: {
    fsend(){
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.fphone == '') {
        this.fmessage = '手机号不能为空！'
        return
      }
      if (!reg.test(this.fphone)){
        this.fmessage = '手机号码格式不正确!'
        return
      }
      var addfrom = {
        mobile: this.fphone,
        type: 'revamp'
      }
      this.$http.post(myHost+ 'myh_web/getValiCode', addfrom).then((response) => {
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        if (yzm == '1') {
          this.fmessage = data.message
        }else if (yzm == '0') {
          let me = this
          me.sendMsgDisabled = true
          this.timeval = window.setInterval(function () {
            if ((me.time--) <= 0) {
              me.time = 60
              me.sendMsgDisabled = false
              window.clearInterval(this.timeval)
            }
          }, 1000)
        }
      })
    },
    fbtn(){
      var reg2 = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!this.fphone) {
        this.fmessage = '请输入手机号码!'
        return
      }
      if (!reg2.test(this.fphone)) {
        this.fmessage = '手机号码格式不正确!'
        return
      }
      if(!this.fddyzm){
        this.fmessage = '验证码不能为空!'
        return
      }
      if (!this.fokpwd) {
        this.fmessage = '亲请输入密码!'
        return
      }
      if (this.fokpwd.length < 6 || this.fokpwd.length > 12){
        this.fmessage = '密码输入不正确!'
        return
      }
      var addfrom = {
        mobile: this.fphone,
        password: md5(this.fokpwd),
        valiCode: this.fddyzm
      }
      this.$http.post(myHost+ 'myh_web/updatePass', addfrom).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        console.log(yzm)
        if (yzm == '1') {
          this.fmessage = data.message
        }else if (yzm == '0') {
          this.fmessage = '修改成功！'
          this.$router.push('/Login/1')
        }
      })
    }
  }
}
</script>

<style scoped>
.forgetpass{
  display: block;
  min-height: 500px;
  width: 1200px;
  margin: 100px auto;
}
  .frul{
    display: block;
    width: 400px;
    margin: 0px auto;
  }
  .fr_h2{
    display: block;
    line-height:40px;
    font-size:30px;
    text-align: center;
    color: #666666;
    margin-bottom: 30px;
  }
</style>
