import {debounce} from "./utils";
import BackTop from "../components/common/backtop/BackTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImgListListener: null,
      newRefresh: null
    }
  },

  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListListener = () => {
      this.newRefresh()
    }

    this.$bus.$on("itemimageload", this.itemImgListListener)

  }
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backclick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    listenShowBackTop(position) {
      this.isShow = (-position.y) > 800
    }
  }

}
