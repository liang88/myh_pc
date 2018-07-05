<template>
   <div id="translate">
     <div class="trans_content">
     <!---------搜索经纪人--------->
      <div class="trans_souxun">
        <div class="trans_search">
          <input type="text" placeholder="搜索关键字或经纪人电话、手机号" v-model="searchtrans" @keyup.13 = "transsou13(searchtrans)" class="trans_text"/>
          <input type="button" @click="transgo" class="trans_btn"/>
        </div>
        <p class="trans_p">共有{{totals}}位经纪人</p>
        <div class="resultshow">{{resultshow}}</div>
      </div>
     <!---------经纪人分类--------->
     <div class="transate_fenlei">
       <div class="translatesel">
         <label>区域 :</label>
         <div class="sel_div">
           <a href="javascript:;" @click="areas('')" :class="area==''?'selthis':''">不限</a>
           <a href="javascript:;" v-for="item in areaList"  @click="areas(item)"  :class="area==item?'selthis':''">{{item}}</a>
         </div>
       </div>
       <div class="translatesel">
         <label>项目 :</label>
         <div class="sel_div">
           <a href="javascript:;" @click="objtrans('')" :class="project==''?'selthis':''">不限</a>
           <a href="javascript:;" v-for="oban in xiangmuList" @click="objtrans(oban)" :class="project==oban?'selthis':''">{{oban}}</a>
         </div>
       </div>
       <div class="translatesel">
         <label>排序 :</label>
         <div class="sel_div">
           <a href="javascript:;" :class="dealSort=='' && watchSort==''?'selthis':''" @click="paixuall">不限</a>
           <a href="javascript:;" @click="transSort"  id="sanjiao" :class="dealSort!=''?'selthis':''">成交量排序<span class="bian" v-if="lang" ></span><span v-else></span></a>
           <a  @click="transwatch" id="sanjiao2" :class="watchSort!=''?'selthis':''" href="javascript:;">带看量排序<span  class="bian" v-if="dlang"></span><span v-else></span></a>
         </div>
       </div>
     </div>
     <!---------经纪人列表--------->
     <div class="translist">
       <div class="trans_ans" v-for="tran in translate" >
         <router-link tag="a" :to="'/Translatesay/'+tran.id">
         <div class="trans_lef"><img :src="tran.agentImg" /> </div>
         <div class="trans_rig">
           <div class="trans01">
             <strong class="trans02">{{tran.name}}</strong>
             <h2><a href="#">{{tran.project}}</a>
               <span v-show="tran.agentLevel==1"><img src="../assets/images/tong.png"></span>
               <span v-show="tran.agentLevel==2"><img src="../assets/images/yin.png"></span>
               <span v-show="tran.agentLevel==3"><img src="../assets/images/jin.png"></span>
             </h2>
           </div>
           <h2 class="trans03">
             <strong>所属门店 : {{tran.store}}</strong>
             <p>{{tran.mobile}}</p>
           </h2>
           <h2 class="trans03">
             <strong>历史成交 : 成交{{tran.dealCount}}套，带看{{tran.watchTimes}}次 </strong>
             <span><img src="../assets/images/call.png" /> 联系方式</span>
           </h2>
           <h2 class="trans04">
             <p>{{tran.tag}}</p>
           </h2>
         </div>
         </router-link>
       </div>
       <div class="infotishi" v-show="infoshow">{{infotishi}}</div>
       <div class="trans_page">
       <el-pagination
         background
         @current-change="newCurrentChange"
         layout="prev, pager, next"
         :page-size="pageSize"
         :total="totals">
       </el-pagination>
       </div>
     </div>
     </div>
   </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Pagination} from 'element-ui'
export default {
  name: 'translate',
  data () {
    return {
      areaList : [],
      xiangmuList: [],
      translate: {},
      jinpai: '',
      searchtrans: '',
      resultshow: '',
      area: '',
      project: '',
      dealSort: '',
      watchSort: '',
      jinitem: '',
      lang: true,
      dlang: true,
      currentpage: '1',
      pageSize: 10,
      totals: 10,
      infotishi: '',
      infoshow: false

    }
  },
  components: {
    'el-pagination': Pagination
  },
  mounted () {
    this.loadtrans()
    this.loadselect()
  },
  methods: {
    loadtrans () {
      var traninfo = {
        page: {
          'pageNum': this.currentpage,
          'pageSize': this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/selectAgent', traninfo).then((response)=>{
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        this.totals = data.total
        var dlist = data.list
        this.translate = dlist
        //console.log(this.translate)
      })
    },
    transgo () {
      if(this.searchtrans== ''){
        this.resultshow = '搜索框不能为空!'
        this.cleartimetrans()
        return
      }
      var traninfos = {
        mobile: this.searchtrans,
        page: {
          'pageNum': this.currentpage,
          'pageSize': this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/selectLikeAgent', traninfos).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var message = data.code
        if (message=='1') {
          // this.resultshow = data.message
          this.translate = false
          this.infoshow = true
          this.infotishi = data.message
        }else{
          this.translate = true
          this.infoshow = false
          var obj = data.object
          obj = obj.list
          this.translate = obj
          this.cleartimetrans()
        }

      })
    },
    transsou13(e){
      this.searchtrans = e
      this.transgo()
    },
    cleartimetrans () {
      var that = this
      setTimeout(function(){
        that.resultshow = ''
      }, 3000)
    },
    loadselect () {
      this.$http.post(myHost+ 'myh_web/selectAreaAndProject').then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        var areas = data.area
        var projects = data.project
        this.areaList = areas
        this.xiangmuList = projects
      })
    },
    gettranlist () {
      var getinfs = {
        area : this.area,
        project: this.project,
        dealSort: this.dealSort,
        watchSort: this.watchSort,
        page: {
          pageNum: '1',
          pageSize: '20'
        }
      }
      this.$http.post(myHost+ 'myh_web/filterAgent', getinfs).then((response) => {
        var data = response.data
        data = data.resultBean
        this.totals = data.total
        var mycds = data.code
        if(mycds == '0'){
          this.infoshow = false
          data = data.object
          var dlist = data.list
          // console.log(dlist)
          this.translate = dlist
        }
      })
    },
    areas (name) {
      this.area = name
      this.gettranlist()
    },
    objtrans(name){
      this.project = name
      this.gettranlist()
    },
    transSort () {
      this.lang = !this.lang
      if( this.dealSort == ''){
        this.dealSort = '0'
      }else if( this.dealSort == '0'){
        this.dealSort = '1'
      }else if( this.dealSort == '1'){
        this.dealSort = '0'
      }
      this.watchSort=''
      this.gettranlist()
    },
    transwatch () {
      this.dlang = !this.dlang
      if( this.watchSort == ''){
        this.watchSort = '0'
      }else if( this.watchSort == '0'){
        this.watchSort = '1'
      }else if( this.watchSort == '1'){
        this.watchSort = '0'
      }
      this.dealSort=''
      this.gettranlist()
    },
    paixuall(){
      this.watchSort = ''
      this.dealSort = ''
      this.gettranlist()
    },
    newCurrentChange(val) {
      this.currentpage = val
      this.loadtrans()
    }
  }
}

</script>

<style scoped>
  .resultshow{
    clear: both;
    display: block;
    overflow: hidden;
    font-size:14px;
    color: #555555;
    line-height: 30px;
  }
  .trans_page{
    display: block;
    text-align: center;
    width: 100%;
    margin: 30px 0px;
  }
  .infotishi{
    clear: both;
    display: block;
    overflow: hidden;
    font-size:14px;
    color: #555555;
    line-height: 30px;
    padding: 20px 0px;
  }
</style>
