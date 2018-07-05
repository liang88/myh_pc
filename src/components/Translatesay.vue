<template>
    <div id="translatesay">
      <div class="translatesay_content">
      <!-------------表头--------------->
      <div class="trans_header">
        <div class="transay_lf">
          <strong><img :src="transdate.agentImg" /></strong>
          <p>真实房源</p>
          <p>专家顾问无后顾之忧</p>
        </div>
        <div class="transay_cen">
          <div class="trans01">
            <strong class="trans02">{{transdate.name}}</strong>
            <h2><a href="#">{{transdate.project}}</a><a href="#">阿尔卡迪亚 ( 期房 )</a>
              <span v-show="dengji==1"><img src="../assets/images/jin.png"></span>
              <span v-show="dengji==2"><img src="../assets/images/yin.png"></span>
              <span v-show="dengji==3"><img src="../assets/images/tong.png"></span>
            </h2>
          </div>
          <h2 class="trans03">
            <strong>所属门店 : {{transdate.store}}</strong>
          </h2>
          <h2 class="trans03">
            <strong>历史成交 : 买卖{{transdate.dealCount}}套 </strong>
          </h2>
          <h2 class="trans04">
            <p>{{transdate.tag}}</p>
          </h2>
        </div>
        <div  class="transay_rig">
          <div class="transay_title">
            <h2><strong>{{transdate.dealCount}}</strong><p>成交量(套)</p></h2>
            <h2><strong>{{transdate.watchTimes}}</strong><p>带看(次)</p></h2>
            <h2><strong>{{transdate.score}}</strong><p>总分(分)</p></h2>
          </div>
          <div class="transay_phone">
            <p>{{transdate.mobile}}</p>
            <span><img src="../assets/images/call.png" /> 预约看房</span>
          </div>
        </div>
      </div>
      <!-------------表头展示--------------->
      <h2 class="trans_h2">用户评价</h2>
      <div class="tassess">
        <div class="tassess_lf">
          <div class="assess_an" v-for="pjan in pingjiadate">
            <p class="asserss_img"><img  src="/static/images/trans.png" /></p>
            <div class="asserss_names">
              <h2 class="asserss_names_lf"><strong>{{pjan.mobile}}</strong><p v-html="tranxingstart(pjan.score)"></p></h2>
              <h2 class="asserss_names_rg"><strong>{{pjan.comment}}</strong><p>{{pjan.commentTime|timeFormat}}</p></h2>
            </div>
          </div>
          <div class="assmessage">{{anmessage2}}</div>
          <el-pagination
            background
            @current-change="fyclick"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totals">
          </el-pagination>
          <!-------------------------评论内容------------------------------>
          <div class="tran_pingjia">
            <h2 class="pingjia_title">我要评论<b>请理性发言，注意文明用语</b></h2>
            <div class="pingjia_write">
              <div class="pjstars">评分：<div class="pjstar_this">
                <a href="javascript:;" @click="currentclick(1)" :id="currentIndex>=1?'xuanzhong':''" ></a>
                <a href="javascript:;" @click="currentclick(2)" :id="currentIndex>=2?'xuanzhong':''" ></a>
                <a href="javascript:;" @click="currentclick(3)" :id="currentIndex>=3?'xuanzhong':''"></a>
                <a href="javascript:;" @click="currentclick(4)" :id="currentIndex>=4?'xuanzhong':''" ></a>
                <a href="javascript:;" @click="currentclick(5)" :id="currentIndex>=5?'xuanzhong':''" ></a>
              </div></div>
              <textarea class="textarea" v-model="textcon" placeholder="您最满意房源什么！跟大有分享一下吧"></textarea>
              <div>{{tishimessage}}</div>
            </div>
            <input type="button" class="pjbtns" @click="tijiao_pf" value="提交"/>
          </div>
        </div>
        <!--<img src="/static/images/xing.gif" /><img src="/static/images/xingh.jpg" />-->
        <div class="tassess_rg">
          <div class="assess_h2">
            <h2>最近成交</h2>
            <div v-for="tijiao in chengjiaodate"><p>{{tijiao.createTime|timeFormat}}</p><p>{{tijiao.subTitle}} {{tijiao.layout}} {{tijiao.measure}}平  {{tijiao.price}}万</p></div>
          </div>
          <div class="assess_h2">
            <h2>最近带看</h2>
            <div v-for="look in looksdate"><p>{{look.createTime|timeFormat}}</p><p>{{look.subTitle}} {{look.layout}} {{look.measure}}平  {{look.price}}万</p></div>
          </div>
        </div>
      </div>
      <!-------------热门楼盘--------------->
      <h2 id="zb" class="house_title pad_bor"><a href="###">热门推荐<img src="../assets/images/more.png" /></a></h2>
      <div class="content_houselist">
        <!---an----->
        <div class="date_sayshow" v-for="tnew in trannewdate">
          <router-link tag="div" :to="'/Housesay/'+tnew.id">
            <a class="d_show0mar" href="#"><img  :src="tnew.mainImg" /><p>御道庄园 </p></a>
            <h2 class="d_show02" >{{tnew.title}}</h2>
            <p class="d_show03" >{{tnew.address}}</p>
            <p class="d_show04" >均价{{tnew.averagePrice}}元／平 ，户型{{tnew.measure}}平方米</p>
          </router-link>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Pagination} from 'element-ui'
import {getCookie} from '../util/cookie'
export default {
  name: 'translatesay',
  data () {
    return {
      transdate: {},
      dengji: '',
      pingjiadate: [],
      xingxing: '',
      anmessage2: '',
      chengjiaodate: [],
      looksdate: [],
      trannewdate: [],
      currentStar: '',
      currentIndex: '',
      textcon: '',
      tishimessage: '',
      currentpage: 1,
      pageSize: 10,
      totals: 10
    }
  },
  components: {
    'el-pagination': Pagination
  },
  mounted () {
    this.loadtrancon()
    this.loadpingjia()
    this.loadhistory()
    this.loadlooks()
    this.tranfangyuan()
  },
  methods: {
    loadtrancon(){
      var transsay = {
        agentId: this.$route.params.id
      }
      this.$http.post(myHost+ 'myh_web/viewAgentDetail', transsay).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        this.transdate = data
        this.dengji = data.agentLevel
        // console.log(this.dengji)
      })
    },
    loadpingjia(){
      var pj = {
        id: this.$route.params.id,
        page: {
          'pageNum': this.currentpage,
          'pageSize': this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/viewAgentComm', pj).then((response) => {
        // console.log(response)
        var data =response.data
        data = data.resultBean
        var anmessage = data.code
        if(anmessage=='1'){
          this.anmessage2 = data.message
        }else{
          data = data.object
          this.totals = data.total
          data = data.list
          this.pingjiadate = data
        }
      })
    },
    loadhistory(){
      var historys = {
        agentId: this.$route.params.id,
        type: '1'
      }
      this.$http.post(myHost+ 'myh_web/selectAgentAndHouse', historys).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        this.chengjiaodate = data
      })
    },
    loadlooks(){
      var historys = {
        agentId: this.$route.params.id,
        type: '2'
      }
      this.$http.post(myHost+ 'myh_web/selectAgentAndHouse', historys).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        this.looksdate = data
      })
    },
    tranfangyuan(){
      var fangyuaninfo = {
        type: '1'
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', fangyuaninfo).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.trannewdate = data.slice(0,3)
      })
    },
    currentclick(r){
      this.currentIndex = r
      this.currentStar = r* 20
    },
    tijiao_pf(){
      var getuid = getCookie ('userId')
      if(!this.textcon){
        this.tishimessage = '亲 请输入评论内容!'
        this.clearthmessage()
        return
      }
      if(getuid == null){
        this.tishimessage = '亲 请登录网站在评论!'
        this.clearthmessage()
        return
      }
      var userIds =  {
        userId: getuid,
        agentId: this.$route.params.id,
        'comment': this.textcon,
        score: this.currentStar,
        page:{
          'pageNum': this.currentpage,
          'pageSize': this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/insertAgentComm', userIds).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var ticode = data.code
        if(ticode == '0'){
          this.tishimessage = '提交成功!'
          this.textcon = ''
          this.clearthmessage()
          this.loadpingjia()
        }
      })
    },
    clearthmessage(){
      var that= this
      setTimeout(function(){
        that.tishimessage = ''
      },3000)
    },
    fyclick(r){
      this.currentpage = r,
      this.loadpingjia()
    }
  }
}
</script>

<style scoped>

</style>
