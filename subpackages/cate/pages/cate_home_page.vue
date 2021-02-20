<template>
  <view class="page-container">
    <fake-search-bar
      text="请输入关键字"
      bg="white"
      @onSearchTap="onSearchTap"
    />
    <view class="scrollable">
      <scroll-view scroll-y="true" class="left-window-container">
        <block v-for="(item, index) in cates" :key="index">
          <view
            class="left-window-item"
            :class="{ active: activeIndex === index }"
            @click="onCateIChange(index)"
          >
            {{ item.label }}
          </view>
        </block>
      </scroll-view>
      <scroll-view scroll-y="true" class="rigth-window-container">
        <view v-if="cates[activeIndex] && cates[activeIndex].children.length">
          <block
            v-for="(item, index) in cates[activeIndex].children"
            :key="index"
          >
            <view class="rigth-window-item-title" @tap="goSecondCate(item)">
              {{ item.label }}
            </view>
            <view class="rigth-window-item-content">
              <block
                v-for="(element, num) in cates[activeIndex].children[index]
                  .children"
                :key="num"
              >
                <view class="rigth-window-item" @tap="goCate(element)">
                  {{ element.label }}
                </view>
              </block>
            </view>
          </block>
        </view>
        <view class="rigth-window-container" v-else>
          <view style="height: 20vh"></view>
          <indicator status="empty" emptyText="暂无子分类" />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import FakeSearchBar from "@/components/public/fake_search_bar";
import Indicator from "@/components/public/indicator";
export default {
  components: {
    FakeSearchBar,
    Indicator,
  },
  data() {
    return {
      activeIndex: 0,
      selectMode: false,
      key: null,
      index: null,
      backpage: null,
    };
  },
  computed: {
    ...mapState("app", {
      cates: (state) => state.cates,
    }),
  },
  async onLoad(e) {
    if (e.mode) {
      this.selectMode = true;
      this.key = e.key;
      this.index = e.index;
      this.backpage = e.backpage;
    }
    await this.$store.dispatch("app/getCates");
  },
  methods: {
    onSearchTap() {
      let url = "/subpackages/cate/pages/cate_search_page";
      if (this.selectMode) {
        url += `?mode=select&key=${this.key}&index=${this.index}&backpage=${this.backpage}`;
      }
      uni.navigateTo({ url });
    },
    onCateIChange(index) {
      this.activeIndex = index;
    },
    goSecondCate(item) {
      if (this.selectMode && !item.children.length) {
        let pages = getCurrentPages();
        for (let i = 0; i < pages.length; i++) {
          if (pages[i]["route"].indexOf(this.backpage) !== -1) {
            let prevPage = pages[i];
            prevPage.$vm[this.key][this.index]["id"] = item.id;
            prevPage.$vm[this.key][this.index]["label"] = item.label;
            uni.navigateBack({ delta: pages.length - 1 - i });
            break;
          }
        }
      }
    },
    goCate(item) {
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
              prevPage.$vm[this.key][this.index]["label"] = item.label;
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
.scrollable {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 88px);
  width: 100vw;
}
.left-window-container {
  width: 200rpx;
}
.left-window-item {
  padding: 24rpx;
  transition: all 0.3s ease;
  border-left: 10rpx solid transparent;
  font-size: 26rpx;
}
.left-window-item.active {
  color: #63bc52;
  border-left: 10rpx solid #63bc52;
  background-color: white;
  transition: all 0.3s ease;
}
.rigth-window-container {
  padding-top: 12rpx;
  background-color: white;
  flex: 1;
}
.rigth-window-item-title {
  margin-top: 24rpx;
  margin-bottom: 12rpx;
  text-align: center;
  font-weight: bold;
}
.rigth-window-item-content {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 24rpx;
}
.rigth-window-item {
  padding: 6rpx 12rpx;
  border: 1px #bbbbbb solid;
  border-radius: 12rpx;
  margin: 12rpx 0 0 12rpx;
}
</style>