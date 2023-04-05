<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input type="text" class="wrapper__input__username" placeholder="请输入手机号" v-model="username">
      <input type="password" class="wrapper__input__pwd" placeholder="请输入密码" v-model="password">
    </div>
    <button @click="handleLogin" class="wrapper__login-button">登录</button>
    <RouterLink :to="{ name: 'Register' }">
      <div class="wrapper__login-link">立即注册</div>
    </RouterLink>
    <ToastCompo v-if="showToast" :message="toastMessage" />
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { reactive, toRefs } from 'vue'
import ToastCompo, { useToastEffect } from '@/components/ToastCompo.vue'

const useLoginEffect = (handleToast) => {
  const router = useRouter()

  const data = reactive({
    username: '',
    password: ''
  })

  const handleLogin = async () => {
    if (data.username === '' || data.password === '') {
      handleToast('请正确填写')
      return
    }

    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        handleToast('登录失败')
      }
    } catch (e) {
      handleToast('请求失败')
    }
  }

  const { username, password } = toRefs(data)

  return { username, password, handleLogin }
}

export default {
  name: 'LoginView',
  components: { ToastCompo },
  setup() {
    const { showToast, toastMessage, handleToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(handleToast)

    return { handleLogin, username, password, showToast, toastMessage }
  }
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
      background: $username-bgColor;
      border: .1rem solid rgba(0, 0, 0, 0.10);
      border-radius: .6rem;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__login-button {
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

  &__login-link {
    font-size: 1.4rem;
    color: $content-notice-fontcolor;
  }
}
</style>
