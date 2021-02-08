


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? type : true"
        >
          <view class="form-item-label">
            <text class="form-item-required" v-if="mode !== 'read'">*</text>
            合同类型
          </view>
          <radio-group @change="onRadioChange" class="form-item-input">
            <label class="radio flex-horizontal flex-aic">
              <radio
                :disabled="mode === 'read'"
                :checked="type === 'procure'"
                value="procure"
              />
              采购合同
            </label>
            <label class="radio flex-horizontal flex-aic">
              <radio
                :disabled="mode === 'read'"
                :checked="type === 'sale'"
                value="sale"
              />
              销售合同
            </label>
          </radio-group>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? name : true"
        >
          <view class="form-item-label">
            <text class="form-item-required" v-if="mode !== 'read'">*</text>
            合同名称
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同名称"
              v-model="name"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? number : true"
        >
          <view class="form-item-label"> 合同编号 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同编号"
              v-model="number"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? price : true"
        >
          <view class="form-item-label"> 合同金额（元） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同金额"
              v-model="price"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? partyAString : true"
        >
          <view class="form-item-label"> 甲方公司 </view>
          <view class="form-item-input" @tap="onSelectPartyA">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择甲方公司"
              v-model="partyAString"
              disabled
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? partyBString : true"
        >
          <view class="form-item-label"> 乙方公司 </view>
          <view class="form-item-input" @tap="onSelectPartyB">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请选择乙方公司"
              v-model="partyBString"
              disabled
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? startTime : true"
        >
          <view class="form-item-label"> 合同开始日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择合同开始日期"
              :defaultValue="startTimeDefaultValue"
              start="2019-07-19 09:00"
              :end="startTimePickerEndTime"
              fields="day"
              @change="onStartTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? period : true"
        >
          <view class="form-item-label"> 合同有效期（月） </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同有效期"
              maxlength="3"
              v-model="period"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? description : true"
        >
          <view class="form-item-label"> 备注 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入备注"
              v-model="description"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <add-media-attachment
        title="合同照片"
        :disabled="mode === 'read'"
        :attachments="attachments"
        @onAttachmentAdd="onAttachmentAdd"
        @onAttachmentRemove="onAttachmentRemove"
        @onAttachmentProgress="onAttachmentProgress"
        @onAttachmentUploaded="onAttachmentUploaded"
      />
    </view>
    <view
      class="unscrollable"
      style="height: 40rpx"
      v-if="mode === 'read'"
    ></view>
    <view class="unscrollable" v-else>
      <view class="bottom-button-container">
        <view class="button-container" @tap="onHandle">
          <view class="bottom-button"> 完成 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createContractApi, editContractApi } from "@/apis/event_apis";
export default {
  components: {
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      mode: "create",
      eventId: "",
      contractId: "",
      onNetworking: false,
      type: "",
      name: "",
      number: "",
      price: "",
      partyA: {},
      partyAString: "",
      partyB: {},
      partyBString: "",
      startTime: "",
      startTimeDefaultValue: "",
      startTimePickerEndTime: "",
      period: "",
      description: "",
      attachments: [],
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    if (e.mode) {
      this.mode = e.mode;
      const item = JSON.parse(e.item);
      // console.log(item);
      this.contractId = item.id;
      if (this.mode === "edit") {
        uni.setNavigationBarTitle({
          title: "修改合同",
        });
      } else if (this.mode === "read") {
        uni.setNavigationBarTitle({
          title: "合同详情",
        });
      }
      this.type = item.contractType;
      this.name = item.contractName;
      this.number = item.contractNumber;
      this.price = item.contractAmount;
      // this.partyA["id"] = item.partyA;
      this.partyAString = item.partyA;
      // this.partyB["id"] = item.partyB;
      this.partyBString = item.partyB;
      this.startTime = item.startDate ? item.startDate : "";
      this.startTimeDefaultValue = this.startTime;
      this.period = item.validPeriod;
      this.description = item.remark;
      if (item.files && item.files.length) {
        this.attachments = item.files.map((e) => {
        return {
          blob: "",
          createTime: e.createTime,
          fileName: e.fileName,
          fileType: e.fileType,
          fileUrl: e.fileUrl,
          id: e.id,
          originalFileName: e.fileOriginalName,
          subFileUrl: e.fileSubUrl,
          text: "",
          updateTime: e.updateTime,
        };
      });
      }
    }
    this.initTimePicker();
  },
  methods: {
    initTimePicker() {
      const time = new Date();
      this.startTimePickerEndTime =
        time.getFullYear() +
        5 +
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
    onRadioChange(e) {
      // console.log(e.target.value);
      this.type = e.target.value;
    },
    onSelectPartyA() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=partyA&selectedIds=" +
          JSON.stringify([this.partyA.id]),
      });
    },
    onSelectPartyB() {
      if (this.mode === "read") return;
      uni.navigateTo({
        url:
          "/subpackages/events/pages/customer/customer_list_page?mode=select&key=partyB&selectedIds=" +
          JSON.stringify([this.partyB.id]),
      });
    },
    onStartTimeSet(e) {
      this.startTime = e.f1;
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
      if (!this.type) {
        uni.showToast({
          title: "请选择合同类型",
          icon: "none",
        });
        return false;
      }
      if (!this.name) {
        uni.showToast({
          title: "请输入合同名称",
          icon: "none",
        });
        return false;
      }
      if (this.attachments.length) {
        for (let item of this.attachments) {
          if (!item.subFileUrl) {
            uni.showToast({
              title: "请等待文件上传完成",
              icon: "none",
            });
            return false;
          }
        }
      }
      return true;
    },
    async onHandle() {
      if (!this.onNetworking && this.onValidate()) {
        let payload = {
          businessId: this.eventId,
          contractType: this.type,
          contractName: this.name,
          contractNumber: this.number,
          contractAmount: this.price,
          partyA: this.partyAString,
          partyAId: this.partyA.id,
          partyB: this.partyBString,
          partyBId: this.partyB.id,
          startDate: this.startTime,
          validPeriod: this.period,
          remark: this.description,
          files: this.attachments.map((e) => {
            return {
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
        };
        this.onNetworking = true;
        let response;
        if (this.mode === "create") {
          response = await createContractApi(payload);
        } else if (this.mode === "edit") {
          payload["id"] = this.contractId;
          response = await editContractApi(payload);
        }
        this.onNetworking = false;
        if (response) {
          this.onRefreshPreviousPage();
          uni.showToast({
            title: `${this.mode === "create" ? "创建" : "修改"}成功`,
            icon: "none",
          });
          this.onNetworking = true;
          setTimeout(() => {
            uni.navigateBack();
          }, 600);
        }
      }
    },
    onRefreshPreviousPage() {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.$vm.needRefresh = true;
    },
  },
};
</script>

<style scoped>
.radio {
  margin-left: 24rpx;
}
</style>