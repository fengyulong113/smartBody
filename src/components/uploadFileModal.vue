<template>
  <a-modal
    title="上传文件"
    :width="600"
    @cancel="handleCancel"
    @ok="handleOk"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :zIndex="9999"
    okText="提交"
  >
    <div style="min-height: 400px">
      <a-row :gutter="20">
        <a-col :span="12">
          <a-upload
            :file-list="fileList"
            :remove="(file) => myRemoveFile(file, fileList)"
            :before-upload="(file) => myBeforeUploadFile(file, fileList)"
            :multiple="true"
            :showUploadList="{
              showRemoveIcon: true,
            }"
          >
            <a-button type="primary">
              <a-icon type="file" /> 选择文件
            </a-button>
          </a-upload>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import { uploadBatchForeignId } from "../api/smartBody";
export default {
  name: "uploadFileModal",
  data() {
    return {
      visible: false,
      confirmLoading: false,
      fileList: [],

      foreignIds: "",
      foreignType: "",
      attachStage: "",
      attachCategory: "",
    };
  },
  methods: {
    show(foreignIds, foreignType, attachStage, attachCategory) {
      console.log("foreignIds", foreignIds);
      this.visible = true;
      this.foreignIds = foreignIds;
      this.foreignType = foreignType;
      this.attachStage = attachStage;
      this.attachCategory = attachCategory;
    },
    handleCancel() {
      this.confirmLoading = false;
      this.fileList = [];
      this.visible = false;
    },
    handleOk() {
      console.log("this.fileList", this.fileList);
      if (this.fileList.length > 0) {
        this.confirmLoading = true;
        let formData = new FormData();
        formData.append("foreignIds", this.foreignIds);
        formData.append("foreignType", this.foreignType);
        formData.append("attachStage", this.attachStage);
        formData.append("attachCategory", this.attachCategory);
        this.fileList.forEach((file) => {
          formData.append("files", file);
        });

        uploadBatchForeignId(formData)
          .then((res) => {
            console.log(res)
            // if (res.status === 1) {
            //   this.$message.success("上传成功！");
            //   let emitParams = {
            //     foreignIds: this.foreignIds,
            //     foreignType: this.foreignType,
            //     attachStage: this.attachStage,
            //     attachCategory: this.attachCategory,
            //   };
            //   this.$emit("success", emitParams);
            //   this.handleCancel();
            // } else {
            //   this.$message.error(res.message);
            // }
          })
          .finally(() => {
            this.confirmLoading = false;
          });
      } else {
        this.handleCancel();
      }
    },

    myRemoveFile(file, fileList) {
      let i = fileList.indexOf(file);
      fileList.splice(i, 1);
    },
    myBeforeUploadFile(file, fileList) {
      fileList.push(file);
      return false;
    },
  },
  mounted() {},
};
</script>
