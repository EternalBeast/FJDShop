<template>
  <div :class="{'shop': true, 'shop--nomarginbottom': noMarginBottom}">
    <img :src="item.imgUrl" alt="" class="shop__img">
    <div :class="{'shop__content': true, 'shop__content--bordered': hideBorder ? false : true}">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售{{ item.sales }}+</span>
        <span class="shop__content__tag">起送¥{{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费¥{{ item.expressPrice }}</span>
      </div>
      <div class="shop__content__discount">{{ item.slogan }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder', 'noMarginBottom']
}
</script>

<style lang='scss' scoped>
@import '../style/viriables.scss';

.shop {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.2rem;

  &--nomarginbottom {
    margin-bottom: 0;
  }

  &__img {
    width: 5.6rem;
    margin-right: 1.6rem;
  }

  &__content {
    flex: 1;
    height: 100%;

    &--bordered {
      border-bottom: .1rem solid $content-bgColor;
    }

    &__title {
      font-size: 1.6rem;
      line-height: 2.2rem;
      margin-bottom: .8rem;
    }

    &__tags {
      font-size: 1.3rem;
      line-height: 1.8rem;
      margin-bottom: .8rem;
    }

    &__discount {
      font-size: 1.3rem;
      line-height: 1.8rem;
      color: $highlight-fontcolor;
    }

    &__tag {
      margin-right: 1.6rem;
    }
  }
}
</style>
