<template>
    <div id="machlist">
      <!-------------sousuo--------------->
      <div class="banner_bj">
        <div class="serch_all">
          <div class="search_con">
            <input type="text" placeholder="找新房，搜满易" v-model="sroucehs" @keyup.13="searchclickd(sroucehs)" class="search_text" />
              <a class="search_button" @click="searchbtn">开始找房</a>
          </div>
          <div class="search_key"><a href="#" @click="sea1">{{seaw}}</a><a href="#" @click="sea2">{{seap}}</a><a href="#" @click="sea3">{{seas}}</a></div>
        </div>

      </div>

    </div>
</template>

<script>
export default {
  name: 'machlist',
  data () {
    return {
      sroucehs: '',
      seaw: '御道庄园',
      seap: '碧桂园',
      seas: '兴隆'
    }
  },
  mounted () {
  },
  methods: {
    searchclickd (e) {
      var s = e
      this.$router.push('/Newhouseshow/' + s)
    },
    searchbtn () {
      // console.log(this.sroucehs)
      var s = this.sroucehs
      this.$router.push('/Newhouseshow/' + s)
    },
    sea1 () {
      var s = this.seaw
      this.$router.push('/Newhouseshow/' + s)
    },
    sea2 () {
      var s = this.seap
      this.$router.push('/Newhouseshow/' + s)
    },
    sea3 () {
      var s = this.seas
      this.$router.push('/Newhouseshow/' + s)
    }
  }
}
</script>

<style scoped>
  .el-carousel__arrow{
    background-color: #66cc00;
  }
  .el-carousel__button{
    height: 4px;
    background-color: #66cc00;
  }
</style>
