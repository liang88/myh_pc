<template>
  <div id="newhouse">
    <div class="news_ban">
      <router-link tag="a" :to="'/Housesay/'+33"><img  src="../assets/images/newhouse.jpg" /></router-link>
      </div>
    <div class="sub_content">
      <div class="sub_wid">
        <div class="screen_show">
          <!---------搜索条--------- -->
          <div class="searchalls">
             <div class="search_div">
               <input type="text" placeholder="输入楼盘名或者区域" v-model="search_house" @keyup.13="housesou(search_house)" class="search_text2"/>
               <p class="search_font" >共有{{mynum}}个楼盘</p>
               <input type="button" @click="searchs" value="搜索" class="search_btn2"/>
             </div>
            <div class="search_history">搜索历史:<a href="#" v-for="item in showHistoryData" @click="searchByHistory(item)">{{item}}</a> </div>
          </div>
          <!---------分类--------- -->
          <div class="screen_select">
            <div class="area">
              <div class="labels">区域</div>
              <div class="citys">
                <!------省------>
                <a href="#"  :class="thise==''?'hovercty':''" @click="areaload('')" >全部</a>
                <a href="#"  :class="thise==areathis?'hovercty':''"  v-for="(areathis,index) in areadate"  @click="areaload(areathis)">{{areathis}}</a>
                <!------市------>
                  <div class="twolevel_div" v-show="thise!=''">
                    <div class="twolevel_list">
                      <a href="#"  :class="thiss==citys?'hovercty':''"    @click="citysload(citys)" v-for="citys in citydate">{{citys}}</a>
                    </div>
                    <!------区县------>
                    <div class="twolevel_list">
                      <a href="#"  :class="thisi==county?'hovercty':''"  @click="countysload(county)" v-for="county in countydate">{{county}}</a>
                    </div>
                    <p class="tl_jiao"></p>
                  </div>
              </div>
            </div>
            <div class="area">
              <div class="labels">均价</div>
              <div class="citys">
                <a href="#"  :class="thisx==0?'hovercty':''" @click="averagesload(0)" >不限</a>
                <a href="#" :class="thisx==1?'hovercty':''" @click="averagesload(1)" >5千以下</a>
                <a href="#" :class="thisx==2?'hovercty':''" @click="averagesload(2)" >5千至1万</a>
                <a href="#" :class="thisx==3?'hovercty':''" @click="averagesload(3)" >1万至2万</a>
                <a href="#" :class="thisx==4?'hovercty':''" @click="averagesload(4)" >2万以上</a>
              </div>
              <div class="citys_price">单价(元/平)
                <input   type="number" oninput="this.value=(this.value.replace(/[^0-9.]+/,''))"  v-model="frommuch"/>
                -
                <input type="number" oninput="this.value=(this.value.replace(/[^0-9.]+/,''))"  v-model="tomuch"/>
                <input value="确定"  @click="averagesload(5)" type="button"/>
              </div>
            </div>
            <div class="area">
              <div class="labels">户型</div>
              <div class="citys">
                <a href="#"  :class="layouts==''?'hovercty':''" @click="layoutload('')">全部</a>
                <a href="#" :class="layouts=='一室'?'hovercty':''"  @click="layoutload('一室')" >一室</a>
                <a href="#" :class="layouts=='两室'?'hovercty':''"  @click="layoutload('两室')" >两室</a>
                <a href="#" :class="layouts=='三室'?'hovercty':''"  @click="layoutload('三室')" >三室</a>
                <a href="#" :class="layouts=='四室'?'hovercty':''"  @click="layoutload('四室')" >四室</a>
                <a href="#" :class="layouts=='其他'?'hovercty':''"  @click="layoutload('其他')" >五室及以上</a>
              </div>
            </div>
          </div>
        </div>
        <div class="app_con newsall">
          <div class="app_lef new_lef">
            <!---------分类--------- -->
            <div class="tabs">
              <a href="javascript:;" @click="tabthis(1)" :id="this.types==1?'tabs_a':''">最新一手房</a>
              <a href="javascript:;" @click="tabthis(0)" :id="this.types==0?'tabs_a':''">全部楼盘</a>
            </div>
            <div class="select_menu">
              <a class="sela" href="javascript:;" :style="c==true?'color:#ff6600':''" @click="number(a)">默认排序</a>
              <a class="sanjiao"  href="javascript:;" :style="c==false?'color:#ff6600':''"   @click="btnprice(a)">价格<span class="bian" v-if="price"></span><span v-else></span></a>
            </div>
            <div class="newhouseall">
              <!---an---->
              <div class="newlist_an" v-for="hous in housedata">
                <router-link tag="a" :to="'/Housesay/'+hous.id">
                <div class="newhouseall_left"><a href="#"><img :src="hous.mainImg" /> </a></div>
                <div class="newhouseall_right">
                  <ul class="house_fonts">
                    <li class="hft_01"><a href="#">{{hous.subTitle}}</a><p>均价<b>{{hous.averagePrice}}</b>元/㎡</p></li>
                    <li class="hft_02"><strong>{{hous.address}}</strong><p><img src="../assets/images/call.png" />400-1133-233</p></li>
                    <li v-show="nhshuxing" class="hft_03"><p>户型：{{hous.layout}}</p></li>
                    <li class="hft_04"><p>建筑面积：{{hous.measure}}㎡ </p></li>
                    <li class="hft_05"><p class="hft_cor2" v-for="myfea in hous.housefeature">{{myfea}}</p> </li>
                  </ul>
                </div>
                </router-link>
              </div>
              <!---an---->
               <div class="tishimessage" v-show="tsmshow">{{tishimessage}}</div>
              <div class="pageall">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  :current-page.sync="diyige"
                  :total="mynum">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="app_rig amarg"><Indexslideview></Indexslideview></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Pagination} from 'element-ui'
import  Indexslideview from '../components/Indexslide'
import {setCookie,getCookie} from  '../util/cookie'
export default {
  name: 'newhouse',
  data () {
    return {
      stateshow: '',
      housedata: {},
      price: true,
      mynum: 10,
      getTitle: '',
      a: '1',
      c: true,
      menua: {
        'color': '#ff6600'
      },
      twodata: [
        {
          id: 1,
          name: '御道庄园'
        },
        {
          id: 2,
          name: '财富九龙城'
        },
        {
          id: 3,
          name: '兴隆融创城'
        },
        {
          id: 4,
          name: '荣盛阿尔卡迪亚'
        },
        {
          id: 5,
          name: '兴隆碧桂园'
        }
      ],
      currentpage: 1,
      pageSize: 10,
      types: 1,
      search_house: '',
      historycn: '',
      levelshow: false,
      areadate: [],
      citydate: [],
      countydate: [],
      tishimessage: '',
      tsmshow: false,
      anull: '',
      thise: '',
      thiss: '',
      thisi: '',
      thisx: '',
      fromPrices: '',
      toPrices: '',
      layouts: '',
      frommuch: '',
      tomuch: '',
      showhover: '',
      shiqushow: '',
      showsousuo: '',
      searchHistoryData: '',
      showHistoryData:[],
      nhshuxing:true,
      diyige: 1
    }
  },
  components: {
    Indexslideview,
    'el-pagination': Pagination
  },
  mounted () {
    this.loadrun()
    this.houseall()
    this.areaload('')
    this.loadnewhouse()
  },
  methods: {
    loadrun () {
      this.searchHistoryData = getCookie('showsousuo')
      this.searchHistoryData = unescape(this.searchHistoryData)
      this.showHistoryData = this.searchHistoryData.split(',')
      this.showHistoryData = this.filter_array(this.showHistoryData)

      var nhs = this.$route.params.id
      if (nhs == 0 ){
        this.types = 0
      }
      this.houseall()
    },
    unique (arr) {
      return Array.from(new Set(arr))
    },
    changeArray(myArrStr) {
      //完成的操作是 对数组去重    并且只显示最近3条
      var myArr = myArrStr.split(',')
      myArr = this.filter_array(myArr)
      //数组去重
      myArr = this.unique(myArr)
      var newArr = []
      if(myArr.length>3){
        newArr.push(myArr[0])
        newArr.push(myArr[1])
        newArr.push(myArr[2])
      }else{
        newArr = myArr
      }
      return newArr.join(',')
    },
    btnprice () {
      this.price = !this.price
      this.c = false
      if (this.a == 0) {
        this.a = 1
      } else {
        this.a = 0
      }
      this.houseall()
    },
    number () {
      this.c = true
      this.a = 1
      this.houseall()
    },
    handleCurrentChange (val) {
      this.currentpage = val
      this.houseall()
    },
    houseall () {
      var ty = {
        type: this.types,
        priceSort: this.a,
        pageNum: this.currentpage,
        pageSize: this.pageSize
      }
      console.log(ty)
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', ty).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        var num = data.total
        this.mynum = num
        data = data.list
        if (this.getTitle == '') {
          this.housedata = data
          for(var i=0; i< data.length; i++){
            data[i].housefeature = data[i].feature.split(',').slice(0, 3)
          }
          return
        }
        var arr = []
        for (var i = 0; i < data.length; i++) {
          var newdatas = data[i].subTitle
          if (newdatas == this.getTitle){
            arr.push(data[i])
          }
        }
        this.housedata = arr
      })
    },
    searchByHistory (searchKeyword) {
      this.search_house = searchKeyword
      this.searchs()
    },
    loadnewhouse () {
      if(this.$route.params.id==0){
        this.search_house = ''
        return
      }
      this.search_house = this.$route.params.id
      this.searchs()
    },
    searchs () {
      //把搜索记录增加到搜索历史中

      //首先要获取到之前的搜索历史 之后跟这次的搜索历史进行拼接
      //处理searchHistoryData 只显示最近3条 并且去重
      this.searchHistoryData = this.search_house+','+this.searchHistoryData
      this.searchHistoryData = this.changeArray(this.searchHistoryData)
      // console.log(this.searchHistoryData+1111)
      // console.log(escape(this.searchHistoryData)+2222)
      this.$store.dispatch('addSearchData',this.searchHistoryData)
      setCookie('showsousuo', this.searchHistoryData)

      var searchinfos = {
        subTitle: this.search_house,
        page: {
          pageNum: this.currentpage,
          pageSize: this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/likeMyhHouse', searchinfos).then((response) => {
        var data = response.data
        data = data.resultBean
        var mytishi = data.code
        // if(mytishi== '1'){
        //   this.tsmshow = true
        //   this.housedata = false
        //   this.tishimessage = data.message
        // }else if(mytishi== '0'){
        this.tsmshow = false
        data = data.object
        var num = data.total
        this.mynum = num
        data = data.list
        this.housedata = data
        // }

      })
    },
    housesou(e){
      this.search_house = e
      this.searchs()
    },
    tabthis(r){
      this.types = r
      if(this.types==0){
        this.nhshuxing = false
      }else{
        this.nhshuxing = true
      }
      this.currentpage = 1
      this.diyige = 1
      this.houseall()
    },
    filterdata(){
      var scrinfos = {
        province: this.thise,
        city: this.thiss,
        area: this.thisi,
        type: this.types,
        layout: this.layouts,
        fromPrice: this.fromPrices,
        toPrice: this.toPrices,
        priceSort: '1',
        page: {
          pageNum: this.currentpage,
          pageSize: this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/filterHouses', scrinfos).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var num = data.total
        this.mynum = num
        var mycode = data.code

        if(mycode=='1'){
          this.tsmshow = true
          this.housedata = false
          this.tishimessage = data.message
          return
        }else if(mycode=='0'){
          this.tsmshow = false
          data = data.object
          var num = data.total
          this.mynum = num
          data = data.list
          this.housedata = data
          // console.log( this.housedata)
        }
      })
    },
    areaload(e){
      this.thiss = ''
      this.thisi = ''
      this.thise = e
      this.$http.post(myHost+ 'myh_web/viewAllProvinces').then((response) =>{
        var data = response.data
        data = data.resultBean
        data = data.object
        this.areadate = data
      })
      if (!this.thise) {
        return
      }
      var save = {
        'province': this.thise,
        page: {
          pageNum: this.currentpage,
          pageSize: this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/viewTheCities', save).then((response) =>{
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var num = data.total
        this.mynum = num
        data = data.object
        this.citydate = data.cityList
      })
      this.filterdata()
    },
    citysload(s){
      this.thiss = s
      var county = {
        'city': this.thiss,
        page: {
          pageNum: this.currentpage,
          pageSize: this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/viewTheAreas', county).then((response) =>{
        var data = response.data
        data = data.resultBean
        var num = data.total
        this.mynum = num
        data = data.object
        this.countydate = data.areaList
      })
      this.filterdata()
    },
    countysload(i){
      this.thisi = i
      this.filterdata()
    },
    averagesload(x){
      this.thisx = x
      if(this.thisx == 0){
        this.fromPrices = 0
        this.toPrices = 0
      }else if(this.thisx == 1){
        this.fromPrices = 0
        this.toPrices = 5000

      }else if(this.thisx == 2){
        this.fromPrices = 5000
        this.toPrices = 10000

      }else if(this.thisx == 3){
        this.fromPrices = 10000
        this.toPrices = 20000

      }else if(this.thisx == 4){
        this.fromPrices = 20000
        this.toPrices = 0
      }else if(this.thisx == 5){
        this.fromPrices = this.frommuch
        this.toPrices = this.tomuch
      }
      this.filterdata()
    },
    layoutload(d){
      this.layouts = d
      this.filterdata()
    },
    //去除数组中的空值
    filter_array(array) {
      for(var i = 0 ;i<array.length;i++)
      {
        if(array[i] == "" || typeof(array[i]) == "undefined" || array[i] == "null" || array[i] == "undefined")
        {
          array.splice(i,1);
          i= i-1;

        }
      }
      return array
    }
},
  watch: {
    $route (r) {

      var nhs = r.params.id
      if(!nhs){
        this.getTitle = ''
        this.houseall()
        return
      }
      nhs = nhs - 1
      this.getTitle = this.twodata[nhs].name
      this.houseall()
    },
    vHistoryData(val){
      this.searchHistoryData = val!=''?val:getCookie('showsousuo')
      this.showHistoryData = this.searchHistoryData.split(',')
      this.showHistoryData = this.filter_array(this.showHistoryData)

    }
  },
  computed: {
    vHistoryData (){
      return this.$store.getters.searchHistory
    }
  }
}
</script>

<style scoped>

.sela{
  font-size: 16px;
  text-decoration: none;
  margin-right: 20px;
}
.sel03{
  color: #666666;
  font-size: 16px;
  float: right;
}
.sanjiao { color: #333333; font-size:16px; position: relative; text-decoration: none;padding-right: 18px;}
.sanjiao span { border: 6px solid #666666; border-top-color: transparent; border-left-color: transparent; border-right-color: transparent; display: inline-block; position: absolute; top: 0.28125rem; right: 0.04688rem; }
.sanjiao .bian { border-top-color: #666666; border-bottom-color: transparent; border-left-color: transparent; border-right-color: transparent; display: inline-block; position: absolute; top: 0.3rem; right: 0.04688rem; }
.pageall{
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 20px auto;
  text-align: center;
}
  .tishimessage{
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 50px 0px;
    text-align: center;
    font-size:20px;
    color: #666666;
  }
</style>
