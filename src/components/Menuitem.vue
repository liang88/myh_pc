<template>
    <div id="navitem">
      <!-------------menu------------>
      <nav class="menu_item">
        <div class="menu_lf"><router-link tag="a" to="/"><img src="../assets/images/logo.png" ></router-link></div>
        <div class="menu_list">
          <ul class="menu_ul">
            <li id="menu_a" ><router-link tag="a" to="/">首页 </router-link></li>
            <li @mouseover="menusi=true" @mouseout="menusi=false">
              <router-link tag="a" to="/Newhouseshow">新房</router-link>
              <dl v-show="menusi" >
                <dd v-for="twoji in twodata"><router-link tag="a" :to="'/Newhouseshow/'+twoji.id">{{twoji.name}}</router-link></dd>
              </dl>
            </li>
            <li><router-link tag="a" to="/Yudaozhuangyuan">御道庄园<img src="../assets/images/hot.png" width="30" style="position:absolute;margin-left:-1px;" > </router-link></li>
            <li><router-link tag="a" to="/Translate">经纪人</router-link></li>
            <li><router-link tag="a" to="/Newslist">房产资讯</router-link></li>
          </ul>
        </div>
      </nav>
      <!--------绿条------->
      <div class="lvcor"></div>
    </div>
</template>

<script>
export default {
  name: 'navitem',
  data () {
    return {
      menusi: false,
      twodata: [
        {
          id: 1,
          name: '御道庄园'
        },
        {
          id: 2,
          name: '财富九龙城'
        },
        {
          id: 3,
          name: '兴隆融创城'
        },
        {
          id: 4,
          name: '荣盛阿尔卡迪亚'
        },
        {
          id: 5,
          name: '兴隆碧桂园'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
