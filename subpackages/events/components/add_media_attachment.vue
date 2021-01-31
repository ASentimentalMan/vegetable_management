<template>
  <view v-if="disabled ? attachments.length : true">
    <view class="form-attachment-container flex-vertical">
      <view class="form-unit-container flex-horizontal flex-jcsb" v-if="title">
        <view class="form-unit-title">
          <text class="form-item-label"> {{ title }} </text>
        </view>
        <view class="form-unit-title">
          <view v-if="attachments.length < amount && !disabled">
            <uni-icons
              style="line-height: 1"
              @tap="onAttachmentAdd"
              type="plus"
              size="26"
              color="#2c7cf6"
            ></uni-icons>
          </view>
        </view>
      </view>
      <block v-for="(item, index) in attachments" :key="index">
        <view class="form-attachment flex-horizontal flex-aic">
          <image
            class="attachment-size"
            :src="item.subFileUrl ? item.subFileUrl : item.blob"
            mode="aspectFill"
            @tap="preview(index)"
          />
          <view
            class="attachment-detail flex-vertical flex-jcfs"
            v-if="item.subFileUrl"
          >
            <view class="attachment-text ellipsis">
              {{ item.originalFileName }}
            </view>
            <view class="attachment-text ellipsis">
              {{ item.createTime }}
            </view>
          </view>
          <view class="attachment-detail flex-vertical" v-else>
            <view class="attachment-text ellipsis"> {{ item.text }} </view>
          </view>
          <uni-icons
            style="margin-right: 6rpx"
            @tap="onAttachmentRemove(index)"
            v-if="!disabled"
            type="minus"
            size="26"
            color="red"
          ></uni-icons>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: 9,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    attachments: {
      type: Array,
      default: () => [
        {
          subFileUrl: "",
          blob: "",
          text: "",
        },
      ],
    },
  },
  computed: {
    ...mapState("user", {
      token: (state) => state.token,
    }),
  },
  methods: {
    onAttachmentRemove(index) {
      this.$emit("onAttachmentRemove", index);
    },
    onAttachmentAdd() {
      uni.chooseImage({
        count: 9 - this.attachments.length,
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          const tempFiles = chooseImageRes.tempFiles;
          this.$emit(
            "onAttachmentAdd",
            tempFilePaths.map((e, index) => {
              return {
                blob: e,
                text: "等待上传",
              };
            })
          );
          setTimeout(() => {
            for (let i = 0; i < this.attachments.length; i++) {
              if (!this.attachments[i]["subFileUrl"]) {
                this.$emit("onAttachmentProgress", {
                  index: i,
                  progress: 0,
                });
                const uploadTask = uni.uploadFile({
                  url:
                    process.env.NODE_ENV === "development"
                      ? "https://test.ncpgz.com/api/file/basis-file/upload"
                      : "https://vegetable.ncpgz.com/api/file/basis-file/upload",
                  filePath: this.attachments[i]["blob"],
                  name: "file",
                  formData: {
                    type: "business",
                    originalname: this.attachments[i]["originalname"],
                  },
                  header: {
                    token_type: "user",
                    Authorization: this.token,
                  },
                  success: (uploadFileRes) => {
                    const response = JSON.parse(uploadFileRes.data);
                    this.$emit("onAttachmentUploaded", {
                      index: i,
                      response: response.data,
                    });
                  },
                });
                uploadTask.onProgressUpdate((res) => {
                  this.$emit("onAttachmentProgress", {
                    index: i,
                    progress: res.progress,
                  });
                });
              }
            }
          }, 600);
        },
      });
    },
    preview(index) {
      if (this.disabled) {
        const urls = this.attachments.map((e) => {
          return e.fileUrl;
        });
        uni.previewImage({
          urls: urls,
          current: index,
        });
      }
    },
  },
};
</script>

<style scoped>
.form-attachment-container {
  margin: 24rpx 24rpx 0 24rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
}
.form-unit-container {
  margin: 0 32rpx;
  padding: 24rpx 0;
}
.form-attachment {
  margin: 0 24rpx;
  padding: 24rpx 0;
  font-size: 200rpx;
  line-height: 170rpx;
  text-align: center;
  color: #888888;
  position: relative;
  border-top: 1px solid #dddddd;
}
.form-attachment:last-child {
  padding-bottom: 24rpx;
}
.attachment-size {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
}
.attachment-detail {
  flex: 1;
  padding: 0 24rpx;
  font-size: 22rpx;
}
.attachment-text {
  text-align: left;
}
</style>