<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe6db;</div>
      确认订单
    </div>
    <div class="top__receiver" @click="chooseAddressClick">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">{{ hasAddress ?
        `${addressData.city}市${addressData.department}${addressData.houseNumber}` :
        '请选择收货地址' }}</div>
      <div v-if="hasAddress" class="top__receiver__info">
        <span class="top__receiver__info__name">{{ addressData.name }}</span>
        <span class="top__receiver__info__phone">{{ addressData.phone }}</span>
      </div>
      <div class="iconfont top__receiver__enter">&#xe6db;</div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request'
import { onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'TopArea',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const addressId = route.query.addressId
    const addressData = reactive({})

    const handleBackClick = () => {
      router.back()
    }

    const chooseAddressClick = () => {
      router.push(`/addressSelect?path=${route.path}`)
    }

    onBeforeMount(async () => {
      if (addressId) {
        const result = await get(`/api/user/address/${addressId}`)
        if (result?.errno === 0) {
          addressData.city = result.data.city
          addressData.department = result.data.department
          addressData.houseNumber = result.data.houseNumber
          addressData.name = result.data.name
          addressData.phone = result.data.phone
        }
      }
    })

    return {
      hasAddress: !!addressId,
      addressData,
      handleBackClick,
      chooseAddressClick
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.top {
  width: 100%;
  height: 17.7rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  padding: 0 1.8rem;

  &__header {
    width: 100%;
    height: 6.6rem;
    color: $bgColor;
    text-align: center;
    font-size: 1.6rem;
    line-height: 2.2rem;
    position: relative;
    padding: 2.2rem 0;

    &__back {
      width: 1.2rem;
      height: 2.2rem;
      font-size: 2.1rem;
      position: absolute;
      left: 0;
      top: 2.2rem;
    }
  }

  &__receiver {
    width: 100%;
    height: 11.1rem;
    border-radius: .4rem;
    background-color: $bgColor;
    padding: 1.6rem;
    position: relative;

    &__title {
      font-size: 1.6rem;
      font-weight: 600;
      margin-bottom: 1.4rem;
      line-height: 2.2rem;
    }

    &__address {
      font-size: 1.4rem;
      line-height: 2rem;
      max-width: 80%;
      margin-bottom: .6rem;
      @include ellipsis;
    }

    &__info {
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: $medium-fontcolor;

      &__name {
        margin-right: .6rem;
      }
    }

    &__enter {
      color: $medium-fontcolor;
      width: .8rem;
      height: 1.6rem;
      transform: rotate(180deg);
      position: absolute;
      right: 1.6rem;
      top: 50%;
      margin-top: -.8rem;
    }
  }
}
</style>
