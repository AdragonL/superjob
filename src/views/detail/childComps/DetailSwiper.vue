<template>
    <Swiper class="swiper1">
      <SwiperItem v-for="item in topImages">
        <img :src="item">
      </SwiperItem>
    </Swiper>
</template>

<script>

  import {SwiperItem, Swiper} from "../../../components/common/swiper"

  export default {
    name: "DetailSwiper",
    components: {
      Swiper, SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

  .swiper1{
    height: 300px;
    overflow: hidden;
  }
</style>
