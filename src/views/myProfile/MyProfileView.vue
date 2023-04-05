<template>
  <div class="bg"></div>
  <div class="wrapper">
    <div class="top">
      <img class="top__editor" src="./images/editor.png">
      <div class="top__infobox">
        <img src="./images/avatar.jpg" alt="" class="top__infobox__avator">
        <div class="top__infobox__name">
          热心市民李先生
          <div class="star">
            <div class="star__imgbox">
              <img src="./images/star.png" class="star__imgbox__img">
            </div>
            <div class="star__text">16</div>
          </div>
        </div>
        <p class="top__infobox__id">ID: 1069643013</p>
        <div class="top__infobox__own">
          <div class="top__infobox__own__item">
            红包
            <span class="itemcount">218</span>
          </div>
          <div class="top__infobox__own__item">
            优惠券
            <span class="itemcount">12张</span>
          </div>
          <div class="top__infobox__own__item">
            鲜豆
            <span class="itemcount">88</span>
          </div>
          <div class="top__infobox__own__item">
            白条
            <span class="itemcount">1000</span>
          </div>
        </div>
      </div>
    </div>
    <div class="options">
      <div class="options__wallet option">
        <div class="option__imgbox options__wallet__img">
          <img src="./images/money.png" class="option__img">
        </div>
        <span class="option__text">我的钱包</span>
        <span class="option__right iconfont">&#xe6db;</span>
      </div>
      <div class="options__address option" @click="toAddressManage">
        <div class="option__imgbox options__address__img">
          <img src="./images/address.png" class="option__img">
        </div>
        <span class="option__text">我的地址</span>
        <span class="option__right iconfont">&#xe6db;</span>
      </div>
      <div class="options__help option">
        <div class="option__imgbox options__help__img">
          <img src="./images/help.png" class="option__img">
        </div>
        <span class="option__text">客服与帮助</span>
        <span class="option__right iconfont">&#xe6db;</span>
      </div>
    </div>
  </div>
  <DockerView :currentIndex="3" />
</template>

<script>
import { useRouter } from 'vue-router'
import DockerView from '../../components/DockerView.vue'

export default {
  name: 'MyProfileView',
  components: { DockerView },
  setup() {
    const router = useRouter()
    const toAddressManage = () => {
      router.push({ name: 'AddressManage' })
    }

    return { toAddressManage }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

.wrapper {
  width: 100vw;
  height: 100vh;
  padding: 0 1.8rem 5rem;
  overflow-y: auto;
}

.bg {
  width: 150vw;
  height: 150vw;
  position: fixed;
  left: -25vw;
  top: -88.4vw;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  border-radius: 50%;
  z-index: 1;
}

.top {
  position: relative;
  width: 100%;
  height: 29.2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__editor {
    width: 2.4rem;
    position: absolute;
    right: 0;
    top: 3.8rem;
  }

  &__infobox {
    width: 100%;
    height: 20.3rem;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.08);
    border-radius: .8rem;

    &__avator {
      width: 9.4rem;
      height: 4.7rem;
      border-radius: 50%;
      position: relative;
      top: -2.35rem;
      transform: scaleY(2);
      margin-bottom: 1.2rem;
    }

    &__name {
      font-size: 2.4rem;
      color: #262628;
      text-align: center;
      line-height: 3.6rem;
      margin-bottom: .2rem;
      position: relative;

      .star {
        position: absolute;
        top: 1rem;
        right: -8.2rem;
        width: 7rem;
        height: 3rem;
        background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
        border-radius: 20rem;
        display: flex;
        align-items: center;
        transform-origin: 0 0;
        transform: scale(.5);

        &__imgbox {
          width: 2.2rem;
          height: 2.2rem;
          background-color: rgba(0, 0, 0, 0.20);
          margin: 0 .8rem 0 .4rem;
          border-radius: 1.1rem;
          display: flex;
          justify-content: center;
          align-items: center;

          &__img {
            width: 1.4rem;
            height: 1.4rem;
          }
        }

        &__text {
          font-size: 2rem;
          color: $bgColor;
        }
      }
    }

    &__id {
      font-size: 1.4rem;
      color: #C1C0C9;
      text-align: center;
      line-height: 2rem;
      margin-bottom: 1.2rem;
    }

    &__own {
      width: 100%;
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      border-top: .1rem solid $content-bgColor;

      &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: #C1C0C9;
        line-height: 1.7rem;

        .itemcount {
          font-size: 2rem;
          line-height: 2.8rem;
          color: #262628;
          margin-top: .3rem;
        }
      }
    }
  }
}

.options {
  position: relative;
  z-index: 2;
  margin-top: 1.6rem;
  width: 100%;
  height: 14.6rem;
  background-color: $bgColor;
  box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.08);
  border-radius: .8rem;
  padding: .4rem 1.6rem;
  display: flex;
  flex-direction: column;

  &__wallet__img {
    background-color: #ED4A47;
  }

  &__address__img {
    background-color: #32C5FF;
  }

  &__help__img {
    background-color: rgba(144, 19, 254, 0.92);
  }

  .option {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;

    &__imgbox {
      width: 2.2rem;
      height: 2.2rem;
      padding: .5rem;
      border-radius: .8rem;
      margin-right: 1.2rem;
    }

    &__img {
      width: 100%;
    }

    &__text {
      flex: 1;
      font-size: 1.4rem;
      line-height: 2rem;
      color: #262626;
    }

    &__right {
      font-size: 1.2rem;
      color: #c2c4ca;
      transform: rotate(180deg);
    }
  }

}
</style>
