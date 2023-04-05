import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/HomeView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/RegisterView.vue'),
    beforeEnter(to, from, next) {
      const {
        isLogin
      } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/LoginView.vue'),
    beforeEnter(to, from, next) {
      const {
        isLogin
      } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/ShopView.vue')
  },
  {
    path: '/cartlist',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartListView.vue')
  },
  {
    path: '/orderconfirm/:id',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "orderConfirm" */ '../views/orderConfirm/OrderConfirmView.vue')
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderListView.vue')
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: () => import(/* webpackChunkName: "myProfile" */ '../views/myProfile/MyProfileView.vue')
  },
  {
    path: '/address',
    name: 'AddressManage',
    component: () => import(/* webpackChunkName: "addressManage" */ '../views/addressManage/AddressManageView.vue')
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import(/* webpackChunkName: "addressEdit" */ '../views/addressEdit/AddressEditView.vue')
  },
  {
    path: '/addressSelect',
    name: 'AddressSelect',
    component: () => import(/* webpackChunkName: "addressSelect" */ '../views/addressSelect/AddressSelectView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/SearchView.vue')
  },
  {
    path: '/searchlist',
    name: 'SearchList',
    component: () => import(/* webpackChunkName: "searchList" */ '../views/searchList/SearchListView.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const {
    isLogin
  } = localStorage;
  (isLogin || to.name === 'Login' || to.name === 'Register') ? next() : next({ name: 'Login' })
})

export default router
