<template>
  <view class="list-container flex-vertical flex-jcsb">
    <block v-for="(item, index) in list" :key="index">
      <view
        class="list-item flex-horizontal flex-aic flex-jcsb"
        @tap="onCateTap(item)"
      >
        <view class="">
          {{ item.text }}
        </view>
        <view class="">
          {{ item.bindName }}
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  methods: {
    onCateTap(item) {
      this.$emit("onCateTap", item);
    },
  },
};
</script>

<style scoped>
.list-item {
  padding: 24rpx;
  background-color: #fff;
}
</style>