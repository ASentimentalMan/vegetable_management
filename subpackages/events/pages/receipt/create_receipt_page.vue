


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label">
            <text class="form-item-required">*</text>
            发票编号
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入发票编号"
              v-model="number"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 发票类型 </view>
          <view class="form-item-input">
            <receipt-type-picker @onReceiptTypeChange="onReceiptTypeChange" />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 发票业务类型 </view>
          <radio-group @change="onEventTypeChange" class="form-item-input">
            <label class="radio"><radio value="procure" />采购发票</label>
            <label class="radio"><radio value="sale" />销售发票</label>
          </radio-group>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 发票金额（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入发票金额"
              v-model="money"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 开票单位 </view>
          <view class="form-item-input" @tap="onSelectFrom">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择开票单位"
              v-model="fromString"
              disabled
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 开票时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择开票时间"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 收票单位 </view>
          <view class="form-item-input" @tap="onSelectTo">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择收票单位"
              v-model="toString"
              disabled
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 纳税人识别号 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入纳税人识别号"
              v-model="recognizeNumber"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 地址 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入地址"
              v-model="address"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 开户银行 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入开户银行"
              v-model="bank"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 银行账号 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入银行账号"
              v-model="bankNumber"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入电话"
              v-model="tel"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 关联合同 </view>
          <view class="form-item-input" @tap="onSelectRelateContract">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择关联合同"
              v-model="relateContractString"
              disabled
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 关联客户 </view>
          <view class="form-item-input" @tap="onSelectCustomer">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择关联客户"
              v-model="relateCustomerString"
              disabled
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 备注 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入备注"
              v-model="description"
            />
          </view>
        </view>
      </view>
      <add-media-attachment
        title="附件"
        :attachments="attachments"
        @onAttachmentAdd="onAttachmentAdd"
        @onAttachmentRemove="onAttachmentRemove"
        @onAttachmentProgress="onAttachmentProgress"
        @onAttachmentUploaded="onAttachmentUploaded"
      />
    </view>
    <view class="unscrollable">
      <view class="bottom-button-container">
        <view class="button-container" @tap="onHandle">
          <view class="bottom-button"> 完成 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ReceiptTypePicker from "@/subpackages/events/components/receipt_type_picker.vue";
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createReceiptApi } from "@/apis/event_apis";
export default {
  components: {
    ReceiptTypePicker,
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      eventId: "",
      number: "",
      type: {},
      eventType: "",
      money: "",
      from: {},
      fromString: "",
      time: "",
      timePickerEndTime: "",
      to: {},
      toString: "",
      recognizeNumber: "",
      address: "",
      bank: "",
      bankNumber: "",
      tel: "",
      relateContract: {},
      relateContractString: "",
      relateCustomer: {},
      relateCustomerString: "",
      description: "",
      attachments: [],
      onNetworking: false,
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    console.log(this.eventId);
    this.initTimePicker();
  },
  methods: {
    onReceiptTypeChange(e) {
      this.type = e;
    },
    onEventTypeChange(e) {
      this.eventType = e.target.value;
    },
    initTimePicker() {
      const time = new Date();
      this.timePickerEndTime =
        time.getFullYear() +
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
    onTimeSet(e) {
      this.time = e.f2;
    },
    onSelectFrom() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=from",
      });
    },
    onSelectTo() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=to",
      });
    },
    onSelectCustomer() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=relateCustomer",
      });
    },
    onSelectRelateContract() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/contract_list_page?mode=select&key=relateContract",
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
      if (!this.number) {
        uni.showToast({
          title: "请输入发票编号",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (!this.onNetworking && this.onValidate()) {
        // console.log(this.type);
        // console.log(this.from);
        // console.log(this.to);
        // console.log(this.relateContract);
        // console.log(this.relateCustomer);
        const payload = {
          businessId: this.eventId,
          invoiceNumber: this.number,
          invoiceType: this.type.label,
          invoiceTypeId: this.type.id,
          businessInvoiceType: this.eventType,
          invoiceAmount: this.money,
          outputInvoiceUnit: this.from.customerName,
          outputInvoiceUnitId: this.from.id,
          invoiceDate: this.time,
          inputInvoiceUnit: this.to.customerName,
          inputInvoiceUnitId: this.to.id,
          identificationNumber: this.recognizeNumber,
          address: this.address,
          bankAccountNumber:
            this.bank + "," + this.bankNumber === ","
              ? ""
              : this.bank + "," + this.bankNumber,
          telephone: this.tel,
          contractId: this.relateContract.id,
          customerId: this.relateCustomer.id,
          remark: this.description,
          files: this.attachments.map((e) => {
            return {
              fileName: e.fileName,
              fileOriginalName: e.originalname,
              fileSubUrl: e.subFileUrl,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
        };
        // console.log(payload);
        this.onNetworking = true;
        const response = await createReceiptApi(payload);
        this.onNetworking = false;
        if (response) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.$vm.needRefresh = true;
          uni.showToast({
            title: "创建成功",
            icon: "none",
          });
          this.onNetworking = true;
          setTimeout(() => {
            uni.navigateBack();
          }, 600);
        }
      }
    },
  },
};
</script>

<style scoped>
.radio {
  margin-left: 24rpx;
}
</style>