<template>
  <view class="page-container">
    <scroll-view scroll-y="true" class="rigth-window-container">
      <view class="rigth-window-item-content">
        <block v-for="(item, index) in children" :key="index">
          <view class="rigth-window-item" @click="goCate(item)">
            {{ item.label }}
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectMode: false,
      key: null,
      index: null,
      backpage: null,
      children: [],
    };
  },
  onLoad(e) {
    if (e.mode) {
      this.selectMode = true;
      this.key = e.key;
      this.index = e.index;
      this.backpage = e.backpage;
    }
    this.children = JSON.parse(e.children);
  },
  methods: {
    goCate(item) {
      if (this.selectMode) {
        let pages = getCurrentPages();
        for (let i = 0; i < pages.length; i++) {
          if (pages[i]["route"].indexOf(this.backpage) !== -1) {
            let prevPage = pages[i];
            prevPage.$vm[this.key][this.index]["id"] = item.id;
            prevPage.$vm[this.key][this.index]["label"] = item.label;
            uni.navigateBack({ delta: pages.length - i - 1 });
            break;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 24rpx;
}
.rigth-window-item-content {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 24rpx;
}
.rigth-window-item {
  padding: 6rpx 12rpx;
  border: 1px #bbbbbb solid;
  border-radius: 12rpx;
  margin: 12rpx 0 0 12rpx;
}
</style>