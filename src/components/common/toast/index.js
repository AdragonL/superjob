import Toast from "./Toast";
const obj ={}


obj.install =function (Vue) {
  //创建组件构造器
  const toastContrustor =Vue.extend(Toast)


  //new一个构造器
  const toast=new toastContrustor()

  //手动挂载
  toast.$mount(document.createElement("div"))

  //toast.$el就是对应的div
  document.body.appendChild(toast.$el)





  Vue.prototype.$toast = toast


}

export default obj
