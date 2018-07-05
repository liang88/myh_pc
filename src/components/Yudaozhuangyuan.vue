<template>
    <div id="yudaozhuangyuan">
      <nav class="zt">
        <div class="one">
          <img src="../assets/images/yudao/1.jpg" alt="">
        </div>
        <div class="two">
          <img src="../assets/images/yudao/2.jpg" alt="">
          <div class="t-zi">
            <p>我们一起在御道庄园</p>
            <div class="t-heng"></div>
            <p>御道口区(御道口草原-塞罕坝林场)未来将作为国家战略，大力发展建设成环京津冀城市带乃至全国最大的绿色循环高新产业经济新区。</p>
          </div>
        </div>
        <div class="three">
          <img src="../assets/images/yudao/3.jpg" alt="">
          <div class="th-zi">
            <div class="th-right">
              <p>在哪养老很重要</p>
              <div class="th-heng clear"></div>
              <p>外交大使馆、国际影城、智能5A养老基地，和本项目仅仅相隔一条马路，是未来开发区的中心点，价值百万！</p>
              <p>订购热线：400-1133-233</p>
            </div>
          </div>
        </div>
        <div class="fore">
          <img src="../assets/images/yudao/4.jpg" alt="">
          <div class="f-zi">
            <ul>
              <li>优惠房价 <span>5500元／㎡</span></li>
              <li>电梯情况 <span>无电梯</span></li>
              <li>房屋类型 <span>普通住宅</span></li>
            </ul>
            <ul>
              <li>朝向 <span>南北通透</span></li>
              <li>建筑年代 <span>2017</span></li>
              <li>楼层 <span>5层</span></li>
            </ul>
            <ul>
              <li>面积 <span>81.98/㎡</span></li>
              <li>绿化率 <span>35％</span></li>
              <li>产权 <span>70年</span></li>
            </ul>
          </div>
          <div class="f-shoufu">
            <router-link reg="a" to="/Housesay/2">
            <p>首付</p>
            <p><span>16</span>万起</p>
            <p>点我抢购</p>
            </router-link>
          </div>
        </div>
        <div class="five">
          <img src="../assets/images/yudao/5.jpg" alt="">
          <div class="fi-zi">
            <img src="../assets/images/yudao/chaozhi.png" alt="">
          </div>
        </div>
        <div class="six">
          <img src="../assets/images/yudao/6.jpg" alt="">
          <!---------浮层----------->
          <div class="maximg" v-show="maximgshow" >
            <a href="javascript:;" @click="closemaximg" ><img src="/static/images/closes.png" /> </a>
            <img class="maxautoimg" :src="img04">
          </div>
          <!---------浮层----------->
          <div class="s-zi">
            <div class="s-kuang">
              <div class="dingzi">
                <div class="dz-nei">

                </div>
              </div>
              <div class="imgwidauto"><a @click="max01" href="javascript:;"><img :src="img01" alt=""></a></div>
              <p>A户型</p>
              <p>
                <span>景观飘窗</span>
                <span>全明格局</span>
                <span>带阳台</span>
              </p>
              <p>1室1厅1卫1厨 建筑面积45.51 ㎡（南北朝向）</p>
              <p>均价<span> 6200 </span>／㎡</p>
            </div>
            <div class="s-kuang">
              <div class="dingzi">
                <div class="dz-nei">

                </div>
              </div>
              <div class="imgwidauto"><a  @click="max02"  href="javascript:;"><img :src="img02" alt=""></a></div>
              <p>B户型</p>
              <p>
                <span>景观飘窗</span>
                <span>全明格局</span>
                <span>带阳台</span>
              </p>
              <p>2室1厅1卫 建筑面积81.98 ㎡（南北朝向）</p>
              <p>均价<span> 5500 </span>／㎡</p>
            </div>
            <div class="s-kuang">
              <div class="dingzi">
                <div class="dz-nei">

                </div>
              </div>
              <div class="imgwidauto"><a  @click="max03"   href="javascript:;"><img :src="img03" alt=""></a></div>
              <p>C户型</p>
              <p>
                <span>景观飘窗</span>
                <span>全明格局</span>
                <span>带阳台</span>
              </p>
              <p>2室1厅1卫83.42㎡（南北朝向）</p>
              <p>均价<span> 5500 </span>／㎡</p>
            </div>
          </div>
        </div>
        <div class="seven">
          <img src="../assets/images/yudao/7.jpg" alt="">
          <div class="se-zi">
            <div class="se-right">
              <p>想去哪就去哪</p>
              <div class="se-heng clear"></div>
              <p>距离御道口机场5公里，2018年8月，御道口机场正式通航启用，为了服务世旅发会。</p>
            </div>
          </div>
        </div>
        <div class="eight">
          <img src="../assets/images/yudao/8.jpg" alt="">
          <div class="e-zi clear">
            <div class="e-right">
              <p>冬奥会赛场</p>
              <div class="e-heng clear"></div>
              <p>夏天草原度假避暑，冬奥会雪地摩托比赛在御道口举行。首农集团加速“京津冀一体化”布局，启动“御道口国际生态旅游度假区项目”投资于500亿元。</p>
            </div>
            <div class="e-tu">
              <img src="../assets/images/yudao/dong.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="nint">
          <img src="../assets/images/yudao/9.jpg" alt="">
          <div class="ni-zi clear">
            <div class="ni-map">
              <!-------百度地图------->
              <div id="allmap"></div>
            </div>
          </div>
        </div>
        <div class="ten">
          <img src="../assets/images/yudao/10.jpg" alt="">
          <div class="ten-zi">
            <div class="ten-right">
              <p>还等？再等就没了</p>
              <div class="ten-heng clear"></div>
              <p>30秒预约免费看房，实地考察更放心，下载满易何app随时随地了解更多新房活动资讯</p>
              <p>一种全新的生活体验</p>
            </div>
          </div>
        </div>
        <div class="ydzy_all">
        <h2 id="zb" class="house_title pad_bor"><router-link reg="a" to="/Newhouseshow">推荐更多<img src="../assets/images/more.png" /></router-link></h2>
        <div class="content_houselist">

          <!---an----->
          <div class="date_sayshow" v-for="(dthis,key) in datalist">
            <router-link tag="div" :to="'/Housesay/'+dthis.id">
              <a class="d_show0mar" href="#"><img :src="dthis.mainImg" /><p>{{dthis.subTitle}}</p></a>
              <h2 class="d_show02" >{{dthis.title}}</h2>
              <p class="d_show03" >{{dthis.address}}</p>
              <p class="d_show04" >均价{{dthis.averagePrice}}元／平 ，户型{{dthis.measure}}平方米</p>
            </router-link>
          </div>

        </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'yudaozhuangyuan',
  data () {
    return {
      datalist: [],
      maximgshow: false,
      img01: '/static/images/yd03.jpg',
      img02: '/static/images/yd02.jpg',
      img03: '/static/images/yd01.jpg',
      img04: ''
    }
  },
  mounted () {
    this.loadmap()
    this.ydzy()
  },
  methods: {
    loadmap () {
      var map = new BMap.Map('allmap')
      map.centerAndZoom ('承德', 12) // 这里是初始地图所显示的城市
      // map.enableScrollWheelZoom()   //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom()  //启用地图惯性拖拽，默认禁用
      var localSearch = new BMap.LocalSearch(map)
      localSearch.enableAutoViewport() //允许自动调节窗体大小
      function searchByStationName () {
        var keyword
        map.clearOverlays();//清空原来的标注
        keyword = '承德市围场满族蒙古族自治县御道口'
        // var keyword = document.getElementById("text_").value;
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var sContent =
            "<div>" + "<h4 style='margin:0 0 5px 0;font-weight:bold; font-size:20px;padding:0.2em 0'>御道庄园</h4>" +
            "<img style='float:right;margin:4px' id='imgDemo' src='/static/images/yudao.jpg' width='139' height='104' title='御道庄园'/>" +
            "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址：河北省承德市围场满族蒙古族自治县御道口风景区</p>" +
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
      }
      searchByStationName()
    },
    ydzy(){
      var typeinfos = {
        'type': 1
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', typeinfos).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.datalist = data.slice(0, 3)
      })
    },
    closemaximg(){
      this.maximgshow = false
    },
    max01(){
      this.maximgshow = true
      this.img04 = this.img01
    },
    max02(){
      this.maximgshow = true
      this.img04 = this.img02
    },
    max03(){
      this.maximgshow = true
      this.img04 = this.img03
    }
  }
}
</script>

<style scoped>
@import "../assets/css/zhuanti.css";
  .content_houselist{
    display: block;
    margin: 0px auto;
  }
.pad_bor{
  border-top:0px;
}
  .ydzy_all{
    display: block;
    overflow: hidden;
    background: rgb(253,253,253);
  }
#yudaozhuangyuan{
  min-height: 1700px;
}
  .imgwidauto{
  width: 100%;
  border: 8px solid #66cc00;
  box-sizing: border-box;
  height: 150px;
    overflow:hidden;
  }
.six .s-zi .s-kuang img {
  border: none;
}
  .maximg{
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999999999;
    left:0px;
    top:0px;
    background: rgba(0,0,0,0.5);
    text-align: center;
  }
  .maxautoimg{
    height: 80%;
  }
</style>
