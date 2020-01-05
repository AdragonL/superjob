<template>
  <div class="all">

    <check-button class="allCount" :is-active="isAll" @click.native="allClick"/>
    <span class="allChoose">全选</span>


    <div class="goToCalc" @click="jisuanclick">去计算({{Count}})</div>

    <div class="allPrice">总计：{{totalPrice}}</div>


  </div>


</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from "vuex";

  export default {
    name: "cartListBar",
    components: {CheckButton},

    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        //第一种写法
        // return this.$store.state.cartList.filter(item =>{
        //   return item.checked
        // }).reduce(item =>{
        //   return item.count * item.price
        // })

        //第二种写法
        return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => preValue + item.count * item.price, 0).toFixed(2)
      },
      /**
       * @return {number}
       */
      Count() {
        return this.cartList.filter(item => item.checked).length
      },
      isAll() {
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      allClick() {
        if (this.isAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }

      },
      jisuanclick(){
        if(this.cartList.length === 0){
          this.$toast.show("请选择购买的商品",2000)
        }
      }
    }

  }
</script>

<style scoped>
  .allCount {
    width: 22px;
    height: 22px;
    margin-left: 10px;
    margin-right: 5px;
    float: left;
    margin-top: 9px;
  }


  .allChoose {
    float: left;
    margin-top: 10px;

  }

  .all {
    line-height: 20px;
    background-color: #eeeeee;

  }


  .allPrice {
    float: right;
    margin-right: 10px;
    margin-top: 10px;

  }

  .goToCalc {
    float: right;
    height: 40px;
    text-align: center;
    margin-top: 9px;
    width: 90px;


  }


</style>
