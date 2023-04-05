<template>
  <div class="wrapper">
    <div class="header">
      <div class="iconfont header__icon">&#xe600;</div>
      <input type="text" class="header__input" @change="handleSearchChange" placeholder="山姆会员商店优惠商品">
      <div class="header__cancel" @click="handleCancel">取消</div>
    </div>

    <div class="history" v-if="history.length">
      <div class="history__head">
        <span class="history__title">搜索历史</span>
        <span class="history__clear" @click="handleClearHistory">清除搜索历史</span>
      </div>
      <div class="history__tags">
        <div v-for="(item, index) in history" class="history__tags__tag" :key="index" @click="() => goToSearchList(item)">
          {{ item }}</div>
      </div>
    </div>

    <div class="hot">
      <span class="hot__title">热门搜索</span>
      <div class="hot__tags">
        <div v-for="(item, index) in hotWordList" class="hot__tags__tag" :key="index" @click="() => goToSearchList(item)">
          {{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/utils/request'

// 获取热词相关逻辑
const useHotWordEffect = () => {
  const hotWordList = ref([])

  const getHotWordList = async () => {
    const result = await get('/api/shop/search/hot-words')
    if (result?.errno === 0 && result?.data.length) {
      hotWordList.value = result.data
    }
  }

  return { hotWordList, getHotWordList }
}

export default {
  name: 'SearchView',
  setup() {
    const router = useRouter()
    const history = ref(JSON.parse(localStorage.history || '[]'))

    // 用户输入搜索内容后执行
    const handleSearchChange = (e) => {
      const searchValue = e.target.value
      if (!searchValue) return
      const hasValue = history.value.find(item => item === searchValue)
      if (!hasValue) {
        history.value.push(searchValue)
        localStorage.history = JSON.stringify(history.value)
      }

      router.push(`/searchlist?keyword=${searchValue}`)
    }

    // 清理历史记录
    const handleClearHistory = () => {
      history.value = []
      localStorage.history = JSON.stringify(history.value)
    }

    // 取消搜索，返回
    const handleCancel = () => {
      router.back()
    }

    // 获取热词
    const { hotWordList, getHotWordList } = useHotWordEffect()
    getHotWordList()

    // 搜索列表页面跳转
    const goToSearchList = (keyword) => {
      router.push(`/searchlist?keyword=${keyword}`)
    }

    return { history, hotWordList, handleSearchChange, handleClearHistory, handleCancel, goToSearchList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  padding: 0 1.8rem;
  overflow-y: auto;
}

.header {
  width: 100%;
  height: 3.2rem;
  margin-top: 1.6rem;
  position: relative;
  display: flex;
  align-items: center;

  &__icon {
    width: 1.6rem;
    font-size: 1.6rem;
    color: $input-fontcolor;
    position: absolute;
    left: 1.6rem;
    top: .8rem;
  }

  &__input {
    flex: 1;
    height: 100%;
    background-color: $input-bgColor;
    border-radius: 1.6rem;
    padding-left: 4.4rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $content-fontcolor;
  }

  &__cancel {
    font-size: 1.6rem;
    line-height: 1.6rem;
    margin-left: 1.2rem;
  }
}

.history,
.hot {
  width: 100%;
  margin-top: 2.4rem;

  &__head {
    width: 100%;
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 2.2rem;
  }

  &__clear {
    font-size: 1.4rem;
    line-height: 2rem;
  }

  &__tags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    row-gap: 1.2rem;
    column-gap: 1rem;
    margin-top: 1.2rem;

    &__tag {
      height: 3.2rem;
      background-color: $input-bgColor;
      border-radius: .2rem;
      font-size: 1.4rem;
      line-height: 1.6rem;
      color: $medium-fontcolor;
      padding: .8rem 1rem;
    }
  }
}
</style>
