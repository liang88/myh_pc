<template>
    <div id="member-email">
      <div class="my-right">
        <div class="my-right-middle">
          <a href="javascript:history.go(-1)" class="tit clear">
            <img src="../assets/images/fanhui.png" alt="">
            <p>绑定邮箱</p>
          </a>
          <div class="buzhou clear">
            <div :class="this.tabshow==false?'one':'one'">
              <div>1</div>
            </div>
            <div :class="this.tabshow==false?'one':'two'">
              <div>2</div>
            </div>
          </div>
          <div class="buzhou-zi clear">
            <div class="one">
              <p>验证邮箱</p>
            </div>
            <div class="two">
              <p>完成</p>
            </div>
          </div>
          <div class="inp">
            <form action="">
              <table v-show="tabshow" border="5">
                <tr>
                  <td>输入邮箱</td>
                  <td colspan="2"><input type="text" v-model="addmail" placeholder="327039581@qq.com"></td>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <td>邮箱验证码</td>
                  <td colspan="2"><input type="text" v-model="addyzms"  placeholder="输入邮箱验证吗"></td>
                  <td colspan="2">
                    <span style="margin-left:10px;" v-if="sendMsgDisabled">{{time+'s重新获取'}}</span>
                    <input type="button" v-if="!sendMsgDisabled" @click="emailbtn" class="emailbtn" value="获取验证密码">
                  </td>
                </tr>
                <tr>
                  <td colspan="4"><input type="button"  @click="emailobject" class="emailbtn btncen"  value="确定"></td>
                </tr>
              </table>
              <table border="5">
                <tr>
                  <td colspan="4" >{{showemail}}</td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'member-email',
  data(){
    return {
      addmail: '',
      showemail: '',
      sendMsgDisabled: false,
      time: 60,
      addyzms: '',
      tabshow: true,
      timeval: ''
    }
  },
  mounted(){
  },
  methods: {
    emailbtn(){
      var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if(this.addmail ==''){
        this.showemail = '亲请输入邮箱!'
        this.clearTsmessage()
        return
      }
      if (!reg.test(this.addmail)) {
        this.showemail = '邮箱格式不正确!'
        this.clearTsmessage()
        return
      }
      var addfrom = {
        receiveAddress: this.addmail
      }
      this.$http.post(myHost+ 'myh_web/sendEmail', addfrom).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        if (yzm == '1') {
          this.showemail = data.message
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
    emailobject(){
      var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if(this.addmail ==''){
        this.showemail = '亲请输入邮箱!'
        this.clearTsmessage()
        return
      }
      if (!reg.test(this.addmail)) {
        this.showemail = '邮箱格式不正确!'
        this.clearTsmessage()
        return
      }
      if(!this.addyzms){
        this.showemail = '验证码不能为空!'
        this.clearTsmessage()
        return
      }
      var addfrom = {
        receiveAddress: this.addmail
      }
      this.$http.post(myHost+ 'myh_web/sendEmail', addfrom).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        if (yzm == '1') {
          this.showemail = data.message
        }else if (yzm == '0') {
          this.showemail = '邮箱绑定成功！'
          this.tabshow = false
        }
      })
    },
    clearTsmessage () {
      var that = this
      setTimeout(function () {
        that.showemail = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
.btncen{
  display: block;
  margin: 0px auto;
}
</style>
