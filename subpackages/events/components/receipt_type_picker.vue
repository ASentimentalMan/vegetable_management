<template>
  <view>
    <picker
      mode="selector"
      :range="range"
      range-key="label"
      @change="selectorChange"
      :disabled="disabled"
    >
      <text
        class="selected"
        :class="{ active: selectedStr != '请选择发票类型' }"
        >{{ selectedStr }}</text
      >
    </picker>
  </view>
</template>

<script>
import { getReceiptTypeListApi } from "@/apis/event_apis";
export default {
  data() {
    return {
      range: [],
      selectedStr: "请选择发票类型",
      sel: 0,
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const response = await getReceiptTypeListApi();
      if (response) {
        this.range = response.data;
      }
    },
    selectorChange(e) {
      this.selectedStr = this.range[e.detail.value].label;
      this.$emit("onReceiptTypeChange", this.range[e.detail.value]);
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