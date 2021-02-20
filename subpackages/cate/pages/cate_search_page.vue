<template>
  <view class="page-container">
    <searcher @onSearch="onSearch" :focus="true" />
    <cate-search-list :list="list" @onCateTap="onCateTap" />
    <indicator :status="status" emptyText="暂无结果" />
  </view>
</template>

<script>
import Searcher from "@/components/public/searcher";
import CateSearchList from "@/subpackages/cate/components/cate_search_list";
import Indicator from "@/components/public/indicator";
import { getCateByKeywordsApi } from "@/apis/event_apis";
export default {
  components: {
    Searcher,
    CateSearchList,
    Indicator,
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 20,
      hasMore: true,
      onNetworking: false,
      onRefreshing: false,
      selectMode: false,
      key: null,
      index: null,
      backpage: null,
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
    if (e.mode) {
      this.selectMode = true;
      this.key = e.key;
      this.index = e.index;
      this.backpage = e.backpage;
    }
  },
  onPullDownRefresh() {
    this.onRefresh();
  },
  onReachBottom() {
    this.fetch();
  },
  methods: {
    async fetch(keywords) {
      if (!keywords) {
        uni.showToast({
          title: "请输入关键字进行查询",
          icon: "none",
        });
      } else if (this.hasMore && !this.onNetworking) {
        const payload = {
          current: this.page,
          size: this.pageSize,
          name: keywords,
        };
        this.onNetworking = true;
        const response = await getCateByKeywordsApi(payload);
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
      }
      if (this.onRefreshing) {
        this.onRefreshing = false;
        uni.stopPullDownRefresh();
      }
    },
    onRefresh() {
      this.page = 1;
      this.hasMore = true;
      this.onRefreshing = true;
      this.fetch();
    },
    onSearch(keywords) {
      this.page = 1;
      this.hasMore = true;
      this.onRefreshing = true;
      this.fetch(keywords);
    },
    onCateTap(item) {
      if (this.selectMode) {
        if (item.children.length) {
          uni.navigateTo({
            url: `/subpackages/cate/pages/cate_forth_page?mode=select&key=${
              this.key
            }&index=${this.index}&backpage=${
              this.backpage
            }&children=${JSON.stringify(item.children)}`,
          });
        } else {
          let pages = getCurrentPages();
          for (let i = 0; i < pages.length; i++) {
            if (pages[i]["route"].indexOf(this.backpage) !== -1) {
              let prevPage = pages[i];
              prevPage.$vm[this.key][this.index]["id"] = item.id;
              prevPage.$vm[this.key][this.index]["label"] = item.name;
              uni.navigateBack({ delta: pages.length - 1 - i });
              break;
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped>
</style>