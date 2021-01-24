


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
            销售单编号
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入销售单编号 自定义标识"
              v-model="number"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? receiver : true"
        >
          <view class="form-item-label">
            <!-- <text class="form-item-required">*</text> -->
            收货人
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收货人"
              v-model="receiver"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? tel : true"
        >
          <view class="form-item-label"> 收货联系电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收货联系电话"
              v-model="tel"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="
            mode === 'read'
              ? locationString && locationString !== '请选择销售地'
              : true
          "
        >
          <view class="form-item-label"> 销售地 </view>
          <view class="form-item-input" @click="onLocationPick">
            <view
              :class="{
                'form-item-placeholder': locationString === '请选择销售地',
              }"
            >
              {{ locationString }}
            </view>
          </view>
        </view>
      </view>
      <block v-for="(item, index) in cates" :key="index">
        <view class="flex-vertical" v-if="mode === 'read' ? item.id : true">
          <view class="form-container">
            <view class="form-item flex-horizontal">
              <view class="form-item-label">
                销售品类
                <text v-if="cates.length > 1">{{ index + 1 }}</text>
              </view>
              <view class="form-item-input">
                <cate-picker
                  :disabled="mode === 'read'"
                  :index="index"
                  @onSelectCate="onSelectCate"
                />
              </view>
              <view
                class="add-form-item"
                style="margin-left: 12rpx"
                @tap="onRemoveCate(index)"
                v-if="mode !== 'read' && cates.length > 1"
              >
                -
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
                <view class="form-item-label"> 销售数量（吨） </view>
                <view class="form-item-input">
                  <input
                    class="form-input"
                    type="text"
                    cursor-spacing="16"
                    placeholder="请输入销售数量"
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
                <view class="form-item-label"> 销售单价（元/吨） </view>
                <view class="form-item-input">
                  <input
                    class="form-input"
                    type="text"
                    cursor-spacing="16"
                    placeholder="请输入销售单价"
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
                <view class="form-item-label"> 销售总价（元） </view>
                <view class="form-item-input">
                  <input
                    class="form-input"
                    type="text"
                    cursor-spacing="16"
                    placeholder="请输入销售总价"
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
          <view class="add-form-item" @tap="onAddCate"> + </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? time : true"
        >
          <view class="form-item-label"> 预计回款日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择预计回款日期"
              :defaultValue="timePickerDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <!-- <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? radio : true"
        >
          <view class="form-item-label"> 是否按合同执行 </view>
          <radio-group @change="onRadioChange" class="form-item-input">
            <label class="radio">
              <radio
                :disabled="mode === 'read'"
                :checked="radio === 'true'"
                value="true"
              />
              是
            </label>
            <label class="radio">
              <radio
                :disabled="mode === 'read'"
                :checked="radio === 'false'"
                value="false"
              />
              否
            </label>
          </radio-group>
        </view>
      </view>
      <view class="form-container" v-if="radio === 'false'">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? reTime : true"
        >
          <view class="form-item-label"> 预计新回款日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择预计新回款日期"
              :defaultValue="reTimePickerDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onReTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? receiveTime : true"
        >
          <view class="form-item-label"> 签收日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择签收日期"
              :defaultValue="receiveTimePickerDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onReceiveTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view> -->
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
        title="销售单"
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
import CatePicker from "@/components/public/cate_picker";
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createSaleApi, editSaleApi } from "@/apis/event_apis";
export default {
  components: {
    LocationPicker,
    CatePicker,
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      mode: "create",
      eventId: "",
      saleId: "",
      onNetworking: false,
      relateContract: {},
      relateContractString: "",
      number: "",
      receiver: "",
      tel: "",
      location: [],
      locationString: "请选择销售地",
      cates: [{ id: "", amount: "", unitPrice: "", price: "" }],
      time: "",
      timePickerDefaultValue: "",
      timePickerEndTime: "",
      // radio: "",
      // reTime: "",
      // reTimePickerDefaultValue: "",
      // receiveTime: "",
      // receiveTimePickerDefaultValue: "",
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
      console.log(item);
      this.saleId = item.id;
      if (this.mode === "edit") {
        uni.setNavigationBarTitle({
          title: "修改销售",
        });
      } else if (this.mode === "read") {
        uni.setNavigationBarTitle({
          title: "销售详情",
        });
      }
      this.relateContract = item.contract;
      this.relateContractString = item.contract.contractName;
      this.number = item.salesNumber;
      this.receiver = item.consignee;
      this.tel = item.phone;
      this.locationString = item.place ? item.place : "请选择销售地";
      this.time = item.estimatedDate;
      this.timePickerDefaultValue = this.time;
      // this.radio = item.isExecuteContract.toString();
      // this.reTime = item.newEstimatedDate;
      // this.reTimePickerDefaultValue = this.reTime;
      // this.receiveTime = item.receiptDate;
      // this.receiveTimePickerDefaultValue = this.receiveTime;
      if (item.categories.length) {
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
    onRelateContract() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/contract_list_page?mode=select&key=relateContract&type=sale&selectedIds=" +
          JSON.stringify([this.relateContract.id]),
      });
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
    onTimeSet(e) {
      this.time = e.f1;
    },
    onReTimeSet(e) {
      this.reTime = e.f1;
    },
    onReceiveTimeSet(e) {
      this.receiveTime = e.f1;
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
    onRadioChange(e) {
      this.radio = e.target.value;
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
          title: "请输入销售单编号 自定义标识",
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
          salesNumber: this.number,
          consignee: this.receiver,
          phone: this.tel,
          place:
            this.locationString === "请选择销售地" ? "" : this.locationString,
          categories: [],
          estimatedDate: this.time,
          // isExecuteContract: this.radio,
          // newEstimatedDate: this.reTime,
          // receiptDate: this.receiveTime,
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
        console.log(payload);
        this.onNetworking = true;
        let response;
        if (this.mode === "create") {
          response = await createSaleApi(payload);
        } else if (this.mode === "edit") {
          payload["id"] = this.saleId;
          response = await editSaleApi(payload);
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