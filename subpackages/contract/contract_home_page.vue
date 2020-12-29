<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="unit-title"> 全部合同 </view>
      <view class="list-container flex-horizontal flex-jcsb flex-wrap">
        <block v-for="(item, index) in list" :key="index">
          <view class="list-item flex-vertical flex-aic flex-jcfe">
            <view class="item-cover">
              <image
                class="cover"
                src="https://dev.ncpgz.com/assets/management/icons/business_contract_icon.png"
              />
            </view>
            <view class="item-label">
              {{ item.label }}
            </view>
            <view class="item-text">
              {{ item.time }}
            </view>
            <view
              class="type-container"
              :class="{
                green: item.type === '物流',
                orange: item.type === '采购单',
              }"
            >
              {{ item.type }}
            </view>
          </view>
        </block>
      </view>
    </view>
    <view class="unscrollable">
      <view class="button-container" @tap="onCreate"> 新建合同 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "物流",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "采购单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "销售单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "物流",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "采购单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "销售单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "物流",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "采购单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "销售单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
      ],
    };
  },
  methods: {
    onCreate() {
      uni.navigateTo({
        url: "/subpackages/contract/create_contract_page",
      });
    },
  },
};
</script>

<style scoped>
.page-container {
  margin-top: 24rpx;
  background-color: #fff;
  padding: 24rpx 40rpx;
}
.unit-title {
  color: #333333;
  font-size: 32rpx;
  font-weight: bold;
}
.list-item {
  width: 321rpx;
  height: 271rpx;
  border: 2px solid #f3f3f3;
  border-radius: 10px;
  margin-top: 24rpx;
  padding: 32rpx;
  position: relative;
}
.list-item:nth-child(odd) {
  margin-right: 26rpx;
}
.item-cover {
  margin-bottom: 12rpx;
}
.cover {
  width: 108rpx;
  height: 87rpx;
}
.item-label {
  width: 100%;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  text-align: left;
  line-height: 2;
}
.item-text {
  width: 100%;
  font-size: 28rpx;
  font-weight: bold;
  color: #8b8c8b;
  text-align: left;
  line-height: 1;
}
.type-container {
  position: absolute;
  left: 36rpx;
  top: 0;
  font-size: 20rpx;
  font-weight: 500;
  color: #ffffff;
  padding: 2rpx 12rpx;
  background-color: #2c7cf6;
  text-align: center;
}
.type-container.green {
  background-color: #42ad4e;
}
.type-container.orange {
  background-color: #f09c2c;
}
.scrollable {
  margin-bottom: 160rpx;
}
.unscrollable {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 24rpx 40rpx;
  background-color: #fff;
}
.button-container {
  text-align: center;
  background-color: #2c7cf6;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
  height: 88rpx;
  line-height: 88rpx;
}
</style>