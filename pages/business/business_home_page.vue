<template>
  <view class="page-container">
    <list-options :list="list1" />
    <list-options :list="list2" />
    <list-options :list="list3" />
    <list-options :list="list4" />
  </view>
</template>

<script>
import ListOptions from "@/components/public/list_options";
export default {
  components: {
    ListOptions,
  },
  data() {
    return {
      list1: [
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_all.png",
          label: "全部业务",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/event/event_home_page",
            });
          },
        },
      ],
      list2: [
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_contract.png",
          label: "合同",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
      ],
      list3: [
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_receipt.png",
          label: "发票",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_express.png",
          label: "物流",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_meeting.png",
          label: "会议",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
      ],
      list4: [
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_order.png",
          label: "供应商采购单",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/contract/contract_home_page",
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_sale.png",
          label: "销售单",
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
</style>