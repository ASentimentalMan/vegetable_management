const request_php = (options) => {
  if (process.env.NODE_ENV === 'development') {
    options.url = "https://old.ncpgz.com/api" + options.url
  } else {
    options.url = "https://old.ncpgz.com/api" + options.url
  }
  return new Promise((resolve, reject) => {
    let payload = {
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: Object.assign(options.header || {},
        { "content-type": options.contentType || "application/x-www-form-urlencoded" }
      ),
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
        if (responses[1].data.code === 10000) {
          resolve(responses[1].data);
        } else if (responses[1].data.code === 13001 || responses[1].data.code === 11001) {
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
          uni.showToast({
            title: responses[1].data.message,
            icon: "none",
          });
          resolve();
        }
      }
    }).catch(error => {
      reject(error);
    })
  })
};

export default request_php;