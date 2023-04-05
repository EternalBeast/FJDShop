import {
  createStore
} from 'vuex'

const setLocalCartList = (state) => {
  const {
    cartList
  } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // { shopId: { shopName: '', productList: { productId: {} }} }
  /*
    第一层级是商铺的id
      第二层是商品id
      第二层内容是商品内容和选购数量
      shopId: {
        shopName: '沃尔玛',
        productList: {
          productId: {
            _id: '1',
            name: '番茄 250g / 份',
            imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
            sales: 10,
            price: 33.6,
            oldPrice: 39.6,
            count: 2,
            check: true
          }
        }
      }
    */
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList)
  } else {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList()
  },
  getters: {},
  mutations: {
    changeCartItemInfo(state, payload) {
      const {
        shopId,
        productId,
        productInfo,
        num
      } = payload
      const cartList = state.cartList
      const shopInfo = cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (num > 0) {
        product.check = true
      }
      if (product.count <= 0) {
        product.count = 0
        product.check = false
      }
      if (product.count > 99) {
        product.count = 99
      }

      shopInfo.productList[productId] = product

      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeCartItemCheck(state, payload) {
      const {
        shopId,
        productId
      } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },

    cleanCart(state, payload) {
      const {
        shopId
      } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },

    setCartItemsChecked(state, payload) {
      const {
        shopId,
        allChecked
      } = payload
      const products = state.cartList[shopId].productList
      if (products && !allChecked) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      } else if (products && allChecked) {
        for (const i in products) {
          const product = products[i]
          product.check = false
        }
      }
      setLocalCartList(state)
    },

    changeShopName(state, payload) {
      const {
        shopId,
        shopName
      } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    }
  },
  actions: {},
  modules: {}
})
