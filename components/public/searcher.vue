<template>
  <view class="custom-navigator-container" :class="{ fixed: fixed }">
    <view class="custom-navigator-top">
      <slot name="left"></slot>
      <view class="fake-search-bar-container">
        <input
          class="fake-search-bar"
          :focus="focus"
          type="text"
          confirm-type="search"
          @confirm="onSearch"
          @blur="onBlur"
          v-model="keywords"
          :placeholder="placeholder"
          placeholder-style="text-align: center;"
        />
      </view>
      <slot name="right"></slot>
    </view>
    <view class="custom-navigator-bot">
      <slot name="bot"></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入关键字进行搜索",
    },
  },
  data() {
    return {
      keywords: "",
      oldKeywords: "",
    };
  },
  methods: {
    onSearch() {
      this.oldKeywords = this.keywords;
      this.$emit("onSearch", this.keywords);
    },
    onBlur() {
      if (this.keywords !== this.oldKeywords) {
        this.oldKeywords = this.keywords;
        this.$emit("onSearch", this.keywords);
      }
    },
    onReset() {
      this.keywords = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-navigator-container {
  font-size: 26rpx;
  width: 100%;
  height: 44px;
}
.custom-navigator-container.fixed {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
}
.fake-search-bar-container {
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  height: 44px;
  flex: 1;
}
.fake-search-bar {
  width: 100%;
  border-radius: 60rpx;
  height: 60rpx;
  color: #888888;
  background-color: white;
  padding: 0 24rpx;
  font-size: 28rpx;
}
.custom-navigator-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f3f3;
  padding: 0 24rpx;
}
.custom-navigator-top.green {
  background-color: #63bc52;
}
</style>