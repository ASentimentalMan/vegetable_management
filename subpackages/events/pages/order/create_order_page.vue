


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label">
            <text class="form-item-required">*</text>
            采购单编号
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购单编号,自定义标识"
              v-model="num"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label">
            <!-- <text class="form-item-required">*</text> -->
            基地名称
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地名称"
              v-model="name"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 基地面积（亩） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地面积"
              v-model="area"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 联系人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地联系人"
              v-model="contact"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 联系电话 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入基地联系电话"
              v-model="tel"
            />
          </view>
        </view>
      </view>
<!--      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购品类 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择采购品类"
              v-model="partyA"
            />
          </view>
        </view>
      </view> -->
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择采购日期"
              start="2019-07-19 09:00"
              :end="timePickerEndTime"
              fields="day"
              @change="onTimeSet"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购数量（吨） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购数量"
              v-model="amount"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购单价（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购单价"
              v-model="unitPrice"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 采购总价（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入采购总价"
              v-model="price"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 货源提供客户 </view>
          <view class="form-item-input" @tap="onSelectProvider">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择货源提供客户"
              v-model="providerString"
              disabled
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
  </view>
</template>

<script>
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createOrderApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      eventId: "",
      name: "",
      num: "",
      area: "",
      contact: "",
      tel: "",
      type: [],
      time: "",
      timePickerEndTime: "",
      amount: "",
      unitPrice: "",
      price: "",
      provider: {},
      providerString: "",
      description: "",
      attachments: [],
      onNetworking: false,
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
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
      // this.time = e.f2;
	  this.time = new Date(e.f2);
    },
    onSelectProvider() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=provider",
      });
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
          title: "请输入采购单编号",
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
          procureNumber: this.num,
          baseName: this.name,
          baseArea: this.area,
          contact: this.contact,
          contactTel: this.tel,
          purchaseDate: this.time,
          quantity: this.amount,
          unitPrice: this.unitPrice,
          totalPrice: this.price,
          sourceInputCustomerId: this.provider.id,
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
        const response = await createOrderApi(payload);
        if (response) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.$vm.needRefresh = true;
          uni.showToast({
            title: "创建成功",
            icon: "none",
          });
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
</style>