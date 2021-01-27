<template>
  <view class="login-form-container">
    <view class="form-item-container bb" :class="{ active: activeIndex === 0 }">
      <input
        class="form-input"
        :maxlength="11"
        confirm-type="next"
        type="text"
        v-model="account"
        placeholder="请输入手机号码 / 账号"
        @focus="onFocus(0)"
        @blur="onFocus(-1)"
      />
    </view>
    <view class="form-item-container">
      <input
        class="form-input bb"
        :class="{ active: activeIndex === 1 }"
        confirm-type="done"
        type="text"
        v-model="password"
        :password="true"
        placeholder="请输入密码"
        @focus="onFocus(1)"
        @blur="onFocus(-1)"
      />
    </view>
    <view class="login-buttion" @tap="logIn"> 登录 </view>
  </view>
</template>

<script>
import { logInWithPasswordApi } from "@/apis/user_apis";
export default {
  data() {
    return {
      activeIndex: -1,
      account: "",
      password: "",
    };
  },
  methods: {
    onFocus(index) {
      this.activeIndex = index;
    },
    async logIn() {
      const payload = { account: this.account, password: this.password };
      const response = await logInWithPasswordApi(payload);
      if (response) {
        uni.setStorageSync("token", response.result.token);
        uni.reLaunch({
          url: "/pages/events/events_home_page",
        });
      }
    },
  },
};
</script>

<style scoped>
.login-form-container {
  margin: 24rpx 48rpx;
}
.form-item-container {
  margin: 24rpx 0;
  display: flex;
  align-items: center;
}
.roaming-text {
  font-size: 36rpx;
  font-weight: bold;
  margin-right: 24rpx;
}
.form-input {
  padding: 24rpx 0;
  flex: 1;
  font-size: 28rpx;
  line-height: 36rpx;
}
.code-container {
  border: 1px solid #63bc52;
  border-radius: 24rpx;
  padding: 12rpx 24rpx;
  color: #63bc52;
  margin-left: 24rpx;
}
.login-buttion {
  height: 88rpx;
  border-radius: 88rpx;
  background-color: #63bc52;
  text-align: center;
  line-height: 88rpx;
  color: white;
  font-size: 32rpx;
  margin-top: 96rpx;
}
</style>