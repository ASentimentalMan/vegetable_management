<script>
import { mapMutations } from "vuex";
export default {
  onLaunch: (e) => {
    console.log("App Launch");
    // const version = 0;
    // const edition = uni.getStorageSync("version");
    // if (edition && edition < version) {
    //   location.reload();
    // }
    // uni.setStorageSync("version", version);
    try {
      uni.removeStorageSync("version");
    } catch (e) {}
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
