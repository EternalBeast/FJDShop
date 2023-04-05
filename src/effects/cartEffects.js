import {
  useStore
} from 'vuex'
import {
  computed
} from 'vue'

// 使用购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num
    })
  }

  // 获取购物车中的商品列表
  const inCartList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })

  // 获取商铺名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 总数，总价，是否选中计算
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = {
      totalCount: 0,
      totalPrice: 0,
      allChecked: true
    }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.totalCount += product.count
        if (product.check) {
          result.totalPrice += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }

    const x = String(result.totalPrice).split('.')[1]?.length || 0

    if (x > 2) {
      result.totalPrice = result.totalPrice.toFixed(2)
    }
    return result
  })

  // 获取所有商店购物车
  const allCartList = computed(() => {
    const allCartList = {}
    for (const shop in cartList) {
      allCartList[shop] = {}
      allCartList[shop].productList = {}
      allCartList[shop].shopName = cartList[shop]?.shopName

      let index = 1

      for (const product in cartList[shop].productList) {
        if (cartList[shop]?.productList[product]?.count > 0) {
          allCartList[shop].productList[index] = cartList[shop]?.productList[product]
          index += 1
        }
      }

      if (Object.keys(allCartList[shop].productList).length === 0) {
        delete allCartList[shop]
      }
    }

    return allCartList
  })

  return {
    cartList,
    inCartList,
    shopName,
    calculations,
    allCartList,
    changeCartItemInfo
  }
}
