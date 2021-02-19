<template>
  <view>
    <picker
      mode="selector"
      :range="range"
      range-key="label"
      @change="selectorChange"
      :disabled="disabled"
    >
      <text class="selected" :class="{ active: selectedStr != '' }">
        {{ selectedStr ? selectedStr : placeholder }}
      </text>
    </picker>
  </view>
</template>

<script>
import { getUnitListApi } from "@/apis/event_apis";
export default {
  data() {
    return {
      range: [],
      selectedStr: "",
      sel: 0,
    };
  },
  props: {
    index: {
      type: Number,
      default: -1,
    },
    placeholder: {
      type: String,
      default: "请选择单位",
    },
    defaultValue: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.defaultValue) {
      this.selectedStr = this.defaultValue;
    }
    this.fetch();
  },
  methods: {
    async fetch() {
      const response = await getUnitListApi();
      if (response) {
        this.range = response.data;
      }
    },
    selectorChange(e) {
      this.selectedStr = this.range[e.detail.value].label;
      this.$emit("onUnitChange", this.range[e.detail.value], this.index);
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