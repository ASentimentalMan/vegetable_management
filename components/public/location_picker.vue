<template>
  <uni-popup ref="popup" type="bottom">
    <view class="pop-up-container">
      <view class="pop-up-title">
        <view @click="onPopUpCancel" class="title-btn">取消</view>
        <view>地区选择</view>
        <view @click="onPopUpConfirm" class="title-btn">确定</view>
      </view>
      <scroll-view class="scroll-view-chosen" scroll-x="true">
        <block v-for="(item, index) in chosenLocation" :key="index">
          <view class="chosen-wrapper" @click="onLocationBack(index)">
            {{ item.name }}
          </view>
        </block>
      </scroll-view>
      <scroll-view class="scroll-view-option" scroll-y="true">
        <block v-for="(item, index) in option[option.length - 1]" :key="index">
          <view class="option-wrapper" @click="onLocationSelect(index)">
            {{ item.name }}
          </view>
        </block>
      </scroll-view>
    </view>
    <view class="bg-filter"></view>
  </uni-popup>
</template>
 
<script>
import uniPopup from "@/components/uni-popup/uni-popup";
import { getLocationListApi } from "@/apis/app_apis";
export default {
  components: {
    uniPopup,
  },
  props: {
    level: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      chosen: [],
      option: [],
    };
  },
  computed: {
    chosenLocation() {
      if (this.chosen.length < 4) {
        return this.chosen.concat({ areaCode: "0", name: "请选择" });
      } else {
        return this.chosen;
      }
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch(payload) {
      const response = await getLocationListApi(payload);
      this.option.push(response.data);
    },
    popup() {
      this.$refs.popup.open();
    },
    onPopUpCancel() {
      this.$refs.popup.close();
    },
    onPopUpConfirm() {
      if (this.level === -1 && !this.chosen.length) {
        uni.showToast({
          title: `请选择行政区`,
          icon: "none",
        });
      } else if (this.level === -1 || this.level === this.chosen.length) {
        this.handleSubmit();
        this.onPopUpCancel();
      } else {
        uni.showToast({
          title: `请选择${this.level}级行政区`,
          icon: "none",
        });
      }
    },
    onLocationBack(index) {
      this.option.splice(index + 1, this.chosen.length - index + 1);
      this.chosen.splice(index, this.chosen.length - index);
    },
    onLocationSelect(index) {
      if (
        (this.level === -1 && this.chosen.length < 3) ||
        this.chosen.length < this.level - 1
      ) {
        this.chosen.splice(
          this.option.length - 1,
          0,
          this.option[this.option.length - 1][index]
        );
        // console.log(this.option[this.option.length - 1][index]);
        this.fetch({
          paramsCode: this.option[this.option.length - 1][index].areaCode,
        });
      } else {
        this.$set(
          this.chosen,
          [this.option.length - 1],
          this.option[this.option.length - 1][index]
        );
        this.handleSubmit();
        this.onPopUpCancel();
      }
    },
    handleSubmit() {
      this.$emit("onLocationSet", this.chosen);
      this.chosen = [];
      const temp = this.option[0];
      this.option = [temp];
    },
  },
};
</script>

<style scoped>
.pop-up-container {
  height: 50vh;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.bg-filter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80rpx;
  z-index: -1;
  background-color: white;
}
.pop-up-title {
  padding: 24rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
  align-items: flex-end;
}
.scroll-view-chosen {
  white-space: nowrap;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
  display: flex;
}
.chosen-wrapper,
.option-wrapper {
  padding: 24rpx;
}
.chosen-wrapper {
  display: inline-block;
}
.chosen-wrapper:last-child {
  border-bottom: 4rpx solid#2c7cf6;
}
.scroll-view-option {
  flex: 1;
  overflow: scroll;
}
.title-btn {
  color: #2c7cf6;
  font-size: 26rpx;
}
</style>