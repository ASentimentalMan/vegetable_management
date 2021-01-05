


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 客户名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入客户名称"
              v-model="name"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 客户类型 </view>
          <view class="form-item-input">
            <customer-type-picker @onPick="onCustomerTypeChange" />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 客户来源 </view>
          <view class="form-item-input">
            <customer-source-picker @onPick="onCustomerSourceChange" />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 客户等级 </view>
          <view class="form-item-input">
            <customer-level-picker @onPick="onCustomerLevelChange" />
          </view>
        </view>
      </view>
      <view class="form-container">
        <!-- <view class="form-item flex-horizontal">
          <view class="form-item-label"> 所属部门 </view>
          <view class="form-item-input">
            <receipt-type-picker @onApartmentChange="onApartmentChange" />
          </view>
        </view> -->
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 所属区域 </view>
          <view class="form-item-input">
            <receipt-type-picker @onAreaChange="onAreaChange" />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 所属行业 </view>
          <view class="form-item-input">
            <customer-industry-picker @onPick="onCustomerIndustryChange" />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 规模（人数） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入规模"
              v-model="dimension"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 负责人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入负责人"
              v-model="manager"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 座机 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入座机号码"
              v-model="tel"
            />
          </view>
        </view>
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 手机 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入手机号码"
              v-model="mobile"
            />
          </view>
        </view>
      </view>
      <!-- <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label"> 共享人 </view>
          <view class="form-item-input" @tap="onSelectFrom">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择共享人"
              v-model="creator"
              disabled
            />
          </view>
        </view>
      </view> -->
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
      <view class="form-unit-title"> 营业执照 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 开户许可证 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 征信证明 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 银行流水 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 财务报表 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 食品经营许可证 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 风控材料 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 实勘照片/视频 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
      <view class="form-unit-title"> 其它附件 </view>
      <view class="form-attachment-container">
        <block v-for="(item, index) in attachments" :key="index">
          <view class="form-attachment attachment-size">
            <image class="attachment-size" :src="item" mode="aspectFill" />
            <view
              class="attachment-remove-container"
              @click="onAttachmentRemove(index)"
            >
              <image
                class="attachment-remove"
                src="https://mall.ncpgz.com/ftp/suberQcw/assets/icons/store_icon_remove.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </block>
        <view
          class="attachment-add-container attachment-size"
          v-if="attachments.length < 9"
          @click="onAttachmentAdd"
        >
          <text class="attachment-add">+</text>
        </view>
      </view>
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
import CustomerTypePicker from "@/subpackages/events/components/costumer_type_picker";
import CustomerSourcePicker from "@/subpackages/events/components/costumer_source_picker";
import CustomerLevelPicker from "@/subpackages/events/components/costumer_level_picker";
import CustomerIndustryPicker from "@/subpackages/events/components/costumer_industry_picker";
import ReceiptTypePicker from "@/subpackages/events/components/receipt_type_picker";
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker";
import { createContractApi } from "@/apis/event_apis";
export default {
  components: {
    CustomerTypePicker,
    CustomerSourcePicker,
    CustomerLevelPicker,
    CustomerIndustryPicker,
    ReceiptTypePicker,
    BiaoFunDatePicker,
  },
  data() {
    return {
      eventId: "",
      name: "",
      type: {},
      source: "",
      level: {},
      apartment: {},
      area: {},
      industry: "",
      dimension: "",
      manager: "",
      tel: "",
      mobile: "",
      creator: "",
      description: "",
      attachments: [],
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
    onCustomerTypeChange(e) {
      this.type = e;
    },
    onCustomerSourceChange(e) {
      this.source = e;
    },
    onCustomerLevelChange(e) {
      this.level = e;
    },
    onCustomerIndustryChange(e) {
      this.industry = e;
    },
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
    onTimeSet(e) {
      this.time = e.f2;
    },
    onSelectFrom() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/orgnization/orgnization_list_page?mode=select",
      });
    },
    onSelectRelateContract() {
      uni.navigateTo({
        url:
          "/subpackages/events/pages/contract/contract_list_page?mode=select",
      });
    },
    onWarning() {
      uni.showToast({
        title: "请先选择合同开始日期",
        icon: "none",
      });
    },
    onAttachmentRemove(index) {
      this.attachments.splice(index, 1);
    },
    onAttachmentAdd() {
      uni.chooseImage({
        count: 9 - this.attachments.length,
        success: (chooseImageRes) => {
          // const tempFilePaths = chooseImageRes.tempFilePaths;
          // const userinfo = uni.getStorageSync("userinfo");
          // for (let i = 0; i < tempFilePaths.length; i++) {
          //   uni.uploadFile({
          //     url:
          //       process.env.NODE_ENV === "development"
          //         ? "https://mall.ncpgz.com/test/applets/image/upload"
          //         : "https://mall.ncpgz.com/suberqcw/applets/image/upload",
          //     filePath: tempFilePaths[i],
          //     name: "files",
          //     formData: {
          //       imgPath: "portal/goods",
          //       token: userinfo.token,
          //     },
          //     success: (uploadFileRes) => {
          //       const response = JSON.parse(uploadFileRes.data);
          //       if (response.code === 601) {
          //         uni.navigateBack();
          //         store.commit("user/logOut");
          //         uni.reLaunch({
          //           url: "/pages/home/home_page",
          //         });
          //         uni.showToast({
          //           title: response.data,
          //           icon: "none",
          //         });
          //       } else {
          //         console.log(response.data.imgUrl);
          //         this.images.push(response.data.imgUrl);
          //       }
          //     },
          //   });
          // }
        },
      });
    },
    onValidate() {
      if (!this.name) {
        uni.showToast({
          title: "请输入合同名称",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (this.onValidate()) {
        const payload = {
          businessId: this.eventId,
          contractName: this.name,
          contractNumber: this.number,
          contractType: this.type,
          contractAmount: this.price,
          partyA: this.partyA,
          partySignatoryA: this.partyARepresent,
          partyB: this.partyB,
          partySignatoryB: this.partyBRepresent,
          signingDate: this.signTime,
          startDate: this.startTime,
          endDate: this.endTime,
          remark: this.description,
          files: [],
        };
        console.log(payload);
        const response = await createContractApi(payload);
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
.radio {
  margin-left: 24rpx;
}
</style>