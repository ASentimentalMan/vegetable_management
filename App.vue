<script>
import { mapMutations } from "vuex";
export default {
  onLaunch: (e) => {
    console.log("App Launch");
    if (e.query.token) {
      uni.setStorageSync("token", e.query.token);
    }
  },
  onShow: () => {
    console.log("App Show");
  },
  onHide: () => {
    console.log("App Hide");
  },
  mounted() {
    uni.getStorage({
      key: "token",
      success: (res) => {
        if (res) {
          this.setToken(res.data);
        }
      },
      fail: (_) => {
        uni.reLaunch({
          url: "/subpackages/login/pages/login_home_page",
        });
      },
    });
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
