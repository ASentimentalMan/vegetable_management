const request_java = (options) => {
  if (process.env.NODE_ENV === 'development') {
    options.url = "https://test.ncpgz.com/api/business" + options.url
  } else {
    options.url = "https://vegetable.ncpgz.com/api/business" + options.url
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
      const token = uni.getStorageSync('token');
      if (token) {
        payload.header["token_type"] = "user"
        payload.header["Authorization"] = token
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
        if (responses[1].data.code === 200) {
          resolve(responses[1].data);
        } else if (responses[1].data.code === 601) {
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
          if (responses[1].data.data) {
            uni.showToast({
              title: responses[1].data.data,
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

export default request_java;