<template>
  <div class="add_task">
    <el-form ref="addTaskforms" :model="addTaskForm" label-width="80px">
      <el-form-item label="评测名称">
        <el-input
          type="textarea"
          v-model="addTaskForm.jobName"
          placeholder="请输入评测名称（限制100字符）"
        ></el-input>
      </el-form-item>
      <el-form-item label="模型选择">
        <el-select
          v-model="modelType"
          placeholder="请选择"
          clearable
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
        <el-select
          v-model="addTaskForm.sampleSet"
          placeholder="请选择"
          @change="selectSet"
        >
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
          <!-- <el-upload
            v-bind="$attrs"
            class="upload-samples-sets"
            v-on="$listeners"
            action=""
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :http-request="uploadFile"
          >
            <el-button size="small"
              ><i class="el-icon-plus"></i><span>上传样本集</span></el-button
            > 
          </el-upload>-->
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
  uploadFileToMinio,
} from "../../../api/evalute/evalute";
import { fileLimit } from "../components/upload";
export default {
  props: {
    // uploadVisible:{
    //     type:Boolean,
    //     default:false,
    // }
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
      default: () => [
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "txt",
        "pdf",
        "json",
      ],
    },
  },
  data() {
    return {
      addTaskForm: {},
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
  methods: {
    // 上传
    uploadFile() {
      const file = this.fileList;
      // 使用FormData传参数和文件
      var form = new FormData();
      // 文件
      form.append("file", file);
      console.log("files", file);
      // 调用封装好的上传方法，传给后台FormData
      uploadFileToMinio(form).then((resp) => {
        console.log("res", resp);
        if (resp && resp.status == 200) {
          this.$message("成功了");
        }
      });
    },
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
      this.addTaskForm = Object.assign(this.addTaskForm, response.data);
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
      // console.log("xuanzhong", val);
      let model = this.models.filter((item) => item.id == val)[0];
      delete model["id"];
      this.addTaskForm = { ...this.addTaskForm, ...model };
      console.log(this.addTaskForm);
    },
    selectSet(val) {
      console.log("xuanzhong", val);
      if (val == "m_dev.json") {
        this.addTaskForm.datasetName = " m_dev.json";
        this.addTaskForm.datasetPath =
          "172.168.0.203:9000/evaluate-job/m_dev.json";
      } else {
        this.addTaskForm.datasetName = "sh_dev.json";
        this.addTaskForm.datasetPath =
          "172.168.0.203:9000/evaluate-job/sh_dev.json";
      }

      console.log(this.addTaskForm);
    },
    // 新增评测窗口
    addInsertTask() {
      this.$router.push({ name: "Testing", params: { key: 1 } });
      this.insertTask(1);
    },
    //暂存
    TSInserTask() {
      this.insertTask(0);
    },
    insertTask(status) {
      if (Object.keys(this.addTaskForm).length <= 0) {
        if (status == 0) {
          this.closeAddTask();
        } else {
          // this.onSubmit();
          this.$message.warning("表单为空");
        }
      } else {
        this.addTaskForm["status"] = status; //
        insertEvaluateJob(this.addTaskForm).then((res) => {
          console.log("新增评测", res);
          let message = res.data.message;
          if (res.status == 200) {
            let params = {
              jobId: res.data.message,
            };
            if (status == 0) {
              this.closeAddTask();
            } else {
              operationEvalute(params).then((reponse) => {
                console.log("执行", reponse);
                this.onSubmit(message);
              });
            }
          }
        });
      }
    },

    closeAddTask() {
      this.$bus.$emit("closeAddTask", false);
      this.$bus.$emit("refresh", "");
    },
    onSubmit(message) {
      this.$bus.$emit("refresh", "");
    },
  },
};
</script>
<style lang="scss" scoped>
.add_task {
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
