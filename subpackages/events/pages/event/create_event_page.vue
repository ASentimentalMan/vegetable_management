<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label">
            <text class="form-item-required">*</text>业务名称
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入业务名称"
              v-model="name"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 计划开始时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择计划开始时间"
              :defaultValue="startTimePickerDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onStartTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 计划结束时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="计划结束时间"
              :defaultValue="endTimePickerDefaultValue"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onEndTimeSet"
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
import { createEventApi, editEventApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
  },
  data() {
    return {
      createMode: true,
      eventId: "",
      name: "",
      startTime: "",
      startTimePickerDefaultValue: "",
      endTime: "",
      endTimePickerDefaultValue: "",
      timePickerEndTime: "",
      description: "",
      onNetworking: false,
    };
  },
  onLoad(e) {
    if (e.mode) {
      this.createMode = false;
      const item = JSON.parse(e.item);
      // console.log(item);
      this.eventId = item.id;
      this.name = item.businessName;
      this.startTime = item.businessStartDate ? item.businessStartDate : "";
      this.startTimePickerDefaultValue = this.startTime;
      this.endTime = item.businessEndDate ? item.businessEndDate : "";
      this.endTimePickerDefaultValue = this.endTime;
      this.description = item.remark;
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
    onStartTimeSet(e) {
      this.startTime = e.f1;
    },
    onEndTimeSet(e) {
      this.endTime = e.f1;
    },
    onValidate() {
      if (!this.name) {
        uni.showToast({
          title: "请输入业务名称",
          icon: "none",
        });
        return false;
      }
      if (
        this.startTime &&
        this.endTime &&
        new Date(this.startTime) > new Date(this.endTime)
      ) {
        uni.showToast({
          title: '"计划结束时间" 不能早于 "计划开始时间"',
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (!this.onNetworking && this.onValidate()) {
        let payload = {
          businessName: this.name,
          businessStartDate: this.startTime,
          businessEndDate: this.endTime,
          remark: this.description,
        };
        this.onNetworking = true;
        let response;
        if (this.createMode) {
          response = await createEventApi(payload);
        } else {
          payload["id"] = this.eventId;
          response = await editEventApi(payload);
        }
        this.onNetworking = false;
        if (response) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.$vm.needRefresh = true;
          uni.showToast({
            title: `${this.createMode ? "创建" : "修改"}成功`,
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
</style>