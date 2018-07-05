<template>
    <div id="memberlookhouse">
      <div class="kf">
        <div class="kf-tit">
          <p>预约看房</p>
        </div>
        <div class="kf-wap">
          <div class="nav-tit clear">
            <div class="nav-tit-l"></div>
            <div class="nav-tit-r">
              <div>预约时间</div>
              <div>集合时间</div>
              <div>项目地址</div>
              <div>集合地址</div>
              <div>看房电话</div>
              <div>操作</div>
            </div>
          </div>
          <div v-for="loohouse in mbhousedata" class="nav-con2 clear">
            <div class="nav-con2-l">
              <img style="width: 218px; height: 137px;" :src="loohouse.imgUrl"/>
            </div>
            <div class="nav-con2-r">
              <div>
                <p>{{loohouse.startTime|timeFormat}}</p>
                <p></p>
              </div>
              <div>
                <p>{{loohouse.endTime|timeFormat}}</p>
                <p></p>
              </div>
              <div>
                <p>{{loohouse.address}}</p>
                <p>{{loohouse.title}}</p>
              </div>
              <div>
                <!--<p>北京市顺义区</p>-->
                <!--<p>南法信地铁站</p>-->
              </div>
              <div>
                <p>{{loohouse.pMobile}}</p>
              </div>
              <div>
                <!--<p>取消预约</p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getCookie} from "../util/cookie";
export default {
  name: 'memberlookhouse',
  data(){
    return {
      mbhousedata: {}
    }
  },
  mounted(){
    this.loadmbfd()
  },
  methods: {
    loadmbfd(){
      var mbfdinfo = {
        id: getCookie('userId')
      }
      this.$http.post(myHost+'myh_web/selectActivityByUser', mbfdinfo).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        this.mbhousedata = data
      })
    }
  }
}
</script>

<style scoped>

</style>
