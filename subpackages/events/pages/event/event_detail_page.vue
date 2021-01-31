<template>
  <view class="page-container">
    <view class="options-container">
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goMeeting">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_meeting.png"
            />
          </view>
          <view class="options-text">
            会议
            <text class="options-count">
              ({{ event.businessCount.meeting }})
            </text>
          </view>

          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goContract">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_contract.png"
            />
          </view>
          <view class="options-text">
            合同
            <text class="options-count">
              ({{ event.businessCount.contract }})
            </text>
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
    </view>
    <view class="options-container">
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goOrder">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_order.png"
            />
          </view>
          <view class="options-text">
            供应商采购单
            <text class="options-count">
              ({{ event.businessCount.procure }})
            </text>
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goSale">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_sale.png"
            />
          </view>
          <view class="options-text">
            销售单
            <text class="options-count">
              ({{ event.businessCount.sales }})
            </text>
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
    </view>
    <view class="options-container">
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goExpress">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_express.png"
            />
          </view>
          <view class="options-text">
            物流
            <text class="options-count">
              ({{ event.businessCount.logistics }})
            </text>
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goReceipt">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_receipt.png"
            />
          </view>
          <view class="options-text">
            发票
            <text class="options-count">
              ({{ event.businessCount.invoice }})
            </text>
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
    </view>
    <view class="options-container">
      <view class="options-item-container">
        <view
          class="options-item flex-horizontal flex-aic"
          @tap="goReceivePayment"
        >
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_receive_payment.png"
            />
          </view>
          <view class="options-text">
            收款
            <text class="options-count">
              ({{ event.businessCount.receive }})
            </text>
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goPayment">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_payment.png"
            />
          </view>
          <view class="options-text">
            付款
            <text class="options-count">
              ({{ event.businessCount.payment }})
            </text>
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
    </view>
    <view class="options-container">
      <view class="options-item-container">
        <view class="options-item flex-horizontal flex-aic" @tap="goStatistic">
          <view class="options-icon-container">
            <image
              class="options-icon"
              src="https://dev.ncpgz.com/assets/management/icons/business_statistic.png"
            />
          </view>
          <view class="options-text">
            统计
            <!-- <text class="options-count">
              ({{ event.businessCount.receive }})
            </text> -->
          </view>
          <view class="iconfont icon-down-tongyong-copy" style="color: #cccccc">
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getEventCountApi } from "@/apis/event_apis";
export default {
  data() {
    return {
      eventId: null,
      event: {},
      onNetworking: false,
      needRefresh: false,
    };
  },
  onLoad(e) {
    if (e.item) {
      const item = JSON.parse(e.item);
      this.eventId = item.id;
      this.event = item;
    }
    if (e.businessName) {
      uni.setNavigationBarTitle({
        title: e.businessName,
      });
    }
    this.fetch();
  },
  onShow() {
    if (this.needRefresh) {
      this.onRefreshPreviousPage();
      this.fetch();
      this.needRefresh = false;
    }
  },
  onPullDownRefresh() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (!this.onNetworking) {
        const payload = {
          businessId: this.eventId,
        };
        this.onNetworking = true;
        const response = await getEventCountApi(payload);
        this.onNetworking = false;
        if (response) {
          this.event.businessCount = response.data;
        }
        uni.stopPullDownRefresh();
      }
    },
    goContract() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/contract_list_page?eventId=" +
          this.eventId,
      });
    },
    goReceipt() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/receipt/receipt_list_page?eventId=" +
          this.eventId,
      });
    },
    goExpress() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/express/express_list_page?eventId=" +
          this.eventId,
      });
    },
    goMeeting() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/meeting/meeting_list_page?eventId=" +
          this.eventId,
      });
    },
    goOrder() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/order/order_list_page?eventId=" +
          this.eventId,
      });
    },
    goSale() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/sale/sale_list_page?eventId=" +
          this.eventId,
      });
    },
    goReceivePayment() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/receive_payment/receive_payment_list_page?eventId=" +
          this.eventId,
      });
    },
    goPayment() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/payment/payment_list_page?eventId=" +
          this.eventId,
      });
    },
    goStatistic() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/statistic/statistic_page?eventId=" +
          this.eventId,
      });
    },
    onRefreshPreviousPage() {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.$vm.needRefresh = true;
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
.options-count {
  color: grey;
  font-size: 28rpx;
  margin-left: 12rpx;
}
</style>