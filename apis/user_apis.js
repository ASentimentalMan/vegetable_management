import request_php from "@/utils/request_php"

// 获取登录验证码
export const getCodeApi = ({ account }) => {
  return request_php({
    url: "/connect/get_sms_captcha",
    method: "GET",
    data: { phone: account, type: 2 }
  })
}

// 验证码登录
export const logInWithCodeApi = ({ account, code }) => {
  return request_php({
    url: "/login/sms_login",
    method: "POST",
    data: { phone: account, sms_code: code, client_type: "wechat" }
  })
}

// 密码登录
export const logInWithPasswordApi = ({ account, password }) => {
  return request_php({
    url: "/login/index",
    method: "POST",
    data: { phone: account, password: password, client_type: "wechat" }
  })
}