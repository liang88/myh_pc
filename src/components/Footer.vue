<template>
    <div id="footers">
      <div class="footer">
        <div class="ftlink">
          <h2><p>项目介绍</p></h2>
          <dl>
            <dd v-for="ftobj in ftobject">
             <router-link tag="a" :to="'/Housesay/'+ftobj.id">{{ftobj.title}}</router-link>
            </dd>
          </dl>
        </div>
        <div class="ft_con">
          <p>版权所有 @ 2018北京满易何房地产经纪有限公司 京ICP备18008272号-2</p>
        </div>
      </div>
      <div class="xiazai">
        <img class="img-1" v-show="imgs" src="static/images/xiazai.png" alt="">
        <img class="img-2" v-show="imgs" @click="img" src="static/images/cha.png" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: 'footers',
  data () {
    return {
      imgs: true,
      ftobject: [
        {
          id: 1,
          title: '御道庄园'
        },
        {
          id: 15,
          title: '荣盛阿尔卡迪亚'
        },
        {
          id: 28,
          title: '兴隆融创城'
        },
        {
          id: 18,
          title: '兴隆碧桂园'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    img () {
      this.imgs = false
    }
  }
};
</script>

<style scoped>
  .xiazai{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
  }
  .xiazai .img-1{
    display: block;
    width: 100%;
  }
  .xiazai .img-2{
    position: absolute;
    bottom: 54%;
    right: 1%;
    cursor: pointer;
  }
</style>
