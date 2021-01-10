


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
		  <view class="form-item flex-horizontal">
		    <view class="form-item-label">
		      <text class="form-item-required">*</text>
		      销售单编号
		    </view>
		    <view class="form-item-input">
		      <input
		        class="form-input"
		        type="text"
		        cursor-spacing="16"
		        placeholder="请输入销售单编号,自定义标识"
		        v-model="num"
		      />
		    </view>
		  </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label">
            <!-- <text class="form-item-required">*</text> -->
            收货人
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收货人"
              v-model="receiver"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 收货联系电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入收货联系电话"
              v-model="tel"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 销售地 </view>
          <view class="form-item-input" @click="onLocationPick">
            <view
              :class="{
                'form-item-placeholder': locationString === '请选择销售地',
              }"
            >
              {{ locationString }}
            </view>
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 预计回款日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择预计回款日期"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onTimeSet"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 是否按合同执行 </view>
          <radio-group @change="onRadioChange" class="form-item-input">
            <label class="radio"><radio value="true" />是</label>
            <label class="radio"><radio value="false" />否</label>
          </radio-group>
        </view>
      </view>
      <view class="form-container" v-if="radio === 'false'">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 预计新回款日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择预计新回款日期"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onReTimeSet"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 签收日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择签收日期"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onRceiveTimeSet"
            />
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
      <add-media-attachment
        title="附件"
        :attachments="attachments"
        @onAttachmentAdd="onAttachmentAdd"
        @onAttachmentRemove="onAttachmentRemove"
        @onAttachmentProgress="onAttachmentProgress"
        @onAttachmentUploaded="onAttachmentUploaded"
      />
    </view>
    <view class="unscrollable">
      <view class="bottom-button-container">
        <view class="button-container" @tap="onHandle">
          <view class="bottom-button"> 完成 </view>
        </view>
      </view>
    </view>
    <location-picker ref="location" :level="3" @onLocationSet="onLocationSet" />
  </view>
</template>

<script>
import LocationPicker from "@/components/public/location_picker";
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createSaleApi } from "@/apis/event_apis";
export default {
  components: {
    LocationPicker,
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      eventId: "",
      receiver: "",
      num: "",
      tel: "",
      location: [],
      locationString: "请选择销售地",
      time: "",
      timePickerEndTime: "",
      radio: "",
      reTime: "",
      receiveTime: "",
      description: "",
      attachments: [],
      onNetworking: false,
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    console.log(this.eventId);
    this.setTimePickerEndTime();
  },
  methods: {
    setTimePickerEndTime() {
      const time = new Date();
      this.timePickerEndTime =
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
    onTimeSet(e) {
      // this.time =e.f2;
      this.time = new Date(e.f2);
    },
    onReTimeSet(e) {
      // this.reTime =e.f2;
      this.reTime = new Date(e.f2);
    },
    onRceiveTimeSet(e) {
 // this.receiveTime =e.f2;
      this.receiveTime = new Date(e.f2);
    },
    onLocationPick() {
      this.$refs.location.popup();
    },
    onLocationSet(location) {
      if (location.length) {
        this.location = location;
        this.locationString = location.map((e) => e.name).join("/");
      }
    },
    onRadioChange(e) {
      this.radio = e.target.value;
    },
    onAttachmentAdd(attachments) {
      this.attachments = this.attachments.concat(attachments);
    },
    onAttachmentRemove(index) {
      this.attachments.splice(index, 1);
    },
    onAttachmentProgress(params) {
      this.attachments[params.index]["text"] = params.progress + "%";
    },
    onAttachmentUploaded(params) {
      this.$set(
        this.attachments,
        params.index,
        Object.assign(this.attachments[params.index], params.response)
      );
    },
    onValidate() {
      if (!this.num) {
        uni.showToast({
          title: "请输入销售单编号",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (!this.onNetworking && this.onValidate()) {
        const payload = {
          businessId: this.eventId,
          salesNumber: this.num,
          consignee: this.receiver,
          phone: this.tel,
          place:
            this.locationString === "请选择销售地" ? "" : this.locationString,
          estimatedDate: this.time,
          isExecuteContract: this.radio,
          newEstimatedDate: this.reTime,
          receiptDate: this.receiveTime,
          remark: this.description,
          files: this.attachments.map((e) => {
            return {
              fileName: e.fileName,
              fileOriginalName: e.originalname,
              fileSubUrl: e.subFileUrl,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
        };
        console.log(payload);
        this.onNetworking = true;
        const response = await createSaleApi(payload);
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
    },
  },
};
</script>

<style scoped>
.radio {
  margin-left: 24rpx;
}
</style>