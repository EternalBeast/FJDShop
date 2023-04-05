<template>
  <div class="head">
    <div class="position">
      <span class="iconfont position__icon">&#xe619;</span>
      <span class="position__text">北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层</span>
      <span class="iconfont position__notice">&#xe7e5;</span>
    </div>
    <RouterLink to="/search">
      <div class="search">
        <span class="iconfont search__icon">&#xe600;</span>
        <input type="text" class="search__input" placeholder="山姆会员商店优惠商品">
      </div>
    </RouterLink>
    <div class="banner">
      <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
    </div>
    <ul class="nav">
      <li v-for="item in navList" class="nav__item" :key="item.id">
        <img :src="item.img" alt="" class="nav__item__img">
        <span class="nav__item__text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HeadView',
  setup() {
    const navList = [
      {
        id: 1,
        img: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利'
      },
      {
        id: 2,
        img: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        text: '菜市场'
      },
      {
        id: 3,
        img: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        text: '水果店'
      },
      {
        id: 4,
        img: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        text: '鲜花绿植'
      },
      {
        id: 5,
        img: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        text: '医药健康'
      },
      {
        id: 6,
        img: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        text: '家居时尚'
      },
      {
        id: 7,
        img: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        text: '烘焙蛋糕'
      },
      {
        id: 8,
        img: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        text: '签到'
      },
      {
        id: 9,
        img: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        text: '大牌免运'
      },
      {
        id: 10,
        img: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        text: '红包套餐'
      }
    ]

    return { navList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.head {
  padding: 0 1.8rem;
  color: $content-fontcolor;

  .position {
    display: flex;
    justify-content: space-between;
    margin: 1.6rem 0;
    height: 2.2rem;

    &__icon {
      font-size: 2rem;
      margin-right: .85rem;
    }

    &__text {
      flex: 1;
      line-height: 2.2rem;
      font-size: 1.6rem;
      @include ellipsis;
    }

    &__notice {
      font-size: 2rem;
    }
  }

  .search {
    width: 100%;
    height: 3.2rem;
    margin-bottom: 1.2rem;
    position: relative;

    &__icon {
      font-size: 1.6rem;
      color: $input-fontcolor;
      position: absolute;
      top: .75rem;
      left: 1.6rem;
    }

    &__input {
      height: 100%;
      width: 100%;
      background-color: $input-bgColor;
      border-radius: 1.6rem;
      font-size: 1.4rem;
      line-height: 1.6rem;
      padding-left: 4.4rem;

      &::placeholder {
        color: $input-fontcolor;
      }
    }
  }

  .banner {
    width: 100%;
    min-height: 22.933333vw;

    &__img {
      width: 100%;
    }
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 17.4rem;
    padding: 1.6rem 0 0;

    &__item {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;

      &__img {
        width: 4rem;
        margin-bottom: .6rem;
      }

      &__text {
        font-size: 1.2rem;
        line-height: 1.7rem;
        margin-bottom: 1.6rem;
      }
    }
  }
}
</style>
