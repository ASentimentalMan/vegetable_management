<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="contract-container flex-vertical">
        <view class="title" style="margin-bottom: 24rpx">
          资金 总付款/总收款
        </view>
        <view class="flex-horizontal">
          <view class="flex-vertical" style="margin-right: 60rpx">
            <view style="color: #1664f5"> 应付账款 </view>
            <view class="">
              {{ shouldPay === null ? "统计中" : shouldPay + "万元" }}
            </view>
          </view>
          <view class="flex-vertical">
            <view style="color: #6ec1f5"> 应收账款 </view>
            <view class="">
              {{ shouldReceive === null ? "统计中" : shouldReceive + "万元" }}
            </view>
          </view>
        </view>
        <view class="flex-horizontal" style="margin-top: 24rpx">
          <view class="flex-vertical" style="margin-right: 60rpx">
            <view style="color: #ee8919"> 未付账款 </view>
            <view class="">
              {{ notPay === null ? "统计中" : notPay + "万元" }}
            </view>
          </view>
          <view class="flex-vertical">
            <view style="color: #f4bc7d"> 未收账款 </view>
            <view class="">
              {{ notReceive === null ? "统计中" : notReceive + "万元" }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PeriodDayPicker from "@/subpackages/events/components/period_day_picker";
import { getStatisticApi } from "@/apis/event_apis";
export default {
  components: {
    PeriodDayPicker,
  },
  data() {
    return {
      payload: {},
      shouldPay: null,
      shouldReceive: null,
      notPay: null,
      notReceive: null,
      onNetworking: false,
      onRefreshing: false,
    };
  },
  onLoad() {
    this.fetch();
  },
  onPullDownRefresh() {
    this.onRefresh();
  },
  methods: {
    async fetch() {
      if (!this.onNetworking) {
        this.onNetworking = true;
        const response = await getStatisticApi(this.payload);
        this.onNetworking = false;
        if (response) {
          this.shouldPay = response.data.accountsPayable;
          this.shouldReceive = response.data.accountsReceivable;
          this.notPay = response.data.unpaidAccounts;
          this.notReceive = response.data.uncollectedAccounts;
        }
      }
      if (this.onRefreshing) {
        this.onRefreshing = false;
        uni.stopPullDownRefresh();
      }
    },
    onRefresh() {
      this.onRefreshing = true;
      this.fetch();
    }
  },
};
</script>

<style scoped>
.scrollable {
  margin: 24rpx;
}
.contract-container {
  flex: 1;
  background-color: #fff;
  box-shadow: -2rpx 0 24rpx 0 rgba(215, 215, 215, 0.28);
  border-radius: 15rpx;
  padding: 24rpx 48rpx;
  position: relative;
}
.contract-container:first-child {
  margin-right: 24rpx;
}
.contract-icon {
  width: 70rpx;
  height: 70rpx;
}
.label {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
  line-height: 1.5;
}
.count {
  font-size: 28rpx;
  font-weight: bold;
  color: #6da2e5;
  line-height: 1.5;
}
.order-container {
  color: white;
  font-size: 22rpx;
  font-weight: bold;
  line-height: 1.4;
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
}
.order-container:first-child {
  margin-right: 12rpx;
}
.brand {
  background: url("https://dev.ncpgz.com/assets/management/icons/business_status_brand-bg.png")
    no-repeat center center;
  background-size: contain;
  width: 260rpx;
  text-align: center;
  color: white;
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -130rpx;
  font-size: 34rpx;
}
.tab-container {
  margin: 24rpx;
  align-items: baseline;
}
.tab-label {
  font-size: 32rpx;
  margin: 0 12rpx;
}
.tab-label.active {
  font-size: 36rpx;
  color: #63bc52;
}
.title {
  font-size: 34rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
}
</style>