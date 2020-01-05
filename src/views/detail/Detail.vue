<template>
  <div id="detail">
    <detail-nav-bar class="title" @titleclick2="titleclick1" ref="nav"/>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="scrollclick">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad1"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </Scroll>
    <detail-bottom-bar @addclick="addToclick"/>
    <back-top @click.native="backclick" v-show="isShow"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail, Goods, GoodsParam, getCommend} from "../../network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin"
  import {debounce} from "../../common/utils";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import {mapActions} from "vuex"


  export default {
    name: "Detail",
    components: {
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailShopInfo,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar,
      Scroll,
      DetailBottomBar
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0,
        MAX_VALUE : Number.MAX_VALUE

      }
    },

    created() {
      //保存id
      this.iid = this.$route.params.iid

      //获取iid请求数据 :
      getDetail(this.iid).then(res => {

        const data = res.result;
        //轮播图
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺信息
        this.shopInfo = data.shopInfo

        //保存商品得详情
        this.detailInfo = data.detailInfo

        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //第二种做法 在created里 当组件渲染成功之后会内部会调用nextTick这个函数进行一次回调 有可能不对，因为只是等DOM渲染完，而图片可能还没有渲染完成
        // this.$nextTick(()=>{
        //
        //   this.themeTopYs=[]
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // })

      })

      getCommend().then(res => {
        this.recommends = res.data.list
      })


      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //hack做法
        // this.themeTopYs.push(this.MAX_VALUE)
      }, 100)


    },
    methods: {
      ...mapActions(['addCart']),

      imgLoad1() {
        this.newRefresh()
        this.getThemeTopYs()
      },
      titleclick1(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      scrollclick(position) {
        const postitionY = -position.y

        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i < length-1 && postitionY >= this.themeTopYs[i] && postitionY < this.themeTopYs[i + 1]) || (i === length-1 && postitionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
          //hack做法:在themeTopYs加入max_VAULE增加效率
          // if (this.currentIndex !==i && (postitionY >= this.themeTopYs[i] &&postitionY<this.themeTopYs[i+1])){
          //     this.currentIndex = i
          //     this.$refs.nav.currentIndex = this.currentIndex
          // }
        }

        this.listenShowBackTop(position)
      },
      addToclick(){
        const product ={}
        product.image= this.topImages[0]
        product.title =this.goodsInfo.title
        product.desc =this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid =this.iid

        // this.$store.commit("addCart",product)



        // this.$store.dispatch("addCart",product)
        this.addCart(product).then(res=>{

          // console.log(this.$toast)


          this.$toast.show(res,2000)
        })



      }
    },
    mounted() {

    },
    //第一种做法 在update里取出组件渲染完成后的offsetTop值
    updated() {
      // this.themeTopYs=[]
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

    },
    destroyed() {
      this.$bus.$off("itemimageload", this.itemImgListListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 58px);
    background-color: white;

  }

  .title {
    position: relative;
    z-index: 9;
    background-color: white;
  }

</style>
