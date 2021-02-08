


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? relateContractString : true"
        >
          <view class="form-item-label">
            <text class="form-item-required" v-if="mode !== 'read'">*</text>
            关联合同
          </view>
          <view class="form-item-input" @tap="onRelateContract">
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
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? number : true"
        >
          <view class="form-item-label">
            <text class="form-item-required" v-if="mode !== 'read'">*</text>
            采购单编号
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购单编号 自定义标识"
              v-model="number"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? contact : true"
        >
          <view class="form-item-label"> 联系人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地联系人"
              v-model="contact"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? tel : true"
        >
          <view class="form-item-label"> 联系电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地联系电话"
              v-model="tel"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? time : true"
        >
          <view class="form-item-label"> 采购日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择采购日期"
              :defaultValue="timePickerDefaultValue"
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
          v-if="mode === 'read' ? billingTime : true"
        >
          <view class="form-item-label"> 预计开票日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择预计开票日期"
              :defaultValue="timeBillingDefaultValue"
              start="2019-07-19 09:00"
              :end="timeBillingEndTime"
              fields="day"
              @change="onBillingTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? paymentTime : true"
        >
          <view class="form-item-label"> 预计付款日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择预计付款日期"
              :defaultValue="timePaymentDefaultValue"
              start="2019-07-19 09:00"
              :end="timePaymentEndTime"
              fields="day"
              @change="onPaymentTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <block v-for="(item, index) in cates" :key="index">
        <view class="flex-vertical" v-if="mode === 'read' ? item.id : true">
          <view class="form-container">
            <view class="form-item flex-horizontal">
              <view class="form-item-label">
                采购品类
                <text v-if="cates.length > 1">{{ index + 1 }}</text>
              </view>
              <view class="form-item-input">
                <cate-picker
                  :disabled="mode === 'read'"
                  :index="index"
                  :defaultValue="item.value"
                  @onSelectCate="onSelectCate"
                />
              </view>
              <view
                class="add-form-item"
                style="margin-left: 12rpx; line-height: 1"
                v-if="mode !== 'read' && cates.length > 1"
              >
                <uni-icons
                  @tap="onRemoveCate(index)"
                  type="minus"
                  size="26"
                  color="red"
                ></uni-icons>
              </view>
            </view>
            <view
              class="form-container"
              v-if="item['id']"
              style="margin-top: 0"
            >
              <view
                class="form-item flex-horizontal"
                v-if="mode === 'read' ? item['amount'] : true"
                style="margin-right: 0"
              >
                <view class="form-item-label"> 采购数量（吨） </view>
                <view class="form-item-input">
                  <input
                    class="form-input"
                    type="text"
                    cursor-spacing="16"
                    placeholder="请输入采购数量"
                    v-model="item['amount']"
                    :disabled="mode === 'read'"
                    @input="onAmountChange($event, item)"
                  />
                </view>
              </view>
              <view
                class="form-item flex-horizontal"
                v-if="mode === 'read' ? item['unitPrice'] : true"
                style="margin-right: 0"
              >
                <view class="form-item-label"> 采购单价（元/吨） </view>
                <view class="form-item-input">
                  <input
                    class="form-input"
                    type="text"
                    cursor-spacing="16"
                    placeholder="请输入采购单价"
                    v-model="item['unitPrice']"
                    :disabled="mode === 'read'"
                    @input="onUnitPriceChange($event, item)"
                  />
                </view>
              </view>
              <view
                class="form-item flex-horizontal"
                v-if="mode === 'read' ? item['price'] : true"
                style="margin-right: 0"
              >
                <view class="form-item-label"> 采购总价（元） </view>
                <view class="form-item-input">
                  <input
                    class="form-input"
                    type="text"
                    cursor-spacing="16"
                    placeholder="请输入采购总价"
                    v-model="item['price']"
                    :disabled="mode === 'read'"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
      <view
        class="form-item flex-horizontal"
        v-if="mode !== 'read'"
        style="border-bottom: none"
      >
        <view class="form-item-input" style="margin-right: 24rpx">
          <text class="add-form-text"> 新增品类 </text>
          <view class="add-form-item" style="line-height: 1">
            <uni-icons
              @tap="onAddCate"
              type="plus"
              size="26"
              color="#2c7cf6"
            ></uni-icons>
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
        title="采购单"
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
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker";
import CatePicker from "@/components/public/cate_picker";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createOrderApi, editOrderApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
    CatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      mode: "create",
      eventId: "",
      orderId: "",
      onNetworking: false,
      relateContract: {},
      relateContractString: "",
      number: "",
      contact: "",
      tel: "",
      time: "",
      paymentTime: "",
      billingTime: "",
      timePickerDefaultValue: "",
      timePickerEndTime: "",
      timePaymentDefaultValue: "",
      timePaymentEndTime: "",
      timeBillingDefaultValue: "",
      timeBillingEndTime: "",
      cates: [{ id: "", amount: "", unitPrice: "", price: "" }],
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
      // console.log(item);
      this.orderId = item.id;
      if (this.mode === "edit") {
        uni.setNavigationBarTitle({
          title: "修改采购",
        });
      } else if (this.mode === "read") {
        uni.setNavigationBarTitle({
          title: "采购详情",
        });
      }
      this.relateContract = item.contract;
      this.relateContractString = item.contract.contractName;
      this.number = item.procureNumber;
      this.contact = item.contact;
      this.tel = item.contactTel;
      this.time = item.purchaseDate;
      this.timePickerDefaultValue = this.time;
      this.paymentTime = item.paymentDate;
      this.timePaymentDefaultValue = item.paymentTime;
      this.billingTime = item.billingDate;
      this.timeBillingDefaultValue = this.billingTime;
      if (item.categories && item.categories.length) {
        this.cates = item.categories.map((e) => {
          return {
            id: e.categoryId,
            value: e.category,
            amount: e.quantity,
            unitPrice: e.unitPrice,
            price: e.totalPrice,
          };
        });
      }
      this.description = item.remark;
      if (item.files && item.files.length) {
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
    }
    this.setTimePickerEndTime();
    this.setTimePaymentEndTime();
    this.setTimeBillingEndTime();
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
    setTimePaymentEndTime() {
      const time = new Date();
      this.timePaymentEndTime =
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
    setTimeBillingEndTime() {
      const time = new Date();
      this.timeBillingEndTime =
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
    onRelateContract() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/contract_list_page?mode=select&key=relateContract&type=procure&selectedIds=" +
          JSON.stringify([this.relateContract.id]),
      });
    },
    onTimeSet(e) {
      this.time = e.f1;
    },
    onPaymentTimeSet(e) {
      this.paymentTime = e.f1;
    },
    onBillingTimeSet(e) {
      this.billingTime = e.f1;
    },
    onSelectCate(e) {
      if (this.mode === "read") return;
      this.$set(this.cates, e.index, Object.assign(this.cates[e.index], e));
      console.log(this.cates[e.index]);
    },
    onAddCate() {
      this.cates.push({ id: "", amount: "", unitPrice: "", price: "" });
    },
    onRemoveCate(index) {
      this.cates.splice(index, 1);
    },
    onAmountChange(e, item) {
      if (item.unitPrice) {
        item.price = e.detail.value * item.unitPrice;
      }
    },
    onUnitPriceChange(e, item) {
      if (item.amount) {
        item.price = e.detail.value * item.amount;
      }
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
      if (!this.relateContractString) {
        uni.showToast({
          title: "请选择关联合同",
          icon: "none",
        });
        return false;
      }
      if (!this.number) {
        uni.showToast({
          title: "请输入采购单编号 自定义标识",
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
          contractId: this.relateContract.id,
          procureNumber: this.number,
          contact: this.contact,
          contactTel: this.tel,
          purchaseDate: this.time,
          paymentDate: this.paymentTime,
          billingDate: this.billingTime,
          categories: [],
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
        for (let item of this.cates) {
          if (item.id) {
            payload["categories"].push({
              category: item.value,
              categoryId: item.id,
              quantity: item.amount,
              unitPrice: item.unitPrice,
              totalPrice: item.price,
            });
          }
        }
        // console.log(payload);
        this.onNetworking = true;
        let response;
        if (this.mode === "create") {
          response = await createOrderApi(payload);
        } else if (this.mode === "edit") {
          payload["id"] = this.orderId;
          response = await editOrderApi(payload);
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
</style>