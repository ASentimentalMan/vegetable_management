<template>
  <view class="login-advertisement-container">
    <view class="advertisement-cover-container">
      <image
        class="advertisement-cover"
        src="https://mall.ncpgz.com/ftp/suberQcw/assets/images/app_icon.jpeg"
      />
    </view>
    <view class="advertisement-text">贵州农产品大数据平台</view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped>
.login-advertisement-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 320rpx;
  width: 100%;
  box-sizing: border-box;
}
.advertisement-cover-container {
  height: 60%;
}
.advertisement-cover {
  width: 200rpx;
  height: 200rpx;
}
.advertisement-text {
  font-size: 32rpx;
  color: #888888;
}
</style>