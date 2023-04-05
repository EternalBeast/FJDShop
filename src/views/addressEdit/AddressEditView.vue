<template>
  <div class="header">
    <div class="iconfont header__back" @click="handleBackClick">&#xe6db;</div>
    <h2 class="header__title" v-html="isEdit ? '编辑收货地址' : '新建收货地址'"></h2>
    <div class="header__btn" @click="handleSaveClick">保存</div>
  </div>

  <div class="wrapper">
    <div class="edit-layout">
      <div class="item">
        <span class="item__title">所在城市：</span>
        <input type="text" class="item__input" placeholder="如北京市" v-model="address.city">
      </div>
      <div class="item">
        <span class="item__title">小区/大厦/学校：</span>
        <input type="text" class="item__input" placeholder="如理工大学国防科技园" v-model="address.department">
      </div>
      <div class="item">
        <span class="item__title">楼号-门牌号：</span>
        <input type="text" class="item__input" placeholder="A号楼B层" v-model="address.houseNumber">
      </div>
      <div class="item">
        <span class="item__title">收货人：</span>
        <input type="text" class="item__input" placeholder="请填写收货人的姓名" v-model="address.name">
      </div>
      <div class="item">
        <span class="item__title">联系电话：</span>
        <input type="text" class="item__input" placeholder="请填写收货手机号" v-model="address.phone">
      </div>
    </div>
  </div>

  <ToastCompo v-show="showToast" :message="toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ToastCompo, { useToastEffect } from '@/components/ToastCompo.vue'
import { post } from '@/utils/request'

// 点击回退逻辑
const useBackRouterEffect = (router) => {
  const handleBackClick = () => {
    router.back()
  }

  return { router, handleBackClick }
}

// 保存地址相关逻辑
const saveAddressEffect = (address, router, isEdit, handleToast) => {
  const saveAddress = async (address) => {
    const result = await post('/api/user/address', address.value)
    if (result?.errno === 0 && result?.data.length) {
      router.back()
    }
  }

  const updateAddress = async (address) => {
    const result = await post(`/api/user/address/${address.value._id}`, address.value)
    if (result?.errno === 0) {
      router.back()
    }
  }

  // 点击保存
  const handleSaveClick = () => {
    let canSave = true
    for (const item in address.value) {
      if (!address.value[item]) canSave = false
    }
    if (canSave) {
      if (isEdit) {
        updateAddress(address)
      } else {
        saveAddress(address)
      }
    } else {
      handleToast('请填写所有内容')
    }
  }

  return { handleSaveClick }
}

export default {
  name: 'AddressEdit',
  components: { ToastCompo },
  setup() {
    const router = useRouter()

    const route = useRoute()

    const address = ref({
      city: '',
      department: '',
      houseNumber: '',
      name: '',
      phone: ''
    })

    let isEdit = false

    if (route.query._id) {
      address.value.city = route.query.city
      address.value.department = route.query.department
      address.value.houseNumber = route.query.houseNumber
      address.value.name = route.query.name
      address.value.phone = route.query.phone
      address.value._id = route.query._id
      isEdit = true
    }

    const { showToast, toastMessage, handleToast } = useToastEffect()
    const { handleBackClick } = useBackRouterEffect(router)
    const { handleSaveClick } = saveAddressEffect(address, router, isEdit, handleToast)

    return { isEdit, address, showToast, toastMessage, handleBackClick, handleSaveClick }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

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
  padding-top: 4.4rem;
  background-color: $input-bgColor;
  overflow-y: auto;

  .edit-layout {
    width: 100%;
    height: 22.4rem;
    margin-top: 1.2rem;
    padding: 0 1.8rem;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;

    .item {
      width: 100%;
      height: 4.4rem;
      display: flex;
      align-items: center;
      border-bottom: .1rem solid $input-bgColor;

      &:last-child {
        border: none;
      }

      &__title {
        font-size: 1.4rem;
        line-height: 2rem;
        color: $medium-fontcolor;
      }

      &__input {
        flex: 1;
        font-size: 1.4rem;
        line-height: 2rem;

        &::placeholder {
          color: $light-fontcolor;
        }
      }
    }
  }
}
</style>
