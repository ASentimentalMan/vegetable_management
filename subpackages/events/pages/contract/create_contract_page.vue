


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
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
          v-if="mode === 'read' ? type : true"
        >
          <view class="form-item-label"> 合同类型 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入合同类型"
              v-model="type"
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
          v-if="mode === 'read' ? partyA : true"
        >
          <view class="form-item-label"> 甲方公司名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入甲方公司名称"
              v-model="partyA"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? partyARepresent : true"
        >
          <view class="form-item-label"> 甲方签订人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入甲方签订人"
              v-model="partyARepresent"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? partyB : true"
        >
          <view class="form-item-label"> 乙方公司名称 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入乙方公司名称"
              v-model="partyB"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? partyBRepresent : true"
        >
          <view class="form-item-label"> 乙方签订人 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入乙方签订人"
              v-model="partyBRepresent"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
      </view>
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? signTime : true"
        >
          <view class="form-item-label"> 合同签订日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择合同签订日期"
              :defaultValue="signTimeDefaultValue"
              start="2019-07-19 09:00"
              :end="signTimePickerEndTime"
              fields="day"
              @change="onSignTimeSet"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
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
          v-if="mode === 'read' ? endTime : true"
        >
          <view class="form-item-label"> 合同结束日期 </view>
          <view class="form-item-input">
            <biao-fun-date-picker
              placeholder="请选择合同结束日期"
              :defaultValue="endTimeDefaultValue"
              start="2019-07-19 09:00"
              :end="endTimePickerEndTime"
              fields="day"
              @change="onEndTimeSet"
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
        title="附件"
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
      name: "",
      number: "",
      type: "",
      price: "",
      partyA: "",
      partyARepresent: "",
      partyB: "",
      partyBRepresent: "",
      signTime: "",
      signTimeDefaultValue: "",
      signTimePickerEndTime: "",
      startTime: "",
      startTimeDefaultValue: "",
      startTimePickerEndTime: "",
      endTime: "",
      endTimeDefaultValue: "",
      endTimePickerEndTime: "",
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
      this.name = item.contractName;
      this.number = item.contractNumber;
      this.type = item.contractType;
      this.price = item.contractAmount;
      this.partyA = item.partyA;
      this.partyARepresent = item.partySignatoryA;
      this.partyB = item.partyB;
      this.partyBRepresent = item.partySignatoryB;
      this.signTime = item.signingDate ? item.signingDate : "";
      this.signTimeDefaultValue = this.signTime;
      this.startTime = item.startDate ? item.startDate : "";
      this.startTimeDefaultValue = this.startTime;
      this.endTime = item.endDate ? item.endDate : "";
      this.endTimeDefaultValue = this.endTime;
      this.description = item.remark;
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
    this.initTimePicker();
  },
  methods: {
    initTimePicker() {
      const time = new Date();
      this.signTimePickerEndTime =
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
      this.endTimePickerEndTime =
        time.getFullYear() +
        20 +
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
    onSignTimeSet(e) {
      this.signTime = e.f1;
    },
    onStartTimeSet(e) {
      this.startTime = e.f1;
    },
    onEndTimeSet(e) {
      this.endTime = e.f1;
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
      if (!this.name) {
        uni.showToast({
          title: "请输入合同名称",
          icon: "none",
        });
        return false;
      }
      if (
        this.startTime &&
        this.endTime &&
        new Date(this.startTime) > new Date(this.endTime)
      ) {
        uni.showToast({
          title: '"合同结束日期" 不能早于 "合同开始日期"',
          icon: "none",
          duration: 3000,
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
</style>