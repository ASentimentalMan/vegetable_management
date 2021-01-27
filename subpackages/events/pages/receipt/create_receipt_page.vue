<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? number : true"
        >
          <view class="form-item-label">
            <text class="form-item-required" v-if="mode !== 'read'">*</text>
            发票编号
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入发票编号"
              v-model="number"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? type.label : true"
        >
          <view class="form-item-label"> 发票类型 </view>
          <view class="form-item-input">
            <receipt-type-picker
              ref="receiptTypePicker"
              @onReceiptTypeChange="onReceiptTypeChange"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? eventType : true"
        >
          <view class="form-item-label"> 发票业务类型 </view>
          <radio-group @change="onEventTypeChange" class="form-item-input">
            <label class="radio"
              ><radio
                :checked="eventType === 'procure'"
                :disabled="mode === 'read'"
                value="procure"
              />采购发票</label
            >
            <label class="radio"
              ><radio
                :checked="eventType === 'sale'"
                :disabled="mode === 'read'"
                value="sale"
              />销售发票</label
            >
          </radio-group>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? money : true"
        >
          <view class="form-item-label"> 发票金额（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入发票金额"
              v-model="money"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? fromString : true"
        >
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
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? time : true"
        >
          <view class="form-item-label"> 开票时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择开票时间"
              :defaultValue="timeDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? toString : true"
        >
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
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? recognizeNumber : true"
        >
          <view class="form-item-label"> 纳税人识别号 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入纳税人识别号"
              v-model="recognizeNumber"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <!-- <view class="form-item flex-horizontal">
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
        </view> -->
        <view
          class="form-item flex-horizontal"
          v-if="
            mode === 'read'
              ? locationString && locationString !== '请选择开户行地址'
              : true
          "
        >
          <view class="form-item-label"> 开户行地址 </view>
          <view class="form-item-input" @click="onLocationPick">
            <view
              :class="{
                'form-item-placeholder': locationString === '请选择开户行地址',
              }"
            >
              {{ locationString }}
            </view>
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? bank : true"
        >
          <view class="form-item-label"> 开户银行 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入开户银行"
              v-model="bank"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? bankNumber : true"
        >
          <view class="form-item-label"> 银行账号 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入银行账号"
              v-model="bankNumber"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? tel : true"
        >
          <view class="form-item-label"> 电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入电话"
              v-model="tel"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? relateContractString : true"
        >
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
        <!-- <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? relateCustomerString : true"
        >
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
        </view> -->
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
        title="发票"
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
    <location-picker ref="location" :level="3" @onLocationSet="onLocationSet" />
  </view>
</template>

<script>
import LocationPicker from "@/components/public/location_picker";
import ReceiptTypePicker from "@/subpackages/events/components/receipt_type_picker.vue";
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createReceiptApi, editReceiptApi } from "@/apis/event_apis";
export default {
  components: {
    LocationPicker,
    ReceiptTypePicker,
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      mode: "create",
      eventId: "",
      receiptId: "",
      onNetworking: false,
      number: "",
      type: {},
      eventType: "",
      money: "",
      from: {},
      fromString: "",
      time: "",
      timeDefaultValue: "",
      timePickerEndTime: "",
      to: {},
      toString: "",
      recognizeNumber: "",
      locationString: "请选择开户行地址",
      bank: "",
      bankNumber: "",
      tel: "",
      relateContract: {},
      relateContractString: "",
      relateCustomer: {},
      relateCustomerString: "",
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
      this.receiptId = item.id;
      if (this.mode === "edit") {
        uni.setNavigationBarTitle({
          title: "修改发票",
        });
      } else if (this.mode === "read") {
        uni.setNavigationBarTitle({
          title: "发票详情",
        });
      }
      this.number = item.invoiceNumber;
      this.type = {
        label: item.invoiceType,
        id: item.invoiceTypeId,
      };
      this.eventType = item.businessInvoiceType;
      this.money = item.invoiceAmount;
      this.from = {
        customerName: item.outputInvoiceUnit,
        id: item.outputInvoiceUnitId,
      };
      this.fromString = item.outputInvoiceUnit;
      this.time = item.invoiceDate ? item.invoiceDate : "";
      this.timeDefaultValue = this.time;
      this.to = {
        customerName: item.inputInvoiceUnit,
        id: item.inputInvoiceUnitId,
      };
      this.toString = item.inputInvoiceUnit;
      this.recognizeNumber = item.identificationNumber;
      if (item.bankAddress) {
        this.locationString = item.bankAddress;
      }
      this.bank = item.bankAccountNumber
        ? item.bankAccountNumber.split(",")[0]
        : "";
      this.bankNumber = item.bankAccountNumber
        ? item.bankAccountNumber.split(",")[1]
        : "";
      this.tel = item.telephone;
      this.relateContract = { id: item.contract.id };
      this.relateContractString = item.contract.contractName;
      this.relateCustomer = {};
      this.relateCustomerString = "";
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
    this.initTimePicker();
  },
  onShow() {
    this.fill();
  },
  mounted() {
    if (this.type.label) {
      this.$refs.receiptTypePicker.setSelectedStr(this.type.label);
    }
    this.fill();
  },
  methods: {
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
    fill() {
      if (this.to) {
        if (this.to.identificationNumber) {
          this.recognizeNumber = this.to.identificationNumber;
        }
        if (this.to.bankAddress) {
          this.locationString = this.to.bankAddress;
        }
        if (this.to.bankAccountNumber) {
          this.bank = this.to.bankAccountNumber.split(",")[0];
          this.bankNumber = this.to.bankAccountNumber.split(",")[1];
        }
      }
    },
    onReceiptTypeChange(e) {
      this.type = e;
    },
    onEventTypeChange(e) {
      this.eventType = e.target.value;
    },
    onSelectFrom() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=from&selectedIds=" +
          JSON.stringify([this.from.id]),
      });
    },
    onTimeSet(e) {
      this.time = e.f1;
    },
    onSelectTo() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=to&selectedIds=" +
          JSON.stringify([this.to.id]),
      });
    },
    onLocationPick() {
      if (this.mode === "read") return;
      this.$refs.location.popup();
    },
    onLocationSet(location) {
      if (location.length) {
        this.location = location;
        this.locationString = location.map((e) => e.name).join("/");
      }
    },
    onSelectRelateContract() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/contract_list_page?mode=select&key=relateContract&selectedIds=" +
          JSON.stringify([this.relateContract.id]),
      });
    },
    // onSelectCustomer() {
    //   if (this.mode === "read") return;
    //   uni.navigateTo({
    //     url:
    //       "/subpackages/events/pages/customer/customer_list_page?mode=select&key=relateCustomer&selectedIds=" +
    //       JSON.stringify([this.relateCustomer.id]),
    //   });
    // },
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
        let payload = {
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
          bankAddress:
            this.locationString === "请选择开户行地址"
              ? ""
              : this.locationString,
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
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
        };
        // console.log(payload);
        this.onNetworking = true;
        let response;
        if (this.mode === "create") {
          response = await createReceiptApi(payload);
        } else if (this.mode === "edit") {
          payload["id"] = this.receiptId;
          response = await editReceiptApi(payload);
        }
        this.onNetworking = false;
        console.log(response);
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