<template>
  <div class="smallModelContainer">
    <div class="top">
      <div class="header">
        <div class="title">
          <div class="blueBlock"></div>小模型
        </div>
        <div class="operate">
          <a-button icon="sync" @click="reset">重置</a-button>
          <a-button type="primary" icon="search" @click="search">查询</a-button>
        </div>
      </div>
      <div class="filterArea">
        <a-form-model layout="inline" :model="filterForm">
          <a-form-model-item label="模型名称">
            <a-input v-model="filterForm.modelName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="模型格式">
            <a-input v-model="filterForm.modelFormat"></a-input>
          </a-form-model-item>
          <a-form-model-item label="模型版本">
            <a-input v-model="filterForm.modelVersion"></a-input>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
    <div class="body">
      <div v-if="isShowDetail">
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="返回"
          sub-title="详情"
          @back="() => isShowDetail = false"
        >
        <div class="content">
          <div class="main">
            <a-descriptions size="middle" :column="3">
              <a-descriptions-item label="名称">
                {{ this.detailObj.modelName }}
              </a-descriptions-item>
              <a-descriptions-item label="类型">
                {{ this.detailObj.modelType }}
              </a-descriptions-item>
              <a-descriptions-item label="版本">
                {{ this.detailObj.modelVersion }}
              </a-descriptions-item>
              <a-descriptions-item label="格式">
                {{ this.detailObj.modelFormat }}
              </a-descriptions-item>
              <a-descriptions-item label="创建时间">
                {{ this.detailObj.modelCreateTime }}
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                {{ this.detailObj.smallModelRemark }}
              </a-descriptions-item>
              <a-descriptions-item label="文件">
                {{ this.detailObj.fileName }}
                <a-button v-if="this.detailObj.fileName !== '暂无'" type="link" @click="handleDownload">点击下载</a-button>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
        </a-page-header>
      </div>
      <div v-else>
        <div class="bodyTop">
          <a-button type="primary" icon="plus" @click="addSmallModel">新增模型</a-button>
        </div>
        <div :style="{ width: '100%', height: tableHeight }">
          <a-table
            :columns="columns" 
            :data-source="tableData" 
            rowKey="id"
            bordered
            :pagination="false" 
            :scroll="{ y: Height }">
            <span slot="action" slot-scope="record">
              <a-button type="primary" size="small" icon="edit" @click="editSmallModel(record)">编辑</a-button>
              <a-button style="margin: 0 5px" type="primary" size="small" icon="unordered-list" @click="detailSmallModel(record)">详情</a-button>
              <a-popconfirm
                title="是否确认删除?"
                cancel-text="取消"
                ok-text="确认"
                @confirm="() => deleteSmallModel(record.id)"
              >
                <a-button type="danger" size="small" icon="delete">删除</a-button>
              </a-popconfirm>
            </span>
          </a-table>
        </div>
        <a-pagination
          show-size-changer
          v-model="filterForm.pageNo"
          :page-size="filterForm.pageSize"
          :default-current="1"
          :page-size-options="pageSizeOptions"
          :total="total"
          style="line-height: 3.5"
          @change="currentChange"
          @showSizeChange="showSizeChange">
          <template slot="buildOptionText" slot-scope="props">
            <span style="color: #000">{{ props.value }}条/页</span>
          </template>
        </a-pagination>
      </div>
    </div>

    <!-- 新增 -->
    <AddModel ref="addModel" @search="search"></AddModel>

    <!-- 编辑 -->
    <a-modal
      title="编辑模型"
      v-model="editVisible"
      @cancel="cancelEditModel"
      @ok="okEditModel"
      :width="600"
      centered
      cancel-text="取消"
      okText="确认"
    >
      <a-form-model 
        :model="modelForm"
        :label-col="{ span: 2, offset: 1 }"
        :wrapper-col="{ span: 20 }"
        labelAlign="left"
        ref="addModelForm"
        :rules="rules">

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
    </a-modal>
  </div>
</template>

<script>
import {
  deleteByModelId,
  selectByConditions,
  updateByModelId
} from '@/api/smallModel';
import {
  download,
  selectFileListByFileCategory,
} from '@/api/file'
import { smallStageFile, axiosDownload } from '@/utils/index'
import AddModel from '@/components/addModel.vue';
export default {
  name: "smallModel",
  components: {
    AddModel
  },
  data() {
    return {
      filterForm: {
        modelName: "",
        modelVersion: "",
        modelFormat: "",
        pageNo: 1,
        pageSize: 20,
      },
      // modelForm: {
      //   modelName: "",
      //   modelType: "",
      //   modelVersion: "",
      //   modelFormat: "",
      //   modelDesc: "",
      //   smallModelRemark: ""
      // },
      modelForm: {},
      pageSizeOptions: ['20', '40', '60', '80'],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          width: 70,
          customRender: (text,record,index) => `${index+1}`
        },
        { title: "模型名称", align: 'center', dataIndex: "modelName", key: "modelName" },
        { title: "模型类型", align: 'center', dataIndex: "modelType", key: "modelType" },
        { title: "模型版本", align: 'center', dataIndex: "modelVersion", key: "modelVersion" },
        { title: "模型格式", align: 'center', dataIndex: "modelFormat", key: "modelFormat" },
        { title: "模型描述", align: 'center', dataIndex: "modelDesc", key: "modelDesc" },
        { title: "备注", align: 'center', dataIndex: "smallModelRemark", key: "smallModelRemark" },
        { title: "操作", align: 'center', key: "action", width: 250, scopedSlots: { customRender: 'action' } },
      ],
      tableData: [],
      total: 0,
      detailObj: {},
      isShowDetail: false,
      editVisible: false,
      rules: {
        modelName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      tableHeight: '',
      Height: ""
    }
  },
  created() {      
    let clientHeight = document.documentElement.clientHeight
    let screenHeight = clientHeight - 245 + "px";
    this.$nextTick(() => {
      this.tableHeight = screenHeight;
      this.Height = clientHeight - 245 - 66;

    })
  },
  mounted() {
    this.search();
    const that = this;
    window.onresize = () => {
      return (() => {
        let clientHeight = document.documentElement.clientHeight
        let screenHeight = clientHeight - 245 + "px";
        that.tableHeight = screenHeight;
        this.Height = clientHeight - 245 - 66;
      })()
    } 
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
      selectByConditions(this.filterForm).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      })
    },

    // 新增模型
    addSmallModel() {
      this.$refs.addModel.addVisible = true;
    },
    
    // 编辑模型
    editSmallModel(record) {
      this.modelForm = JSON.parse(JSON.stringify(record))
      this.editVisible = true;
    },
    cancelEditModel() {
      this.editVisible = false;
      this.modelForm = {}
    },
    okEditModel() {
      updateByModelId(this.modelForm).then(res => {
        if(res.data.status === 1) {
          this.$message.success('操作成功');
          this.search();
          this.editVisible = false;
        } else {
          this.$message.error('操作失败');
        }
      })
    },

    // 详情
    detailSmallModel(record) {
      this.detailObj = {}
      const params = {
        ...smallStageFile,
        foreignId: record.id
      }
      selectFileListByFileCategory(params).then(res => {
        if(res.data.data.length !== 0) {
          this.detailObj = {
            ...record,
            ...res.data.data[0]
          }
        } else {
          this.detailObj = {
            ...record,
            fileName: '暂无'
          }
        }
      }).finally(() => {
          this.isShowDetail = true;
      })
    },

    // 下载
    handleDownload() {
      download({ path: this.detailObj.filePath }).then(res => {
        if(res.status && res.status === 200) {
          axiosDownload(res.data, res.headers, this.detailObj.fileName);
        }
      })
    },

    // 删除模型
    deleteSmallModel(id) {
      deleteByModelId({ modelId: id }).then(res => {
        if(res.data.status === 1) {
          this.$message.success("删除成功");
          this.search();
        } else {
          this.$message.error("删除失败");
        }
      })
    },

    // 分页
    showSizeChange(pageNo, pageSize) {
      this.filterForm.pageSize = pageSize;
      this.filterForm.pageNo = pageNo;
      this.search()
    },
    currentChange(pageNo, pageSize) {
      this.filterForm.pageSize = pageSize;
      this.filterForm.pageNo = pageNo;
      this.search()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../style/index.scss";

.smallModelContainer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* background-color: #020F31; */
  background-color: #e8e8e8;
  .top {
    width: 100%;
    margin-bottom: 10px;
    /* background-color: #051F52; */
    background-color: #fff;
    box-sizing: border-box;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px #f0f1f2;
      padding: 0 10px;
      .title {
        /* color: #B0C5DF; */
        color: #1890ff;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        user-select: none;
        display: flex;
        align-items: center;
      }
      .operate {
        width: 180px;
        display: flex;
        justify-content: space-between;
      }
    }
    .filterArea {
      padding: 10px;
    }
  }
  .body {
    width: 100%;
    height: 100%;
    /* background-color: #051F52; */
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    .bodyTop {
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
    }
  }
}
.blueBlock {
  height: 20px;
  background-color: #1890ff;
  width: 5px;
  border-radius: 2px;
  margin-right: 5px;
}
</style>