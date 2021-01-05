


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 收货人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收货人"
              v-model="name"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 收货联系电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收货联系电话"
              v-model="number"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 销售地 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择销售地"
              v-model="type"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 预计回款日期 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择预计回款日期"
              v-model="price"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 预计新回款日期 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择预计新回款日期"
              v-model="price"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 是否按合同执行 </view>
          <radio-group @change="onRadioChange" class="form-item-input">
            <label class="radio"><radio value="yes" />是</label>
            <label class="radio"><radio value="no" />否</label>
          </radio-group>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 签收日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择签收日期"
              :start="startTimePickerStartTime"
              :end="startTimePickerEndTime"
              fields="day"
              @change="onStartTimeSet"
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
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import { createContractApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
  },
  data() {
    return {
      eventId: "",
      name: "",
      number: "",
      type: "",
      price: "",
      partyA: "",
      partyARepresent: "",
      partyB: "",
      partyBRepresent: "",
      signTime: "",
      signTimePickerStartTime: "2019-07-19 09:00",
      signTimePickerEndTime: "",
      startTime: "",
      startTimePickerStartTime: "2019-07-19 09:00",
      startTimePickerEndTime: "",
      endTime: "",
      endTimePickerStartTime: "",
      endTimePickerEndTime: "",
      description: "",
      attachments: [],
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    console.log(this.eventId);
    this.setSignTimePickerEndTime();
  },
  methods: {
    setSignTimePickerEndTime() {
      const time = new Date();
      this.signTimePickerEndTime =
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
        50 +
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
    onSignTimeSet(e) {
      this.signTime = e.f2;
    },
    onStartTimeSet(e) {
      this.startTime = e.f2;
      this.endTime = "";
      this.endTimePickerStartTime = "";
      setTimeout(() => {
        this.setEndTimePickerTime(new Date(e.f3));
      }, 10);
    },
    onEndTimeSet(e) {
      this.endTime = e.f1 + " " + e.hh + ":" + e.mm + ":" + e.ss;
    },
    onWarning() {
      uni.showToast({
        title: "请先选择合同开始日期",
        icon: "none",
      });
    },
    onRadioChange() {},
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