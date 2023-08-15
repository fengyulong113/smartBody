<template>
  <a-modal
    title="新增模型"
    v-model="addVisible"
    @cancel="cancelAddModel"
    :width="600"
    centered
    :footer="null"
  >
    <el-steps :active="currentStep" simple style="margin-bottom: 20px">
      <el-step title="步骤一：基本信息" icon="el-icon-edit"></el-step>
      <el-step title="步骤二：上传文件" icon="el-icon-upload"></el-step>
    </el-steps>
    <div v-if="currentStep === 1">
      <a-form-model
        :model="modelForm"
        :label-col="{ span: 2, offset: 1 }"
        :wrapper-col="{ span: 20 }"
        labelAlign="right"
        ref="addModelForm"
        :maskClosable="false"
        :rules="rules"
      >
        <a-form-model-item label="名称" prop="modelName">
          <a-input v-model="modelForm.modelName" />
        </a-form-model-item>

        <a-form-model-item label="版本" prop="modelVersion">
          <a-input v-model="modelForm.modelVersion" />
        </a-form-model-item>

        <a-form-model-item label="格式" prop="modelFormat">
          <a-input v-model="modelForm.modelFormat" />
        </a-form-model-item>

        <a-form-model-item label="描述" prop="modelDesc">
          <a-textarea v-model="modelForm.modelDesc" :autoSize="{ minRows: 4, maxRows: 4 }" />
        </a-form-model-item>

        <a-form-model-item label="备注" prop="smallModelRemark">
          <a-input v-model="modelForm.smallModelRemark" />
        </a-form-model-item>
        
      </a-form-model>

      <a-row>
        <a-button type="primary" style="float: right;margin-top: 10px" @click="addModelSubmit">保存并下一步</a-button>
      </a-row>
    </div>
    <div v-if="currentStep === 2">
      <span>上传文件：</span>
      <a-upload
        :file-list="fileList"
        :multiple="false"
        :remove="(file) => myRemoveFile(file, fileList)"
        :before-upload="(file) => myBeforeUploadFile(file)"
        :showUploadList="{
          showRemoveIcon: true,
        }"
      >
        <a-button type="primary">
          <a-icon type="file" /> 选择文件
        </a-button>
      </a-upload>
      <a-row>
        <a-button type="primary" style="float: right;margin-top: 10px" @click="handleOk">保存</a-button>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import { insertSmallModel } from '@/api/smallModel'
import { uploadSingleForeignId } from '../api/file'
import { smallStageFile } from '../utils/index'
export default {
  name: "addModel",
  data() {
    return {
      addVisible: false,
      currentStep: 1,
      modelForm: {
        modelName: "",
        modelVersion: "",
        modelFormat: "",
        modelDesc: "",
        smallModelRemark: ""
      },
      rules: {
        modelName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      foreignId: "",
      fileList: [],
    }
  },
  methods: {

    // 保存表单
    addModelSubmit() {
      this.$refs.addModelForm.validate((valid) => {
        if(valid) {
          const params = {
            ...this.modelForm,
            modelType: "小模型",
          }
          insertSmallModel(params).then(res => {
            if(res.data.status === 1) {
              this.$message.success("新增成功！")
              this.foreignId = res.data.message
              this.currentStep = 2;
              this.$emit('reset')
            } else {
              this.$message.error(res.data.message);
            }
          })
        }
      })
    },

    // 提交文件
    handleOk() {
      if(this.fileList.length === 0) {
        this.$message.warning("请选择文件")
        return
      }
      let formData = new FormData();
      formData.append("foreignId", this.foreignId);
      formData.append("foreignType", smallStageFile.foreignType);
      formData.append("attachStage", smallStageFile.attachStage);
      formData.append("attachCategory", smallStageFile.attachCategory);
      formData.append("files", this.fileList[0]);
      uploadSingleForeignId(formData).then(res => {
        if(res.data.status === 1) {
          this.$message.success("操作成功");
          this.cancelAddModel()
        } else {
          this.$message.error(res.message);
        }
      })
    },

    // 取消新增
    cancelAddModel() {
      this.addVisible = false;
      this.currentStep = 1;
      this.modelForm = {
        modelName: "",
        modelType: "",
        modelVersion: "",
        modelFormat: "",
        modelDesc: "",
        smallModelRemark: ""
      }
    },

    myRemoveFile(file, fileList) {
      let i = fileList.indexOf(file);
      fileList.splice(i, 1);
    },
    myBeforeUploadFile(file) {
      this.fileList.push(file);  
      if(this.fileList.length > 1) {
        this.fileList= this.fileList.slice(-1)
      }
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>