<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? name : true"
        >
          <view class="form-item-label">
            <text class="form-item-required" v-if="mode !== 'read'">*</text>
            收款名称
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收款名称"
              v-model="name"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <!-- <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? number : true"
        >
          <view class="form-item-label"> 收款编号 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收款编号"
              v-model="number"
              :disabled="mode === 'read'"
            />
          </view>
        </view> -->
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? payerString : true"
        >
          <view class="form-item-label"> 付款方 </view>
          <view class="form-item-input" @tap="onSelectPayer">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择付款方"
              v-model="payerString"
              disabled
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? total : true"
        >
          <view class="form-item-label"> 合同金额（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同金额"
              v-model="total"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? received : true"
        >
          <view class="form-item-label"> 已收款金额（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入已收款金额"
              v-model="received"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? receive : true"
        >
          <view class="form-item-label"> 本次收款金额（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入本次收款金额"
              v-model="receive"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? time : true"
        >
          <view class="form-item-label"> 收款日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择收款日期"
              :defaultValue="timeDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <block v-for="(item, index) in relateSale" :key="index">
          <view
            class="form-item flex-horizontal"
            v-if="mode === 'read' ? item.id : true"
          >
            <view class="form-item-label">
              对应销售单
              <text v-if="relateSale.length > 1">{{ index + 1 }}</text></view
            >
            <view class="form-item-input" @tap="onSelectSale(index)">
              <input
                class="form-input"
                type="text"
                cursor-spacing="16"
                placeholder="请选择对应销售单"
                v-model="item.id"
                disabled
              />
            </view>
            <view
              class="add-form-item"
              style="margin-left: 12rpx; line-height: 1"
              v-if="mode !== 'read' && relateSale.length > 1"
            >
              <uni-icons
                @tap="onRemoveSale(index)"
                type="minus"
                size="26"
                color="red"
              ></uni-icons>
            </view>
          </view>
        </block>
        <view class="form-item flex-horizontal" v-if="mode !== 'read'">
          <view class="form-item-input">
            <view class="add-form-item" style="line-height: 1">
              <uni-icons
                @tap="onAddSale"
                type="plus"
                size="26"
                color="#2c7cf6"
              ></uni-icons>
            </view>
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? description : true"
        >
          <view class="form-item-label"> 备注 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入备注"
              v-model="description"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <add-media-attachment
        title="收款单"
        :disabled="mode === 'read'"
        :attachments="attachments"
        @onAttachmentAdd="onAttachmentAdd"
        @onAttachmentRemove="onAttachmentRemove"
        @onAttachmentProgress="onAttachmentProgress"
        @onAttachmentUploaded="onAttachmentUploaded"
      />
    </view>
    <view
      class="unscrollable"
      style="height: 40rpx"
      v-if="mode === 'read'"
    ></view>
    <view class="unscrollable" v-else>
      <view class="bottom-button-container">
        <view class="button-container" @tap="onHandle">
          <view class="bottom-button"> 完成 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import {
  createReceivePaymentApi,
  editReceivePaymentApi,
} from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      mode: "create",
      eventId: "",
      expressId: "",
      onNetworking: false,
      name: "",
      // number: "",
      payer: "",
      payerString: "",
      total: "",
      received: "",
      receive: "",
      time: "",
      timeDefaultValue: "",
      timePickerEndTime: "",
      relateSale: [{ id: "" }],
      description: "",
      attachments: [],
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    if (e.mode) {
      this.mode = e.mode;
      const item = JSON.parse(e.item);
      this.receiveId = item.id;
      if (this.mode === "edit") {
        uni.setNavigationBarTitle({
          title: "修改收款",
        });
      } else if (this.mode === "read") {
        uni.setNavigationBarTitle({
          title: "收款详情",
        });
      }
      this.name = item.receiveName;
      this.payer = { id: item.payerCustomerId };
      this.payerString = item.payerCustomer.customerName;
      this.total = item.contractAmount;
      this.received = item.paidAmount;
      this.receive = item.receiveAmount;
      this.time = item.receiveDate ? item.receiveDate : "";
      this.timeDefaultValue = this.time;
      if (item.sales.length) {
        this.relateSale = item.sales;
      }
      this.description = item.remark;
      this.attachments = item.files.map((e) => {
        return {
          blob: "",
          createTime: e.createTime,
          fileName: e.fileName,
          fileType: e.fileType,
          fileUrl: e.fileUrl,
          id: e.id,
          originalFileName: e.fileOriginalName,
          subFileUrl: e.fileSubUrl,
          text: "",
          updateTime: e.updateTime,
        };
      });
    }
    this.setTimePickerEndTime();
  },
  methods: {
    setTimePickerEndTime() {
      const time = new Date();
      this.timePickerEndTime =
        time.getFullYear() +
        1 +
        "-" +
        (time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1)) +
        "-" +
        (time.getDate() > 9 ? time.getDate() : "0" + time.getDate()) +
        " " +
        (time.getHours() > 9 ? time.getHours() : "0" + time.getHours()) +
        ":" +
        (time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes());
    },
    onSelectPayer() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=payer&selectedIds=" +
          JSON.stringify([this.payer.id]),
      });
    },

    onTimeSet(e) {
      this.time = e.f1;
    },
    onAddSale() {
      this.relateSale.push({ id: "" });
    },
    onRemoveSale(index) {
      this.relateSale.splice(index, 1);
    },
    onSelectSale(index) {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/sale/sale_list_page?mode=select&key=relateSale&index=" +
          index +
          "&selectedIds=" +
          JSON.stringify(
            this.relateSale.map((e) => {
              return e.id;
            })
          ),
      });
    },
    onAttachmentAdd(attachments) {
      this.attachments = this.attachments.concat(attachments);
    },
    onAttachmentRemove(index) {
      this.attachments.splice(index, 1);
    },
    onAttachmentProgress(params) {
      this.attachments[params.index]["text"] = params.progress + "%";
    },
    onAttachmentUploaded(params) {
      this.$set(
        this.attachments,
        params.index,
        Object.assign(this.attachments[params.index], params.response)
      );
    },
    onValidate() {
      if (!this.name) {
        uni.showToast({
          title: "请输入收款名称",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (!this.onNetworking && this.onValidate()) {
        let payload = {
          businessId: this.eventId,
          receiveName: this.name,
          payerCustomerId: this.payer.id,
          contractAmount: this.total,
          paidAmount: this.received,
          receiveAmount: this.receive,
          receiveDate: this.time,
          salesIds: [],
          remark: this.description,
          files: this.attachments.map((e) => {
            return {
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
        };
        for (let item of this.relateSale) {
          if (item.id) {
            payload["salesIds"].push(item.id);
          }
        }
        // console.log(payload);
        this.onNetworking = true;
        let response;
        if (this.mode === "create") {
          response = await createReceivePaymentApi(payload);
        } else if (this.mode === "edit") {
          payload["id"] = this.receiveId;
          response = await editReceivePaymentApi(payload);
        }
        this.onNetworking = false;
        if (response) {
          this.onRefreshPreviousPage();
          uni.showToast({
            title: `${this.mode === "create" ? "创建" : "修改"}成功`,
            icon: "none",
          });
          this.onNetworking = true;
          setTimeout(() => {
            uni.navigateBack();
          }, 600);
        }
      }
    },
    onRefreshPreviousPage() {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.$vm.needRefresh = true;
    },
  },
};
</script>

<style scoped>
.radio {
  margin-left: 24rpx;
}
</style>