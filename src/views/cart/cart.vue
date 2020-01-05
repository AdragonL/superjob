<template>
    <div class="cart">
      <nav-bar class="title">
        <div slot="center">购物车({{shopCount}})</div>
      </nav-bar>
      <cart-list/>
      <cart-list-bar class="bar"/>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import {mapGetters} from  'vuex'
    import CartList from "./childComps/cartList";
    import CartListBar from "./childComps/cartListBar";
    export default {
        name: "cart",
      components: {CartListBar, CartList, NavBar},
      computed:{
          ...mapGetters(['shopCount','cartList'])
      }
    }
</script>

<style scoped>
  .title{
    background: #ff8198;
    color: white;
  }

  .cart{
    height: 100vh;
  }

  .bar{
    height: 40px;
  }


</style>
