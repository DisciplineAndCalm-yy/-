import Vue from 'vue'
import Router from 'vue-router'

import Nprogress from 'nprogress' 
import 'nprogress/nprogress.css' 

Vue.use(Router)

const components = {
  layout: () => import('@/views/layout'),
  index: () => import('@/views/index/index'),
  register: () => import('@/views/register'),
  write: () => import('@/views/write'),
  article: () => import('@/views/article')
} 

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: components.layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: components.index,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: components.register,
          meta: {
            title: '注册页面'
          }
        },
        {
          path: 'write',
          name: 'write',
          component: components.write,
          meta: {
            title: '写笔记'
          }
        },
        {
          path: 'article/:id',
          name: 'article',
          component: components.article,
          meta: {
            title: '文章详情'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})

router.afterEach((to, from) => {
  Nprogress.done()
})

export default router