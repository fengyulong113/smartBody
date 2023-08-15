<template>
  <div class="bigModelContainer">
    <div class="top">
      <div class="header">
        <div class="title">
          <div class="blueBlock"></div>大模型
        </div>
        <div class="operate">
          <a-button icon="sync" @click="reset">重置</a-button>
          <a-button type="primary" icon="search" @click="search">查询</a-button>
        </div>
      </div>
      <div class="filterArea">
        <a-form-model layout="inline" :model="filterForm">
          <a-form-model-item label="大模型类型">
            <a-input v-model="filterForm.bigModelType"></a-input>
          </a-form-model-item>
          <a-form-model-item label="模型参数">
            <a-input v-model="filterForm.bigModelParam"></a-input>
          </a-form-model-item>
          <a-form-model-item label="支持的tokens数">
            <a-input v-model="filterForm.bigModelToken"></a-input>
          </a-form-model-item>
          <a-form-model-item label="支持的领域">
            <a-input v-model="filterForm.bigModelArea"></a-input>
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
          @back="() => isShowDetail = false">
          <div class="main">
            <a-descriptions size="middle" :column="3">
              <a-descriptions-item label="模型名称">
                {{ this.detailObj.modelName }}
              </a-descriptions-item>
              <a-descriptions-item label="模型类型">
                {{ this.detailObj.modelType }}
              </a-descriptions-item>
              <a-descriptions-item label="大模型类型">
                {{ this.detailObj.bigModelType }}
              </a-descriptions-item>
              <a-descriptions-item label="大模型参数">
                {{ this.detailObj.bigModelParam }}
              </a-descriptions-item>
              <a-descriptions-item label="创建时间">
                {{ this.detailObj.modelCreateTime }}
              </a-descriptions-item>
              <a-descriptions-item label="支持的tokens数">
                {{ this.detailObj.bigModelToken }}
              </a-descriptions-item>
              <a-descriptions-item label="支持的领域">
                {{ this.detailObj.bigModelArea }}
              </a-descriptions-item>
              <a-descriptions-item label="接口">
                {{ this.detailObj.serviceInterface }}
              </a-descriptions-item>
              <a-descriptions-item label="描述">
                {{ this.detailObj.bigModelDesc }}
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                {{ this.detailObj.smallModelRemark }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </a-page-header>
      </div>
      <div v-else>
        <div class="bodyTop">
          <a-button type="primary" icon="plus" @click="addBigModel">新增大模型</a-button>
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
              <a-button type="primary" size="small" icon="edit" @click="editBigModel(record)">编辑</a-button>
              <a-button style="margin: 0 5px" type="primary" size="small" icon="unordered-list" @click="detailBigModel(record)">详情</a-button>
              <a-popconfirm
                title="是否确认删除?"
                cancel-text="取消"
                ok-text="确认"
                @confirm="() => deleteBigModel(record.id)"
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

    <a-modal
      :title="title"
      v-model="addOrEditVisible"
      @cancel="cancelAddModel"
      @ok="okAddModel"
      :width="600"
      centered
      :maskClosable="false"
      cancel-text="取消"
      okText="确认">
      <a-form-model 
        :model="modelForm"
        :label-col="{ span: 5, offset: 0 }"
        :wrapper-col="{ span: 18 }"
        labelAlign="right"
        ref="modelFormRef"
        :rules="rules">
        <a-form-model-item label="名称" prop="modelName">
          <a-input v-model="modelForm.modelName" />
        </a-form-model-item>

        <a-form-model-item label="类型" prop="bigModelType">
          <a-input v-model="modelForm.bigModelType" />
        </a-form-model-item>

        <a-form-model-item label="支持的tokens数" prop="bigModelToken">
          <a-input-number v-model="modelForm.bigModelToken" />
        </a-form-model-item>

        <a-form-model-item label="接口" prop="serviceInterface">
          <a-input v-model="modelForm.serviceInterface" />
        </a-form-model-item>

        <a-form-model-item label="支持的领域" prop="bigModelArea">
          <a-input v-model="modelForm.bigModelArea" />
        </a-form-model-item>

        <a-form-model-item label="描述" prop="bigModelDesc">
          <a-textarea v-model="modelForm.bigModelDesc" :autoSize="{ minRows: 4, maxRows: 4 }" />
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
  insertBigModel,
  selectBigModelDetail,
  selectByConditions,
  updateByModelId
} from '@/api/bigModel';
export default {
  name: 'bigModel',
  data() {
    return {
      filterForm: {
        bigModelType: "",
        bigModelParam: "",
        bigModelToken: "",
        pageNo: 1,
        pageSize: 20,
      },
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
        { title: "大模型类型", align: 'center', dataIndex: "bigModelType", key: "bigModelType" },
        { title: "大模型参数", align: 'center', dataIndex: "bigModelParam", key: "bigModelParam" },
        { title: "支持的tokens数", align: 'center', dataIndex: "bigModelToken", key: "bigModelToken" },
        { title: "支持的领域", align: 'center', dataIndex: "bigModelArea", key: "bigModelArea" },
        { title: "接口", align: 'center', dataIndex: "serviceInterface", key: "serviceInterface" },
        { title: "描述", align: 'center', dataIndex: "bigModelDesc", key: "bigModelDesc" },
        { title: "备注", align: 'center', dataIndex: "bigModelRemark", key: "bigModelRemark" },
        { title: "操作", align: 'center', key: "action", width: 250, scopedSlots: { customRender: 'action' } },
      ],
      tableData: [],
      total: 0,
      isShowDetail: false,
      addOrEditVisible: false,
      title: "",
      detailObj: {},
      modelForm: {
        modelName: "",
        bigModelType: "",
        bigModelToken: "",
        serviceInterface: "",
        bigModelArea: "",
        bigModelDesc: "",
        smallModelRemark: "",
      },
      rules: {
        modelName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      tableHeight: "",
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

    // 新增
    addBigModel() {
      this.title = '新增模型';
      this.addOrEditVisible = true;
    },
    okAddModel() {
      this.$refs.modelFormRef.validate((valid) => {
        if(valid) {
          if(this.title === '新增模型') {
            const params = {
              ...this.modelForm,
              modelType: "大模型"
            }
            insertBigModel(params).then(res => {
              if(res.data.status === 1) {
                this.$message.success("新增成功");
                this.modelForm = {
                  modelName: "",
                  bigModelType: "",
                  bigModelToken: "",
                  serviceInterface: "",
                  bigModelArea: "",
                  bigModelDesc: "",
                  smallModelRemark: "",
                }
                this.reset();
              } else {
                this.$message.error("操作失败")
              }
            }).finally(() => {
              this.addOrEditVisible = false;
            })
          } else {
            updateByModelId(this.modelForm).then(res => {
              if(res.data.status === 1) {
                this.$message.success("操作成功")
                this.search();
                this.modelForm = {
                  modelName: "",
                  bigModelType: "",
                  bigModelToken: "",
                  serviceInterface: "",
                  bigModelArea: "",
                  bigModelDesc: "",
                  smallModelRemark: "",
                }
                this.addOrEditVisible = false;
              } else {
                this.$message.error("操作失败");
                this.modelForm = {
                  modelName: "",
                  bigModelType: "",
                  bigModelToken: "",
                  serviceInterface: "",
                  bigModelArea: "",
                  bigModelDesc: "",
                  smallModelRemark: "",
                }
                this.addOrEditVisible = false;
              }
            })
          }

        }
      })
    },
    cancelAddModel() {
      this.modelForm = {
        modelName: "",
        bigModelType: "",
        bigModelToken: "",
        serviceInterface: "",
        bigModelArea: "",
        bigModelDesc: "",
        smallModelRemark: "",
      }
      this.addOrEditVisible = true;
    },


    // 编辑
    editBigModel(record) {
      this.title = '编辑模型';
      this.modelForm = JSON.parse(JSON.stringify(record));
      this.addOrEditVisible = true;
    },

    // 详情
    detailBigModel(record) {
      this.detailObj = JSON.parse(JSON.stringify(record));
      this.isShowDetail = true;
    },

    // 删除
    deleteBigModel(id) {
      deleteByModelId({ modelId: id }).then(res => {
        if(res.data.status === 1){
          this.$message.success("操作成功");
          this.search();
        } else {
          this.$message.error("操作失败");
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
  }
}
</script>

<style lang="scss" scoped>
.bigModelContainer {
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