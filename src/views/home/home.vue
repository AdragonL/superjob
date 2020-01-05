<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-controller :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tabControl"
                    v-show="isTop"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="positionclick"
            :pull-up-load="true" @pullingUp="pulling">
      <home-swiper :banners="banners" @swiperimageload="swiperimageload"/>
      <recommend-view :recommends="recommends"/>
      <FeatureViews/>
      <tab-controller :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="show"/>
    </scroll>
    <back-top @click.native="backclick" v-show="isShow"/>

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureViews from "./childComps/FeatureViews";
  import TabController from "../../components/content/tabControl/tabController";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin"

  export default {
    name: "home",
    components: {
      Scroll,
      GoodsList,
      TabController,
      FeatureViews,
      HomeSwiper,
      NavBar,
      RecommendView
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTop: false

      }
    }
    ,
    computed: {
      show() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    //不活跃的
    deactivated() {
      //保存y值
      // this.saveY =this.$refs.scroll.getCurrenY()
      //取消全局事件的监听
      this.$bus.$off('itemimageload', this.itemImgListListener)
    },
    mounted() {

    },

    methods: {
      swiperimageload() {

        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      pulling() {
        this.getHomeGoods(this.currentType)
      },


      positionclick(position) {
        this.listenShowBackTop(position)
        this.isTop = (-position.y) > this.tabOffsetTop
      },

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()

        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1 :
            this.currentType = 'new'
            break
          case 2 :
            this.currentType = 'sell'
            break

        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tabControl {
    position: relative;
    z-index: 9;
  }


  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>
