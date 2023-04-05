<template>
  <div class="header">
    <div class="iconfont header__back" @click="handleBackClick">&#xe6db;</div>
    <h2 class="header__title">管理收货地址</h2>
    <RouterLink :to="{ name: 'AddressEdit' }">
      <div class="header__btn">新建</div>
    </RouterLink>
  </div>

  <div class="wrapper">
    <h3 class="wrapper__title" v-show="addressList.length !== 0">我的收货地址</h3>
    <template v-for="item in addressList" :key="item._id">
      <RouterLink :to="{ name: 'AddressEdit', query: item }">
        <div class="address">
          <span class="address__name">{{ item.name }}</span>
          <span class="address__phone">{{ item.phone }}</span>
          <p class="address__position">{{ item.city }}市{{ item.department }}{{ item.houseNumber }}</p>
          <div class="iconfont address__icon">&#xe6db;</div>
        </div>
      </RouterLink>
    </template>
    <div class="wrapper__notice" v-show="addressList.length === 0">暂无数据，请点击右上角新建地址</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/utils/request'

// 获取地址列表相关逻辑
const useAddressListEffect = () => {
  const addressList = ref([])

  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data.length) {
      addressList.value = result.data
    }
  }

  return { addressList, getAddressList }
}

export default {
  name: 'AddressManage',
  setup() {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }

    const { addressList, getAddressList } = useAddressListEffect()
    getAddressList()

    return { addressList, handleBackClick }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.header {
  width: 100vw;
  height: 4.4rem;
  padding: 0 1.8rem;
  background-color: $bgColor;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;

  &__back {
    font-size: 1.6rem;
    color: $back-btnColor;
  }

  &__title {
    font-size: 1.6rem;
    line-height: 2.2rem;
  }

  &__btn {
    font-size: 1.4rem;
    line-height: 2rem;
  }
}

.wrapper {
  width: 100vw;
  height: 100vh;
  padding: 4.4rem 1.8rem 0;
  background-color: $input-bgColor;
  overflow-y: auto;

  &__title {
    font-size: 1.4rem;
    line-height: 2rem;
    margin-top: 1.6rem;
    margin-bottom: 1.2rem;
  }

  &__notice {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    color: $medium-fontcolor;
  }
}

.address {
  width: 100%;
  height: 10.4rem;
  background-color: $bgColor;
  border-radius: .4rem;
  margin-bottom: 1.6rem;
  padding: 1.8rem 1.6rem;
  position: relative;

  &__name {
    font-size: 1.4rem;
    line-height: 2rem;
    color: $light-fontcolor;
    margin-right: 6.6rem;
  }

  &__phone {
    font-size: 1.4rem;
    line-height: 2rem;
    color: $light-fontcolor;
  }

  &__position {
    width: 69.333333vw;
    margin-top: .8rem;
    font-size: 1.4rem;
    line-height: 2rem;

    @include ellipsis;
    -webkit-line-clamp: 2;
  }

  &__icon {
    position: absolute;
    top: 4.4rem;
    right: 1.6rem;
    transform: rotate(180deg);
    font-size: 1.6rem;
    color: $light-fontcolor;
  }
}
</style>
