<template>
  <div id="newsview">
    <div class="news_ban"><img src="../assets/images/newsban.jpg" /></div>
    <div class="sub_content">
      <div class="sub_wid">
        <h2 class="house_title new_title"></h2>
        <div class="app_con newsall">
          <div class="app_lef new_lef">
            <div class="newsview">
              <h2 class="views_title">{{viewsdata.floorTitle}}</h2>
              <div class="views_p"><p>类型 : {{viewsdata.floorType}}</p><p>作者 : {{viewsdata.floorWriter}}</p><p>日期 : {{viewsdata.floorDate|timeFormat}}</p></div>
              <div class="views_con" v-html="viewsdata.content"></div>
              <div class="views_con mycor">此信息系转载自其他媒体，版权归属于原作者，满易何转载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考。如本网站转载的作品涉及版权问题，请原作者持相应版权证明与本网站联系。</div>
              <div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone"></a><a href="#" class="bds_tsina" data-cmd="tsina"></a><a href="#" class="bds_tqq" data-cmd="tqq"></a><a href="#" class="bds_renren" data-cmd="renren"></a><a href="#" class="bds_weixin" data-cmd="weixin"></a></div>
            </div>
          </div>
          <div class="app_rig amarg"><Indexslideview></Indexslideview></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  Indexslideview from '../components/Indexslide'
export default {
  name: 'newsview',
  data () {
    return {
      viewsdata: {}
    }
  },
  components: {
    Indexslideview
  },
  mounted () {
    this.views()
  },
  methods: {
    views () {
      var viewsinfo = {
        floorId: this.$route.params.id
      }
      this.$http.post(myHost+ 'myh_web/viewFloorDetail',viewsinfo).then((response)=>{
        var data = response.data
        data = data.resultBean
        data = data.object
        var typename = data.floorType
        if(typename == 1){
          data.floorType = '推荐'
        }else if(typename == 2){
          data.floorType = '热门'
        }
        this.viewsdata = data
        console.log(this.viewsdata)
      })
    }
  }
}
</script>

<style scoped>
.views_title{
  display: block;
  text-align: center;
  line-height: 40px;
  font-size: 24px
}
.views_p{
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #999999;
}
  .views_p p{
    display: inline-table;
    text-align: center;
    margin: 0px 20px;
  }
  .views_con{
    display: block;
    text-align: left;
    margin: 20px;
  }
  .mycor{
    color: #999999;
  }
</style>
