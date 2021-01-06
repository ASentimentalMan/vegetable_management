


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label">
            <text class="form-item-required">*</text>合同名称
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同名称"
              v-model="name"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 合同编号 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同编号"
              v-model="number"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 合同类型 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同类型"
              v-model="type"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 合同金额（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同金额"
              v-model="price"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 甲方公司名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入甲方公司名称"
              v-model="partyA"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 甲方签订人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入甲方签订人"
              v-model="partyARepresent"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 乙方公司名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入乙方公司名称"
              v-model="partyB"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 乙方签订人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入乙方签订人"
              v-model="partyBRepresent"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 合同签订日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择合同签订日期"
              :start="signTimePickerStartTime"
              :end="signTimePickerEndTime"
              fields="day"
              @change="onSignTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 合同开始日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择合同开始日期"
              :start="startTimePickerStartTime"
              :end="startTimePickerEndTime"
              fields="day"
              @change="onStartTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 合同结束日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              v-if="endTimePickerStartTime"
              placeholder="请选择合同结束日期"
              :start="endTimePickerStartTime"
              :end="endTimePickerEndTime"
              fields="day"
              @change="onEndTimeSet"
            />
            <view v-else class="form-item-placeholder" @tap="onWarning">
              请选择合同结束日期
            </view>
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
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createContractApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
    AddMediaAttachment,
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
      onNetworking: false,
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
      console.log(e);
      this.signTime = e.f1;
    },
    onStartTimeSet(e) {
      this.startTime = e.f1;
      this.endTime = "";
      this.endTimePickerStartTime = "";
      setTimeout(() => {
        this.setEndTimePickerTime(new Date(e.f3));
      }, 10);
    },
    onEndTimeSet(e) {
      this.endTime = e.f1;
    },
    onWarning() {
      uni.showToast({
        title: "请先选择合同开始日期",
        icon: "none",
      });
    },
    onAttachmentAdd(attachments) {
      this.attachments = this.attachments.concat(attachments);
      console.log(this.attachments);
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
          title: "请输入合同名称",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (!this.onNetworking) {
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
          this.onNetworking = true;
          const response = await createContractApi(payload);
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
      }
    },
  },
};
</script>

<style scoped>
</style>