<template>
  <view class="page-container">
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
      id: null,
      list2: [
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_contract.png",
          label: "合同",
          onTap: () => {
            uni.navigateTo({
              url:
                "/subpackages/event/contract/contract_list_page?id=" + this.id,
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
              url: "/subpackages/event/receipt/receipt_list_page?id=" + this.id,
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_express.png",
          label: "物流",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/event/express/express_list_page?id=" + this.id,
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_meeting.png",
          label: "会议",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/event/meeting/meeting_list_page?id=" + this.id,
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
              url: "/subpackages/event/order/order_list_page?id=" + this.id,
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_sale.png",
          label: "销售单",
          onTap: () => {
            uni.navigateTo({
              url: "/subpackages/event/sale/sale_list_page?id=" + this.id,
            });
          },
        },
      ],
    };
  },
  onLoad(e) {
    console.log(e);
    if (e.id) {
      this.id = e.id;
    }
    if (e.businessName) {
      uni.setNavigationBarTitle({
        title: e.businessName,
      });
    }
  },
};
</script>

<style scoped>
</style>