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
      eventId: null,
      list2: [
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_contract.png",
          label: "合同",
          onTap: () => {
            uni.navigateTo({
              url:
                "/subpackages/events/pages/contract/contract_list_page?eventId=" +
                this.eventId,
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
              url:
                "/subpackages/events/pages/receipt/receipt_list_page?eventId=" +
                this.eventId,
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_express.png",
          label: "物流",
          onTap: () => {
            uni.navigateTo({
              url:
                "/subpackages/events/pages/express/express_list_page?eventId=" +
                this.eventId,
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_meeting.png",
          label: "会议",
          onTap: () => {
            uni.navigateTo({
              url:
                "/subpackages/events/pages/meeting/meeting_list_page?eventId=" +
                this.eventId,
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
              url:
                "/subpackages/events/pages/order/order_list_page?eventId=" +
                this.eventId,
            });
          },
        },
        {
          leading:
            "https://dev.ncpgz.com/assets/management/icons/business_sale.png",
          label: "销售单",
          onTap: () => {
            uni.navigateTo({
              url:
                "/subpackages/events/pages/sale/sale_list_page?eventId=" +
                this.eventId,
            });
          },
        },
      ],
    };
  },
  onLoad(e) {
    if (e.id) {
      this.eventId = e.id;
    }
    console.log(this.eventId);
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