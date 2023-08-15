<template>
  <div class="bigModelContainer">
    <div class="top">
      <div class="header">
        <div class="title">大模型</div>
        <div>
          <el-button size="small" @click="reset">重置</el-button>
          <el-button type="blue" size="small" @click="search">查询</el-button>
        </div>
      </div>
      <div class="filterArea">
        <el-form :model="filterForm">
          <el-row :span="24">
            <el-col :span="6">
              <el-form-item label="大模型类型" prop="bigModelType">
                <el-input v-model="filterForm.bigModelType" size="small" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="模型参数" prop="bigModelParam">
                <el-input v-model="filterForm.bigModelParam" size="small" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支持的tokens数" prop="bigModelToken">
                <el-input v-model="filterForm.bigModelToken" size="small" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支持的领域" prop="bigModelArea">
                <el-input v-model="filterForm.bigModelArea" size="small" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="body">
      <div class="bodyTop">
        <el-button type="blue" icon="el-icon-plus" size="mini" @click="addBigModel">新增大模型</el-button>
      </div>
      <el-table :data="tableData" :border="true" :header-cell-style="{background:'#051F52',color:'#B0C5DF'}" height="662px">
        <el-table-column 
          prop="modelName"
          label="模型名称"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="modelType"
          label="模型类型"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="bigModelType"
          label="大模型类型"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="bigModelParam"
          label="大模型参数"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="bigModelToken"
          label="支持的tokens数"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="bigModelArea"
          label="支持的领域"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="serviceInterface"
          label="接口"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="bigModelDesc"
          label="大模型描述"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column 
          prop="bigModelRemark"
          label="大模型备注"
          :align="`center`"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          label="操作"
          :align="`center`"
          :resizable="false">
          <template #default="{row}">
            <el-button type="blue" size="mini" @click="editBigModel(row)">编辑</el-button>
            <el-button type="red" size="mini" @click="deleteBigModel(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterForm.pageNo"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="filterForm.pageSize"
        background
        layout="total, prev, pager, next, sizes"
        :total="total">
      </el-pagination>
    </div>

    <!-- 新增or编辑 -->
    <el-dialog
      :visible.sync="addOrEditDialogVisible"
      width="30%"
      top="5%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="addSmartContainer" v-if="addOrEditDialogVisible">
        <div class="dialog-header">
          <i :class="this.addOrEditModelTitle === '新增' ? `el-icon-folder-add` : `el-icon-folder-opened`"></i>
          {{ this.addOrEditModelTitle }}大模型
        </div>
        <div class="dialog-body">
          <el-form :model="modelForm" label-width="120px">
            <el-form-item label="名称">
              <el-input v-model="modelForm.modelName" style="width: 100%" size="small"></el-input>
            </el-form-item>
            <el-form-item label="模型类型">
              <el-input v-model="modelForm.modelType" style="width: 100%" size="small" placeholder="大模型" disabled></el-input>
            </el-form-item>
            <el-form-item label="大模型类型">
              <el-input v-model="modelForm.bigModelType" style="width: 100%" size="small"></el-input>
            </el-form-item>
            <el-form-item label="支持的tokens数">
              <el-input type="number" v-model="modelForm.bigModelToken" style="width: 100%" size="small"></el-input>
            </el-form-item>
            <el-form-item label="接口">
              <el-input  v-model="modelForm.serviceInterface" style="width: 100%" size="small"></el-input>
            </el-form-item>
            <el-form-item label="支持的领域">
              <el-input v-model="modelForm.bigModelArea" style="width: 100%" size="small"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="modelForm.bigModelDesc" type="textarea" :rows="3" resize="none"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="modelForm.bigModelRemark" style="width: 100%" size="small"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="red" @click="addOrEditModelDialog('cancel')">取 消</el-button>
          <el-button type="blue" style="margin-left: 50px" @click="addOrEditModelDialog('confirm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      :visible.sync="deleteDialogVisible"
      width="25%"
      top="15%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="deleteContainer">
        <div class="dialog-body">
          是否确认删除
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="red" @click="deleteBigModelDialog('cancel')">取 消</el-button>
          <el-button type="blue" style="margin-left: 50px" @click="deleteBigModelDialog('confirm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  deleteByModelId,
  insertBigModel,
  selectBigModelDetail,
  selectByConditions,
  updateByModelId
} from '../api/bigModel';
export default {
  name: "bigModel",
  data() {
    return {
      filterForm: {
        bigModelType: "",
        bigModelParam: "",
        bigModelToken: "",
        pageNo: 1,
        pageSize: 20,
      },
      modelForm: {
        modelName: "",
        modelType: "",
        bigModelType: "",
        bigModelToken: "",
        bigModelArea: "",
        serviceInterface: "",
        bigModelDesc: "",
        bigModelRemark: ""
      },
      deleteDialogVisible: false,
      addOrEditDialogVisible: false,
      addOrEditModelTitle: "",
      tableData: [],
      total: 0,
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    // 重置
    reset() {
      this.resetForm(this.filterForm);
      this.filterForm.pageNo = 1;
      this.filterForm.pageSize = 20;
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
      const params = {
        pageNo: this.filterForm.pageNo,
        pageSize: this.filterForm.pageSize,
      }
      selectByConditions(this.filterForm).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      })
    },

    // 新增大模型
    addBigModel() {
      this.addOrEditModelTitle = "新增";
      this.addOrEditDialogVisible = true;
    },

    // 编辑大模型
    editBigModel(row) {
      this.addOrEditModelTitle = "编辑";
      this.modelForm = JSON.parse(JSON.stringify(row));
      this.addOrEditDialogVisible = true;
    },

    // 新增or编辑模型
    addOrEditModelDialog(type) {
      if(type === 'confirm') {
        if(this.addOrEditModelTitle === '新增') {
          const params = {
            ...this.modelForm,
            modelType: "大模型"
          }
          insertBigModel(params).then(res => {
            console.log(res)
            this.resetForm(this.modelForm);
            this.reset();
            this.addOrEditDialogVisible = false;
          })
        } else {
          const params = {
            ...this.modelForm,
            modelType: "大模型"
          }
          updateByModelId(params).then(res => {
            console.log(res)
            this.resetForm(this.modelForm);
            this.reset();
            this.addOrEditDialogVisible = false;
          })
        }
      } else {
        this.resetForm(this.modelForm);
        this.addOrEditDialogVisible = false;
      }
    },

    // 删除大模型
    deleteBigModel(row) {
      this.modelForm = JSON.parse(JSON.stringify(row));
      this.deleteDialogVisible = true;
    },

    // 确认删除
    deleteBigModelDialog(type) {
      if(type === 'confirm') {
        deleteByModelId({ modelId: this.modelForm.id }).then(res => {
          if(res.data.status === 1) {
            this.$message.success("删除成功");
            this.search();
          } else {
            this.$message.error("删除失败");
          }
        }).finally(() => {
          this.resetForm(this.modelForm);
          this.deleteDialogVisible = false;
        })
      } else {
        this.resetForm(this.modelForm);
        this.deleteDialogVisible = false;
      }
    },

    // 分页
    handleSizeChange(val) {
      this.filterForm.pageSize = val;
      this.filterForm.pageNo = 1;
      this.search();
    },
    handleCurrentChange(val) {
      this.filterForm.pageNo = val;
      this.search();
    }

  },
}
</script>

<style lang="scss" scoped>
@import "../style/index.scss";

.bigModelContainer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #020F31;
  .top {
    width: 100%;
    margin-bottom: 10px;
    background-color: #051F52;
    box-sizing: border-box;
    padding: 10px 20px;
    .header {
      display: flex;
      justify-content: space-between;
      .title {
        color: #B0C5DF;
        font-size: 20px;
        height: 30px;
        line-height: 30px;
        user-select: none;
      }
    }
    .filterArea {
      padding: 10px 10px 0 10px;
    }
  }
  .body {
    width: 100%;
    height: 100%;
    background-color: #051F52;
    padding: 10px;
    box-sizing: border-box;
    .bodyTop {
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
    }
  }
}
</style>