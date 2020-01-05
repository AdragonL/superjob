<template>
  <nav-bar>
    <div slot="left" class="back" @click="backclick">
      <img src="../../../assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles" class="item"  :class="{active : currentIndex === index}" @click="titleclick(index)">{{item}}</div>

    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {NavBar},
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods : {
      titleclick(index){
        this.currentIndex =index
        this.$emit("titleclick2",index)
      },
      backclick(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;


  }

  .item {
    flex: 1;
    font-size: 13px;
  }


  .active{
    color: #ff8198;
  }

  .back img{
    margin-top: 12px;
  }

</style>
