<template>
  <view
    class="image-container"
    :style="
      'width:' +
      width +
      'height:' +
      (height === '' ? width : height) +
      'border-radius' +
      borderRadius
    "
    >
    <image class="image" :src="url" :mode="mode" />
  </view>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%;",
    },
    height: {
      type: String,
      default: "",
    },
    borderRadius: {
      type: String,
      default: "0;",
    },
    mode: {
      type: String,
      default: "aspectFill",
    },
  },
};
</script>

<style scoped>
.image {
  width: 100%;
  height: 100%;
}
</style>