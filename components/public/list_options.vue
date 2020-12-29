<template>
  <view class="components-container options-container">
    <block v-for="(item, index) in list" :key="index">
      <view class="options-item-container" @tap="onTap(item)">
        <view class="options-item flex-horizontal flex-aic">
          <view class="options-icon-container" v-if="item.leading">
            <image class="options-icon" :src="item.leading" />
          </view>
          <view class="options-text"> {{ item.label }} </view>
          <view
            class="iconfont icon-down-tongyong-copy"
            style="color: #cccccc"
          ></view>
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
      default: () => [],
    },
  },
  methods: {
    onTap(item) {
      item.onTap();
    },
  },
};
</script>

<style scoped>
.options-container {
  margin-top: 24rpx;
}
.options-item-container {
  padding: 0 24rpx;
  background-color: #fff;
}
.options-item {
  padding: 24rpx 0;
}
.options-item-container:not(:last-child) .options-item {
  border-bottom: 1px solid #edeeef;
}
.options-icon-container {
  margin-right: 24rpx;
}
.options-icon {
  width: 42rpx;
  height: 42rpx;
}
.options-text {
  flex: 1;
}
</style>