<template>
  <view class="page-container">
    <list-options :list="list1" />
    <view class="orgnization-container">
      <view class="flex-horizontal flex-aic" style="margin-bottom: 12rpx">
        <view class="title-text"> 贵州蔬菜集团有限公司 </view>
        <view
          class="iconfont icon-down title-text"
          style="margin-left: 6rpx"
        ></view>
      </view>
      <fake-search-bar text="搜索：贵州蔬菜集团有限公司" />
    </view>
    <list-options :list="list2" />
  </view>
</template>

<script>
import ListOptions from "@/components/public/list_options";
import FakeSearchBar from "@/components/public/fake_search_bar.vue";
export default {
  components: {
    ListOptions,
    FakeSearchBar,
  },
  data() {
    return {
      list1: [
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/orgnizaition_create.png",
          label: "创建企业/团队",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/orgnizaition/create_orgnizaition_page",
            });
          },
        },
      ],
      list2: [
        {
          leading: "",
          label: "财务部（2）",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/orgnizaition/apartment_page?apartment=财务部",
            });
          },
        },
        {
          leading: "",
          label: "人事部（1）",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
        {
          leading: "",
          label: "技术部（4）",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
        {
          leading: "",
          label: "运营部（2）",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.orgnization-container {
  padding: 24rpx;
  margin-top: 24rpx;
  background-color: #fff;
}
.title-text {
  font-size: 38rpx;
  font-weight: bold;
  color: #010114;
}
</style>