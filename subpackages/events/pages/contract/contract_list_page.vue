<template>
  <view class="page-container">
    <view class="scrollable">
      <searcher @onSearch="onSearch" />
      <sorter v-if="!selectMode" :sorter="sorter" @onSorterTap="onSorterTap" />
      <view class="list-container flex-vertical flex-jcsb">
        <uni-swipe-action>
          <block v-for="(item, index) in list" :key="index">
            <uni-swipe-action-item
              :right-options="acitons"
              :disabled="key !== ''"
              @click="onUniSwipeAction($event, item, index)"
            >
              <view
                class="list-item-container"
                :class="{ active: item.active }"
              >
                <view
                  class="list-item flex-horizontal flex-aic"
                  @tap="onEvent(item)"
                >
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
              </view>
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
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
import Searcher from "@/components/public/searcher";
import Sorter from "@/components/public/sorter";
import Indicator from "@/components/public/indicator";
import { getContractListApi, deleteContractApi } from "@/apis/event_apis";
export default {
  components: {
    Searcher,
    Sorter,
    Indicator,
  },
  data() {
    return {
      eventId: "",
      sorter: [
        {
          label: "全部",
          key: "",
        },
        {
          label: "采购",
          key: "procure",
        },
        {
          label: "销售",
          key: "sale",
        },
      ],
      acitons: [
        {
          text: "修改",
          style: {
            backgroundColor: "#2c7cf6",
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
      list: [],
      payload: {},
      page: 1,
      pageSize: 20,
      hasMore: true,
      onNetworking: false,
      onRefreshing: false,
      needRefresh: false,
      selectMode: false,
      key: "",
      selectedIds: [],
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
      this.key = e.key;
    }
    if (e.type) {
      this.payload["contractType"] = e.type;
      if (e.type === "procure") {
        uni.setNavigationBarTitle({
          title: "选择采购合同",
        });
      } else if (e.type === "sale") {
        uni.setNavigationBarTitle({
          title: "选择销售合同",
        });
      }
    }
    if (e.selectedIds) {
      this.selectedIds = JSON.parse(e.selectedIds);
    }
    this.fetch();
  },
  onShow() {
    if (this.needRefresh) {
      this.onRefreshPreviousPage();
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
          businessId: this.eventId,
        };
        this.onNetworking = true;
        const response = await getContractListApi(
          Object.assign(this.payload, payload)
        );
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
          this.onGenerateSelected();
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
    onSearch(keywords) {
      if (keywords) {
        this.payload["contractName"] = keywords;
      } else {
        delete this.payload["contractName"];
      }
      this.onRefresh();
    },
    onSorterTap(index) {
      if (index) {
        this.payload["contractType"] = this.sorter[index]["key"];
      } else {
        delete this.payload["contractType"];
      }
      this.onRefresh();
    },
    onEvent(item) {
      if (this.selectMode) {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.$vm[this.key] = item;
        prevPage.$vm[this.key + "String"] = item.contractName;
        uni.navigateBack();
      } else {
        uni.navigateTo({
          url:
            "/subpackages/events/pages/contract/create_contract_page?mode=read&eventId=" +
            this.eventId +
            "&item=" +
            JSON.stringify(item),
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
    onUniSwipeAction(e, item, index) {
      switch (e.index) {
        case 0:
          uni.navigateTo({
            url:
              "/subpackages/events/pages/contract/create_contract_page?mode=edit&eventId=" +
              this.eventId +
              "&item=" +
              JSON.stringify(item),
          });
          break;
        case 1:
          uni.showModal({
            title: "您即将删除合同",
            content: item.contractName,
            success: async (res) => {
              if (res.confirm) {
                const response = await deleteContractApi({
                  id: item.id,
                });
                if (response) {
                  this.onRefreshPreviousPage();
                  this.list.splice(index, 1);
                  uni.showToast({
                    title: "删除成功",
                    icon: "none",
                  });
                }
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            },
          });
          break;
      }
    },
    onRefreshPreviousPage() {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.$vm.needRefresh = true;
    },
    onGenerateSelected() {
      for (let item of this.selectedIds) {
        for (let element of this.list) {
          if (element.id === item) {
            element["active"] = true;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.list-container {
  margin-top: 24rpx;
  background-color: #fff;
}
.list-item-container {
  width: 100%;
}
.list-item-container.active {
  background-color: #dddddd;
}
.list-item {
  flex: 1;
  margin: 0 28rpx;
  padding: 28rpx 0;
}
.list-item-container:not(:last-child) .list-item {
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