<template>
  <view class="indicator-container">
    <view v-if="status === 'loading'">
      <view class="loading-container">
        <view class="loading-indicator"></view>
      </view>
      <view class="loading-text" v-if="loadingText">{{ loadingText }}</view>
    </view>
    <view class="loading-no-more" v-if="status === 'end'">
      <view class="loading-line"></view>
      <view class="no-more-text">人家是有底线的</view>
      <view class="loading-line"></view>
    </view>
    <view class="loading-empty-container" v-if="status === 'empty'">
      <view class="loading-empty-content">
        <image
          class="loading-empty-image"
          src="https://dev.ncpgz.com/assets/management/images/public_empty_list.png"
        />
        <view class="empty-text" v-if="emptyText">{{ emptyText }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: null,
    },
    emptyText: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "loading",
    },
  },
};
</script>

<style scoped>
.indicator-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 24rpx 0;
}
.loading-container {
  border-radius: 20upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 动画样式 */
.loading-indicator {
  border: 10upx solid rgba(0, 0, 0, 0.01);
  border-radius: 50%;
  border-top: 10upx solid #63bc52;
  border-right: 10upx solid #63bc52;
  border-bottom: 10upx solid #63bc52;
  width: 60upx;
  height: 60upx;
  -webkit-animation: spin 1.4s linear infinite;
  animation: spin 1.4s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-no-more {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-line {
  width: 100rpx;
  height: 2rpx;
  background-color: #cccccc;
}
.loading-empty-container {
  position: relative;
}
.loading-empty-content {
  position: absolute;
  left: 50%;
  top: 20%;
  margin-left: -200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading-empty-image {
  width: 400rpx;
  height: 400rpx;
  margin-bottom: 24rpx;
}
.loading-text,
.no-more-text,
.empty-text {
  color: #888888;
}
.no-more-text {
  margin: 0 24rpx;
}
</style>