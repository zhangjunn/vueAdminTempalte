<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // 在这里的name都是是一般在后端里面请求来的根据角色来进行其实在这个页面可以写admin的页面和editor的
  // 页面在根据角色来让不同的页面进行显示和隐藏
  created () {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
