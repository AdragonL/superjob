<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkedChange" :is-active="itemInfo.checked"/>
    </div>

    <div class="item-img">
      <img :src="itemInfo.image" >
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>s
  </div>
</template>

<script>
    import Detail from "../../detail/Detail";
    import CheckButton from "../../../components/content/checkButton/CheckButton";
    export default {
        name: "cartListItem",
      components: {CheckButton, Detail},
      props :{
        itemInfo : {
            type : Object,
            default(){
              return {}
            }
          }
    },
      methods :{
        checkedChange(){
          this.itemInfo.checked=!this.itemInfo.checked

        }
      }
    }
</script>

<style scoped>
  #shop-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #cccccc;
  }

  .info-bottom .item-price{
    color: orangered;
  }

  .info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .item-info .item-desc{
    font-size: 14px;
    color: #666666;
    margin-top: 15px;
  }

  .item-info{
    font-size: 17px;
    color: #333333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-img{
    padding: 5px;
  }

  .item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
