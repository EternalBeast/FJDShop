<template>
  <div class="nearby">
    <h2 class="nearby__title">附件店铺</h2>
    <RouterLink :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
      <ShopInfo :item="item" />
    </RouterLink>
  </div>
</template>

<script>
import { get } from '../../utils/request'
import { ref } from 'vue'
import ShopInfo from '@/components/ShopInfo.vue'

const useNearbyListEffect = () => {
  const nearbyList = ref([])

  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data.length) {
      nearbyList.value = result.data
    }
  }

  return { nearbyList, getNearbyList }
}

export default {
  name: 'NearbyView',
  components: { ShopInfo },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect()

    getNearbyList()

    return { nearbyList }
  }
}
</script>

<style lang='scss' scoped>
.nearby {
  padding: 1.6rem 1.8rem 0;

  &__title {
    font-size: 1.8rem;
    line-height: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.4rem;
  }

}
</style>
