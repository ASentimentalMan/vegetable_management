<template>
  <view class="page-container">
    <view class="apartment-container">
      <fake-search-bar text="搜索：贵州蔬菜集团有限公司" />
    </view>
    <view class="scrollable">
      <view class="people-container" style="margin-top: 48rpx">
        <block v-for="(item, index) in list1" :key="index">
          <view class="people-item-container" @tap="onTap(item)">
            <view class="people-item flex-horizontal flex-aic">
              <view class="people-avatar-container" v-if="item.avatar">
                <image
                  class="people-avatar"
                  :src="item.avatar"
                  v-if="item.avatar"
                />
              </view>
              <view class="people-text flex-horizontal flex-aic">
                <view> {{ item.name }} </view>
                <view class="job-container" v-if="item.jobTitle">{{
                  item.jobTitle
                }}</view>
              </view>
            </view>
          </view>
        </block>
      </view>
      <view class="people-container" style="margin-top: 24rpx">
        <block v-for="(item, index) in list1" :key="index">
          <view class="people-item-container" @tap="onTap(item)">
            <view class="people-item flex-horizontal flex-aic">
              <view class="people-avatar-container" v-if="item.avatar">
                <image
                  class="people-avatar"
                  :src="item.avatar"
                  v-if="item.avatar"
                />
              </view>
              <view class="people-text flex-horizontal flex-aic">
                <view> {{ item.name }} </view>
                <view class="job-container" v-if="item.jobTitle">{{
                  item.jobTitle
                }}</view>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>
    <view class="unscrollable">
      <view class="button-container" @tap="onCreate"> 邀请其它人员加入 </view>
    </view>
  </view>
</template>

<script>
import ListOptions from "@/components/public/list_options";
import FakeSearchBar from "@/components/public/fake_search_bar.vue";
export default {
  components: {
    ListOptions,
    FakeSearchBar,
  },
  data() {
    return {
      list1: [
        {
          avatar:
            "https://dev.ncpgz.com/assets/management/icons/orgnizaition_create.png",
          name: "李小龙",
          jobTitle: "主管",
        },
      ],
      list2: [
        {
          avatar:
            "https://dev.ncpgz.com/assets/management/icons/orgnizaition_create.png",
          name: "创建企业/团队",
          jobTitle: "主管",
        },
      ],
    };
  },
  onLoad(e) {
    if (e.apartment) {
      uni.setNavigationBarTitle({
        title: e.apartment,
      });
    }
  },
};
</script>

<style scoped>
.apartment-container {
  padding: 24rpx;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 44px;
  width: 100%;
}
.title-text {
  font-size: 38rpx;
  font-weight: bold;
  color: #010114;
}
.people-item-container {
  padding: 0 24rpx;
  background-color: #fff;
}
.people-item {
  padding: 24rpx 0;
}
.people-item-container:not(:last-child) .people-item {
  border-bottom: 1px solid #edeeef;
}
.people-avatar-container {
  margin-right: 24rpx;
}
.people-avatar {
  width: 72rpx;
  height: 72rpx;
}
.people-text {
  flex: 1;
  font-size: 32rpx;
  font-weight: bold;
  color: #010114;
}
.job-container {
  border: 1px solid #d3dae4;
  border-radius: 15rpx;
  font-size: 18rpx;
  font-weight: bold;
  color: #8599b2;
  margin-left: 12rpx;
  padding: 2rpx 6rpx;
}
.scrollable {
  margin-top: 44px;
}
.unscrollable {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 24rpx 40rpx;
  background-color: #fff;
}
.button-container {
  text-align: center;
  background-color: #2c7cf6;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
  height: 88rpx;
  line-height: 88rpx;
}
</style>