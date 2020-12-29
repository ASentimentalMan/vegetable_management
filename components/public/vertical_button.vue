<template>
  <view
    class="vertical-button-container"
    :style="'width:' + buttonWidth + 'rpx;margin-top:' + marginTop + 'rpx;'"
    @tap="onClick"
  >
    <image
      class="vertical-button-icon"
      :src="url"
      :style="'height:' + iconWidth + 'rpx;width:' + iconWidth + 'rpx;'"
    />
    <view
      class="vertical-button-title"
      :style="{ color: active ? labelActiveColor : labelColor }"
      >{{ label }}</view
    >
  </view>
</template>

<script>
export default {
  props: {
    iconWidth: {
      type: Number,
      default: 100,
    },
    buttonWidth: {
      type: Number,
      default: 100,
    },
    marginTop: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      default:
        "https://dev.ncpgz.com/assets/icons/home_twelve_tea.png",
    },
    label: {
      type: String,
      default: "未定义",
    },
    labelColor: {
      type: String,
      default: "#333333",
    },
    labelActiveColor: {
      type: String,
      default: "red",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style scoped>
.vertical-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.vertical-button-title {
  font-size: 24rpx;
  margin-top: 10rpx;
}
</style>