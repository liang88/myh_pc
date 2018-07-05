<template>
    <div id="indexlist">

      <div class="slogan02"><a><img src="../assets/images/slogan1.jpg" /></a></div>
      <h2 class="house_title bolds"><a href="###">最新一手房源<img src="../assets/images/more.png" /></a></h2>
      <div class="content_houselist">
        <div class="houselist_mar">
          <!---an----->
          <div class="date_showone" v-for="(dthis,key) in datalist">
            <router-link tag="a" class="date_ahvr" :to="'/Housesay/'+dthis.id">
            <a class="d_show05" href="#"><img :src="dthis.mainImg" /><p>{{dthis.measure}}<b>万</b></p></a>
            <p class="d_show06" >{{dthis.address}}</p>
            <p class="d_show07" >{{dthis.subTitle}}    <font>{{dthis.layout}}&nbsp&nbsp{{dthis.averagePrice}}元/平</font></p>
            </router-link>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: 'indexlist',
  data () {
    return {
      'datalist': []
    }
  },
  mounted () {
    this.loadin()
  },
  methods: {
    loadin () {
      var typeinfo = {
        'type': 1
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', typeinfo).then((response) => {
        console.log(response)
        console.log(666666666666)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.datalist = data.slice(0, 6)
      })
    }
  }
}
</script>

<style scoped>

</style>
