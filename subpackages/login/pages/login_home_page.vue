<template>
  <view class="page-container">
    <login-advertisement />
    <view style="height: 40rpx"> </view>
    <login-with-code-form v-if="loginWithCode" />
    <login-with-password-form v-else />
    <view class="method-switcher" @tap="switchMethod">
      {{ loginWithCode ? "账号密码登录" : "验证码登录" }}
    </view>
    <checkbox-group @change="onAgreedChange" class="covenant-container">
      <checkbox class="checkbox" :checked="agreed" color="#63bc52" />
      <view class="covenant-content-container">
        <text class="covenant">我已阅读并同意</text>
        <text class="covenant green" @click="goRouter('service')"
          >《用户服务协议》</text
        >
        <text class="covenant">、</text>
        <text class="covenant green" @click="goRouter('agreement')"
          >《用户授权协议》</text
        >
        <text class="covenant">和</text>
        <text class="covenant green" @click="goRouter('privacy')"
          >《隐私政策》</text
        >
        <text class="covenant">。</text>
      </view>
    </checkbox-group>
  </view>
</template>

<script>
import LoginAdvertisement from "@/subpackages/login/components/login_advertisement";
import LoginWithCodeForm from "@//subpackages/login/components/login_with_code_form";
import LoginWithPasswordForm from "@/subpackages/login/components/login_with_password_form";

export default {
  components: {
    LoginAdvertisement,
    LoginWithCodeForm,
    LoginWithPasswordForm,
  },
  data() {
    return {
      loginWithCode: true,
      agreed: true,
    };
  },
  methods: {
    switchMethod() {
      this.loginWithCode = !this.loginWithCode;
    },
    onAgreedChange() {
      this.agreed = !this.agreed;
    },
  },
};
</script>

<style scoped>
.page-container {
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.method-switcher {
  text-align: center;
  color: #888888;
  margin-top: 24rpx;
}
.covenant-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 24rpx auto;
}
.checkbox {
  transform: scale(0.7);
}
.covenant-content-container {
  width: 80%;
  height: 100rpx;
}
.covenant {
  font-size: 26rpx;
  line-height: 22rpx;
  color: #666666;
}
.covenant.green {
  color: #63bc52;
}
</style>