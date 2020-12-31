<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="list-container flex-vertical flex-jcsb">
        <block v-for="(item, index) in list" :key="index">
          <view class="list-item flex-horizontal flex-aic" @tap="goEvent(item)">
            <view class="item-cover">
              <image
                class="cover"
                src="https://dev.ncpgz.com/assets/management/icons/business_contract.png"
              />
            </view>
            <view class="flex-vertical">
              <view class="item-label">
                {{ item.businessName }}
              </view>
              <view class="item-text">
                {{ item.createTime }}
              </view>
            </view>

            <view
              class="type-container"
              :class="{
                green: item.type === '物流',
                orange: item.type === '采购单',
              }"
              v-if="item.type"
            >
              {{ item.type }}
            </view>
          </view>
        </block>
      </view>
      <view style="height: 200rpx" v-if="status === 'empty'"> </view>
      <indicator :status="status" emptyText="暂无发票" />
    </view>
    <view class="unscrollable">
      <view class="bottom-button-container">
        <view class="button-container" @tap="onCreate">
          <view class="bottom-button"> 新增发票 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Indicator from "@/components/public/indicator.vue";
import { getReceiptListApi } from "@/apis/event_apis";
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
  methods: {
    async fetch() {
      const response = await getReceiptListApi();
      if (response) {
        this.list = response.data.records;
      }
    },
    goEvent(item) {
      uni.navigateTo({
        url: "/subpackages/event/event_detail_page" + objectToQuery(item),
      });
    },
    onCreate() {
      console.log("ok");
      uni.navigateTo({
        url: "/subpackages/event/receipt/create_receipt_page",
      });
    },
  },
};
</script>

<style scoped>
.list-container {
  margin-top: 24rpx;
}
.list-item {
  flex: 1;
  margin: 0 28rpx;
  padding: 28rpx 0;
  position: relative;
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
</style>