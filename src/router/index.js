import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/Edit.vue'),
    children: [
      {
        path: ':id'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
