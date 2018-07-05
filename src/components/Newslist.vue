<template>
    <div id="newslist">
      <div class="news_ban"><img src="../assets/images/newsban.jpg" /></div>
      <div class="sub_content">
      <div class="sub_wid">
      <h2 class="house_title new_title"><a href="###">推荐<img src="../assets/images/more.png" /></a></h2>
      <div class="app_con newsall">
        <div class="app_lef new_lef">
          <div class="newlist">
            <!---an---->
            <div class="newlist_an" v-for="(nan,key) in newdata" >
              <div class="newlist_left"><router-link tag="a" :to="'/Newsview/'+nan.id"><img :src="nan.imgUrl"/></router-link></div>
              <div class="newlist_right">
                <router-link tag="a" :to="'/Newsview/'+nan.id">{{nan.floorTitle}}</router-link>
                <strong>{{nan.floorPreview}}</strong>
                <div><p>类型：{{nan.floorType}}</p><p>作者:{{nan.floorWriter}}</p><p>上传日期:{{nan.floorDate|timeFormat}}</p></div>
              </div>
            </div>
            <!---an---->
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
  name: 'newslist',
  data () {
    return {
      newdata: []
    }
  },
  components: {
    Indexslideview
  },
  mounted () {
    this.newslist()
  },
  methods: {
    newslist () {
      var newpage = {
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+'myh_web/selectMyhFloor', newpage).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        for(var i=0;i<data.length;i++){
          var typename = data[i].floorType
          if(typename == 1){
            data[i].floorType = '推荐'
          }else if(typename == 2){
            data[i].floorType = '热门'
          }
        }
        this.newdata = data
      })
    }
  }
}
</script>

<style scoped>

</style>
