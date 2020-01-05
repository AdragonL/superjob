export default {
  addCounter(state, playLoad) {
    playLoad.count++
  },
  addpush(state, playLoad) {
    playLoad.checked=true
    state.cartList.push(playLoad)

  }
}
