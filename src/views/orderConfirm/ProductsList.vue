<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__list">
      <div class="products__item" v-for="item in inCartList" :key="item._id" v-show="item.check">
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
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffects'

export default {
  name: 'ProductsList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { inCartList, shopName } = useCommonCartEffect(shopId)

    return { inCartList, shopName }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.products {
  width: 90.4vw;
  padding: 1.6rem;
  margin: 1.6rem 1.8rem;
  background-color: $bgColor;

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
</style>
