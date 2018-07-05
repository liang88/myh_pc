<template>
    <div id="banner">
      <div class="classify">
        <router-link  class="classify_icon" tag="a" to="/Newhouseshow"><p><img src="/static/images/house1.png" /></p><span>新房</span></router-link>
        <router-link tag="a" to="/Newhouseshow/0" class="classify_icon"><p><img src="/static/images/ehuse1.png" /></p><span>楼盘</span></router-link>
        <router-link  tag="a" to="/Counter" class="classify_icon"><p><img  src="../../src/assets/images/jsq1.png" /></p><span>房贷</span></router-link>
        <router-link class="classify_icon" tag="a" to="/Newslist"><p><img  src="/static/images/lba1.png" /></p><span>楼讯</span></router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'banner'
}
</script>

<style scoped>

</style>
