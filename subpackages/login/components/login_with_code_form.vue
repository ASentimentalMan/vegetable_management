<template>
  <view class="login-form-container">
    <view class="form-item-container bb" :class="{ active: activeIndex === 0 }">
      <view class="roaming-text"> +86 </view>
      <input
        class="form-input"
        :maxlength="11"
        confirm-type="next"
        type="number"
        v-model="account"
        placeholder="请输入手机号码"
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
        v-model="code"
        :password="true"
        placeholder="请输入验证码"
        @focus="onFocus(1)"
        @blur="onFocus(-1)"
      />
      <view class="code-container" @tap="getCode">
        {{ countdown === 60 ? "获取验证码" : countdown }}
      </view>
    </view>
    <view class="login-buttion" @tap="logIn"> 登录 </view>
  </view>
</template>

<script>
import { getCodeApi, logInWithCodeApi } from "@/apis/user_apis";
export default {
  data() {
    return {
      activeIndex: -1,
      account: "",
      code: "",
      countdown: 60,
      interval: null,
    };
  },
  methods: {
    onFocus(index) {
      this.activeIndex = index;
    },
    async getCode() {
      const payload = { account: this.account };
      const response = await getCodeApi(payload);
      if (response) {
        this.interval = setInterval(() => {
          if (this.countdown > 1) {
            this.countdown--;
          } else {
            clearInterval(this.interval);
            this.interval = null;
            this.countdown = 60;
          }
        }, 1000);
      }
    },
    async logIn() {
      const payload = { account: this.account, code: this.code };
      const response = await logInWithCodeApi(payload);
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
  width: 200rpx;
  text-align: center;
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