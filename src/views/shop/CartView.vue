<template>
  <div class="mask" v-if="showCart && calculations.totalCount > 0" @click="handleCartShow"></div>
  <div class="cart">
    <div class="products" v-if="showCart && calculations.totalCount > 0">
      <div class="products__header">
        <div class="products__header__selectall">
          <span class="iconfont products__header__checked" v-html="calculations.allChecked ? '&#xe618;' : '&#xe61a;'"
            @click="() => { setCartItemsChecked(shopId, calculations.allChecked) }"></span>
          全选
        </div>
        <div class="products__header__clear" @click="() => { cleanCart(shopId) }">清空购物车</div>
      </div>
      <template v-for="item in inCartList" :key="item._id">
        <div class="products__item" v-if="item.count > 0">
          <div class="products__item__checked iconfont" v-html="item.check ? '&#xe618;' : '&#xe61a;'"
            @click="() => { changeCartItemCheck(shopId, item._id) }"></div>
          <img :src="item.imgUrl" alt="" class="products__item__img">
          <div class="products__item__info">
            <h4 class="products__item__name">{{ item.name }}</h4>
            <p class="products__item__price">
              <span class="products__item__yen">&yen;</span>{{ item.price }}
              <span class="products__item__old">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="products__number">
            <span class="products__number__minus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
            {{ item.count || 0 }}
            <span class="products__number__plus" @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="checkout">
      <div class="checkout__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="checkout__icon__img" @click="handleCartShow">
        <div class="checkout__icon__tag" v-show="calculations.totalCount > 0">{{ calculations.totalCount }}</div>
      </div>
      <div class="checkout__info" v-show="calculations.totalCount > 0">
        总计：<span class="checkout__info__price">&yen;{{ calculations.totalPrice }}</span>
      </div>
      <div class="checkout__info" v-show="calculations.totalCount <= 0">
        购物车是空的
      </div>
      <button class="checkout__btn" v-show="calculations.totalCount > 0">
        <RouterLink :to="{ path: `/orderConfirm/${shopId}` }">
          去结算
        </RouterLink>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const { inCartList, calculations, changeCartItemInfo } = useCommonCartEffect(shopId)
  const showCart = ref(false)

  const store = useStore()

  // 切换商品选中状态
  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemCheck', {
      shopId, productId
    })
  }

  // 清空购物车
  const cleanCart = (shopId) => {
    store.commit('cleanCart', {
      shopId
    })
    handleCartShow()
  }

  // 全选购物车中的商品
  const setCartItemsChecked = (shopId, allChecked) => {
    store.commit('setCartItemsChecked', {
      shopId,
      allChecked
    })
  }

  // 控制购物车显示
  const handleCartShow = () => {
    showCart.value = !showCart.value
  }

  return {
    showCart, inCartList, calculations, changeCartItemInfo, changeCartItemCheck, cleanCart, setCartItemsChecked, handleCartShow
  }
}

export default {
  name: 'CartView',
  setup() {
    const route = useRoute()
    const shopId = route.params.id

    const {
      showCart, inCartList, calculations,
      changeCartItemInfo, changeCartItemCheck, cleanCart, setCartItemsChecked, handleCartShow
    } = useCartEffect(shopId)

    return {
      showCart, shopId, calculations, inCartList, changeCartItemInfo, changeCartItemCheck, cleanCart, setCartItemsChecked, handleCartShow
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.50);
  z-index: 1;
}

.cart {
  width: 100%;
  height: 4.9rem;
  position: fixed;
  bottom: 0;
  box-shadow: 0 -.1rem .1rem 0 $content-bgColor;
  background-color: $bgColor;
  z-index: 11;
}

.products {
  overflow-y: auto;
  width: 100%;
  background-color: $bgColor;
  padding: 0 1.8rem;
  position: fixed;
  left: 0;
  bottom: 5rem;

  &__header {
    width: 100%;
    height: 5.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: .1rem solid $content-bgColor;

    &__selectall {
      font-size: 1.4rem;
      line-height: 2rem;
      display: flex;
      align-items: center;
    }

    &__checked {
      color: $btn-bgColor;
      font-size: 1.9rem;
      margin-right: .84rem;
    }

    &__clear {
      font-size: 1.4rem;
    }
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 7.8rem;

    &__checked {
      color: $btn-bgColor;
      font-size: 1.9rem;
      margin-right: 1.6rem;
    }

    &__img {
      width: 4.6rem;
      margin-right: 1.6rem;
    }

    &__info {
      flex: 1;
      height: 4.6rem;
    }

    &__name {
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: bold;
      margin-bottom: .6rem;
      @include ellipsis;
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

.checkout {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  &__icon {
    width: 2.8rem;
    height: 2.6rem;
    margin: 0 3.2rem 0 2.4rem;
    position: relative;

    &__img {
      width: 2.8rem;
      height: 2.6rem;
    }

    &__tag {
      min-width: 2rem;
      height: 2rem;
      border-radius: 1rem;
      background-color: $highlight-fontcolor;
      color: $bgColor;
      text-align: center;
      font-size: 1.6rem;
      line-height: 1.8rem;

      position: absolute;
      right: -1rem;
      top: -1rem;
      transform: scale(.5);
      transform-origin: center center;
    }
  }

  &__info {
    flex: 1;
    font-size: 1.2rem;

    &__price {
      font-size: 1.8rem;
      color: $highlight-fontcolor;
      font-weight: 600;
    }
  }

  &__btn {
    width: 9.8rem;
    height: 100%;
    outline: none;
    border: none;
    background-color: $btn-bgColor;
    color: $bgColor;
    font-size: 1.4rem;
    font-weight: 600;
  }
}
</style>
