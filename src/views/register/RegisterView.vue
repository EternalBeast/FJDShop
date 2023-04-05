<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input type="text" class="wrapper__input__username" placeholder="请输入手机号" v-model="username">
      <input type="password" class="wrapper__input__pwd" placeholder="请输入密码" v-model="password">
      <input type="password" class="wrapper__input__confirm" placeholder="确认密码" v-model="comfirmpwd">
    </div>
    <button @click="handleRegister" class="wrapper__register-button">注册</button>
    <RouterLink :to="{ name: 'Login' }">
      <div class="wrapper__register-link">已有账号去登录</div>
    </RouterLink>
    <ToastCompo v-if="showToast" :message="toastMessage" />
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'
import ToastCompo, { useToastEffect } from '@/components/ToastCompo.vue'

const useRegisterEffect = (handleToast) => {
  const router = useRouter()

  const data = reactive({
    username: '',
    password: '',
    comfirmpwd: ''
  })

  const handleRegister = async () => {
    if (data.username === '' || data.password === '' || data.comfirmpwd === '') {
      handleToast('请正确填写')
      return
    } else if (data.password !== data.comfirmpwd) {
      handleToast('请确认密码一致!')
      return
    }

    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        handleToast('注册失败')
      }
    } catch (e) {
      handleToast('请求失败')
    }
  }

  const { username, password, comfirmpwd } = toRefs(data)

  return { username, password, comfirmpwd, handleRegister }
}

export default {
  name: 'RegisterView',
  setup() {
    const { showToast, toastMessage, handleToast } = useToastEffect()
    const { username, password, comfirmpwd, handleRegister } = useRegisterEffect(handleToast)

    return { handleRegister, username, password, comfirmpwd, showToast, toastMessage }
  },
  components: { ToastCompo }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 0 10.666667vw;

  &__img {
    width: 6.6rem;
    margin-bottom: 4rem;
  }

  &__input {
    width: 100%;
    margin-bottom: 3.2rem;

    &__username {
      width: 100%;
      height: 4.8rem;
      font-size: 1.6rem;
      padding-left: 1.6rem;
      margin-bottom: 1.6rem;
      background: $username-bgColor;
      border: .1rem solid rgba(0, 0, 0, 0.10);
      border-radius: .6rem;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }

    &__pwd {
      width: 100%;
      height: 4.8rem;
      font-size: 1.6rem;
      padding-left: 1.6rem;
      margin-bottom: 1.6rem;
      background: $username-bgColor;
      border: .1rem solid rgba(0, 0, 0, 0.10);
      border-radius: .6rem;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }

    &__confirm {
      width: 100%;
      height: 4.8rem;
      font-size: 1.6rem;
      padding-left: 1.6rem;
      background: $username-bgColor;
      border: .1rem solid rgba(0, 0, 0, 0.10);
      border-radius: .6rem;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__register-button {
    width: 100%;
    height: 4.8rem;
    font-size: 1.6rem;
    color: $bgColor;
    margin-bottom: 1.6rem;
    background: $btn-bgColor;
    box-shadow: 0 .4rem .8rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .4rem;
    border: none;
  }

  &__register-link {
    font-size: 1.4rem;
    color: $content-notice-fontcolor;
  }
}
</style>
