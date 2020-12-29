<template>
  <view class="page-container">
    <view class="button-container" @tap="onLogOut"> 退出登录 </view>
  </view>
</template>

<script>
export default {
  methods: {
    onLogOut() {},
  },
};
</script>

<style scoped>
.button-container {
  text-align: center;
  background-color: #2c7cf6;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
  height: 88rpx;
  line-height: 88rpx;
}
</style>