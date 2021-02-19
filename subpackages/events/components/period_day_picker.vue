<template>
  <view class="sorter-container">
    <view
      class="sorter flex-horizontal flex-aic flex-jcsb"
      :class="{ fixed: fixed }"
    >
      <view class="flex-horizontal" style="flex: 1">
        <view class="hint">开始日期</view>
        <biao-fun-date-picker
          ref="start"
          placeholder="请选择"
          :defaultValue="startTimeDefaultValue"
          start="2019-07-19 09:00"
          :end="timePickerEndTime"
          fields="day"
          @change="onStartTimeSet"
        />
      </view>
      <view class="flex-horizontal" style="flex: 1">
        <view class="hint">结束日期</view>
        <biao-fun-date-picker
          ref="end"
          placeholder="请选择"
          :defaultValue="endTimeDefaultValue"
          start="2019-07-19 09:00"
          :end="timePickerEndTime"
          fields="day"
          @change="onEndTimeSet"
        />
      </view>
    </view>
  </view>
</template>

<script>
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker";
export default {
  components: {
    BiaoFunDatePicker,
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timePickerEndTime: "",
      startTimeDefaultValue: "",
      endTimeDefaultValue: "",
      startTime: "",
      endTime: "",
    };
  },
  created() {
    this.setTimePickerEndTime();
    this.setTimePickerDefaultValue();
  },
  methods: {
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
    setTimePickerDefaultValue() {
      const time = new Date();
      const tim =
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
      this.startTimeDefaultValue = tim;
      this.endTimeDefaultValue = tim;
    },
    setStartTime(e) {
      const time = new Date(e);
      const start =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1)) +
        "-" +
        (time.getDate() > 9 ? time.getDate() : "0" + time.getDate());
      const now = new Date();
      const end =
        now.getFullYear() +
        "-" +
        (now.getMonth() + 1 > 9
          ? now.getMonth() + 1
          : "0" + (now.getMonth() + 1)) +
        "-" +
        (now.getDate() > 9 ? now.getDate() : "0" + now.getDate());
      this.$refs.start.setDateStr(start);
      this.$refs.end.setDateStr(end);
    },
    onStartTimeSet(e) {
      this.startTime = e.f2;
      this.$emit("onStartTimeSet", e.f1);
    },
    onEndTimeSet(e) {
      this.endTime = e.f2;
      this.$emit("onEndTimeSet", e.f1);
    },
  },
};
</script>

<style scoped>
.sorter-container {
  width: 100%;
  height: 44px;
}
.sorter {
  height: 44px;
  padding: 0 24rpx;
  background-color: #fff;
}
.sorter.fixed {
  width: 100%;
  position: fixed;
  left: 0;
  top: 44px;
  z-index: 1;
}
.hint {
  color: #666666;
  margin-right: 24rpx;
}
</style>