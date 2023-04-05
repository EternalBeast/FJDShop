<template>
  <div class="header">
    我的全部购物车({{ listLength }})
  </div>

  <ul class="cartlist">
    <li v-for="(shop, index) in allCartList" class="products" :key="index">
      <div class="products__title">{{ shop.shopName }}</div>
      <div class="products__list">
        <div class="products__item" v-for="(item, innerIndex) in shop.productList" :key="item._id"
          v-show="innerIndex <= 2 || (innerIndex > 2 && !hiddenList[index])">
          <img :src="item.imgUrl" class="products__item__img">
          <div class="products__item__info">
            <h4 class="products__item__name">{{ item.name }}</h4>
            <p class="products__item__price">
              <span class="products__item__yen">&yen;</span>{{ item.price }}
              <span class="products__item__count"> x </span>{{ item.count }}
            </p>
          </div>
          <div class="products__item__totalprice">
            <span class="products__item__yen">&yen;</span>{{ (item.price * item.count).toFixed(1) }}
          </div>
        </div>
        <div class="cartlist__drawer" v-show="Object.keys(shop.productList).length > 2 && hiddenList[index]"
          @click="() => { handleProductsHide(index) }">
          共计{{ Object.keys(shop.productList).length }}件/1.4kg
          <span class="iconfont cartlist__drawer__icon">&#xe69b;</span>
        </div>
        <div class="cartlist__drawer" v-show="Object.keys(shop.productList).length > 2 && !hiddenList[index]"
          @click="() => { handleProductsHide(index) }">
          收起
          <span class="iconfont cartlist__drawer__icon cartlist__drawer__icon--reverse">&#xe69b;</span>
        </div>
      </div>
    </li>
    <li class="cartlist__notice" v-show="listLength === 0">购物车空空如也~</li>
  </ul>

  <DockerView :currentIndex="1" />
</template>

<script>
import DockerView from '@/components/DockerView.vue'
import { useCommonCartEffect } from '@/effects/cartEffects'
import { ref } from 'vue'

// 获取所有购物车列表相关逻辑
const useCartListEffect = () => {
  const { allCartList } = useCommonCartEffect()

  const listLength = Object.keys(allCartList.value).length

  const hiddenList = ref([])

  for (const shop in allCartList.value) {
    hiddenList.value[Number(shop)] = true
  }

  const handleProductsHide = (index) => {
    hiddenList.value[index] = !hiddenList.value[index]
  }

  return { allCartList, listLength, hiddenList, handleProductsHide }
}

export default {
  name: 'CartListView',
  components: { DockerView },
  setup() {
    const { allCartList, listLength, hiddenList, handleProductsHide } = useCartListEffect()

    return { allCartList, listLength, hiddenList, handleProductsHide }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.header {
  width: 100vw;
  height: 4.4rem;
  background-color: $bgColor;
  position: fixed;
  top: 0;
  font-size: 1.6rem;
  text-align: center;
  line-height: 4.4rem;
  z-index: 1;
}

.cartlist {
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  padding: 4.4rem 1.8rem 5rem;
  background-color: $content-bgColor;

  &__notice {
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: $medium-fontcolor;
  }

  .products {
    width: 100%;
    padding: 1.6rem;
    margin-top: 1.6rem;
    background-color: $bgColor;
    border-radius: .4rem;

    &__title {
      font-size: 1.6rem;
      font-weight: 600;
    }

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 7.8rem;

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

      &__totalprice {
        height: 4.6rem;
        font-size: 1.6rem;
        color: #000;
        display: flex;
        align-items: flex-end;
      }

    }
  }

  &__drawer {
    width: 100%;
    height: 2.8rem;
    color: $light-fontcolor;
    font-size: 1.4rem;
    background-color: $input-bgColor;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;

    &__icon {
      margin-left: .8rem;
      font-size: 1.4rem;

      &--reverse {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
