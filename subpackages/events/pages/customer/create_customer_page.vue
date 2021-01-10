


<template>
  <view class="page-container">
    <view class="scrollable">
      <view class="form-container">
        <view class="form-item flex-horizontal">
          <view class="form-item-label">
            <text class="form-item-required">*</text>客户名称
          </view>
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
          <view class="form-item-input" @click="onLocationPick">
            <view
              :class="{
                'form-item-placeholder': locationString === '请选择所属区域',
              }"
            >
              {{ locationString }}
            </view>
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
      <add-media-attachment
        title="营业执照"
        :attachments="businessLicenses"
        @onAttachmentAdd="onBusinessLicenseAdd"
        @onAttachmentRemove="onBusinessLicenseRemove"
        @onAttachmentProgress="onBusinessLicenseProgress"
        @onAttachmentUploaded="onBusinessLicenseUploaded"
      />
      <add-media-attachment
        title="开户许可证"
        :attachments="accountOpeningLicenses"
        @onAttachmentAdd="onAccountOpeningLicenseAdd"
        @onAttachmentRemove="onAccountOpeningLicenseRemove"
        @onAttachmentProgress="onAccountOpeningLicenseProgress"
        @onAttachmentUploaded="onAccountOpeningLicenseUploaded"
      />
      <add-media-attachment
        title="征信证明"
        :attachments="creditReports"
        @onAttachmentAdd="onCreditReportAdd"
        @onAttachmentRemove="onCreditReportRemove"
        @onAttachmentProgress="onCreditReportProgress"
        @onAttachmentUploaded="onCreditReportUploaded"
      />
      <add-media-attachment
        title="银行流水"
        :attachments="bankStatements"
        @onAttachmentAdd="onBankStatementAdd"
        @onAttachmentRemove="onBankStatementRemove"
        @onAttachmentProgress="onBankStatementProgress"
        @onAttachmentUploaded="onBankStatementUploaded"
      />
      <add-media-attachment
        title="财务报表"
        :attachments="financialStatements"
        @onAttachmentAdd="onFinancialStatementAdd"
        @onAttachmentRemove="onFinancialStatementRemove"
        @onAttachmentProgress="onFinancialStatementProgress"
        @onAttachmentUploaded="onFinancialStatementUploaded"
      />
      <add-media-attachment
        title="食品经营许可证"
        :attachments="foodLicenses"
        @onAttachmentAdd="onFoodLicenseAdd"
        @onAttachmentRemove="onFoodLicenseRemove"
        @onAttachmentProgress="onFoodLicenseProgress"
        @onAttachmentUploaded="onFoodLicenseUploaded"
      />
      <add-media-attachment
        title="风控材料"
        :attachments="riskControlData"
        @onAttachmentAdd="onRiskControlDataAdd"
        @onAttachmentRemove="onRiskControlDataRemove"
        @onAttachmentProgress="onRiskControlDataProgress"
        @onAttachmentUploaded="onRiskControlDataUploaded"
      />
      <add-media-attachment
        title="实勘照片/视频"
        :attachments="realMedia"
        @onAttachmentAdd="onRealMediaAdd"
        @onAttachmentRemove="onRealMediaRemove"
        @onAttachmentProgress="onRealMediaProgress"
        @onAttachmentUploaded="onRealMediaUploaded"
      />
      <add-media-attachment
        title="其它附件"
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
import UniDataPicker from "@/components/uni-data-picker/uni-data-picker";
import CustomerTypePicker from "@/subpackages/events/components/costumer_type_picker";
import CustomerSourcePicker from "@/subpackages/events/components/costumer_source_picker";
import CustomerLevelPicker from "@/subpackages/events/components/costumer_level_picker";
import LocationPicker from "@/components/public/location_picker";
import CustomerIndustryPicker from "@/subpackages/events/components/costumer_industry_picker";
import ReceiptTypePicker from "@/subpackages/events/components/receipt_type_picker";
import BiaoFunDatePicker from "@/components/biaofun-datetime-picker/biaofun-datetime-picker";
import AddMediaAttachment from "@/subpackages/events/components/add_media_attachment";
import { createCustomerApi } from "@/apis/event_apis";
export default {
  components: {
    UniDataPicker,
    CustomerTypePicker,
    CustomerSourcePicker,
    CustomerLevelPicker,
    LocationPicker,
    CustomerIndustryPicker,
    ReceiptTypePicker,
    BiaoFunDatePicker,
    AddMediaAttachment,
  },
  data() {
    return {
      eventId: "",
      name: "",
      type: {},
      source: {},
      level: {},
      location: [],
      locationString: "请选择所属区域",
      apartment: {},
      area: {},
      industry: {},
      dimension: "",
      manager: "",
      tel: "",
      mobile: "",
      creator: "",
      description: "",
      businessLicenses: [],
      accountOpeningLicenses: [],
      creditReports: [],
      bankStatements: [],
      financialStatements: [],
      foodLicenses: [],
      riskControlData: [],
      realMedia: [],
      attachments: [],
      onNetworking: false,
    };
  },
  onLoad(e) {
    if (e.eventId) {
      this.eventId = e.eventId;
    }
    // console.log(this.eventId);
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
    onLocationPick() {
      this.$refs.location.popup();
    },
    onLocationSet(location) {
      if (location.length) {
        this.location = location;
        this.locationString = location.map((e) => e.name).join("/");
      }
    },
    onCustomerIndustryChange(e) {
      this.industry = e;
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
    onBusinessLicenseAdd(attachments) {
      this.businessLicenses = this.businessLicenses.concat(attachments);
    },
    onBusinessLicenseRemove(index) {
      this.businessLicenses.splice(index, 1);
    },
    onBusinessLicenseProgress(params) {
      this.businessLicenses[params.index]["text"] = params.progress + "%";
    },
    onBusinessLicenseUploaded(params) {
      this.$set(
        this.businessLicenses,
        params.index,
        Object.assign(this.businessLicenses[params.index], params.response)
      );
    },
    onAccountOpeningLicenseAdd(attachments) {
      this.accountOpeningLicenses = this.accountOpeningLicenses.concat(
        attachments
      );
    },
    onAccountOpeningLicenseRemove(index) {
      this.accountOpeningLicenses.splice(index, 1);
    },
    onAccountOpeningLicenseProgress(params) {
      this.accountOpeningLicenses[params.index]["text"] = params.progress + "%";
    },
    onAccountOpeningLicenseUploaded(params) {
      this.$set(
        this.accountOpeningLicenses,
        params.index,
        Object.assign(
          this.accountOpeningLicenses[params.index],
          params.response
        )
      );
    },
    onCreditReportAdd(attachments) {
      this.creditReports = this.creditReports.concat(attachments);
    },
    onCreditReportRemove(index) {
      this.creditReports.splice(index, 1);
    },
    onCreditReportProgress(params) {
      this.creditReports[params.index]["text"] = params.progress + "%";
    },
    onCreditReportUploaded(params) {
      this.$set(
        this.creditReports,
        params.index,
        Object.assign(this.creditReports[params.index], params.response)
      );
    },
    onBankStatementAdd(attachments) {
      this.bankStatements = this.bankStatements.concat(attachments);
    },
    onBankStatementRemove(index) {
      this.bankStatements.splice(index, 1);
    },
    onBankStatementProgress(params) {
      this.bankStatements[params.index]["text"] = params.progress + "%";
    },
    onBankStatementUploaded(params) {
      this.$set(
        this.bankStatements,
        params.index,
        Object.assign(this.bankStatements[params.index], params.response)
      );
    },
    onFinancialStatementAdd(attachments) {
      this.financialStatements = this.financialStatements.concat(attachments);
    },
    onFinancialStatementRemove(index) {
      this.financialStatements.splice(index, 1);
    },
    onFinancialStatementProgress(params) {
      this.financialStatements[params.index]["text"] = params.progress + "%";
    },
    onFinancialStatementUploaded(params) {
      this.$set(
        this.financialStatements,
        params.index,
        Object.assign(this.financialStatements[params.index], params.response)
      );
    },
    onFoodLicenseAdd(attachments) {
      this.foodLicenses = this.foodLicenses.concat(attachments);
    },
    onFoodLicenseRemove(index) {
      this.foodLicenses.splice(index, 1);
    },
    onFoodLicenseProgress(params) {
      this.foodLicenses[params.index]["text"] = params.progress + "%";
    },
    onFoodLicenseUploaded(params) {
      this.$set(
        this.foodLicenses,
        params.index,
        Object.assign(this.foodLicenses[params.index], params.response)
      );
    },
    onRiskControlDataAdd(attachments) {
      this.riskControlData = this.riskControlData.concat(attachments);
    },
    onRiskControlDataRemove(index) {
      this.riskControlData.splice(index, 1);
    },
    onRiskControlDataProgress(params) {
      this.riskControlData[params.index]["text"] = params.progress + "%";
    },
    onRiskControlDataUploaded(params) {
      this.$set(
        this.riskControlData,
        params.index,
        Object.assign(this.riskControlData[params.index], params.response)
      );
    },
    onRealMediaAdd(attachments) {
      this.realMedia = this.realMedia.concat(attachments);
    },
    onRealMediaRemove(index) {
      this.realMedia.splice(index, 1);
    },
    onRealMediaProgress(params) {
      this.realMedia[params.index]["text"] = params.progress + "%";
    },
    onRealMediaUploaded(params) {
      this.$set(
        this.realMedia,
        params.index,
        Object.assign(this.realMedia[params.index], params.response)
      );
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
          title: "请输入客户名称",
          icon: "none",
        });
        return false;
      }
      return true;
    },
    async onHandle() {
      if (this.onValidate()) {
        console.log(this.type);
        console.log(this.source);
        console.log(this.level);
        console.log(this.industry);
        console.log(this.area);
        const payload = {
          customerName: this.name,
          // customerNumber: "",
          customerType: this.type.label,
          customerTypeId: this.type.id,
          customerSource: this.source.label,
          customerSourceId: this.source.id,
          customerLevel: this.level.label,
          customerLevelId: this.level.id,
          area:
            this.locationString === "请选择所属区域" ? "" : this.locationString,
          industry: this.industry.label,
          industryId: this.industry.id,
          scale: this.dimension,
          personInCharge: this.manager,
          personInChargeId: "",
          tel: this.tel,
          mobile: this.mobile,
          remark: this.description,
          licenseFiles: this.businessLicenses.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          openAccountFiles: this.accountOpeningLicenses.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          creditFiles: this.creditReports.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          bankFiles: this.bankStatements.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          financeFiles: this.financialStatements.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          foodFiles: this.foodLicenses.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          riskFiles: this.riskControlData.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          surveyFiles: this.realMedia.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
          otherFiles: this.attachments.map((e) => {
            return {
              customerFileType: "",
              fileName: e.fileName,
              fileOriginalName: e.originalFileName,
              fileSubUrl: e.subFileUrl,
              fileType: e.fileType,
              fileUrl: e.fileUrl,
              remark: "",
            };
          }),
        };
        console.log(payload);
        this.onNetworking = true;
        const response = await createCustomerApi(payload);
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