<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
// 这里其实实际项目当中有keep-alive
// 1后来发现其实可以简单的在 router-view 上加上一个唯一的 key，
// 2来保证路由切换时都会重新渲染触发钩子了。这样简单的多了。
export default {
  name: 'AppMain',
  computed: {
    key() {
      // 3只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
