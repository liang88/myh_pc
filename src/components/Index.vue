<template>
    <div id="home">
      <Banserachview></Banserachview>
      <Classblockview></Classblockview>
      <h2 class="house_title"><a href="###">热门楼盘<img src="../assets/images/more.png" /></a></h2>
      <div class="app_con">
        <div class="app_lef"><Indexartview></Indexartview></div>
        <div class="app_rig"><Indexslideview></Indexslideview></div>
      </div>
      <Indexlistview></Indexlistview>
    </div>
</template>

<script>
import Classblockview from '../components/Classblock'
import Indexartview from '../components/Indexart'
import Indexslideview from '../components/Indexslide'
import Banserachview from '../components/Bansearch'
import Indexlistview from '../components/Indexlist'

export default {
  name: 'home',
  components: {
    Classblockview,
    Indexartview,
    Indexslideview,
    Banserachview,
    Indexlistview,

  }
}
</script>

<style scoped>

</style>
