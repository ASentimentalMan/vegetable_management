


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? topic : true"
        >
          <view class="form-item-label">
            <text class="form-item-required" v-if="mode !== 'read'">*</text>
            议题
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入会议议题"
              v-model="topic"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? type.label : true"
        >
          <view class="form-item-label"> 会议类型 </view>
          <view class="form-item-input">
            <meeting-type-picker
              ref="meetingTypePicker"
              @onMeetingTypeChange="onMeetingTypeChange"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
		<view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? brief : true"
        >
          <view class="form-item-label">
            <!-- <text class="form-item-required">*</text> -->
            纪要
          </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入会议纪要"
              v-model="brief"
              :disabled="mode === 'read'"
            />
          </view>
        </view>
        <view
          class="form-item flex-horizontal"
          v-if="mode === 'read' ? result : true"
        >
          <view class="form-item-label"> 结果 </view>
          <view class="form-item-input">
            <input
              class="form-input"
              type="text"
              cursor-spacing="16"
              placeholder="请输入会议结果"
              v-model="result"
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
        title="会议文件"
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
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import meetingTypePicker from "@/subpackages/events/components/meeting_type_picker.vue";
import { createMeetingApi, editMeetingApi } from "@/apis/event_apis";
export default {
  components: {
    AddMediaAttachment,
	meetingTypePicker
  },
  data() {
    return {
      mode: "create",
      eventId: "",
      meetingId: "",
      onNetworking: false,
      type: {},
      topic: "",
      brief: "",
      result: "",
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
      this.meetingId = item.id;
      if (this.mode === "edit") {
        uni.setNavigationBarTitle({
          title: "修改会议",
        });
      } else if (this.mode === "read") {
        uni.setNavigationBarTitle({
          title: "会议详情",
        });
      }
      this.topic = item.title;
      this.brief = item.summary;
      this.result = item.consequence;
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
	if (this.type.label) {
	   this.$refs.MeetingTypePicker.setSelectedStr(this.type.label);
	}
  },
  methods: {
	onMeetingTypeChange(e) {
		this.type = e;
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
      if (!this.topic) {
        uni.showToast({
          title: "请输入会议标题",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (!this.onNetworking && this.onValidate()) {
        let payload = {
          businessId: this.eventId,
          title: this.topic,
		  meetingType: this.type.label ,
		  meetingTypeId: this.type.id ,
          summary: this.brief,
          consequence: this.result,
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
        // console.log(payload);
        this.onNetworking = true;
        let response;
        if (this.mode === "create") {
          response = await createMeetingApi(payload);
        } else if (this.mode === "edit") {
          payload["id"] = this.meetingId;
          response = await editMeetingApi(payload);
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