<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="list-container flex-vertical flex-jcsb">
        <block v-for="(item, index) in list" :key="index">
          <view class="list-item flex-horizontal flex-aic" @tap="onEvent(item)">
            <view class="item-cover">
              <image
                class="cover"
                src="https://dev.ncpgz.com/assets/management/icons/business_contract.png"
              />
            </view>
            <view class="flex-vertical">
              <view class="item-label">
                {{ item.contractName }}
              </view>
              <view class="item-text">
                {{ item.createTime }}
              </view>
            </view>
          </view>
        </block>
      </view>
      <view style="height: 200rpx" v-if="status === 'empty'"> </view>
      <indicator :status="status" emptyText="暂无合同" />
    </view>
    <view class="unscrollable" v-if="!selectMode">
      <view class="bottom-button-container">
        <view class="button-container" @tap="onCreate">
          <view class="bottom-button"> 新增合同 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Indicator from "@/components/public/indicator.vue";
import { getContractListApi } from "@/apis/event_apis";
import { objectToQuery } from "@/utils/object_utils";
export default {
  components: {
    Indicator,
  },
  data() {
    return {
      eventId: "",
      list: [],
      payload: {},
      page: 1,
      pageSize: 20,
      hasMore: true,
      onNetworking: false,
      onRefreshing: false,
      needRefresh: false,
      selectMode: false,
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
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    if (e.mode && e.mode === "select") {
      this.selectMode = true;
    }
    console.log(this.eventId);
    this.fetch();
  },
  onShow() {
    if (this.needRefresh) {
      this.onRefresh();
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
      if (this.hasMore && !this.onLoading) {
        const payload = {
          current: this.page,
          size: this.pageSize,
        };
        this.onNetworking = true;
        const response = await getContractListApi(payload);
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
    onEvent(item) {
      if (this.selectMode) {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.$vm.relateContract = item;
        prevPage.$vm.relateContractString = item.contractName;
        console.log(item);
        uni.navigateBack();
      } else {
        uni.navigateTo({
          url:
            "/subpackages/events/pages/contract/contract_detail_page" +
            objectToQuery(item),
        });
      }
    },
    onCreate() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/create_contract_page?eventId=" +
          this.eventId,
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
  width: 42rpx;
  height: 42rpx;
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
</style>