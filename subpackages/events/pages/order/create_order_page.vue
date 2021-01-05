


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 基地名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地名称"
              v-model="name"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 基地面积（亩） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地面积"
              v-model="area"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 联系人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地联系人"
              v-model="contact"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 联系电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地联系电话"
              v-model="tel"
            />
          </view>
        </view>
      </view>
      <!-- <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购品类 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择采购品类"
              v-model="partyA"
            />
          </view>
        </view>
      </view> -->
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择采购日期"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购数量（吨） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购数量"
              v-model="amount"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购单价（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购单价"
              v-model="unitPrice"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购总价（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购总价"
              v-model="price"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 货源提供客户 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入货源提供客户"
              v-model="provider"
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
      area: "",
      contact: "",
      tel: "",
      type: [{}],
      time: "",
      timePickerEndTime: "",
      amount: "",
      unitPrice: "",
      price: "",
      provider: "",
      description: "",
      attachments: [],
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
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
    onTimeSet(e) {
      this.time = e.f2;
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