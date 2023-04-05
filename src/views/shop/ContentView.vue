<template>
  <div class="content">
    <ul class="nav">
      <li v-for="(nav, index) in navList" :class="{ 'nav__item': true, 'nav__item--active': currentTab === nav.tab }"
        :key="index" @click="() => handleTabClick(nav.tab)">
        {{ nav.name }}
      </li>
      <!-- <li class="nav__item">休闲食品</li>
      <li class="nav__item">时令蔬菜</li>
      <li class="nav__item">肉蛋家禽</li> -->
    </ul>
    <ul class="products">
      <li v-for="item in items" class="products__item" :key="item._id">
        <img :src="item.imgUrl" alt="" class="products__item__img">
        <div class="products__item__info">
          <h4 class="products__item__name">{{ item.name }}</h4>
          <p class="products__item__sales">月售{{ item.sales }}件</p>
          <p class="products__item__price">
            <span class="products__item__yen">&yen;</span>{{ item.price }}
            <span class="products__item__old">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="products__number">
          <span class="products__number__minus" @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }"
            v-show="getProductCartCount(shopId, item._id) > 0">-</span>
          <span v-show="getProductCartCount(shopId, item._id) > 0">{{ getProductCartCount(shopId, item._id) }}</span>
          <span class="products__number__plus"
            @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }">+</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '@/utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useStore } from 'vuex'

const navList = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// tab切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(navList[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }

  return { currentTab, handleTabClick }
}

// 列表内容相关逻辑
const useContentEffect = (currentTab, shopId) => {
  const data = reactive({
    items: []
  })

  // 获取商品列表内容
  const getContentData = async (tab = 'all') => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      data.items = result.data
    }
  }

  // 依赖数据发生变化时，自动执行
  watchEffect(() => {
    getContentData()
  })
  const { items } = toRefs(data)

  return { items, shopId, getContentData }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', {
      shopId, shopName
    })
  }

  const changeCartItem = (shopId, productId, productInfo, num, shopName) => {
    changeCartItemInfo(shopId, productId, productInfo, num)
    changeShopName(shopId, shopName)
  }

  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }

  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'ContentView',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { items } = useContentEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()

    return { cartList, navList, currentTab, items, shopId, handleTabClick, changeCartItem, getProductCartCount }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';

.content {
  display: flex;
  position: absolute;
  top: 15.4rem;
  left: 0;
  right: 0;
  bottom: 5rem;
}

.nav {
  overflow-y: auto;
  width: 7.6rem;
  height: 100%;
  background-color: $input-bgColor;

  &__item {
    width: 100%;
    height: 4rem;
    color: $content-fontcolor;
    font-size: 1.4rem;
    text-align: center;
    line-height: 4rem;
    @include ellipsis;

    &--active {
      background-color: $bgColor;
    }
  }
}

.products {
  overflow-y: auto;
  flex: 1;
  height: 100%;
  padding: 0 1.8rem 0 1.6rem;

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 9.2rem;
    border-bottom: .1rem solid $content-bgColor;

    &__img {
      width: 6.8rem;
      margin-right: 1.6rem;
    }

    &__info {
      flex: 1;
      height: 6.8rem;
    }

    &__name {
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: bold;
      margin-bottom: .6rem;
      @include ellipsis;
    }

    &__sales {
      font-size: 1.2rem;
      line-height: 1.6rem;
      margin-bottom: .6rem;
    }

    &__price {
      font-size: 1.4rem;
      line-height: 2rem;
      color: $highlight-fontcolor;
      font-weight: bold;
    }

    &__yen {
      font-size: 1rem;
    }

    &__old {
      font-size: 1rem;
      font-weight: normal;
      color: $light-fontcolor;
      text-decoration: line-through;
      margin-left: .6rem;
    }

    .products__number {
      position: absolute;
      right: 0;
      bottom: 1.2rem;
      font-size: 1.4rem;
      line-height: 2rem;

      &__minus,
      &__plus {
        display: inline-block;
        border-radius: 50%;
        font-size: 2rem;
        text-align: center;
        line-height: 1.6rem;
      }

      &__minus {
        border: .1rem solid $medium-fontcolor;
        width: 1.8rem;
        height: 1.8rem;
        color: $medium-fontcolor;
        margin-right: 1rem;
      }

      &__plus {
        background-color: $btn-bgColor;
        width: 2rem;
        height: 2rem;
        color: $bgColor;
        margin-left: 1rem;
      }
    }
  }
}
</style>
