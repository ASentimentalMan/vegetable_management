<template>
  <view class="sorter-container">
    <view
      class="sorter flex-horizontal flex-aic flex-jcsb"
      :class="{ fixed: fixed }"
    >
      <view class="leading-container flex-horizontal flex-aic">
        <block v-for="(item, index) in sorter" :key="index">
          <view
            class="leading-unit"
            :class="{ active: activeIndex === index }"
            @tap="onSorterTap(index)"
          >
            <view class="leading-label">
              {{ item.label }}
            </view>
            <view class="leading-arrow">
              <!-- {{ item.label }} -->
            </view>
          </view>
        </block>
      </view>
      <view class="action-container" v-if="action" @tap="onActionTap">
        {{ action.label }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    sorter: {
      type: Array,
      default: () => [],
    },
    action: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    onSorterTap(index) {
      if (index !== this.activeIndex) {
        this.activeIndex = index;
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 100,
        });
        this.$emit("onSorterTap", index);
      }
    },
    onActionTap() {},
  },
};
</script>

<style scoped>
.sorter-container {
  width: 100%;
  height: 44px;
}
.sorter {
  height: 44px;
  padding: 0 24rpx;
  background-color: #fff;
}
.sorter.fixed {
  width: 100%;
  position: fixed;
  left: 0;
  top: 44px;
  z-index: 1;
}
.leading-unit:not(:first-child) {
  margin-left: 24rpx;
}
.leading-unit.active {
  color: #2c7cf6;
}
.leading-unit,
.action-container {
  padding: 24rpx 0;
}
</style>