


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
              :start="startPickerStartTime"
              :end="startPickerEndTime"
              fields="day"
              @change="onStartTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 计划结束时间 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              v-if="endPickerStartTime"
              placeholder="请选择计划结束时间"
              :start="endPickerStartTime"
              :end="endPickerEndTime"
              fields="day"
              @change="onEndTimeSet"
            />
            <view v-else class="form-item-placeholder" @tap="onWarning">
              请选择计划结束时间
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
    </view>
    <view class="unscrollable">
      <view class="bottom-button-container">
        <view class="button-container" @tap="onCreate">
          <view class="bottom-button"> 完成 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import { createEventApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
  },
  data() {
    return {
      name: "",
      startTime: "",
      endTime: "",
      description: "",
      startPickerStartTime: "2019-07-19 09:00",
      startPickerEndTime: "",
      endPickerStartTime: "",
      endPickerEndTime: "",
      pickerEndTime: "",
      onNetworking: false,
    };
  },
  onLoad() {
    this.setStartPickerEndTime();
  },
  methods: {
    setStartPickerEndTime() {
      const time = new Date();
      this.startPickerEndTime =
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
    setEndPickerTime(time) {
      this.endPickerStartTime =
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
      this.endPickerEndTime =
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
      this.endTime = "";
      this.endPickerStartTime = "";
      setTimeout(() => {
        this.setEndPickerTime(new Date(e.f3));
      }, 10);
    },
    onEndTimeSet(e) {
      // this.endTime = e.f1;
	  this.endTime = new Date(e.f1);
    },
    onWarning() {
      uni.showToast({
        title: "请先选择计划开始时间",
        icon: "none",
      });
    },
    onValidate() {
      if (!this.name) {
        uni.showToast({
          title: "请输入业务名称",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onCreate() {
      if (!this.onNetworking) {
        if (this.onValidate()) {
          const payload = {
            businessName: this.name,
            businessStartDate: this.startTime,
            businessEndDate: this.endTime,
            remark: this.description,
          };
          this.onNetworking = true;
          const response = await createEventApi(payload);
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