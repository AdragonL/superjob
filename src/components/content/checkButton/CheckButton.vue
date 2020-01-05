<template>
    <div class="check-button">
      <img src="../../../assets/img/cart/tick.svg" :class="{isCheck : isActive}" >
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props : {
          isActive :{
            type : Boolean,
            default: false
          }
      }
    }

</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: #666666 solid 2px;
  }

  .isCheck{
    border-color: #ff8198;
    background-color: #ff8198;
  }

</style>
