<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
// Navbar导航条最右边 Sidebar侧边框 AppMain是transition动画 这是当前简易布局
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
// 0ResizeMixin这里仅仅是移动端响应式布局的代码无法适配
// 5sidebar侧边组件 navbar导航条组件
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  // 以下computed里面代码解读参考这个链接 https://blog.csdn.net/u010559460/article/details/105268926
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 1动态计算出 device属性, 动态设置页面样式当为移动端设备自动计算侧边栏（已经隐藏部分目录显示）要显示的with
    // 2同理sidebar和头部fixedHeader
    // 3在 src / store / modules / app.js 文件,新增 device 变量,并提供修改它的方法
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
    // 根据设备来隐藏侧边栏情况当为pc为54px当为移动则为0px
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
