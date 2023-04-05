<template>
  <div class="orderbar">
    <div class="orderbar__price">
      实付金额
      <span class="orderbar__price__yen">&yen;{{ calculations.totalPrice }}</span>
    </div>
    <button v-show="showSubmitBtn" class="orderbar__btn" @click="() => handleSubmitOrder(true)">提交订单</button>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleSubmitOrder(false)">
    <div class="popup" @click.stop>
      <h3 class="popup__title">确认要离开收银台？</h3>
      <p class="popup__desc">请尽快完成支付，否则将被取消</p>
      <div class="popup__btns">
        <button class="popup__btns__cancel" @click="() => handleConfirmOrder(true)">取消订单</button>
        <button class="popup__btns__confirm" @click="() => handleConfirmOrder(false)">确认支付</button>
      </div>
    </div>
  </div>
  <ToastCompo v-if="showToast" :message="toastMessage" />
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '@/effects/cartEffects'
import { post } from '@/utils/request'
import ToastCompo, { useToastEffect } from '@/components/ToastCompo.vue'
import { ref } from 'vue'

// 下单相关逻辑
const useOrderEffect = (shopId, addressId) => {
  const router = useRouter()
  const store = useStore()

  const { inCartList, calculations, shopName } = useCommonCartEffect(shopId)
  const { handleToast } = useToastEffect()

  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in inCartList.value) {
      const product = inCartList.value[i]
      // vuex中，当 count <= 0 时，product.check = false
      if (product.check) {
        products.push({ id: parseInt(product._id), num: product.count })
      }
    }

    try {
      const result = await post('/api/order', {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })

      if (result?.errno === 0) {
        store.commit('cleanCart', { shopId })
        router.push({ name: 'OrderList' })
      } else {
        handleToast('下单失败')
      }
    } catch (e) {
      console.log(e)
      handleToast('请求失败')
    }
  }

  return { calculations, handleConfirmOrder }
}

// 展示蒙层相关逻辑
const showMaskEffect = () => {
  const showConfirm = ref(false)

  const handleSubmitOrder = (status) => {
    showConfirm.value = status
  }

  return { showConfirm, handleSubmitOrder }
}

export default {
  name: 'OrderBar',
  components: { ToastCompo },
  setup() {
    const route = useRoute()

    const shopId = route.params.id

    const { calculations, handleConfirmOrder } = useOrderEffect(shopId, route.query.addressId)
    const { showConfirm, handleSubmitOrder } = showMaskEffect()
    const { showToast, toastMessage } = useToastEffect()

    return {
      showSubmitBtn: !!route.query.addressId,
      showConfirm,
      calculations,
      showToast,
      toastMessage,
      handleConfirmOrder,
      handleSubmitOrder
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

.orderbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4.9rem;
  background-color: $bgColor;
  display: flex;
  align-items: center;

  &__price {
    flex: 1;
    font-size: 1.4rem;
    padding-left: 2.4rem;

    &__yen {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }

  &__btn {
    width: 9.8rem;
    height: 100%;
    outline: none;
    border: none;
    font-size: 1.4rem;
    color: $bgColor;
    background-color: $order-btnColor;
  }
}

.mask {
  background-color: rgba(0, 0, 0, 0.50);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup {
  width: 30.1rem;
  height: 15.7rem;
  background-color: $bgColor;
  border-radius: .4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 2.5rem;
    margin: 2.4rem 0 .8rem 0;
  }

  &__desc {
    font-size: 1.4rem;
    line-height: 2rem;
    color: $medium-fontcolor;
    margin-bottom: 2.4rem;
  }

  &__btns {
    height: 3.2rem;

    button {
      width: 8rem;
      height: 100%;
      border: .1rem solid $order-btnColor;
      border-radius: 1.6rem;
    }

    &__cancel {
      color: $order-btnColor;
      background-color: $bgColor;
      margin-right: 2.4rem;
    }

    &__confirm {
      color: $bgColor;
      background-color: $order-btnColor;
    }
  }
}
</style>
