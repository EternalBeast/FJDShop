<template>
  <div class="main">
    <HeadView />

    <div class="gap"></div>

    <NearbyView />

  </div>

  <DockerView :currentIndex="0" />
</template>

<script>
import HeadView from './HeadView.vue'
import NearbyView from './NearbyView.vue'
import DockerView from '../../components/DockerView.vue'

export default {
  name: 'HomeView',
  components: { HeadView, NearbyView, DockerView }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.main {
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  padding-bottom: 5rem;
}

.gap {
  width: 100%;
  height: 1rem;
  background-color: $content-bgColor;
}
</style>
