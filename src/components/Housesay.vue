<template>
    <div id="housesay">
      <div class="sub_content">
        <div class="sub_wid">
          <!-- ------内容部分----- -->
          <div class="house_slide">
            <div class="house_pic">
              <el-carousel height="410px" >
                <el-carousel-item v-for="ig in imgdata" ><a href="#"><img :src="ig"></a></el-carousel-item>
              </el-carousel>
            </div>
            <div class="house_basic">
              <h2 class="hb_font3">首付{{housedatelist.downPrice}}万起</h2>
              <!--<h2 class="hb_font1">首付15万起</h2>-->
              <strong class="hb_font2">{{housedatelist.subTitle}}   <b>{{stateshow}}</b></strong>

              <p class="hb_font4">住宅： <b>{{housedatelist.measure}} /㎡</b></p>
              <p class="hb_font5">户型：{{housedatelist.layout}}</p>
              <p class="hb_font6">地址：{{housedatelist.address}}<img src="../assets/images/location.png" width="25"/></p>
            </div>
          </div>
          <!-- -----基本信息----- -->
          <div class="navbasic">
            <a href="#lp" id="basic_a">楼盘概况</a>
            <a href="#hx">户型介绍 </a>
            <!--<a href="#zb">周边配套 </a>-->
            <a href="#count">贷款计算器</a>
          </div>
          <div id="lp" class="basiccon">
            <ul>
              <li><p>优惠房价:   </p>{{housedatelist.averagePrice}}元／㎡</li>
              <li><p>电梯情况: </p>{{housedatelist.elevator}}</li>
              <li><p>房屋类型: </p> {{housedatelist.houseType}}</li>
              <li><p>楼层:</p>{{housedatelist.floor}}</li>
              <li><p>朝向:  </p>{{housedatelist.towards}}</li>
              <li><p>户型:</p>{{housedatelist.layout}}</li>
              <li><p>面积:</p>{{housedatelist.measure}}/㎡ </li>
              <li><p>绿化率:</p>{{housedatelist.afforest}}</li>
              <li><p>产权:</p>{{housedatelist.equity}}</li>
              <li><p>装修情况:</p>{{housedatelist.fitment}}</li>
              <li><p>建筑年代:</p>{{housedatelist.houseTimes}}年</li>
            </ul>

          </div>

          <!-- -----户型介绍----- -->
          <div id="hx" class="introduce_title">
            <h2 class="intrtit">户型介绍</h2>
            <a id="introduce_a" href="#">全部户型</a>
            <!--<a href="#">两居</a>-->
            <!--<a href="#">三居</a>-->
          </div>
          <div class="introduce_list">

            <div class="intr_ans" v-for="hx in hxing" >
              <div class="intr_ans_lf">
                <h2><img @click="maximgclick(hx.imgA)" :src="hx.imgA"><!---<p>A户型</p>- --></h2>
                <!-- -------浮层--------- -->
                <div class="maximg" v-show="maximgshow" >
                  <a href="javascript:;" @click="closemaximg" ><img src="../assets/images/closes.png" /> </a>
                  <img :src="maxhximg">
                </div>
                <!-- -------浮层--------- -->
              </div>
              <div class="intr_ans_rg">
                <h2 class="ans01">{{hx.layout}} 建筑面积{{hx.measure}} ㎡（{{hx.towards}}）<span href="#">{{stateshow}}</span></h2>
                <p class="ans02">总价 <b>{{hx.avgPrice}} </b>万／套  <i>最近更新时间：{{hx.createTime|timeFormat}}</i></p>
                <p class="ans03">户型解读：{{hx.explains}}</p>
                <div class="ans04"><p class="anscor1">景观飘窗</p><p class="anscor2">全明格局</p><p class="anscor3">带阳台</p><a class="count" href="#count">贷款计算</a></div>
              </div>
            </div>
          </div>
          <!-- -----周边配套----- -->
          <div id="count">
          <Counterview></Counterview>
          </div>
          <!-- -----百度地图----- -->
          <div id="allmap"></div>
          <div class="mypinglun">
            <h2 class="trans_title">用户评价</h2>
            <div class="assess_an" v-for="pjs in pinglunku">
              <p class="asserss_img"><img  :src="pjs.headUrl" /></p>
              <div class="asserss_names">
                <h2 class="asserss_names_lf"><strong>{{pjs.mobile}}</strong><p v-html="tranxingstart(pjs.score)"></p></h2>
                <h2 class="asserss_names_rg"><strong>{{pjs.comment}}</strong><p>{{pjs.commentTime|timeFormat}}</p></h2>
              </div>
            </div>
            <div class="pj_page">
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="fyclick"
                :total="totals">
              </el-pagination>
            </div>
            <div class="tran_pingjia">
              <h2 class="pingjia_title">我要评论<b>请理性发言，注意文明用语</b></h2>
              <div class="pingjia_write">
                <div class="pjstars">评分：<div class="pjstar_this">
                  <a href="javascript:;" @click="currentlclick(1)" :id="currentindex>=1?'xuanzhong':''" ></a>
                  <a href="javascript:;" @click="currentlclick(2)" :id="currentindex>=2?'xuanzhong':''" ></a>
                  <a href="javascript:;" @click="currentlclick(3)" :id="currentindex>=3?'xuanzhong':''" ></a>
                  <a href="javascript:;" @click="currentlclick(4)" :id="currentindex>=4?'xuanzhong':''" ></a>
                  <a href="javascript:;" @click="currentlclick(5)" :id="currentindex>=5?'xuanzhong':''" ></a>
                </div></div>
                <textarea class="textarea"  v-model="textareas" placeholder="您最满意房源什么！跟大家分享一下吧"></textarea>
                <div>{{tishimessage}}</div>
              </div>
              <input type="button" @click="plbutton" class="pjbtns" value="提交"/>
            </div>
          </div>
          <h2 id="zb" class="house_title pad_bor"><a href="###">推荐<img src="../assets/images/more.png" /></a></h2>
          <div class="content_houselist">

            <!-- -an--- -->
            <div class="date_sayshow" v-for="(dthis,key) in datalist">
              <router-link tag="div" :to="'/Housesays/'+dthis.id">
              <a class="d_show0mar" href="#"><img :src="dthis.mainImg" /><p>{{dthis.subTitle}}</p></a>
              <h2 class="d_show02" >{{dthis.title}}</h2>
              <p class="d_show03" >{{dthis.address}}</p>
              <p class="d_show04" >均价{{dthis.averagePrice}}元／平 ，户型{{dthis.measure}}平方米</p>
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Pagination} from 'element-ui'
import {Carousel,CarouselItem} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Counterview from '../components/Counter'
import {getCookie} from '../util/cookie'
export default {
  name: 'housesay',
  data () {
    return {
      stateshow: '',
      housedatelist: {},
      hxing: {},
      imgdata: [],
      datalist: {},
      myads: '',
      myname: '',
      pinglunku: [],
      textareas: '',
      currentnum: '',
      currentindex: 0,
      tishimessage: '',
      totals: 1,
      pagethis: 1,
      maximgshow: false,
      maxhximg: ''
    }
  },
  components: {
    Counterview,
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem,
    'el-pagination': Pagination
  },
  mounted () {
    this.loadsay()
  },
  methods: {
    loadsay() {
      var myid = this.$route.params.id
      var typeinfo = {
        houseId: myid,
        userId: getCookie('userId')
      }

      this.$http.post(myHost+ 'myh_web/viewHouseInfo', typeinfo).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        data = data[0]
        var imgs = data.imgId
        this.myads = data.address
        this.myname = data.subTitle
        // console.log(this.myads)
        this.imgdata = imgs.split(',')
        var sees = data.state
        this.housedatelist = data
        if (this.housedatelist.downPrice == null) {
          this.housedatelist.downPrice = '--'
        }
        if (this.housedatelist.averagePrice == null) {
          this.housedatelist.averagePrice = '--'
        }
        if (sees == '2') {
          this.stateshow = '楼盘在售'
        } else if (sees == '1') {
          this.stateshow = '已售馨'
        } else if (sees == '3') {
          this.stateshow = '待售'
        }
        this.loadmap()
      })
      var typeinfos = {
        'type': 1
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', typeinfos).then((response) => {
        //console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.datalist = data.slice(0, 3)
      })
      this.$http.post(myHost+ 'myh_web/viewLayInfo', typeinfo).then((res) => {
        console.log(res)
        var data = res.data
        data = data.resultBean
        data = data.object
        this.hxing = data
        // var sps = this.hxing.0.feature
        //console.log(data)
      })
    },
    loadmap () {
      var map = new BMap.Map('allmap')
      map.centerAndZoom ('承德', 12) // 这里是初始地图所显示的城市
      // map.enableScrollWheelZoom()   //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom()  //启用地图惯性拖拽，默认禁用
      this.searchByStationName()
    },
    searchByStationName () {
      var map = new BMap.Map('allmap')
      var localSearch = new BMap.LocalSearch(map)
      localSearch.enableAutoViewport() //允许自动调节窗体大小
      var keyword
      var mynames
      map.clearOverlays();//清空原来的标注
      keyword = this.myads
      // var keyword = document.getElementById("text_").value;
      var that = this
      localSearch.setSearchCompleteCallback(function (searchResult) {
        // console.log(searchResult)
        var sContent =
          "<div>" + "<h4 style='margin:0 0 5px 0;font-weight:bold; font-size:20px;padding:0.2em 0'>"+that.myname+"</h4>" +
          "<img style='float:right;margin:4px' id='imgDemo' src="+that.imgdata[0]+" width='139' height='104'/>" +
          "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址："+searchResult.keyword+"</p>" +
          "</div>"
        var poi = searchResult.getPoi(0)
        map.centerAndZoom(poi.point, 16)
        var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)) // 创建标注，为要查询的地方对应的经纬度
        map.addOverlay(marker)
        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + sContent + "</p>")
        //marker.addEventListener("click", function () { this.openInfoWindow(infoWindow) })
        marker.openInfoWindow(infoWindow); //开启信息窗口
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      })
      localSearch.search(keyword)
    },
    pinglun () {
      var plinfo = {
        houseId: this.$route.params.id,
        page: {
          pageNum: this.pagethis,
          pageSize: 10
        }
      }
      this.$http.post(myHost+ 'myh_web/viewHouseComm', plinfo).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        var pinglundate = data.list
        this.totals = data.total
        this.pinglunku = pinglundate
      })
    },
    currentlclick(r){
      this.currentindex = r
      this.currentnum = r*20
    },
    plbutton () {
      var getuid =  getCookie('userId')
      if(!this.textareas){
        this.tishimessage = '亲 请输入评论内容!'
        this.clearthmessage()
        return
      }
      if(getuid == null){
        this.tishimessage = '亲 请登录网站在评论!'
        this.clearthmessage()
        return
      }
      var pltijiao = {
        userId: getuid,
        houseId: this.$route.params.id,
        comment: this.textareas,
        score: this.currentnum,
        page: {
          pageNum: this.pagethis,
          pageSize: 20
        }
      }
      console.log(pltijiao)
      this.$http.post(myHost+ 'myh_web/insertHouseComm', pltijiao).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var mycode = data.code
        var kubjt = data.object
        kubjt = kubjt.list
        // console.log(kubjt)
        this.pinglunku = kubjt
        // console.log(this.pinglunku)
        if(mycode=='0'){
          this.tishimessage = '提交成功!'
          this.textareas = ''
        }else if(mycode=='1'){
          this.tishimessage = data.message
        }
      })
    },
    clearthmessage(){
      var that= this
      setTimeout(function(){
        that.tishimessage = ''
      }, 3000)
    },
    fyclick(r){
      this.pagethis = r,
      this.pinglun()
    },
    maximgclick(e){
      this.maxhximg = e
      this.maximgshow = true
    },
    closemaximg(){
      this.maximgshow = false
    }
  },
  watch: {
    $route (r) {
      var myid = r.params.id
      var typeinfo = {
        houseId: myid,
        userId: getCookie('userId')
      }

      this.$http.post(myHost+ 'myh_web/viewHouseInfo', typeinfo).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        data = data[0]
        var imgs = data.imgId
        this.imgdata = imgs.split(',')
        var sees = data.state
        this.housedatelist = data
        if (sees == '2') {
          this.stateshow = '楼盘在售'
        } else if (sees == '1') {
          this.stateshow = '已售馨'
        } else if (sees == '3') {
          this.stateshow = '待售'
        }
      })
      this.$http.post(myHost+ 'myh_web/viewLayInfo', typeinfo).then((res) => {
        var data = res.data
        data = data.resultBean
        data = data.object
        this.hxing = data
        // var sps = this.hxing.0.feature
      })
    }
  }
}
</script>

<style scoped>
.d_show02{
  margin-left:0px;
  margin-right:0px;
}
.d_show03{
  margin-left:0px;
  margin-right:0px;
}
.d_show04{
  margin-left:0px;
  margin-right:0px;
  padding:0px;
}
</style>
