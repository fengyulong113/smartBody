<template>
  <div class="aiModelDetail">
    <div class="aiModelDetailHdWrap">
      <div class="aiModelDetailHd">
        <div class="aiModelDetailHdTitle">{{ modelObj.modelName }}</div>
        <div class="aiModelDetailHdSubtitle">
          <div class="modelDesc">{{ modelObj.modelDesc }}</div>
          <a-divider v-show="modelObj.modelDesc" type="vertical" />
          <div>{{ modelObj.optUser }}</div>
          <a-divider v-show="modelObj.optUser" type="vertical" />
          <div>{{ modelObj.modelCreateTime }}</div>
        </div>
        <div class="aiModelDetailHdTags">
          <a-radio-button
            v-for="(item, i) in tagsLsit" 
            :key="i">
            {{ item.labelName }}
          </a-radio-button>
        </div>
      </div>
    </div>
    <div class="aiModelDetailBd">
      <div class="aiModelDetailBdMain">
        <a-tabs default-active-key="introduction" v-model="tabsKey" @change="tabsChange">
          <a-tab-pane key="introduction" tab="模型介绍">
            <vue-markdown :source="markdown"></vue-markdown>
          </a-tab-pane>
          <a-tab-pane key="space" tab="模型空间" force-render>
            <div class="aiModelDetailSpace">

              <div class="aiModelDetailSpaceT">
                <div class="aiModelDetailSpaceLeft">
                  <a-select class="aiModelDetailSpaceLeftSelect" v-model="branchVal" default-value="master">
                    <a-select-option value="master">master</a-select-option>
                  </a-select>
                  <a-breadcrumb>
                    <a-breadcrumb-item  v-for="(item,i) in crumbList" :key="i">
                      <span style="cursor: pointer;" @click="returnFlod(item)">{{ item.name }}</span>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                      <span> </span>
                    </a-breadcrumb-item>
                  </a-breadcrumb>
                </div>
                <div style="width: 230px;display: flex;align-items: center;">
                  <a-button type="primary" @click="createVersion">新增版本</a-button>
                  <div class="aiModelDetailSpaceDownload" @click="handleDownLoadFile">
                    <SvgIcon icon-class="download" />
                    下载模型demo
                  </div>
                </div>
              </div>

              <div class="aiModelDetailSpaceH">
                <div class="aiModelDetailSpaceHInfo">
                  <div class="aiModelDetailSpaceHNick">{{ modelObj.optUser }}</div>
                  <div class="aiModelDetailSpaceHSub">
                    <span>Update {{ modelObj.modelCreateTime }}</span>
                  </div>
                </div>
              </div>

              <a-table
                v-if="!isShowFileContent"
                class="aiModelDetailSpaceTable"
                :columns="columns"
                rowKey="objectName"
                :data-source="fileData"
                :pagination="false" 
                :showHeader="false"
              >
                <template slot="name" slot-scope="text, record">
                  <div style="display: flex;align-items: center;cursor: pointer" @click="fileClick(record)">
                    <a-icon :type="record.isDir ? 'folder-open' : 'file'" style="margin-right: 5px;"></a-icon>
                    <div>{{ text }}</div>
                  </div>
                </template>
                <span slot="action" slot-scope="text, record">
                  <a-button type="link" @click="fileClick(record)">查看</a-button>
                </span>
              </a-table>

              <div v-else>
                <AceEditor
                  :mode="'javascript'"
                  :value="fileCode"
                  :theme="'github'"
                  :options="options"
                  width="100%"
                  height="500px"
                ></AceEditor>
              </div>

            </div>
          </a-tab-pane>
          <a-tab-pane key="version" tab="模型版本">
            <a-table
              :columns="versionColumns"
              :data-source="modelObj.versions"
              rowKey="objectName"
              :pagination="false"
              size="default"
              style="width: 500px;"
            >
              <span slot="action" slot-scope="text, record">
                <a-button type="link" @click="downLoadVersion(record)">下载</a-button>
              </span>
            </a-table>
          </a-tab-pane>

          <a-tab-pane key="detail" tab="模型详情">
            <!-- 大模型详情 -->
            <a-form-model
              v-if="modelObj.modelType === '大模型'"
              :model="modelDetailForm"
              :label-col="{ span: 4, offset: 1 }"
              :wrapper-col="{ span: 15 }"
              labelAlign="left"
            >
              <a-form-model-item label="类型">
                <div class="color-grey">{{ modelDetailForm.bigModelType }}</div>
              </a-form-model-item>
              <a-form-model-item label="支持的tokens数">
                <div class="color-grey">{{ modelDetailForm.bigModelToken }}</div>
              </a-form-model-item>
              <a-form-model-item label="接口">
                <div class="color-grey">{{ modelDetailForm.serviceInterface }}</div>
              </a-form-model-item>
              <a-form-model-item label="支持的领域">
                <div class="color-grey">{{ modelDetailForm.bigModelArea }}</div>
              </a-form-model-item>
              <a-form-model-item label="描述">
                <div class="color-grey">{{ modelDetailForm.bigModelDesc }}</div>
              </a-form-model-item>
              <a-form-model-item label="备注">
                <div class="color-grey">{{ modelDetailForm.smallModelRemark }}</div>
              </a-form-model-item>
              
            </a-form-model>

            <!-- 小模型详情 -->
            <a-form-model
              v-else-if="modelObj.modelType === '小模型'"
              :model="modelDetailForm"
              :label-col="{ span: 3, offset: 1 }"
              :wrapper-col="{ span: 10 }"
              labelAlign="left"
            >
              <a-form-model-item label="版本">
                <div class="color-grey">{{ modelDetailForm.modelVersion }}</div>
              </a-form-model-item>
              <a-form-model-item label="格式">
                <div class="color-grey">{{ modelDetailForm.modelFormat }}</div>
              </a-form-model-item>
              <a-form-model-item label="描述">
                <div class="color-grey">{{ modelDetailForm.modelDesc }}</div>
              </a-form-model-item>
              <a-form-model-item label="备注">
                <div class="color-grey">{{ modelDetailForm.smallModelRemark }}</div>
              </a-form-model-item>
              
            </a-form-model>

            <!-- 智能体详情 -->
            <a-form-model
              v-else-if="modelObj.modelType === '智能体'"
              :model="modelDetailForm"
              :label-col="{ span: 3, offset: 1 }"
              :wrapper-col="{ span: 15, offset: 0 }"
              labelAlign="left"
            >
              <a-form-model-item label="智能体类型">
                <div class="color-grey">{{ modelDetailForm.smartType }}</div>
              </a-form-model-item>
              <a-form-model-item label="想定场景">
                <div class="color-grey">{{ modelDetailForm.scenario }}</div>
              </a-form-model-item>
              <a-form-model-item label="作战方案">
                <div class="color-grey">{{ modelDetailForm.battlePlan }}</div>
              </a-form-model-item>
              <a-form-model-item label="作战方">
                <div class="color-grey">{{ modelDetailForm.battleOrg }}</div>
              </a-form-model-item>
              <a-form-model-item label="配置文件">
                <div class="color-grey">{{ modelDetailForm.configFile }}</div>
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="aiModelDetailBdAsideWrap"></div>
    </div>

    <!-- 新增版本 -->
    <a-modal
    :visible="versionVisible"
    title="新增版本"
    :width="500"
    cancelText="取消"
    @cancel="cancelVersion"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    >
      <a-form-model
        :model="versionForm"
        :label-col="{ span: 4, offset: 0 }"
        :wrapper-col="{ span: 16 }"
        labelAlign="right"
        ref="versionFormRef"
        :rules="rules"
        :maskClosable="false">
        <a-form-model-item label="版本名称" prop="tagName">
          <a-input v-model="versionForm.tagName" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import SvgIcon from '@/components/SvgIcon.vue';
import AceEditor from 'vue2-ace-editor'
import 'brace/theme/github'

import {
  selectModelDetail,
  getModelCodeFile,
  getCodeFileContent,
  downloadByVersion,
  download,
  getReadMe,
  createCodeVersion,
  selectBigModelDetail,
  selectSmallModelDetail,
  getSmartBodyDetail
} from '@/api/aiModel'
import { axiosDownload } from '@/utils/index'
export default {
  name: 'ModelsDetail',
  components: {
    VueMarkdown,
    SvgIcon,
    AceEditor
  },
  props: {
    activeId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      modelObj: {},
      tagsLsit: [],
      crumbList: [],
      branchVal: 'master',
      tabsKey: "introduction",
      isShowFileContent: false,
      confirmLoading: false,
      options: {
        readOnly: true,
        fontSize: '14px',
        showGutter: false,
        tabSize: 2,
        highlightActiveLine: false,
        // displayIndentGuides: false,
      },
      versionForm: {
        tagName: "",
      },
      rules: {
        tagName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      fileCode: "",
      markdown: "",
      versionVisible: false,
      fileData: [],
      modelDetailForm: {},
      columns: [
        { 
          dataIndex: "name", 
          scopedSlots: { customRender: 'name' },  
          align: 'left', 
          key: "name" 
        },
        { 
          key: 'action',
          align: 'right',
          scopedSlots: { customRender: 'action' }, 
        },
      ],
      versionColumns: [
        {
          dataIndex: 'name',
          align: 'left',
          key: 'objectName',
          title: '名称'
        },
        { 
          key: 'action',
          title: '操作',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'action' }, 
        },
      ],
    };
  },
  mounted() {
    this.init();
    this.getIntroduction();
  },

  methods: {
    init() {
      this.crumbList = [];
      selectModelDetail({ modelId: this.activeId }).then(res => {
        res = res.data.data
        let tempArr = res.versions !== null && res.versions.length > 0 ?
                      res.versions.map(e => {
                        return {
                          ...e,
                          name: e.objectName.split('/')[e.objectName.split('/').length - 2]
                        }
                      })
                      : []
        res.versions = tempArr
        this.modelObj = res;
        this.tagsLsit = res.labels;
        if(res.modelTask !== null || res.modelLibrary !== null) {
          this.tagsLsit.unshift({ labelName: res.modelTask });
          this.tagsLsit.unshift({ labelName: res.modelLibrary });
        }
        this.crumbList.push({
          name: res.modelName,
          path: ""
        })
      })
    },

    // 获取模型介绍
    getIntroduction() {
      getReadMe({
        modelId: this.activeId
      }).then(res => {
        console.log(res)
        this.markdown = res.data.data ? res.data.data : "";
      })
    },

    // 获取模型详情
    getModelDetail(type) {
      this.modelDetailForm = {};
      switch (type) {
        case '大模型':
          selectBigModelDetail({ modelId: this.modelObj.id }).then(res => {
            this.modelDetailForm = res.data.data;
          })
          break;
        case '小模型':
          selectSmallModelDetail({ modelId: this.modelObj.id }).then(res => {
            this.modelDetailForm = res.data.data;
          })
          break;
        case '智能体':
          getSmartBodyDetail({ modelId: this.modelObj.id }).then(res => {
            this.modelDetailForm = res.data.data;
          })
          break;
        default:
          break;
      }
    },

    // 新增版本
    createVersion() {
      this.versionVisible = true;
    },

    // 取消新增版本
    cancelVersion() {
      this.versionVisible = false;
      this.versionForm = {
        tagName: ""
      }
    },

    // 确定新增版本
    handleOk() {
      this.$refs.versionFormRef.validate((valid) => {
        if(valid) {
          this.confirmLoading = true;
          createCodeVersion({
            tagName: this.versionForm.tagName,
            modelId: this.modelObj.id
          }).then(res => {
            if(res.data.status === 1) {
              this.versionVisible = false;
              this.versionForm.tagName = '';
              this.$message.success('新增版本成功');
              this.tabsKey = 'version'
              this.init();
            }
          }).finally(() => {
            this.confirmLoading = false;
          })
        }
      })
    },

    tabsChange(key) {
      if(key === 'space') {
        let filePath = this.crumbList.slice(1).map(e => e.name).join('/')
        getModelCodeFile({
          modelId: this.modelObj.id,
          filePath: filePath
        }).then(res => {
          res = res.data.data;
          this.fileData = this.coverFileData(res);
        })
      } else if(key === 'introduction') {
        this.getIntroduction();
      } else if(key === 'detail') {
        this.getModelDetail(this.modelObj.modelType)
      }
    },

    coverFileData(fileData) {
      return fileData.map(item => {
        if(item.isDir) {
          return  {
            ...item,
            name: item.objectName.split('/').slice(0, -1).pop()
          }
        } else {
          return {
            ...item,
            name: item.objectName.split('/').pop(),
          }
        }
      })
    },

    joinFileName(arr, name) {
      arr = arr.map(e => e.name)
      arr.push(name)
      arr.shift(arr[0])
      return arr.join('/')
    },

    fileClick(record) {
      if(!record.isDir) {
        getCodeFileContent({
          filePath: record.objectName
        }).then(res => {
          this.isShowFileContent = true;
          this.fileCode = res.data.data;
        })
      } else if(record.isDir) {
        getModelCodeFile({
          modelId: this.modelObj.id,
          filePath: this.joinFileName(this.crumbList, record.name)
        }).then(res => {
          this.fileData = this.coverFileData(res.data.data);
          this.crumbList.push(record)
        })
      }
    },

    returnFlod(item) {
      let index = this.crumbList.findIndex(e => e.name === item.name)
      let tempArr = this.crumbList.slice(1, index + 1).map(e => e.name)
      let filePath = tempArr.join('/')
      getModelCodeFile({
        modelId: this.modelObj.id,
        filePath: filePath
      }).then(res => {
        this.fileData = this.coverFileData(res.data.data);;
        let deleteIndex = this.crumbList.findIndex(e => e.name === item.name);
        this.crumbList = this.crumbList.slice(0, deleteIndex + 1)
      }).finally(() => {
        this.isShowFileContent = false;
      })
    },

    handleDownLoadFile() {
      download({
        modelId: this.modelObj.id,
      }).then(res => {
        console.log(res)
        axiosDownload(res.data, res.headers, this.modelObj.modelName, 'application/zip');
      })
    },

    downLoadVersion(record) {
      downloadByVersion({
        modelId: this.modelObj.id,
        versionName: record.name
      }).then(res => {
        axiosDownload(res.data, res.headers, record.name, 'application/zip');
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/aiModel.scss';

.aiModelDetail {
  width: 100%;
  .aiModelDetailHdWrap {
    width: 100vw;
    min-width: 1280px;
    background-image: linear-gradient(175deg, rgba(255, 255, 255, 0) 40%, #F5F7FB 100%);
    border-bottom: 1px solid #EFF0F2;
    .aiModelDetailHd {
      width: 1280px;
      margin: 0 auto;
      padding: 30px 0;
      position: relative;
      .aiModelDetailHdBreadcrumb {
        margin-bottom: 24px;
        .aiModelDetailHdBreadcrumbBack {
          &:hover {
            color: $themeColor;
            cursor: pointer;
          }
        }
      }
      .aiModelDetailHdTitle {
        font-size: 26px;
        line-height: 32px;
        font-weight: 500;
        margin-bottom: 8px;
      }
      .aiModelDetailHdSubtitle {
        display: flex;
        align-items: center;
        color: #666;
        line-height: 24px;
        margin-bottom: 8px;
        .modelDesc {
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .aiModelDetailHdTags {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
      }
    }
  }
  .aiModelDetailBd {
    display: flex;
    width: 1280px;
    margin: 0 auto;
    position: relative;
    .aiModelDetailBdMain {
      width: 800px;
      padding-right: 71px;
      box-sizing: content-box;
      border-right: 1px solid #eff0f2;
      .aiModelDetailSpace {
        box-sizing: border-box;
        .aiModelDetailSpaceT {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          height: 36px;
          .aiModelDetailSpaceLeft {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .aiModelDetailSpaceLeftSelect {
              width: 180px;
              margin-right: 12px;
              height: 32px;
              /deep/ div {
                border-radius: 0px;
              }
            }
          }
          .aiModelDetailSpaceDownload {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ccc;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333;
            padding: 0 12px;
            margin-left: 14px;
            height: 36px;
            cursor: pointer;
          }
        }
        .aiModelDetailSpaceH {
          background: #f5f7fb;
          border: 1px solid rgba(6, 6, 20, 0.1);
          border-bottom: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          width: 100%;
          .aiModelDetailSpaceHInfo {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-right: 20px;
            width: 650px;
            .aiModelDetailSpaceHNick {
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #333;
              line-height: 22px;
              font-weight: 500;
              margin-right: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              min-width: min-content;
            }
            .aiModelDetailSpaceHSub {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #333;
              line-height: 22px;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              word-break: break-all;
            }
          }
        }
        .aiModelDetailSpaceTable {
          border: 1px solid rgba(6, 6, 20, 0.1);
          border-bottom: none;
          font-family: PingFangSC-Regular;
        }
      }
    }
    .aiModelDetailBdAsideWrap {

    }
  }
}
</style>