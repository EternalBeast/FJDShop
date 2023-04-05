<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'ToastCompo',
  props: ['message']
}

export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })

  const handleToast = (msg) => {
    toastData.showToast = true
    toastData.toastMessage = msg
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }

  const { showToast, toastMessage } = toRefs(toastData)

  return { showToast, toastMessage, handleToast }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 4rem;
  background-color: rgba(0, 0, 0, .35);
  text-align: center;
  border-radius: .5rem;
  color: $bgColor;
  font-size: 1.4rem;
  z-index: 111111;
}
</style>
