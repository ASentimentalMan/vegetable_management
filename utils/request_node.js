import node_mac from "@/utils/node_mac"
import store from "@/store"

const request_node = async (options) => {
  if (!store.state.app.gim) {
    await store.dispatch("app/getGIM");
  }
  if (process.env.NODE_ENV === 'development') {
    // options.url = "http://192.168.0.106:9000/srv" + options.url
    options.url = "https://dev.ncpgz.com/api/srv" + options.url
  } else {
    options.url = "https://dev.ncpgz.com/api/srv" + options.url
  }
  return new Promise((resolve, reject) => {
    const header_mac = node_mac(store.state.app.gim);
    const header_option = Object.assign(options.header || {},
      { "content-type": options.contentType || "application/x-www-form-urlencoded" }
    )
    const header = Object.assign(header_option, header_mac)
    let payload = {
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: header,
    }
    if (options.token) {
      const userinfo = uni.getStorageSync('userinfo');
      if (userinfo) {
        payload.data.token = userinfo.token
      }
    }
    uni.request(payload).then(responses => {
      if (responses[0]) {
        uni.showToast({
          title: "网络超时",
          icon: "none",
        });
        resolve();
      } else {
        if (responses[1].data.status === 200) {
          resolve(responses[1].data.data);
        } else if (responses[1].data.status === 400) {
          // store.commit("user/logOut")
          uni.reLaunch({
            url: "/pages/home/home_page"
          })
          uni.showToast({
            title: "请重新登录",
            icon: "none",
          });
          resolve();
        } else {
          if (responses[1].data.message) {
            uni.showToast({
              title: responses[1].data.message,
              icon: "none",
            });
          } else if (responses[1].data.msg) {
            uni.showToast({
              title: responses[1].data.msg,
              icon: "none",
            });
          }
          resolve();
        }
      }
    }).catch(error => {
      reject(error);
    })
  })
};



export default request_node;