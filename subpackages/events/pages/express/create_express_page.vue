


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
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
        <view class="form-item flex-horizontal">
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
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 货物名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入货物名称"
              v-model="name"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 货物重量（吨） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入货物重量"
              v-model="weight"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 距离（kM） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入运输距离"
              v-model="distance"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 费用（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入运输费用"
              v-model="fee"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 支付方 </view>
          <view class="form-item-input" @tap="onSelectPayer">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择运费支付方"
              v-model="payer"
              disabled
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 物流开始时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择物流开始时间"
              start="2019-07-19 09:00"
              :end="startTimePickerEndTime"
              fields="day"
              @change="onStartTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 物流结束时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              v-if="endTimePickerStartTime"
              placeholder="请选择物流结束时间"
              :start="endTimePickerStartTime"
              :end="endTimePickerEndTime"
              fields="day"
              @change="onEndTimeSet"
            />
            <view v-else class="form-item-placeholder" @tap="onWarning">
              请先选择物流开始时间
            </view>
          </view>
        </view>
      </view>
      <view class="form-container">
        <block v-for="(item, index) in relateOrder" :key="index">
          <view class="form-item flex-horizontal">
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
                v-model="description"
                disabled
              />
              <view
                class="add-form-item"
                style="margin-left: 12rpx"
                @tap="onRemoveOrder(index)"
                v-if="relateOrder.length > 1"
              >
                -
              </view>
            </view>
          </view>
        </block>
        <view class="form-item flex-horizontal">
          <view class="form-item-input">
            <view class="add-form-item" @tap="onAddOrder"> + </view>
          </view>
        </view>
      </view>
      <view class="form-container">
        <block v-for="(item, index) in relateSale" :key="index">
          <view class="form-item flex-horizontal">
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
                v-model="description"
                disabled
              />
              <view
                class="add-form-item"
                style="margin-left: 12rpx"
                @tap="onRemoveSale(index)"
                v-if="relateSale.length > 1"
              >
                -
              </view>
            </view>
          </view>
        </block>
        <view class="form-item flex-horizontal">
          <view class="form-item-input">
            <view class="add-form-item" @tap="onAddSale"> + </view>
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
      <view class="form-unit-title"> 附件 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
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
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import { createContractApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
  },
  data() {
    return {
      eventId: "",
      from: {},
      fromString: "",
      to: {},
      toString: "",
      name: "",
      weight: "",
      distance: "",
      fee: "",
      payer: "",
      startTime: "",
      startTimePickerEndTime: "",
      endTime: "",
      endTimePickerStartTime: "",
      endTimePickerEndTime: "",
      relateSale: [{}],
      relateOrder: [{}],
      description: "",
      attachments: [],
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    console.log(this.eventId);
    this.setStartTimePickerEndTime();
  },
  methods: {
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
    onSelectPayer() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=payer",
      });
    },
    setStartTimePickerEndTime() {
      const time = new Date();
      this.startTimePickerEndTime =
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
      this.startTime = e.f2;
      this.endTime = "";
      this.endTimePickerStartTime = "";
      setTimeout(() => {
        this.setEndTimePickerTime(new Date(e.f3));
      }, 10);
    },
    setEndTimePickerTime(time) {
      this.endTimePickerStartTime =
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
      this.endTimePickerEndTime =
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
    onEndTimeSet(e) {
      this.endTime = e.f1 + " " + e.hh + ":" + e.mm + ":" + e.ss;
    },
    onWarning() {
      uni.showToast({
        title: "请先选择物流开始时间",
        icon: "none",
      });
    },
    onAddSale() {
      this.relateSale.push({});
    },
    onRemoveSale(index) {
      this.relateSale.splice(index, 1);
    },
    onAddOrder() {
      this.relateOrder.push({});
    },
    onRemoveOrder(index) {
      this.relateOrder.splice(index, 1);
    },
    onAttachmentRemove(index) {
      this.attachments.splice(index, 1);
    },
    onAttachmentAdd() {
      uni.chooseImage({
        count: 9 - this.attachments.length,
        success: (chooseImageRes) => {
          // const tempFilePaths = chooseImageRes.tempFilePaths;
          // const userinfo = uni.getStorageSync("userinfo");
          // for (let i = 0; i < tempFilePaths.length; i++) {
          //   uni.uploadFile({
          //     url:
          //       process.env.NODE_ENV === "development"
          //         ? "https://mall.ncpgz.com/test/applets/image/upload"
          //         : "https://mall.ncpgz.com/suberqcw/applets/image/upload",
          //     filePath: tempFilePaths[i],
          //     name: "files",
          //     formData: {
          //       imgPath: "portal/goods",
          //       token: userinfo.token,
          //     },
          //     success: (uploadFileRes) => {
          //       const response = JSON.parse(uploadFileRes.data);
          //       if (response.code === 601) {
          //         uni.navigateBack();
          //         store.commit("user/logOut");
          //         uni.reLaunch({
          //           url: "/pages/home/home_page",
          //         });
          //         uni.showToast({
          //           title: response.data,
          //           icon: "none",
          //         });
          //       } else {
          //         console.log(response.data.imgUrl);
          //         this.images.push(response.data.imgUrl);
          //       }
          //     },
          //   });
          // }
        },
      });
    },
    onValidate() {
      if (!this.name) {
        uni.showToast({
          title: "请输入合同名称",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (this.onValidate()) {
        const payload = {
          businessId: this.eventId,
          contractName: this.name,
          contractNumber: this.number,
          contractType: this.type,
          contractAmount: this.price,
          partyA: this.partyA,
          partySignatoryA: this.partyARepresent,
          partyB: this.partyB,
          partySignatoryB: this.partyBRepresent,
          signingDate: this.signTime,
          startDate: this.startTime,
          endDate: this.endTime,
          remark: this.description,
          files: [],
        };
        console.log(payload);
        const response = await createContractApi(payload);
        if (response) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.$vm.needRefresh = true;
          uni.showToast({
            title: "创建成功",
            icon: "none",
          });
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
</style>