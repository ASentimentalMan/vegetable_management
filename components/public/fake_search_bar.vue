<template>
  <view class="fake-search-bar-container">
    <view class="content-container">
      <view class="component-left">
        <view style="width: 32rpx"> </view>
        <image
          class="search-icon"
          src="https://dev.ncpgz.com/assets/icons/home_icon_search.png"
        />
        <view style="width: 20rpx"> </view>
        <view class="text">{{ text }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "贵州农产品/基地",
    },
  },
};
</script>

<style scoped>
.fake-search-bar-container {
  width: 100%;
}
.content-container {
  height: 32px;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ecedee;
  position: relative;
  z-index: 1;
}
.component-left {
  display: flex;
  align-items: center;
}
.search-icon {
  width: 30rpx;
  height: 30rpx;
}
.text {
  color: #89909d;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 28rpx;
  margin-top: 2px;
}
</style>