<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList" :class="{ 'docker__item': true, 'docker__item--active': index === currentIndex }"
      :key="item.id">
      <RouterLink :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DockerView',
  props: ['currentIndex'],
  setup() {
    const dockerList = [
      { icon: '&#xe649;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe63c;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe7c5;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'MyProfile' } }
    ]

    return { dockerList }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/viriables.scss';

.docker {
  box-sizing: border-box;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 1.8rem;
  width: 100%;
  height: 4.9rem;
  color: $content-fontcolor;
  background-color: $bgColor;
  box-shadow: 0 -.1rem .1rem 0 $content-bgColor;
  z-index: 99999;

  &__item {
    flex: 1;
    text-align: center;

    .iconfont {
      font-size: 2rem;
      margin-top: .7rem;
    }

    &--active {
      color: #1FA4FC;
    }
  }

  &__title {
    font-size: 2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center;
    line-height: 1.4rem;
  }
}
</style>
