<template>
  <view class="picker-container">
    <picker
      mode="selector"
      :range="range"
      range-key="label"
      @change="selectorChange"
    >
      <text
        class="selected"
        :class="{ active: selectedStr != '请选择客户行业' }"
        >{{ selectedStr }}</text
      >
    </picker>
  </view>
</template>

<script>
import { getCustomerIndustryListApi } from "@/apis/event_apis";
export default {
  data() {
    return {
      range: [],
      selectedStr: "请选择客户行业",
      sel: 0,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const response = await getCustomerIndustryListApi();
      if (response) {
        this.range = response.data;
      }
    },
    selectorChange(e) {
      this.selectedStr = this.range[e.detail.value].label;
      this.$emit("onPick", this.range[e.detail.value]);
    },
    setSelectedStr(e) {
      this.selectedStr = e;
    },
  },
};
</script>

<style scoped>
.selected {
  color: #888888;
  line-height: 1;
}
.selected.active {
  color: black;
}
</style>