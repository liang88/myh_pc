<template>
    <div id="index">
      <div class="content_date">
        <div class="content_lf">
          <div class="pic_list">
            <div class="pic_banner">
              <el-carousel height="410px" >
                <el-carousel-item v-for="hot in bannerdata"><router-link tag="a" :to="'/Houseban/'+hot.id"><img :src="hot.imgUrl" /></router-link></el-carousel-item>
              </el-carousel>
            </div>
            <div class="hot_dateshow">
              <!---an--- -->
              <div class="date_show" v-for="(hot,key) in hotdata" :style="key%2==0?marginclass:''" >
                <router-link tag="div" :to="'/Housesay/'+hot.id">
                <a class="d_show01" href="#"><img :src="hot.mainImg" /><p>{{hot.subTitle}}</p></a>
                <h2 class="d_show02" >“{{hot.title}}”</h2>
                <p class="d_show03" >{{hot.address}}</p>
                <p class="d_show04" >面积:{{hot.measure}}㎡     <b class="dshow44">均价:<b class="d_show09">{{hot.averagePrice}}</b>元/平</b></p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Carousel,CarouselItem} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'index',
  data () {
    return {
      hotdata: [],
      'marginclass': {
        'margin-right': '20px'
      },
      bannerdata: []
    }
  },
  mounted () {
    this.indexart()
    this.banner()
  },
  methods: {
    indexart () {
      var that = this
      var hotinfos = {
        pageNum: 1,
        pageSize: 2
      }
      this.$http.post(myHost+ 'myh_web/viewHotImg', hotinfos).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        that.hotdata = data
      })
    },
    banner () {
      var that = this
      this.$http.post(myHost+ 'myh_web/bannerImg').then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        that.bannerdata = data
      })
    }
  },
  components: {
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem
  }
}
</script>

<style>
.classmarin{
  margin-right: 20px;
}
.el-carousel__button {
  display: block;
  opacity: .48;
  width: 30px;
  height: 6px;
  background-color: #fff;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: .3s;
  transition: .3s;
}
  .dshow44{
    float: right;
    font-weight: normal;
  }
</style>
