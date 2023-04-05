<template>
  <div class="wrapper">
    <TopArea />
    <ProductsList />
    <OrderBar />
  </div>
</template>

<script>
import TopArea from './TopArea.vue'
import ProductsList from './ProductsList.vue'
import OrderBar from './OrderBar.vue'

export default {
  name: 'OrderConfirmView',
  components: { TopArea, ProductsList, OrderBar },
  setup() {

  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

.wrapper {
  height: 100vh;
  width: 100vw;
  background-color: $input-bgColor;
  padding-bottom: 4.9rem;
  overflow-y: auto;
}

</style>
