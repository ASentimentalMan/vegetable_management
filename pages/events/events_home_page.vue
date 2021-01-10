<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="list-container flex-vertical flex-jcsb">
        <block v-for="(item, index) in list" :key="index">
          <view class="list-item flex-horizontal" @tap="goEvent(item)">
            <view class="item-cover" style="margin-top: 12rpx">
              <image
                class="cover"
                src="https://dev.ncpgz.com/assets/management/icons/business_contract_icon.png"
              />
            </view>
            <view class="flex-vertical">
              <view class="item-label">
                {{ item.businessName }}
              </view>
              <view class="item-text">
                {{ item.createTime }}
              </view>
              <view class="flex-horizontal flex-aic flex-wrap">
                <view
                  class="item-stastic"
                  style="background-color: #edffe8; color: #23aa48"
                >
                  合同 {{ item.businessCount.contract }}
                </view>
                <view
                  class="item-stastic"
                  style="background-color: #eff8f8; color: #39a2ac"
                >
                  客户 {{ item.businessCount.customer }}
                </view>
                <view
                  class="item-stastic"
                  style="background-color: #fdf5e9; color: #ef9024"
                >
                  发票 {{ item.businessCount.invoice }}
                </view>
                <view
                  class="item-stastic"
                  style="background-color: #edffe8; color: #23aa48"
                >
                  物流 {{ item.businessCount.logistics }}
                </view>
                <view
                  class="item-stastic"
                  style="background-color: #eff8f8; color: #39a2ac"
                >
                  会议 {{ item.businessCount.meeting }}
                </view>
                <view
                  class="item-stastic"
                  style="background-color: #fdf5e9; color: #ef9024"
                >
                  采购 {{ item.businessCount.procure }}
                </view>
                <view
                  class="item-stastic"
                  style="background-color: #edffe8; color: #23aa48"
                >
                  销售 {{ item.businessCount.sales }}
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>
      <view style="height: 200rpx" v-if="status === 'empty'"> </view>
      <indicator :status="status" emptyText="暂无业务" />
    </view>
    <view class="unscrollable">
      <view class="bottom-button-container">
        <view class="button-container" @tap="onCreate">
          <view class="bottom-button"> 新增业务 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Indicator from "@/components/public/indicator.vue";
import { getEventListApi } from "@/apis/event_apis";
import { objectToQuery } from "@/utils/object_utils";
export default {
  components: {
    Indicator,
  },
  data() {
    return {
      list: [],
      payload: {},
      page: 1,
      pageSize: 20,
      hasMore: true,
      onNetworking: false,
      onRefreshing: false,
      needRefresh: false,
    };
  },
  computed: {
    status() {
      if (!this.onNetworking && !this.list.length) {
        return "empty";
      } else if (!this.onNetworking && !this.hasMore) {
        return "end";
      }
      return "loading";
    },
  },
  onLoad() {
    this.fetch();
  },
  onShow() {
    if (this.needRefresh) {
      this.onRefresh();
      this.needRefresh = false;
    }
  },
  onPullDownRefresh() {
    this.onRefresh();
  },
  onReachBottom() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (this.hasMore && !this.onNetworking) {
        const payload = {
          current: this.page,
          size: this.pageSize,
        };
        this.onNetworking = true;
        const response = await getEventListApi(payload);
        this.onNetworking = false;
        if (response) {
          if (this.onRefreshing || !this.list.length) {
            this.list = response.data.records;
          } else {
            this.list = this.list.concat(response.data.records);
          }
          if (this.page >= response.data.pages) {
            this.hasMore = false;
          }
          this.page++;
        }
        if (this.onRefreshing) {
          this.onRefreshing = false;
          uni.stopPullDownRefresh();
        }
      }
    },
    onRefresh() {
      this.page = 1;
      this.hasMore = true;
      this.onRefreshing = true;
      this.fetch();
    },
    goEvent(item) {
      console.log(item);
      uni.navigateTo({
        url:
          "/subpackages/events/pages/event/event_detail_page?item=" +
          JSON.stringify(item),
      });
    },
    onCreate() {
      uni.navigateTo({
        url: "/subpackages/events/pages/event/create_event_page",
      });
    },
  },
};
</script>

<style scoped>
.list-container {
  margin-top: 24rpx;
  background-color: #fff;
}
.list-item {
  flex: 1;
  margin: 0 28rpx;
  padding: 28rpx 0;
}
.list-item:not(:last-child) {
  border-bottom: 1px solid #f3f3f3;
}
.item-cover {
  margin-right: 24rpx;
}
.cover {
  width: 60rpx;
  height: 50rpx;
}
.item-label {
  width: 100%;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  text-align: left;
  line-height: 2;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.item-text {
  width: 100%;
  font-size: 28rpx;
  color: #8b8c8b;
  text-align: left;
  line-height: 1;
}
.item-stastic {
  padding: 2rpx 12rpx;
  margin-top: 12rpx;
  margin-right: 24rpx;
  border-radius: 12rpx;
  color: white;
}
</style>