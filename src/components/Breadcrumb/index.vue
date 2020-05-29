<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
// 1element面包屑ui组件在slidebar navbar.vue引入
// item.redirect==='noRedirect'当设置 noRedirect 的时候该路由在面包屑导航中不可被点击设置最后一个为noRedirect不可点击在router.js可见
// 或者 levelList.length-1面包屑总长度减一最后一个面包屑颜色为灰色
// 2阻止事件的默认行为，@click.prevent="handleLink(item)" 使用了a标签阻止a标签跳转，仅执行函数handleLink(item)
// 当点击handleLink(item)进入这个路由
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null// 没有点击面包屑时候为空
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()// 面包屑导航
    }
  },
  created() {
    this.getBreadcrumb() // 3一些方法放到created里面提高loading速度
  },
  methods: {
    getBreadcrumb() {
      // 4仅显示meta.title为的路由在router.js
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      // 在这个项目当中dashboard是首页路由点击from这个显示
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      // 5这个对路由进行过滤并赋值给item因此item里面包含router，index.js里面路由配置信息
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // 要解决此问题，请访问https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)// 12pathToRegexp该工具库用来处理 url 中地址与参数，能够很方便得到我们想要的数据
      // 11compile作用快速填充url字符串的参数值我
      return toPath(params)
    },
    handleLink(item) {
      // 点击是个面包屑触进入其路由页面
      // 6console.log(item) 发现里面有很多的页面信息
      const { redirect, path } = item // 7点击这个面包屑仅仅取item里面的redirect和path item是filter过滤路由配置信息
      if (redirect) { // 8若redirect（这个是点击的渲染的面包屑）有这个title
        this.$router.push(redirect) // 9this.$router.push(redirect)实现页面跳转
        return
      }
      this.$router.push(this.pathCompile(path)) // 10否则这个url路径去正则匹配相应路径
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
