<template>
  <div class="header">
    我的订单
  </div>

  <ul class="orderlist">
    <li v-for="(item, index) in list" class="order" :key="index">
      <div class="order__header">
        <h3 class="order__header__title">{{ item.shopName }}</h3>
        <span class="order__header__status" v-html="item.isCanceled ? '已取消' : '已下单'"></span>
      </div>
      <div class="order__info">
        <div class="order__info__picbox">
          <img v-for="(innerItem, innerIndex) in item.products" class="order__info__img" :src="innerItem.product.imgUrl"
            :key="innerIndex">
        </div>
        <div class="order__info__text">
          <span class="order__info__highlight">&yen;{{ item.totalPrice }}</span>
          共{{ item.totalCount }}件
        </div>
      </div>
    </li>
  </ul>

  <DockerView :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request'
import DockerView from '../../components/DockerView.vue'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })

  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = (order?.products || [])
        let totalCount = 0
        let totalPrice = 0
        products.forEach((item) => {
          totalCount += (item?.orderSales || 0)
          totalPrice += ((item?.orderSales * item?.product?.price) || 0)
        })
        order.totalCount = totalCount

        const x = String(totalPrice).split('.')[1]?.length || 0

        if (x > 2) {
          order.totalPrice = totalPrice.toFixed(2)
        } else {
          order.totalPrice = totalPrice
        }
      })

      data.list = result.data
    }
  }
  getOrderList()

  const { list } = toRefs(data)

  return { list }
}

export default {
  name: 'OrderListView',
  components: { DockerView },
  setup() {
    const { list } = useOrderListEffect()

    return { list }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

.header {
  width: 100vw;
  height: 4.4rem;
  background-color: $bgColor;
  position: fixed;
  top: 0;
  font-size: 1.6rem;
  text-align: center;
  line-height: 4.4rem;
}

.orderlist {
  width: 100vw;
  height: 100vh;
  padding: 4.4rem 1.8rem 5rem;
  background-color: $content-bgColor;

  .order {
    width: 100%;
    height: 11rem;
    background-color: $bgColor;
    margin-top: 1.6rem;
    padding: 1.6rem;
    border-radius: .4rem;

    &__header {
      width: 100%;
      height: 2.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.6rem;

      &__title {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 2.2rem;
      }

      &__status {
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 2rem;
        color: $light-fontcolor;
      }
    }

    &__info {
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: space-between;

      &__picbox {
        display: flex;
        overflow-x: scroll;

        // 隐藏滚动条
        scrollbar-width: none;
        /* firefox */
        -ms-overflow-style: none;
        /* IE 10+ */

        &::-webkit-scrollbar {
          display: none;
          /* Chrome Safari */
        }
      }

      &__img {
        width: 4rem;
        height: 4rem;
        margin-right: 1.2rem;
      }

      &__text {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 1.2rem;
        line-height: 1.4rem;
        margin-left: 1rem;
      }

      &__highlight {
        font-size: 1.4rem;
        line-height: 2rem;
        color: $highlight-fontcolor;
        margin-bottom: .4rem;
      }
    }
  }
}
</style>
