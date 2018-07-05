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
    </div>
</template>

<script>
export default {
  name: 'footers',
  data () {
    return {
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
  }
}
</script>

<style scoped>

</style>
