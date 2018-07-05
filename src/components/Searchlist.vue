<template>
    <div id="searchlist">
      <div class="sub_content">
        <div class="sub_wid">
          <!-----搜索条------>
          <div class="search_focus">
            <div class="search_focusone">
            <input type="text" placeholder="找新房，搜满易" v-model="keyshow" @keyup.13="searchclickd(keyshow)" class="search_text linebor" />
            <input type="button" value="开始找房" @click="searchfun" class="search_button" />
            </div>
          </div>
          <!----搜索---->
          <h2 class="house_nh new_title"><a href="###">全部楼盘</a></h2>
          <div class="result">共找到 <b>{{totals}}</b> 套在售房源</div>
          <div class="app_con newsall">
            <div class="app_lef new_lef">
                <div class="newhouseall">
                  <div class="seamessage" v-show="propshow">{{seamessage}}</div>
                  <!---an---->
                  <div class="newlist_an" v-for="sea in searchdata">
                    <router-link tag="a" :to="'/Housesay/'+sea.id">
                      <div class="newhouseall_left"><a href="#"><img :src="sea.mainImg" /> </a></div>
                      <div class="newhouseall_right">
                        <ul class="house_fonts">
                          <li class="hft_01"><a href="#">{{sea.subTitle}}</a><p>均价<b>{{sea.averagePrice}}</b>元/㎡</p></li>
                          <li class="hft_02"><strong>{{sea.address}}</strong><p><img src="../assets/images/call.png" />400-1133-233</p></li>
                          <li class="hft_03"><p>户型：{{sea.layout}}</p></li>
                          <li class="hft_04"><p>建筑面积：{{sea.measure}}㎡ </p></li>
                          <li class="hft_05"><p class="hft_cor2">{{sea.houseType}}</p> </li>
                        </ul>
                      </div>
                    </router-link>
                  </div>
                  <!---an---->
                  <div class="pageall">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :total="totals">
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
export default {
  name: 'searchlist',
  data () {
    return {
      keyshow: '',
      searchdata: {},
      seamessage: '',
      propshow: false,
      totals: '',
      currentpage: '1',
      pageSize: '8'
    }
  },
  components: {
    Indexslideview,
    'el-pagination': Pagination
  },
  mounted () {
    this.loadfun()
  },
  methods: {
    loadfun () {
      this.keyshow = this.$route.params.d
      this.runget()
    },
    searchfun () {
      // console.log(this.keyshow)
      this.runget()
    },
    searchclickd(e){
      this.runget()
    },
    handleCurrentChange (val) {
      this.currentpage = val
      this.runget()
    },
    runget () {
      var runinfos = {
        subTitle: this.keyshow,
        page: {
          pageNum: this.currentpage,
          pageSize: this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/likeMyhHouse', runinfos).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var objdata = data.object
        var mycode = data.code
        if (mycode == '1') {
          this.propshow = true
          this.searchdata = false
          this.seamessage = data.message
          return
        } else {
          var lsdata = objdata.list
          this.searchdata = lsdata
          this.propshow = false
          this.totals = objdata.total
        }
      })
    }
  }
}
</script>

<style scoped>
.search_focus{
  display: block;
  overflow: hidden;
  background: #ffffff;
  padding:50px 0px  20px 0px;
  text-align: center;
}
  .search_focusone{
    display: block;
    width: 900px;
    margin: 0px auto;
  }
  .linebor{
    border: 1px solid #dcdcdc;
  }
  .result{
    display: block;
    font-size: 18px;
    color: #555555;
    line-height: 40px;
    padding: 0px 20px;
  }
  .result b{
    font-size: 18px;
    color:#66cc00;
  }
  .seamessage{
    display: block;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    color: #000000;
  }
  .pageall{
    display: block;
    overflow: hidden;
    width: 100%;
    margin: 20px auto;
    text-align: center;
  }
</style>
