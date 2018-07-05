<template>
    <div id="memberadmins">
      <div class="gl">
        <div class="gl-tit">
          <form class="clear" action="">
            <div class="f-l">
              <p @click="mbtit01(0)" :class="this.mbbiaoti==0?'pps':''">全部楼盘</p>
            </div>
            <div style="display: none" class="f-r clear">
              <img src="../assets/images/sousuo.png" alt="">
              <input type="text" placeholder="输入楼盘名或区域">
              <span>搜索</span>
            </div>
            <div  class="mbadmin-r clear">
              <a @click="mbfinish" href="#">完成</a>
            </div>
          </form>
        </div>
        <div class="gl-wap">
          <div class="gl-xuan clear mbgared">
            {{mbamessage}}
          </div>
          <div class="gl-xuan clear">
            <p>选择你想要售卖的房源不得超过5个</p>
          </div>
          <div v-if="mbguanli" class="gl-nav">
            <el-checkbox-group v-model="checkList" :max="5">
            <div v-for="mas in mbhousedate" class="nav-ones clear">
              <div class="nav-pic">
                <img :src="mas.mainImg" alt="">
              </div>
              <div class="nav-con">
                <p>{{mas.subTitle}}<span>{{mas.province}}</span></p>
                <p>{{mas.layout}}</p>
                <p>建筑面积：{{mas.measure}}㎡</p>
              </div>
              <div class="nav-money">
                均价<span>{{mas.averagePrice}}</span>元/㎡
              </div>
              <div class="nav-k">
                <el-checkbox  label=""   :label="mas.id"  :key="mas.id"></el-checkbox>
              </div>
            </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Checkbox, CheckboxGroup} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getCookie} from '../util/cookie'
export default{
  name: 'memberadmins',
  data(){
    return {
      mbguanli: true,
      mbbiaoti: 0,
      checkList: [],
      mbhousedate: [],
      mbamessage: ''
    }
  },
  mounted(){
    this.loadhouselist()
  },
  components: {
    'el-checkbox-group': CheckboxGroup,
    'el-checkbox': Checkbox
  },
  methods:{

    isInArray(arr,value){
      for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
          return true;
        }
      }
      return false;
    },
    loadhouselist(){
      this.checkList = []
      var houseinfo = {
        type: this.mbbiaoti,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+'myh_web/viewHouseInfo', houseinfo).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.mbhousedate = data
      })
    },
    mbtit01(e){
      this.mbbiaoti = e
      if(this.mbbiaoti==3){
        this.mbguanli = true
      }else if(this.mbbiaoti==4){
        this.mbguanli = false
      }
      this.loadhouselist()
    },
    mbfinish(){
      if(this.mbbiaoti==0){
        this.mbbiaoti==3
      }
      var mbdateinfo = {
        agentId: getCookie ('userId'),
        type: 3,
        houseIdList: this.checkList
      }
      console.log(mbdateinfo)
      this.$http.post(myHost+'myh_web/saveTheHouseThatAgentChoise', mbdateinfo).then((response) => {
        var data = response.data
        data = data.resultBean
        var das = data.code
        if(das==1){
          this.mbamessage =data.message
        }else if(das==0){
          this.mbamessage = '提交成功!'
        }
      })
    }
  }
}
</script>

<style >
.mbadmin-r{
  display: block;
  float: right;
  margin: 20px 0px;
}
.mbadmin-r a{
  text-decoration: none;
  font-size:18px;
  color: #333333;
  padding: 10px;
}
  .el-checkbox__label{
    color:#fff
  }
.el-checkbox__input.is-checked+.el-checkbox__label{
  display: none;
}
  .mbgared{
    display: block;
    overflow: hidden;
    color: #ff0000;
    line-height: 40px;
    text-align: center;
    font-size:15px;
  }
</style>
