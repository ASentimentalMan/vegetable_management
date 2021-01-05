


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 发票类型 </view>
          <view class="form-item-input">
            <receipt-type-picker @onTypeChange="onTypeChange" />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 发票业务类型 </view>
          <radio-group @change="oneventTypeChange" class="form-item-input">
            <label class="radio"><radio value="procure" />采购发票</label>
            <label class="radio"><radio value="sale" />销售发票</label>
          </radio-group>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 发票编号 </view>
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
              :start="timePickerStartTime"
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
import ReceiptTypePicker from "@/subpackages/events/components/receipt_type_picker.vue";
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import { createContractApi } from "@/apis/event_apis";
export default {
  components: {
    ReceiptTypePicker,
    BiaoFunDatePicker,
  },
  data() {
    return {
      eventId: "",
      type: {},
      eventType: "",
      number: "",
      money: "",
      from: {},
      fromString: "",
      time: "",
      timePickerStartTime: "2019-07-19 09:00",
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
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    console.log(this.eventId);
    this.setTimePickerEndTime();
  },
  methods: {
    onTypeChange(e) {
      this.type = e;
    },
    oneventTypeChange(e) {
      this.eventType = e.target.value;
    },
    setTimePickerEndTime() {
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
          "/subpackages/events/pages/customer/customer_list_page?mode=select",
      });
    },
    onSelectTo() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select",
      });
    },
    onSelectCustomer() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select",
      });
    },
    onSelectRelateContract() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/contract_list_page?mode=select",
      });
    },
    onWarning() {
      uni.showToast({
        title: "请先选择合同开始日期",
        icon: "none",
      });
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
.radio {
  margin-left: 24rpx;
}
</style>