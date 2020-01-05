export default {
  addCart(context, playLoad) {
    // let oldProduct=null
    // for(let item in state.cartlist){
    //   if(item.iid === playLoad.iid){
    //     oldProduct=item
    //   }
    //}

    return new Promise((resolve ,reject)=>{
      //查找playload的iid是不是跟cartlist里有一样的商品iid，有的话oldproduct不为空
      let oldProduct = context.state.cartList.find(item => item.iid === playLoad.iid)
      if (oldProduct) {
        context.commit("addCounter", oldProduct)
        resolve("商品数量加一")
      } else {
        playLoad.count = 1
        context.commit("addpush", playLoad)
        resolve("增加新的商品")
      }
    })

  }
}
