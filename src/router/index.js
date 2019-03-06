import Vue from 'vue'
import Router from 'vue-router'
const _import = file => () =>
import ('@/view/' + file + '.vue')

Vue.use(Router)
export default new Router({
  mode: process.env.NODE_ENV == "production" ? "history" : 'hash',
  // scrollBehavior(to, from, savedPosition) { // router-link滚动条行为
  //   return { x: 0, y: 0 }
  // },
  routes: [{
    path: '/',
    name: 'home',
    component: _import('home/index'),
    meta: {
      title: '首页'
    }
  },
    {
      path: '/home/index',
      name: 'home',
      component: _import('home/index'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login/login'),
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: _import('register/register'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/forgotPass',
      name: 'forgotPass',
      component: _import('forgotPass/forgotPass'),
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/statistics/statistics_site',
      name: 'statistics_site',
      component: _import('statistics/statistics_site'),
      meta: {
        title: '站点统计'
      }
    },
    {
      path: '/statistics/statistics_demo',
      name: 'statistics_demo',
      component: _import('statistics/statistics_demo'),
      meta: {
        title: 'demo演示'
      }
    },
    {
      path: '/usermanage/user_list',
      name: 'user_list',
      component: _import('usermanage/user_list'),
      meta: {
        title: '用户管理列表'
      }
    },
    {
      path: '/productmanage/product_list',
      name: 'product_list',
      component: _import('productmanage/product_list'),
      meta: {
        title: '商品管理'
      }
    },
    {
      path: '/productmanage/product_detail/:id',
      name: 'product_detail',
      component: _import('productmanage/product_detail'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/account/google_code',
      name: 'google_code',
      component: _import('account/google_code'),
      meta: {
        title: '谷歌验证'
      }
    },
    {
      path: '/account/set_account',
      name: 'set_account',
      component: _import('account/set_account'),
      meta: {
        title: '管理员设置'
      }
    },
    {
      path: '/ordermanage/order_list',
      name: 'order_list',
      component: _import('ordermanage/order_list'),
      meta: {
        title: '订单列表'
      }
    },
    {
      path: '/ordermanage/camero',
      name: 'camero',
      component: _import('ordermanage/camero'),
      meta: {
        title: '相机'
      }
    }
  ]
})