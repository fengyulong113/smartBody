<template>
  <div class="edit_task">
    <el-form ref="editTaskForms" :model="editTaskForm" label-width="80px">
      <el-form-item label="评测名称">
        <!-- <el-input
          type="textarea"
          v-model="editTaskForm.jobName"
          placeholder="请输入评测名称（限制100字符）"
        ></el-input> -->
        <div>{{ editTaskForm.jobName }}</div>
      </el-form-item>
      <el-form-item label="模型选择">
        <el-select
          v-model="editTaskForm.modelName"
          placeholder="请选择"
          @change="selectModel"
        >
          <el-option
            v-for="item in models"
            :label="item.modelName"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测评样本集选择">
        <el-select v-model="editTaskForm.sampleSet" placeholder="请选择">
          <el-option
            v-for="item in evaluteSets"
            :label="item"
            :value="item"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <div class="upload_samples">
          <!-- <i class="el-icon-plus"></i><span>上传样本集</span> -->
          <!-- <el-upload
            class="upload-samples-sets"
            action="api/evaluateJob/uploadFileToMinio"
            ref="uploadButton"
            :on-preview="previewFile"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :limit="limit"
            :on-exceed="handleExceed"
            :http-request="uploadFile"
            :on-change="submitFile"
            :on-success="uploadSuccess"
            :auto-upload="false"
            :file-list="fileList"
            :show-file-list="true"
          >
            <el-button size="small"
              ><i class="el-icon-plus"></i><span>上传样本集</span></el-button
            > -->
          <!-- <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          <!-- </el-upload> -->
          <el-upload
            v-bind="$attrs"
            class="upload-samples-sets"
            v-on="$listeners"
            action="api/evaluateJob/uploadFileToMinio"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleUploadSuccess"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <!-- <img src="../../../../../assets/images/download.png" alt="" /> -->
            <el-button size="small"
              ><i class="el-icon-plus"></i><span>上传样本集</span></el-button
            >
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="指标体系">
        <el-select v-model="indicatorSystem" placeholder="请选择">
          <el-option
            label="问答词向量对比指标"
            value="问答词向量对比指标"
          ></el-option>
          <el-option
            label="选择判断客观指标"
            value="选择判断客观指标"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="last_option">
        <el-button @click="TSInserTask">取 消</el-button>
        <el-button type="primary" @click="addInsertTask">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  selectBriefInfoList,
  insertEvaluateJob,
  operationEvalute,
  selectDatasetList,
  updateByIdEvaluateJob,
} from "../../../api/evalute/evalute";
export default {
  props: {
    editTaskFormBefore: {
      type: Object,
    },
    title: {
      type: String,
      default: "导入",
    },
    // 下载模版的url
    downloadTemplateUrl: {
      type: String,
      default: "",
    },
    // 文件上传的url
    uploadURL: {
      type: String,
      default: "",
    },
    // 确定导入的url
    confirmURL: {
      type: String,
      default: "",
    },
    // 导出失败数据
    errorURL: {
      type: String,
      default: "",
    },
    // 数量限制
    limit: {
      type: Number,
      default: 1,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 10,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["doc", "docx", "xls", "xlsx", "ppt", "txt", "pdf"],
    },
  },
  data() {
    return {
      models: [],
      evaluteSets: [],
      modelType: "",
      sampleSet: "",
      indicatorSystem: "",
      //上传
      uploadVisible: false,
      checked: false,
      fileList: [],
      confirmPath: "", //导入数据路径，
      errornum: "",
    };
  },
  created() {
    this.getselect();
  },
  computed: {
    editTaskForm: function () {
      return this.editTaskFormBefore;
    },
  },
  mounted() {
    console.log(this.editTaskForm);
  },
  methods: {
    // 上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleUploadSuccess(response) {
      console.log(response);
      this.editTaskForm = Object.assign(this.editTaskForm, response.data);
    },
    // 下拉框数据
    getselect() {
      //模型选择
      selectBriefInfoList().then((res) => {
        this.models = res.data.data;
      });
      //样本集
      selectDatasetList().then((res) => {
        // console.log("模型", res.data.data);
        this.evaluteSets = res.data.data;
      });
    },
    //模型选择
    selectModel(val) {
      console.log("xuanzhong", val);
      let model = this.models.filter((item) => item.id == val)[0];
      delete model["id"];
      this.editTaskForm = { ...this.editTaskForm, ...model };
      console.log(this.editTaskForm);
    },
    // 新增评测窗口
    addInsertTask() {
      this.insertTask(1);
    },
    //暂存
    TSInserTask() {
      this.insertTask(0);
    },
    insertTask(status) {
      console.log(this.editTaskForm);
      if (Object.keys(this.editTaskForm).length <= 0) return;
      this.editTaskForm["status"] = status; //
      updateByIdEvaluateJob(this.editTaskForm).then((res) => {
        console.log("更新评测", res);
        let message = res.data.message;
        if (res.status == 200) {
          let params = {
            jobId: res.data.message,
          };
          operationEvalute(params).then((reponse) => {
            console.log("执行", reponse);
            status == 0 ? this.closeAddTask() : this.onSubmit(message);
          });
        }
      });
    },

    closeAddTask() {
      this.$bus.$emit("refresh", "");
      this.$bus.$emit("closeAddTask", false);
    },
    onSubmit(message) {
      this.$bus.$emit("refresh", "");
      // this.$router.push({ name: "Testing", params: { key: message } });
    },
  },
};
</script>
<style lang="scss" scoped>
.edit_task {
  /* background-color: #333333; */
  /deep/.el-form {
    .el-form-item__content {
      .upload_samples {
        width: 180px;
        // border: 1px solid #dcdfe6;
        color: #409eff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
        i {
          font-size: 20px;
        }
      }
    }

    .last_option {
      box-sizing: border-box;
      padding-right: 20px;

      .el-form-item__content {
        display: flex;
        justify-content: flex-end;

        .el-button {
          height: 35px;
          padding: 0 20px;
        }
      }
    }
  }
}
/deep/.el-upload {
  .el-button {
    background-color: #fff;
    color: #409eff;
  }
}
.upload-samples-sets {
  width: 100%;
  /deep/.el-upload {
    width: 100%;
    .el-button {
      width: 100%;
    }
  }
}
</style>
