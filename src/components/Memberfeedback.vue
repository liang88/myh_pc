<template>
    <div id="memberfeedback">
      <div class="fk">
        <div class="fk-tit">
          <p>用户反馈</p>
        </div>
        <div class="fk-wap">
          <div class="jq clear">
            <img src="images/jq.png" alt="">
            <p>满易何帮帮小管家</p>
          </div>
          <div class="jqcon" id="jqcon">
            <div class="jq-time">
              <p></p>
              <p>亲~您好！很高兴为您服务，有什么可以帮您的呢？我们收到后会以邮件形式发给您哦！</p>
            </div>
              <div v-for="fban in mfbdatebase" >
                <div class="jq-user clear"><div class="ktijiao"><div class="user-pic"><img src="/static/images/head.png" alt=""></div><div class="user-char">{{fban.advise}}</div></div></div><div  class="jq-time"><div class="ktijiao"><p></p><p>亲~您好！很高兴为您服务，有什么可以帮您的呢？我们收到后会以邮件形式发给您哦！</p></div></div>
              </div>
              <div v-html="mfitemdate"></div>
          </div>
          <form class="jq-feed" action="">
            <textarea name="" v-model="mfhui" placeholder="点击输入您想要咨询的问题...（字数仅限300字以内）" ></textarea>
            <input type="button" @click="mfhuibtton" value="发送">
            <p class="mfmessage">{{mfhuimessage}}</p>
            <img src="images/tp.png" alt="">
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import {getCookie} from "../util/cookie";
export default {
  name: 'memberfeedback',
  data(){
    return {
      mfhui: '',
      mfhuimessage: '',
      mfhuidatebase: '',
      mfitemdate: '',
      mfbdatebase: {}
    }
  },
  mounted(){
    this.loadmfbk()
  },
  methods:{
    mfhuibtton(){
      if(!this.mfhui){
        this.mfhuimessage = '亲，请输入想要咨询内容！'
        return
      }
      var mfbinfo = {
        adUid: getCookie ('userId'),
        advise: this.mfhui
      }
      this.$http.post(myHost+'myh_web/insertAdvise', mfbinfo).then((response) => {
        var data = response.data
        data = data.resultBean
        var mycds = data.code
        if(mycds== '1'){
          this.mfhuimessage = data.message
        }else if(mycds== '0'){
          this.mfhuimessage = '反馈提交成功!,我们会尽快给您回复!'
          this.mfhuidatebase = this.mfhui
          this.mfitemdate = this.mfitemdate+ '<div class="jq-user clear"><div class="ktijiao"><div class="user-pic"><img src="/static/images/head.png" alt=""></div><div class="user-char">'+this.mfhuidatebase+'</div></div></div><div  class="jq-time"><div class="ktijiao"><p></p><p>亲~您好！很高兴为您服务，有什么可以帮您的呢？我们收到后会以邮件形式发给您哦！</p></div></div>'
          this.mfhui = ''
        }
      })
      var div = document.getElementById('jqcon')
      setTimeout(function () {
        div.scrollTop = div.scrollHeight
      }, 150)
    },
    loadmfbk(){
      var fbkinfo = {
        adUid: getCookie('userId')
      }
      this.$http.post(myHost+'myh_web/viewMyAdvise', fbkinfo).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var fcode = data.code
        if(fcode==1){
          this.mfhuimessage = data.message
        }else if(fcode==0){
          data = data.object
          this.mfbdatebase = data
        }
      })
    }
  },
  watch:{
  }
}
</script>

<style scoped>
.jqcon{
  display: block;
  clear: both;
  overflow: auto;
  height: 340px;
}
  .mfmessage{
    display: block;
    text-align: center;
    line-height: 38px;
    text-align: center;
    font-size:16px;
    color: #999999;
  }
  .ktijiao{
    display: block;
    overflow: hidden;
  }
  .mbfankuiitem{
    display: block;
    overflow: hidden;
    clear: both;
  }
</style>
