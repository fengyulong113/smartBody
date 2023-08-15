<template>
  <div class="smartBodyStyle">
    <div class="top" :class="isShowFilter ? `h110` : `h50`">
      <div class="header">
        <div class="title" v-on:click="handleShowFilter">
          <svg-icon v-if="isShowFilter" icon-class="up" />
          <svg-icon v-else icon-class="down" />
          <span>筛选查询</span>
        </div>
        <div>
          <el-button size="mini" @click="reset">重置</el-button>
          <el-button type="blue" size="mini" @click="search">查询</el-button>
        </div>
      </div>
      <div v-show="isShowFilter" class="filterContent">
        <el-form :label="formData">
          <el-row :span="24">
            <el-col :span="6">
              <el-form-item label="想定场景:" prop="scenario">
                <el-select size="mini" v-model="formData.scenario" clearable placeholder="请搜索选择想定场景">
                  <el-option 
                    v-for="(item, i) in scenarioList" 
                    :key="i" 
                    :label="item" 
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="作战方案:" prop="battlePlan">
                  <el-select size="mini" v-model="formData.battlePlan" clearable placeholder="请搜索选择作战方案">
                    <el-option 
                      v-for="(item, i) in battlePlanList" 
                      :key="i" 
                      :label="item" 
                      :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="智能体类型:" prop="smartType">
                  <el-select size="mini" v-model="formData.smartType" clearable placeholder="请选择智能体类型">
                    <el-option 
                      v-for="(item, i) in smartTypeList" 
                      :key="i" 
                      :label="item" 
                      :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建人:" prop="optUser">
                  <el-select size="mini" v-model="formData.optUser" clearable placeholder="请搜索选择用户">
                    <el-option 
                      v-for="(item, i) in optUserList" 
                      :key="i" 
                      :label="item" 
                      :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="body">
      <div class="body-header">
        <div>
          <el-button type="blue" size="small" icon="el-icon-plus" @click="addSmartBody">新增智能体</el-button>
          <!-- <el-button type="green" size="small" @click="generateSmartBody">
            <svg-icon icon-class="android" />
            生成智能体
          </el-button> -->
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formData.pageNo"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="formData.pageSize"
          background
          layout="total, prev, pager, next, sizes"
          :total="total">
        </el-pagination>
      </div>
      <div class="body-content" :style="{ height: isShowFilter ? '735px' : '795px'}">
        <div class="card" v-for="(item, i) in cardList" :key="i">
          <div class="card-header">
            <span>智能体</span>
            <!-- <span>【{{ item.num }}】</span> -->
          </div>
          <div class="card-content">
            <div class="card-top">
              <span class="color-blue">{{ item.modelName }}</span>
              <div>
                <el-button type="blue" size="mini" icon="el-icon-download" @click="handleDownload(item)"></el-button>
                <el-button type="blue" size="mini" icon="el-icon-edit" @click="handleEdit(item)"></el-button>
                <el-button type="red" size="mini" icon="el-icon-delete" @click="handleDelete(item)"></el-button>
              </div>
            </div>
            <div class="card-mid">
              <div class="slip">
                <svg-icon icon-class="type" className="iconStyle" />
                <span  class="color-w">类型：</span>
                <span class="color-w">{{ item.smartType }}</span>
              </div>
              <div class="slip">
                <svg-icon icon-class="scene" className="iconStyle" />
                <span class="color-w">想定场景：</span>
                <span class="color-w">{{ item.scenario }}</span>
              </div>
              <div class="slip">
                <svg-icon icon-class="plan" className="iconStyle" />
                <span class="color-w">作战方案：</span>
                <span class="color-w">{{ item.battlePlan }}</span>
              </div>
              <div class="slip">
                <svg-icon icon-class="people" className="iconStyle" />
                <span class="color-w">作战方：</span>
                <span class="color-w">{{ item.battleOrg }}</span>
              </div>
              <div class="slip">
                <svg-icon icon-class="file" className="iconStyle" />
                <span class="color-w">配置文件：</span>
                <span class="color-w">{{ item.configFile }}</span>
              </div>
            </div>
            <div class="card-bottom">
              {{ item.optUser }} {{ item.modelCreateTime }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增 -->
    <el-dialog
      :visible.sync="addDialogVisible"
      width="30%"
      top="5%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="addSmartContainer" v-if="addDialogVisible">
        <div class="dialog-header">
          <i class="el-icon-folder-add"></i>
          新增智能体
        </div>
        <el-steps :active="stepActive" finish-status="success">
          <el-step title="新增智能体"></el-step>
          <el-step title="上传文件"></el-step>
        </el-steps>
        <div class="dialog-body">
          <!-- 步骤一 新增智能体-->
          <el-form v-if="stepActive === 0" :model="smartFormData" label-width="70px">
            <el-form-item label="名称">
              <el-input v-model="smartFormData.modelName" style="width: 100%" size="small"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="smartFormData.smartType" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in smartTypeList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="想定场景">
              <el-select v-model="smartFormData.scenario" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in scenarioList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作战方案">
              <el-select v-model="smartFormData.battlePlan" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in battlePlanList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作战方">
              <el-select v-model="smartFormData.battleOrg" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in battleOrgList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配置文件">
              <el-input v-model="smartFormData.configFile" style="width: 100%" size="small"></el-input>
            </el-form-item>
          </el-form>
          <!-- 步骤二 上传文件-->
          <div v-else-if="stepActive === 1">
            <span>上传智能体文件：</span>
            <el-upload
              class="upload-demo"
              action="#"
              :on-change="handleChanged"
              multiple
              :limit="1"
              :auto-upload="false"
              :file-list="fileList">
              <el-button size="small" type="blue">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="red" @click="cancelSmartBodyDialog">{{ this.stepActive === 0 ? `取 消` : `取消上传并保存` }}</el-button>
          <el-button v-if="stepActive === 0" type="blue" style="margin-left: 50px" @click="handleNextStep">保存并下一步</el-button>
          <el-button v-else-if="stepActive === 1" type="blue" style="margin-left: 50px" @click="handleSubmit">确定上传</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      :visible.sync="editDialogVisible"
      width="30%"
      top="5%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :show-close="false">
      <div class="editSmartContainer">
        <div class="dialog-header">
          <i class="el-icon-folder-opened"></i>
          编辑智能体
        </div>
        <div class="dialog-body">
          <el-form :model="editFormData" label-width="70px">
            <el-form-item label="名称">
              <el-input v-model="editFormData.modelName" style="width: 100%" size="small"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="editFormData.smartType" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in smartTypeList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="想定场景">
              <el-select v-model="editFormData.scenario" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in scenarioList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作战方案">
              <el-select v-model="editFormData.battlePlan" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in battlePlanList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作战方">
              <el-select v-model="editFormData.battleOrg" style="width: 100%" size="small" clearable>
                <el-option 
                  v-for="(item, i) in battleOrgList" 
                  :key="i" 
                  :label="item" 
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配置文件">
              <el-input v-model="editFormData.configFile" style="width: 100%" size="small"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="red" @click="editSmartBodyDialog('cancel')">取 消</el-button>
          <el-button type="blue" style="margin-left: 50px" @click="editSmartBodyDialog('confirm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 确认删除 -->
    <el-dialog
    :visible.sync="deleteDialogVisible"
      width="25%"
      top="15%"
      @closed="closeDeleteDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="deleteContainer">
        <div class="dialog-body">
          是否确认删除 【{{ this.smartName }}】
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="red" @click="deleteSmartBodyDialog('cancel')">取 消</el-button>
          <el-button type="blue" style="margin-left: 50px" @click="deleteSmartBodyDialog('confirm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import svgIcon from '@/components/SvgIcon.vue';
import UploadFileModal from '../components/uploadFileModal.vue';
import {
  getSmartBody,
  selectFieldValues,
  addSmartBody,
  editSmartBody,
  deleteSmartBody,
} from '../api/smartBody'
import {
  download,
  selectFileListByFileCategory,
  uploadSingleForeignId
} from '../api/file'
import {
  axiosDownload,
  smartStageFile
} from '../utils/index'
import uploadFileModalVue from '../components/uploadFileModal.vue';
export default {
  components: { 
    svgIcon,
    UploadFileModal
  },
  name: "smartBody",
  data() {
    return {
      isShowFilter: false,
      formData: {
        scenario: "", 
        battlePlan: "",
        smartType: "",
        optUser: "",
        pageNo: 1,
        pageSize: 20,
      },
      smartFormData: {
        modelName: "",
        smartType: "",
        scenario: "",
        battlePlan: "",
        battleOrg: "",
        configFile: "",
      },
      editFormData: {
        modelName: "",
        smartType: "",
        scenario: "",
        battlePlan: "",
        battleOrg: "",
        configFile: "",
      },
      addOrEditSmartTitle: '编辑',
      addDialogVisible: false,
      deleteDialogVisible: false,
      editDialogVisible: false,
      smartName: "",
      smartModelId: "",
      total: 0,
      cardList: [],
      scenarioList: [],
      battlePlanList: [],
      smartTypeList: [],
      optUserList: [],
      battleOrgList: [],
      stepActive: 0,
      fileList: [],
      files:[],
      foreignId: "",
      downloadForm: {},
    }
  },
  mounted(){
    this.search()
    this.getSelectValue();
  },
  methods: {
    handleShowFilter() {
      this.isShowFilter = !this.isShowFilter
    },

    // 重置
    reset() {
      this.resetForm(this.formData);
      this.formData.pageNo = 1;
      this.formData.pageSize = 20;
      this.search();
    },

    // 重置表单
    resetForm(formData) {
      Object.keys(formData).forEach(item => {
        formData[item] = "";
      });
    },

    // 查询
    search() {
      getSmartBody(this.formData).then(res => {
        if(res.data.status === 1) {
          this.cardList = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message.warning("查询失败")
        }
      })
    },

    // 新增智能体
    addSmartBody() {
      this.addDialogVisible = true;
    },

    // 下一步
    handleNextStep() {
      const params = {
        ...this.smartFormData,
        modelType: "智能体"
      }
      let isEmpty = Object.values(this.smartFormData).some(item => item === '')
      if(isEmpty) {
        this.$message.warning('请填写完整')
        return
      }
      addSmartBody(params).then(res => {
        if(res.data.status === 1) {
          this.stepActive++;
          this.foreignId = res.data.message;
        } else {
          this.$message.error("新增失败");
        }
      })
    },
  
    handleChanged(file) {
      this.files = file.raw;
    },

    // 提交
    handleSubmit() {
      let formData = new FormData();
      formData.append("foreignId", this.foreignId);
      formData.append("foreignType", smartStageFile.foreignType);
      formData.append("attachStage", smartStageFile.attachStage);
      formData.append("attachCategory", smartStageFile.attachCategory);
      formData.append("files", this.files);
      uploadSingleForeignId(formData).then(res => {
        if(res.data.status === 1) {
          this.$message.success("操作成功");
          this.reset();
          this.addDialogVisible = false;
        } else {
          this.$message.error("操作失败");
          this.addDialogVisible = false;
        }
      })
    },

    // 取消新增
    cancelSmartBodyDialog() {
      this.reset();
      this.stepActive = 0;
      this.resetForm(this.smartFormData);
      this.addDialogVisible = false;
    },

    // 下载
    handleDownload(item) {
      const params = {
        foreignId: item.id,
        foreignType: "smart-agent",
        attachStage: "默认",
        attachCategory: "智能体文件"
      }
      selectFileListByFileCategory(params).then(res => {
        if(res.data.data.length !== 0) {
          let result = res.data.data[0];
          this.downloadForm = {
            fileId: result.fileId,
            filePath: result.filePath,
            fileType: result.fileType,
            fileName: result.fileName
          }
          download({ path: this.downloadForm.filePath }).then(res => {
            if(res.status && res.status === 200) {
              axiosDownload(res.data, res.headers, this.downloadForm.fileName);
            }
          }).finally(() => {
            this.downloadForm = {}
          })
        } else {
          this.$message.warning("暂无文件")
        }
      })
    },

    // 编辑
    handleEdit(item) {
      this.editFormData = JSON.parse(JSON.stringify(item));
      this.editDialogVisible = true;
    },

    // 编辑
    editSmartBodyDialog(type) {
      if(type === 'confirm') {
        const params = {
          ...this.editFormData,
          modelType: "智能体"
        }
        editSmartBody(params).then(res => {
          if(res.data.status === 1) {
            this.$message.success("编辑成功");
            this.resetForm(this.editFormData);
            this.reset();
            this.editDialogVisible = false;
          } else {
            this.$message.error("编辑失败");
          }
        })
      } else {
        this.editDialogVisible = false;
        this.resetForm(this.editFormData);
      }
    },

    // 删除
    handleDelete(item) {
      this.smartName = item.modelName;
      this.smartModelId = item.id;
      this.deleteDialogVisible = true;
    },

    deleteSmartBodyDialog(type) {
      if(type === 'confirm') {
        deleteSmartBody({ modelId: this.smartModelId }).then(res => {
          if(res.data.status === 1) {
            this.$message.success("删除成功");
            this.search();
          } else {
            this.$message.error("删除失败");
          }
            this.deleteDialogVisible = false;
        })
      } else {
        this.deleteDialogVisible = false;
      }
    },
    closeDeleteDialog() {
      this.smartName = "";
    },

    getSelectValue() {
      selectFieldValues({ fieldName: "scenario" }).then(res => {
        this.scenarioList = res.data.data
      })
      selectFieldValues({ fieldName: "battle_plan" }).then(res => {
        this.battlePlanList = res.data.data
      })
      selectFieldValues({ fieldName: "smart_type" }).then(res => {
        this.smartTypeList = res.data.data
      })
      selectFieldValues({ fieldName: "opt_user" }).then(res => {
        this.optUserList = res.data.data
      })
      selectFieldValues({ fieldName: "battle_org" }).then(res => {
        this.battleOrgList = res.data.data
      })
    },

    // 分页
    handleSizeChange(val) {
      this.formData.pageSize = val;
      this.formData.pageNo = 1;
      this.search();
    },
    handleCurrentChange(val) {
      this.formData.pageNo = val;
      this.search();
    }

  }
}
</script>

<style lang="scss" scoped>

@import "../style/index.scss";

.smartBodyStyle {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #020F31;
  .h50 {
    height: 50px;
  }
  .h110 {
    height: 110px;
  }
  .top {
    width: 100%;
    margin-bottom: 10px;
    background-color: #051F52;
    box-sizing: border-box;
    padding: 10px 20px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        &:hover {
          cursor: pointer;
        }
      }
    }
    .filterContent {
      padding: 20px 5px;
      box-sizing: border-box;
    }
  }
  .body {
    width: 100%;
    height: 100%;
    background-color: #051F52;
    .body-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 15px;
      box-sizing: border-box;
    }
    .body-content {
      /* display: flex;
      flex-flow: wrap;
      padding: 5px 10px;
      box-sizing: border-box;
      height: 820px;
      overflow-y: auto; */
      display: flex;
      flex-flow: wrap;
      padding: 5px 10px;
      box-sizing: border-box;
      overflow-y: auto;
      align-content: flex-start;
      justify-content: flex-start;
      .card {
        width: 32.5%;
        height: 280px;
        background-image: url("../assets/img/cardBg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 5px;
        .card-header {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          font-size: 16px;
        }
        .card-content {
          .card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 15px;
            box-sizing: border-box;
          }
          .card-mid {
            padding: 0 15px;
            box-sizing: border-box;
            .slip {
              height: 30px;
              line-height: 30px;
              font-size: 13px;
            }
          }
          .card-bottom {
            color: #B0C5DF;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>