<script>
import { mapMutations } from "vuex";
export default {
  onLaunch: (e) => {
    console.log("App Launch");
    if (e.query.token) {
      uni.setStorageSync("token", e.query.token);
    } else {
      uni.getStorage({
        key: "userinfo",
        success: (res) => {
          if (res) {
            // this.$store.commit("user/setInfo", res.data);
          }
        },
        fail: (_) => {
          // uni.reLaunch({
          //   url: "/subpackages/login/login_home_page",
          // });
        },
      });
    }
  },
  onShow: () => {
    console.log("App Show");
  },
  onHide: () => {
    console.log("App Hide");
  },
  mounted() {
    const token = uni.getStorageSync("token");
    this.setToken(token);
  },
  beforeDestroy() {
    uni.removeStorageSync("token");
  },
  methods: {
    ...mapMutations("user", ["setToken"]),
  },
};
</script>

<style>
/*每个页面公共css */
@import "@/common/uni.css";
@import "@/common/style.css";
@import "@/static/iconfont/iconfont.css";
</style>
