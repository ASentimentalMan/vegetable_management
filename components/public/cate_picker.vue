<template>
  <view>
    <picker
      ref="pickclass"
      mode="multiSelector"
      :range="range"
      range-key="value"
      :value="sel"
      @columnchange="columnChange"
      @change="selectorChange"
      class="component-container"
    >
      <view
        class="value"
        :class="{ green: green, active: selectedStr !== placeholder }"
        >{{ selectedStr }}</view
      >
    </picker>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      range: [[], [], []],
      cateT1Index: 0,
      cateT2Index: 0,
      cateT3Index: 0,
      sel: [0, 0, 0],
      selectedStr: "请选择商品分类",
      selectedId: [],
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择商品分类",
    },
    green: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("app", {
      cates: (state) => state.cates,
    }),
  },
  created() {
    this.$store.dispatch("app/getCates");
  },
  watch: {
    cates() {
      this.range[0] = this.cates.map((e) => {
        return {
          id: e.parentId,
          value: e.label,
        };
      });
      this.range[1] = this.cates[0].children.map((e) => {
        return {
          id: e.id,
          value: e.label,
        };
      });
      this.range[2] = this.cates[0].children[0].children.map((e) => {
        return {
          id: e.id,
          value: e.label,
        };
      });
    },
    cateT1Index() {
      this.range[1] = this.cates[this.cateT1Index].children.map((e) => {
        return {
          id: e.id,
          value: e.label,
        };
      });
      this.sel[1] = 0;
      this.range[2] = this.cates[this.cateT1Index].children[0].children.map(
        (e) => {
          return {
            id: e.id,
            value: e.label,
          };
        }
      );
    },
    cateT2Index() {
      this.range[2] = this.cates[this.cateT1Index].children[
        this.cateT2Index
      ].children.map((e) => {
        return {
          id: e.id,
          value: e.label,
        };
      });
    },
  },
  methods: {
    setClass(e) {
      this.selectedStr = e.gcName;
    },
    columnChange(e) {
      if (e.detail.column === 0) {
        this.cateT1Index = e.detail.value;
        this.cateT2Index = 0;
        this.cateT3Index = 0;
        this.sel = [this.cateT1Index, this.cateT2Index, this.cateT3Index];
      }
      if (e.detail.column === 1) {
        this.cateT2Index = e.detail.value;
        this.cateT3Index = 0;
        this.sel = [this.cateT1Index, this.cateT2Index, this.cateT3Index];
      }
      if (e.detail.column === 2) {
        this.cateT3Index = e.detail.value;
      }
    },
    selectorChange(e) {
      this.selectedStr = this.range[0][this.cateT1Index]["value"];
      let payload = {
        gcId: this.range[0][this.cateT1Index]["id"],
        gcName: this.range[0][this.cateT1Index]["value"],
        gcIdList: [this.range[0][this.cateT1Index]["id"]],
        gcNameList: [this.range[0][this.cateT1Index]["value"]],
      };
      if (this.range[1][this.cateT2Index]) {
        this.selectedStr = this.range[1][this.cateT2Index]["value"];
        payload["gcId"] = this.range[1][this.cateT2Index]["id"];
        payload["gcName"] = this.range[1][this.cateT2Index]["value"];
        payload["gcIdList"].push(this.range[1][this.cateT2Index]["id"]);
        payload["gcNameList"].push(this.range[1][this.cateT2Index]["value"]);
      }
      if (this.range[2][this.cateT3Index]) {
        this.selectedStr = this.range[2][this.cateT3Index]["value"];
        payload["gcId"] = this.range[2][this.cateT3Index]["id"];
        payload["gcName"] = this.range[2][this.cateT3Index]["value"];
        payload["gcIdList"].push(this.range[2][this.cateT3Index]["id"]);
        payload["gcNameList"].push(this.range[2][this.cateT3Index]["value"]);
      }
      this.$emit("onClassChange", payload);
    },
    reset() {
      this.selectedStr = "商品分类";
      this.selectedId = [];
    },
  },
};
</script>

<style scoped>
.component-container {
  width: 100%;
}
.value {
  color: #888888;
  width: 100%;
  text-align: right;
}
.value.active {
  color: black;
}
.value.active.green {
  color: #63bc52;
}
</style>