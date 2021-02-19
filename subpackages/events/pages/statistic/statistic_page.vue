<template>
  <view class="page-container">
    <view style="height: 4px"> </view>
    <period-day-picker
      ref="period"
      @onStartTimeSet="onStartTimeSet"
      @onEndTimeSet="onEndTimeSet"
    />
    <sorter :sorter="sorter" @onSorterTap="onSorterTap" />
    <view class="scrollable">
      <view class="flex-horizontal">
        <view
          class="contract-container flex-horizontal flex-aic flex-jcsb"
          @tap="goContract('procure')"
        >
          <view class="flex-vertical">
            <view class="label"> 采购合同 </view>
            <view class="count">
              {{
                orderContractCount === null
                  ? "统计中"
                  : orderContractCount + "份"
              }}
            </view>
          </view>
          <image
            class="contract-icon"
            src="https://dev.ncpgz.com/assets/management/icons/business_contract_order.png"
          />
        </view>
        <view
          class="contract-container flex-horizontal flex-aic flex-jcsb"
          @tap="goContract('sale')"
        >
          <view class="flex-vertical">
            <view class="label"> 销售合同 </view>
            <view class="count">
              {{
                saleContractCount === null ? "统计中" : saleContractCount + "份"
              }}
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
        <view class="flex-horizontal flex-aic" @tap="goOrder">
          <image
            class="contract-icon"
            style="margin-right: 36rpx"
            src="https://dev.ncpgz.com/assets/management/icons/business_order_status.png"
          />
          <view class="flex-vertical">
            <view class="label"> 采购订单情况 </view>
            <view class="flex-horizontal" style="margin-top: 6rpx">
              <view class="order-container" style="background-color: #6da2e5">
                订单数：
                {{ orderCount === null ? "统计中" : orderCount + "笔" }}
              </view>
              <view class="order-container" style="background-color: #f8bd4b">
                总金额：
                {{ orderPrice === null ? "统计中" : orderPrice + "万元" }}
              </view>
            </view>
          </view>
        </view>
        <view
          class="flex-horizontal flex-aic"
          style="margin-top: 60rpx"
          @tap="goSale"
        >
          <image
            class="contract-icon"
            style="margin-right: 36rpx"
            src="https://dev.ncpgz.com/assets/management/icons/business_sale_status.png"
          />
          <view class="flex-vertical">
            <view class="label"> 销售订单情况 </view>
            <view class="flex-horizontal" style="margin-top: 6rpx">
              <view class="order-container" style="background-color: #6da2e5">
                订单数：
                {{ saleCount === null ? "统计中" : saleCount + "笔" }}
              </view>
              <view class="order-container" style="background-color: #f8bd4b">
                总金额：
                {{ salePrice === null ? "统计中" : salePrice + "万元" }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PeriodDayPicker from "@/subpackages/events/components/period_day_picker";
import Sorter from "@/components/public/sorter";
import { getStatisticApi } from "@/apis/event_apis";
export default {
  components: {
    PeriodDayPicker,
    Sorter,
  },
  data() {
    return {
      sorter: [
        {
          label: "本日",
        },
        {
          label: "本周",
        },
        {
          label: "本月",
        },
        {
          label: "本年",
        },
      ],
      payload: {},
      orderContractCount: null,
      saleContractCount: null,
      orderCount: null,
      orderPrice: null,
      saleCount: null,
      salePrice: null,
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
    onStartTimeSet(e) {
      this.payload["startDate"] = e;
      this.onRefresh();
    },
    onEndTimeSet(e) {
      this.payload["endDate"] = e;
      this.onRefresh();
    },
    onSorterTap(index) {
      const now = new Date();
      let time;
      switch (index) {
        case 0:
          time = now.getTime() - 1000 * 60 * 60 * 24 * 1;
          break;
        case 1:
          time = now.getTime() - 1000 * 60 * 60 * 24 * 7;
          break;
        case 2:
          time = now.getTime() - 1000 * 60 * 60 * 24 * 30;
          break;
        case 3:
          time = now.getTime() - 1000 * 60 * 60 * 24 * 365;
          break;
      }
      this.$refs.period.setStartTime(time);
      const tim = new Date(time);
      this.payload["startDate"] =
        tim.getFullYear() +
        "-" +
        (tim.getMonth() + 1 > 9
          ? tim.getMonth() + 1
          : "0" + (tim.getMonth() + 1)) +
        "-" +
        (tim.getDate() > 9 ? tim.getDate() : "0" + tim.getDate());
      this.onRefresh();
    },
    goContract(type) {
      let url =
        "/subpackages/events/pages/statistic/statistic_contract_list_page?type=" +
        type;
      if (this.payload["startDate"]) {
        url += "&startTime=" + this.payload["startDate"];
      }
      if (this.payload["endDate"]) {
        url += "&endTime=" + this.payload["endDate"];
      }
      uni.navigateTo({ url });
    },
    goOrder() {
      let url =
        "/subpackages/events/pages/statistic/statistic_order_list_page?type=";
      if (this.payload["startDate"]) {
        url += "&startTime=" + this.payload["startDate"];
      }
      if (this.payload["endDate"]) {
        url += "&endTime=" + this.payload["endDate"];
      }
      uni.navigateTo({ url });
    },
    goSale() {
      let url =
        "/subpackages/events/pages/statistic/statistic_sale_list_page?type=";
      if (this.payload["startDate"]) {
        url += "&startTime=" + this.payload["startDate"];
      }
      if (this.payload["endDate"]) {
        url += "&endTime=" + this.payload["endDate"];
      }
      uni.navigateTo({ url });
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