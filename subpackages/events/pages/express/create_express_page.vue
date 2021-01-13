


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
            物流单编号
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入物流单编号 自定义标识"
              v-model="number"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? name : true"
        >
          <view class="form-item-label"> 货物名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入货物名称"
              v-model="name"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? weight : true"
        >
          <view class="form-item-label"> 货物重量（吨） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入货物重量"
              v-model="weight"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? distance : true"
        >
          <view class="form-item-label"> 距离（kM） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入运输距离"
              v-model="distance"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? fee : true"
        >
          <view class="form-item-label"> 费用（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入运输费用"
              v-model="fee"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? payerString : true"
        >
          <view class="form-item-label"> 支付方 </view>
          <view class="form-item-input" @tap="onSelectPayer">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择运费支付方"
              v-model="payerString"
              disabled
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? radio : true"
        >
          <view class="form-item-label"> 支付状态 </view>
          <radio-group @change="onRadioChange" class="form-item-input">
            <label class="radio"
              ><radio
                :checked="radio === '0'"
                :disabled="mode === 'read'"
                value="0"
              />未支付</label
            >
            <label class="radio"
              ><radio
                :checked="radio === '1'"
                :disabled="mode === 'read'"
                value="1"
              />已支付</label
            >
          </radio-group>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? fromString : true"
        >
          <view class="form-item-label"> 物流发货方 </view>
          <view class="form-item-input" @tap="onSelectFrom">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择物流发货方"
              v-model="fromString"
              disabled
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? toString : true"
        >
          <view class="form-item-label"> 物流接收方 </view>
          <view class="form-item-input" @tap="onSelectTo">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择物流接收方"
              v-model="toString"
              disabled
            />
          </view>
        </view>
      </view>

      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? startTime : true"
        >
          <view class="form-item-label"> 物流开始时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择物流开始时间"
              :defaultValue="startTimeDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onStartTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? endTime : true"
        >
          <view class="form-item-label"> 物流结束时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择物流结束时间"
              :defaultValue="endTimeDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onEndTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <block v-for="(item, index) in relateOrder" :key="index">
          <view
            class="form-item flex-horizontal"
            v-if="mode === 'read' ? item.id : true"
          >
            <view class="form-item-label">
              对应采购单
              <text v-if="relateOrder.length > 1">{{ index + 1 }}</text>
            </view>
            <view class="form-item-input" @tap="onSelectOrder(index)">
              <input
                class="form-input"
                type="text"
                cursor-spacing="16"
                placeholder="请选择对应采购单"
                v-model="item.id"
                disabled
              />
            </view>
            <view
              class="add-form-item"
              style="margin-left: 12rpx"
              @tap="onRemoveOrder(index)"
              v-if="mode !== 'read' && relateOrder.length > 1"
            >
              -
            </view>
          </view>
        </block>
        <view class="form-item flex-horizontal" v-if="mode !== 'read'">
          <view class="form-item-input">
            <view class="add-form-item" @tap="onAddOrder"> + </view>
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
              style="margin-left: 12rpx"
              @tap="onRemoveSale(index)"
              v-if="mode !== 'read' && relateSale.length > 1"
            >
              -
            </view>
          </view>
        </block>
        <view class="form-item flex-horizontal" v-if="mode !== 'read'">
          <view class="form-item-input">
            <view class="add-form-item" @tap="onAddSale"> + </view>
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
        title="附件"
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
import { createExpressApi, editExpressApi } from "@/apis/event_apis";
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
      number: "",
      name: "",
      weight: "",
      distance: "",
      fee: "",
      payer: "",
      payerString: "",
      radio: "",
      from: {},
      fromString: "",
      to: {},
      toString: "",
      startTime: "",
      startTimeDefaultValue: "",
      endTime: "",
      endTimeDefaultValue: "",
      timePickerEndTime: "",
      relateOrder: [{ id: "" }],
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
      this.expressId = item.id;
      if (this.mode === "edit") {
        uni.setNavigationBarTitle({
          title: "修改物流",
        });
      } else if (this.mode === "read") {
        uni.setNavigationBarTitle({
          title: "物流详情",
        });
      }
      this.number = item.logisticsNumber;
      this.name = item.itemName;
      this.weight = item.weight;
      this.distance = item.distance;
      this.fee = item.cost;
      this.payer = { id: item.payerCustomerId };
      this.payerString = item.payerCustomer;
      this.radio = item.payerStatus;
      this.from = { id: item.outputCustomerId };
      this.fromString = item.outputCustomer;
      this.to = { id: item.inputCustomerId };
      this.toString = item.inputCustomer;
      this.startTime = item.startDate ? item.startDate : "";
      this.startTimeDefaultValue = this.startTime;
      this.endTime = item.endDate ? item.endDate : "";
      this.endTimeDefaultValue = this.endTime;
      if (item.procurements.length) {
        this.relateOrder = item.procurements;
      }
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
    onSelectPayer() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=payer&selectedIds=" +
          JSON.stringify([this.payer.id]),
      });
    },
    onRadioChange(e) {
      this.radio = e.target.value;
    },
    onSelectFrom() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=from&selectedIds=" +
          JSON.stringify([this.from.id]),
      });
    },
    onSelectTo() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=to&selectedIds=" +
          JSON.stringify([this.to.id]),
      });
    },
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
    onStartTimeSet(e) {
      this.startTime = e.f1;
    },
    onEndTimeSet(e) {
      this.endTime = e.f1;
    },
    onAddOrder() {
      this.relateOrder.push({ id: "" });
    },
    onRemoveOrder(index) {
      this.relateOrder.splice(index, 1);
    },
    onSelectOrder(index) {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/order/order_list_page?mode=select&key=relateOrder&index=" +
          index +
          "&selectedIds=" +
          JSON.stringify(
            this.relateOrder.map((e) => {
              return e.id;
            })
          ),
      });
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
      if (!this.number) {
        uni.showToast({
          title: "请输入物流单编号 自定义标识",
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
          logisticsNumber: this.number,
          itemName: this.name,
          weight: this.weight,
          distance: this.distance,
          cost: this.fee,
          payerCustomer: this.payerString,
          payerCustomerId: this.payer.id,
          payerStatus: this.radio,
          outputCustomer: this.fromString,
          outputCustomerId: this.from.id,
          inputCustomer: this.toString,
          inputCustomerId: this.to.id,
          startDate: this.startTime,
          endDate: this.endTime,
          procurementIds: [],
          saleIds: [],
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
        for (let item of this.relateOrder) {
          if (item.id) {
            payload["procurementIds"].push(item.id);
          }
        }
        for (let item of this.relateSale) {
          if (item.id) {
            payload["saleIds"].push(item.id);
          }
        }
        console.log(payload);
        this.onNetworking = true;
        let response;
        if (this.mode === "create") {
          response = await createExpressApi(payload);
        } else if (this.mode === "edit") {
          payload["id"] = this.expressId;
          response = await editExpressApi(payload);
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