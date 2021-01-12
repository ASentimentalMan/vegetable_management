<template>
  <view>
    <view class="form-unit-title" v-if="title"> {{ title }} </view>
    <view class="form-attachment-container">
      <block v-for="(item, index) in attachments" :key="index">
        <view class="form-attachment attachment-size">
          <image
            class="attachment-size"
            :src="item.subFileUrl ? item.subFileUrl : item.blob"
            mode="aspectFill"
            @tap="preview(index)"
          />
          <view
            v-if="!disabled"
            class="attachment-remove-container"
            @click="onAttachmentRemove(index)"
          >
            <image
              class="attachment-remove"
              src="https://dev.ncpgz.com/assets/icons/store_icon_remove.png"
              mode="aspectFill"
            />
          </view>
          <view
            class="attachment-cover attachment-size flex-vertical flex-aic flex-jcc"
            v-if="!item.subFileUrl"
          >
            <view class="attachment-cover-text"> {{ item.text }} </view>
          </view>
        </view>
      </block>
      <view
        class="attachment-add-container attachment-size"
        v-if="attachments.length < amount && !disabled"
        @click="onAttachmentAdd"
      >
        <text class="attachment-add">+</text>
      </view>
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
          // console.log(tempFilePaths);
          // console.log(tempFiles);
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
                      ? "https://dev.ncpgz.com/test/file/basis-file/upload"
                      : "https://dev.ncpgz.com/test/file/basis-file/upload",
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
.form-unit-title {
  margin: 24rpx 24rpx 0 24rpx;
}
.form-attachment-container {
  margin: 24rpx 24rpx 0 24rpx;
  padding-top: 24rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  display: flex;
  flex-wrap: wrap;
}
.form-attachment {
  border: 1px solid #dddddd;
  font-size: 200rpx;
  line-height: 170rpx;
  text-align: center;
  color: #888888;
  margin-left: 24rpx;
  margin-bottom: 24rpx;
  position: relative;
}
.attachment-size {
  width: 200rpx;
  height: 200rpx;
}
.attachment-remove-container {
  position: absolute;
  right: -15rpx;
  top: -20rpx;
  width: 40rpx;
  height: 40rpx;
  z-index: 2;
}
.attachment-remove {
  width: 40rpx;
  height: 40rpx;
}
.attachment-add-container {
  background-color: #eaeaea;
  font-size: 200rpx;
  line-height: 120rpx;
  text-align: center;
  color: #888888;
  margin-left: 24rpx;
  margin-bottom: 24rpx;
}
.attachment-add {
  font-size: 120rpx;
  font-weight: 100;
  color: #888888;
}
.attachment-cover {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.attachment-cover-text {
  color: white;
}
</style>