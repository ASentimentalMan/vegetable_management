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
      :disabled="disabled"
    >
      <view class="value" :class="{ green: green, active: selectedStr }">{{
        selectedStr ? selectedStr : placeholder
      }}</view>
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
      selectedStr: "",
      selectedId: [],
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择商品分类",
    },
    defaultValue: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: -1,
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
  async created() {
    if (this.defaultValue) {
      this.selectedStr = this.defaultValue;
    }
    await this.$store.dispatch("app/getCates");
    this.initCates();
  },
  watch: {
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
    initCates() {
      this.range[0] = this.cates.map((e) => {
        return {
          id: e.id,
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
        id: this.range[0][this.cateT1Index]["id"],
        value: this.range[0][this.cateT1Index]["value"],
        ids: [this.range[0][this.cateT1Index]["id"]],
        values: [this.range[0][this.cateT1Index]["value"]],
      };
      if (this.range[1][this.cateT2Index]) {
        this.selectedStr = this.range[1][this.cateT2Index]["value"];
        payload["id"] = this.range[1][this.cateT2Index]["id"];
        payload["value"] = this.range[1][this.cateT2Index]["value"];
        payload["ids"].push(this.range[1][this.cateT2Index]["id"]);
        payload["values"].push(this.range[1][this.cateT2Index]["value"]);
      }
      if (this.range[2][this.cateT3Index]) {
        this.selectedStr = this.range[2][this.cateT3Index]["value"];
        payload["id"] = this.range[2][this.cateT3Index]["id"];
        payload["value"] = this.range[2][this.cateT3Index]["value"];
        payload["ids"].push(this.range[2][this.cateT3Index]["id"]);
        payload["values"].push(this.range[2][this.cateT3Index]["value"]);
      }
      if (this.index !== -1) {
        payload["index"] = this.index;
      }
      this.$emit("onSelectCate", payload);
    },
    reset() {
      this.selectedStr = this.placeholder;
      this.selectedId = [];
    },
    setSelectedCate(e) {
      this.selectedStr = e.gcName;
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