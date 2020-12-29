<script>
export default {
  onLaunch: (e) => {
    console.log("App Launch");
    console.log(e.query);
    if (e.query.token) {
      console.log(e.query.token)
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
};
</script>

<style>
/*每个页面公共css */
@import "@/common/uni.css";
@import "@/common/style.css";
@import "@/static/iconfont/iconfont.css";
</style>
