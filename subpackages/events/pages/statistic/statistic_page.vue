<template>
  <view class="page-container">
    <!-- <period-day-picker
      @onStartTimeSet="onStartTimeSet"
      @onEndTimeSet="onEndTimeSet"
    /> -->
    <view class="scrollable">
      <view class="flex-horizontal">
        <view class="contract-container flex-horizontal flex-aic flex-jcsb">
          <view class="flex-vertical">
            <view class="label"> 采购合同 </view>
            <view class="count">
              {{ orderContractCount ? orderContractCount + "份" : "统计中" }}
            </view>
          </view>
          <image
            class="contract-icon"
            src="https://dev.ncpgz.com/assets/management/icons/business_contract_order.png"
          />
        </view>
        <view class="contract-container flex-horizontal flex-aic flex-jcsb">
          <view class="flex-vertical">
            <view class="label"> 销售合同 </view>
            <view class="count">
              {{ saleContractCount ? saleContractCount + "份" : "统计中" }}
            </view>
          </view>
          <image
            class="contract-icon"
            src="https://dev.ncpgz.com/assets/management/icons/business_contract_sale.png"
          />
        </view>
      </view>
      <view
        class="contract-container flex-vertical"
        style="margin-top: 24rpx; padding-top: 96rpx; padding-bottom: 48rpx"
      >
        <view class="brand"> 订单总览 </view>
        <view class="flex-horizontal flex-aic">
          <image
            class="contract-icon"
            style="margin-right: 36rpx"
            src="https://dev.ncpgz.com/assets/management/icons/business_order_status.png"
          />
          <view class="flex-vertical">
            <view class="label"> 采购订单情况 </view>
            <view class="flex-horizontal" style="margin-top: 6rpx">
              <view class="order-container" style="background-color: #6da2e5">
                订单数：{{ orderCount ? orderCount + "笔" : "统计中" }}
              </view>
              <view class="order-container" style="background-color: #f8bd4b">
                总金额：{{ orderPrice ? orderPrice + "万元" : "统计中" }}
              </view>
            </view>
          </view>
        </view>
        <view class="flex-horizontal flex-aic" style="margin-top: 60rpx">
          <image
            class="contract-icon"
            style="margin-right: 36rpx"
            src="https://dev.ncpgz.com/assets/management/icons/business_sale_status.png"
          />
          <view class="flex-vertical">
            <view class="label"> 采购订单情况 </view>
            <view class="flex-horizontal" style="margin-top: 6rpx">
              <view class="order-container" style="background-color: #6da2e5">
                订单数：{{ saleCount ? saleCount + "笔" : "统计中" }}
              </view>
              <view class="order-container" style="background-color: #f8bd4b">
                总金额：{{ salePrice ? salePrice + "万元" : "统计中" }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- <view class="tab-container flex-horizontal flex-jcc">
        <view
          class="tab-label"
          :class="{ active: activeIndex === 0 }"
          @tap="onActiveIndexChange(0)"
        >
          总付款
        </view>
        <view
          class="tab-label"
          :class="{ active: activeIndex === 1 }"
          @tap="onActiveIndexChange(1)"
        >
          总收款
        </view>
      </view> -->
      <view class="contract-container flex-vertical" style="margin-top: 24rpx">
        <view class="title" style="margin-bottom: 24rpx">
          资金 总付款/总收款
        </view>
        <view class="flex-horizontal">
          <view class="flex-vertical" style="margin-right: 60rpx">
            <view style="color: #1664f5"> 应付账款 </view>
            <view class=""> 待统计 </view>
          </view>
          <view class="flex-vertical">
            <view style="color: #6ec1f5"> 应付账款 </view>
            <view class=""> 待统计 </view>
          </view>
        </view>
        <view class="flex-horizontal" style="margin-top: 24rpx">
          <view class="flex-vertical" style="margin-right: 60rpx">
            <view style="color: #ee8919"> 应付账款 </view>
            <view class=""> 待统计 </view>
          </view>
          <view class="flex-vertical">
            <view style="color: #f4bc7d"> 应付账款 </view>
            <view class=""> 待统计 </view>
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
      eventId: "",
      payload: {},
      activeIndex: 0,
      orderContractCount: "",
      saleContractCount: "",
      orderCount: "",
      orderPrice: "",
      saleCount: "",
      salePrice: "",
      onNetworking: false,
      onRefreshing: false,
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
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
          this.orderContractCount = response.data.numberOfPurchaseContracts;
          this.saleContractCount = response.data.numberOfSalesContracts;
          this.orderCount = response.data.numberOfPurchaseOrders;
          this.orderPrice = response.data.totalPurchaseAmount;
          this.saleCount = response.data.numberOfSalesOrders;
          this.salePrice = response.data.totalSalesAmount;
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
    },
    onStartTimeSet(e) {},
    onEndTimeSet(e) {},
    onActiveIndexChange(index) {
      this.activeIndex = index;
    },
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