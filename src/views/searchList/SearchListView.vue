<template>
  <div class="header">
    <div class="header__back iconfont" @click="handleBack">&#xe6db;</div>
    <div class="header__search">
      <span class="header__search__icon iconfont">&#xe600;</span>
      <input type="text" class="header__search__input" placeholder="请输入商品名称搜索" v-model="keyword"
        @change="handleInputChange">
    </div>
  </div>
  <RouterLink :to="`/shop/${item._id}`" v-for="item in searchList" :key="item._id">
    <div class="shopinfo">
      <ShopInfo :item="item" :hideBorder="true" :noMarginBottom="true" />
    </div>
    <div class="products">
      <div class="items-layout">
        <div class="products__item" v-for="(product, index) in item.products" :key="index">
          <img :src="product.imgUrl" class="products__item__img">
          <div class="products__item__name">{{ product.name }}</div>
          <div class="products__item__price">
            <span class="yen">&yen;</span><span class="products__item__price__now">{{ product.price }}</span>
            <span class="products__item__price__old">&yen;{{ product.oldPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo.vue'

// 获取搜索列表相关逻辑
const useSearchListEffect = () => {
  const searchList = ref([])
  const history = ref(JSON.parse(localStorage.history || '[]'))

  const getSearchList = async (keyword) => {
    const hasValue = history.value.find(item => item === keyword)
    if (!hasValue && (keyword.trim() !== '')) {
      history.value.push(keyword)
      localStorage.history = JSON.stringify(history.value)
    }
    const result = await get('/api/shop/search/searchlist', {
      keyword
    })
    if (result?.errno === 0 && result?.data.length) {
      searchList.value = result.data
    }
  }

  return { searchList, getSearchList }
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
  name: 'SearchList',
  components: { ShopInfo },
  setup() {
    const route = useRoute()
    const keyword = ref(route.query.keyword || '')

    const handleBack = useBackRouterEffect()

    const handleInputChange = () => {
      getSearchList(keyword.value)
    }

    // 获取搜索列表
    const { searchList, getSearchList } = useSearchListEffect()
    getSearchList(keyword.value)

    return { keyword, searchList, handleBack, handleInputChange }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

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
  height: 7.4rem;
  padding: 0 1.8rem;
  margin-bottom: .8rem;
}

.products {
  width: 100vw;
  height: 13.1rem;
  padding: 0 1.8rem 0 9rem;
  margin-bottom: 1.2rem;
  overflow: hidden;

  .items-layout {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    display: flex;
    column-gap: 1.6rem;
    border-bottom: .1rem solid $content-bgColor;

    /* 隐藏滚动条 */
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;

    /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
      /* Chrome Safari */
    }
  }

  &__item {
    width: 7.6rem;
    height: 11.9rem;

    &__img {
      width: 7.6rem;
      height: 7.6rem;
      margin-bottom: .4rem;
    }

    &__name {
      font-size: 1.2rem;
      line-height: 1.7rem;
      height: 1.7rem;
      margin-bottom: .2rem;
      @include ellipsis;
    }

    &__price {
      width: 200%;
      font-size: 2rem;
      line-height: 2.8rem;
      transform-origin: 0 0;
      transform: scale(.5);
      @include ellipsis;

      .yen {
        color: $highlight-fontcolor;
      }

      &__now {
        color: $highlight-fontcolor;
        font-size: 2.8rem;
        font-weight: 600;
        margin-right: .8rem;
      }

      &__old {
        color: $light-fontcolor;
        text-decoration: line-through;
      }
    }
  }
}
</style>
