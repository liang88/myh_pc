<template>
    <div id="memberhouserecord">
      <div class="jl">
        <div class="jl-tit">
          <p class="clear">
            <span :class="recoredshow==true?'bg':''" @click="recored_title(1)">最新房源</span>
            <span :class="recoredshow!=true?'bg':''" @click="recored_title(0)" >全部楼盘</span>
          </p>
        </div>
        <div  v-if="recoredshow" class="jl-nav">
          <div class="nav-ones clear" v-for="recored in recoreddate">
            <div class="con-pic">
              <img :src="recored.mainImg" alt="">
            </div>
            <div class="con-tit">
              <p>{{recored.subTitle}} <span>最新楼盘</span></p>
              <p>{{recored.address}}</p>
              <p>户型：{{recored.layout}}</p>
              <p>建筑面积：{{recored.measure}} </p>
              <p>最新更新时间：{{recored.createTime|timeFormat}}</p>
              <p>
                <span v-for="myfea in recored.merfearure">{{myfea}}</span>
              </p>
            </div>
            <div class="con-right">
              <p><img src="../assets/images/fang.jpg" alt="">400-068-1359</p>
              <p>均价<span>{{recored.averagePrice}}</span>元/㎡ </p>
              <p>总价{{recored.price}}万/套起</p>
            </div>
          </div>
          <div class="housetishi" v-show="recoredxianshi">{{houserecordshow}}</div>
          <!--<el-pagination-->
            <!--background-->
            <!--layout="prev, pager, next"-->
            <!--@current-change="fanyedianji"-->
            <!--:total="1000">-->
          <!--</el-pagination>-->
        </div>
        <div  v-else  class="jl-nav">
          <div class="nav-ones clear" v-for="recored in recoreddate">
            <div class="con-pic">
              <img :src="recored.mainImg" alt="">
            </div>
            <div class="con-tit">
              <p>{{recored.subTitle}} <span>最新楼盘</span></p>
              <p>{{recored.address}}</p>
              <p>户型：{{recored.layout}}</p>
              <p>建筑面积：{{recored.measure}} </p>
              <p>最新更新时间：{{recored.createTime|timeFormat}}</p>
              <p>
                <span>{{recored.merfearure}}</span>
              </p>
            </div>
            <div class="con-right">
              <p><img src="../assets/images/fang.jpg" alt="">400-068-1359</p>
              <p>均价<span>{{recored.averagePrice}}</span>元/㎡ </p>
              <p>总价{{recored.price}}万/套起</p>
            </div>
          </div>
          <div class="housetishi" v-show="recoredxianshi">{{houserecordshow}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import {Pagination} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getCookie} from '../util/cookie'
export default {
  name: 'memberhouserecord',
  data(){
    return {
      houserecordshow: '',
      recoreddate: {},
      recdtype: 1,
      recoredshow: true,
      recoredxianshi: false
    }
  },
  components: {
    'el-pagination': Pagination
  },
  mounted(){
    this.loadmember()
  },
  methods: {
    loadmember(){
      this.recoreddate = ''
      var idsgt =  getCookie ('userId')
      var lmeinfo = {
        id: idsgt,
        type: this.recdtype,
        page: {
          pageNum: 1,
          pageSize: 20
        }
      }
      this.$http.post(myHost+'myh_web/viewBroseRecord', lmeinfo).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var codes = data.code
        if(codes== 1){
          this.houserecordshow = data.message
          this.recoredxianshi = true
        }else if(codes== 0){
          data = data.object
          this.recoredxianshi = false
          for(var i=0; i< data.length; i++){
            data[i].merfearure = data[i].feature.split(',').slice(0, 3)
          }
          this.recoreddate = data
        }
      })
    },
    recored_title(e){
      this.recdtype = e
      if (this.recdtype==1) {
        this.recoredshow = true
        this.loadmember()
      } else{
        this.recoredshow = false
        this.loadmember()
      }
      console.log(this.recoredshow)
    }
    // fanyedianji(e){
    //   console.log(e)
    // }
  }
}
</script>

<style scoped>
.housetishi{
  display: block;
  font-size: 16px;
  line-height: 35px;
  text-align: center;
  color: #333333;
}
</style>
