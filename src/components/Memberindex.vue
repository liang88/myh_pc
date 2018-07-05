<template>
    <div id="memberindex">
      <nav class="my">
        <div class="my-middle clear">
          <div class="my-left">
            <Membermenuview></Membermenuview>
          </div>
            <router-view></router-view>
        </div>
      </nav>

    </div>
</template>

<script>
import Membermenuview from './Membermenu'
export default {
  name: 'memberindex',
  components: {
    Membermenuview
  }
}
</script>

<style scoped>
</style>
