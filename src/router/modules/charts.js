import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect', //  noRedirect该路由在breadcrumb面包屑导航中不可被点击
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  }
}

export default chartsRouter
