<template>
  <div class="header">
    <div class="header__back iconfont" @click="handleBack">&#xe6db;</div>
    <div class="header__search">
      <span class="header__search__icon iconfont">&#xe600;</span>
      <input type="text" class="header__search__input" placeholder="请输入商品名称搜索">
    </div>
  </div>
  <div class="shopinfo">
    <ShopInfo :item="item" :hideBorder="true" :noMarginBottom="true" />
  </div>

  <ContentView :shopName="item.name" />

  <CartView />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo.vue'
import ContentView from './ContentView.vue'
import CartView from './CartView.vue'

// 获取当前商店信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const id = route.params.id
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }

  const { item } = toRefs(data)

  return { item, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return handleBack
}

export default {
  name: 'ShopView',
  components: { ShopInfo, ContentView, CartView },
  setup() {
    const { item, getItemData } = useShopInfoEffect()
    const handleBack = useBackRouterEffect()

    getItemData()

    return { item, handleBack }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

.header {
  width: 100%;
  height: 6.4rem;
  padding: 1.6rem 1.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__back {
    width: 1.2rem;
    height: 2.1rem;
    margin-right: 1.6rem;
    font-size: 2.1rem;
    color: $back-btnColor;
  }

  &__search {
    flex: 1;
    height: 3.2rem;
    position: relative;

    &__icon {
      position: absolute;
      left: 1.6rem;
      top: .8rem;
      font-size: 1.6rem;
      color: $input-fontcolor;
    }

    &__input {
      width: 100%;
      height: 100%;
      background-color: $input-bgColor;
      border-radius: 1.6rem;
      font-size: 1.4rem;
      line-height: 1.6rem;
      padding-left: 4.4rem;

      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}

.shopinfo {
  width: 100%;
  height: 8.6rem;
  padding: 0 1.8rem;
}

</style>
