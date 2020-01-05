<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt=""  @load="imageload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

  import {Swiper,SwiperItem} from "../../../components/common/swiper/index"
    export default {
        name: "HomeSwiper",
      components : {
        Swiper,SwiperItem
      },
      data(){
          return {
            isShow : false
          }
      },
      props : {
          banners : {
            type : Array,
            default(){
              return []
            }
          }

      },
      methods : {
          imageload(){
            if(!this.isShow){
              this.$emit("swiperimageload")
              this.isShow=true
            }
          }
      }
    }
</script>

<style scoped>

</style>
