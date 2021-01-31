<template>
  <view class="sorter-container">
    <view
      class="sorter flex-horizontal flex-aic flex-jcsb"
      :class="{ fixed: fixed }"
    >
      <view class="flex-horizontal" style="flex: 1">
        <view class="hint" :class="{ active: startTime }">开始日期</view>
        <biao-fun-date-picker
          placeholder="请选择"
          start="2019-07-19 09:00"
          :end="timePickerEndTime"
          fields="day"
          @change="onStartTimeSet"
        />
      </view>
      <view class="flex-horizontal" style="flex: 1">
        <view class="hint" :class="{ active: endTime }">结束日期</view>
        <biao-fun-date-picker
          placeholder="请选择"
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
      startTime: "",
      endTime: "",
    };
  },
  created() {
    this.setTimePickerEndTime();
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
    onStartTimeSet(e) {
      this.startTime = e.f2;
      this.$emit("onStartTimeSet", e.f2)
    },
    onEndTimeSet(e) {
      this.endTime = e.f2;
      this.$emit("onEndTimeSet", e.f2)
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
.hint.active {
  color: #63bc52;
}
</style>