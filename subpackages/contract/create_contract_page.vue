


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="list-container">
        <view class="list-item flex-horizontal">
          <view class="item-label"> 合同编号 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
        <view class="list-item flex-horizontal">
          <view class="item-label"> 合同名称 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
        <view class="list-item flex-horizontal">
          <view class="item-label"> 所属业务 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
      </view>
      <view class="list-container">
        <view class="list-item flex-horizontal">
          <view class="item-label"> 选择合同类型 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
      </view>
      <view class="list-container">
        <view class="list-item flex-horizontal">
          <view class="item-label"> 合同生效日期 </view>
          <view class="item-text"> 合同结束日期 </view>
        </view>
        <view class="list-item flex-horizontal">
          <view class="item-label"> 合同结束日期 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
        <view class="list-item flex-horizontal">
          <view class="item-label"> 签订日期 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
      </view>
      <view class="list-container">
        <view class="list-item flex-horizontal">
          <view class="item-label"> 合同金额 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
      </view>
      <view class="list-container">
        <view class="list-item flex-horizontal">
          <view class="item-label"> 甲方 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
        <view class="list-item flex-horizontal">
          <view class="item-label"> 乙方 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
        <view class="list-item flex-horizontal">
          <view class="item-label"> 签订人 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
      </view>
      <view class="list-container">
        <view class="list-item flex-horizontal">
          <view class="item-label"> 上传合同附件 </view>
          <view class="item-text"> 合同编号 </view>
        </view>
      </view>
    </view>
    <view class="unscrollable">
      <view class="button-container" @tap="onCreate"> 完成 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "物流",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "采购单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "销售单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "物流",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "采购单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "销售单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "物流",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "采购单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "销售单",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
        {
          type: "发票",
          label: "天股科技邮箱公司...",
          time: "2020-12-06",
        },
      ],
    };
  },
  methods: {
    onCreate() {
      uni.navigateTo({
        url: "/subpackages/contract/create_contract_page",
      });
    },
  },
};
</script>

<style scoped>
/* .page-container {
  margin-top: 24rpx;
} */
.scrollable {
  margin-bottom: 160rpx;
}
.unscrollable {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 24rpx 40rpx;
  background-color: #fff;
}
.button-container {
  text-align: center;
  background-color: #2c7cf6;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
  height: 88rpx;
  line-height: 88rpx;
}
.list-container {
  margin: 24rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
}
.list-item {
  margin: 0 32rpx;
  padding: 24rpx 0;
}
.list-item:not(:last-child) {
  border-bottom: 1px solid #efefef;
}
.item-label {
  margin-right: 24rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}
.item-text {
  flex: 1;
  text-align: right;
}
</style>