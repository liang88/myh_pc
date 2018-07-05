<template>
    <div id="maps">
      <div class="map">
        <div id="allmap"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'maps',
  data () {
    return {
      myaddress: ['承德市围场御道口御道庄园', '承德市兴隆县财富九龙城东(112线国道南)', '承德市兴隆县融创城售楼处东南', '承德市兴隆县112国道人民医院对面', '承德市兴隆县原汇丰车队物流基地', '平谷区马坊镇密三路口']
    }
  },
  mounted () {
    this.loadmap()
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
        keyword = this.myaddress
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
    }
  }
}
</script>

<style scoped>

</style>
