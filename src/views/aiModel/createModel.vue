<template>
  <div class="aiCreateModel">
    <div class="aiCreateModelHeadWrap">
      <div class="aiCreateModelHead">
        <a-breadcrumb class="aiModelHdBreadcrumb ">
          <a-breadcrumb-item>
            <span class="aiModelHdBreadcrumbBack" @click="goHome">模型库</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span 
              :class="uploadFileShow ? `aiModelHdBreadcrumbBack` : ''" 
              @click="uploadFileShow = false;modelId = ''">
              创建模型
            </span>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-if="uploadFileShow">
            <span>上传文件</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div class="aiCreateModelBd">
      <!-- <div class="aiCreateModelBdName">
        <div class="labelTitle">模型名称</div>
        <a-input placeholder="模型名称"></a-input>
      </div> -->
      <div v-if="!uploadFileShow" class="aiCreateModelBdMetaData">
        <div class="aiCreateModelBdMetaDataMain">
          <a-row>
            <div class="aiCreateModelBdMetaDataMainTitle">模型参数</div>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">模型名称</div>
                <a-input class="gridValue" v-model="modelForm.modelName"></a-input>
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">框架</div>
                <a-select class="gridValue" allowClear v-model="modelForm.modelLibrary">
                  <a-select-option 
                    v-for="(item, i) in libraryList"
                    :key="i"
                    :value="item.name"
                    >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">模型分类</div>
                <a-cascader
                  class="gridValue"
                  v-model="modelForm.modelTask"
                  allowClear
                  :options="taskList"
                  :load-data="loadData"
                  change-on-select
                />
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">标签</div>
                <a-select class="gridValue" allowClear v-model="modelForm.label">
                  <a-select-option
                    v-for="(item, i) in  dictionary.model_label"
                    :key="i"
                    :value="item.value"
                  >
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">格式</div>
                <a-select class="gridValue" allowClear v-model="modelForm.modelFormat">
                  <a-select-option value="源文件">源文件</a-select-option>
                  <a-select-option value="镜像">镜像</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">类型</div>
                <a-select class="gridValue" allowClear v-model="modelForm.modelType">
                  <a-select-option value="大模型">大模型</a-select-option>
                  <a-select-option value="小模型">小模型</a-select-option>
                  <a-select-option value="智能体">智能体</a-select-option>
                </a-select>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">描述</div>
                <a-textarea class="gridValue" v-model="modelForm.modelDesc" :auto-size="{ minRows: 3, maxRows: 3 }"></a-textarea>
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">备注</div>
                <a-textarea class="gridValue" v-model="modelForm.remark" :auto-size="{ minRows: 3, maxRows: 3 }"></a-textarea>
              </div>
            </a-col>
          </a-row>
          <div class="aiCreateModelBdMetaDataMainBottom">
              
            <div 
              v-if="modelForm.modelType !== undefined" 
              class="aiCreateModelBdMetaDataMainTitle">
              {{ modelForm.modelType }}参数
            </div>

            <!-- 大模型表单 -->
            <a-form-model
              v-if="modelForm.modelType === '大模型'" 
              :model="bigModelForm"
              :label-col="{ span: 3, offset: 0 }"
              :wrapper-col="{ span: 10 }"
              labelAlign="right"
              :ref="modelForm.modelType"
              :rules="bigModelRules">
              <a-form-model-item label="名称" prop="modelName">
                <a-input v-model="bigModelForm.modelName" />
              </a-form-model-item>

              <a-form-model-item label="类型" prop="bigModelType">
                <a-input v-model="bigModelForm.bigModelType" />
              </a-form-model-item>

              <a-form-model-item label="支持的tokens数" prop="bigModelToken">
                <a-input-number v-model="bigModelForm.bigModelToken" />
              </a-form-model-item>

              <a-form-model-item label="接口" prop="serviceInterface">
                <a-input v-model="bigModelForm.serviceInterface" />
              </a-form-model-item>

              <a-form-model-item label="支持的领域" prop="bigModelArea">
                <a-input v-model="bigModelForm.bigModelArea" />
              </a-form-model-item>

              <a-form-model-item label="描述" prop="bigModelDesc">
                <a-textarea v-model="bigModelForm.bigModelDesc" :autoSize="{ minRows: 4, maxRows: 4 }" />
              </a-form-model-item>

              <a-form-model-item label="备注" prop="smallModelRemark">
                <a-input v-model="bigModelForm.smallModelRemark" />
              </a-form-model-item>
            </a-form-model>

            <!-- 小模型表单 -->
            <a-form-model 
              v-else-if="modelForm.modelType === '小模型'" 
              :model="samllModelForm"
              :label-col="{ span: 2, offset: 0 }"
              :wrapper-col="{ span: 10 }"
              labelAlign="right"
              :ref="modelForm.modelType"
              :rules="smallModelRules">
              <a-form-model-item label="名称" prop="modelName">
                <a-input v-model="samllModelForm.modelName" />
              </a-form-model-item>

              <a-form-model-item label="版本" prop="modelVersion">
                <a-input v-model="samllModelForm.modelVersion" />
              </a-form-model-item>

              <a-form-model-item label="格式" prop="modelFormat">
                <a-input v-model="samllModelForm.modelFormat" />
              </a-form-model-item>

              <a-form-model-item label="描述" prop="modelDesc">
                <a-textarea v-model="samllModelForm.modelDesc" :autoSize="{ minRows: 4, maxRows: 4 }" />
              </a-form-model-item>

              <a-form-model-item label="备注" prop="smallModelRemark">
                <a-input v-model="samllModelForm.smallModelRemark" />
              </a-form-model-item>
            </a-form-model>

            <!-- 智能体表单 -->
            <a-form-model 
              v-else-if="modelForm.modelType === '智能体'" 
              :model="smartBodyForm"
              :label-col="{ span: 2, offset: 0 }"
              :wrapper-col="{ span: 10 }"
              labelAlign="right"
              :ref="modelForm.modelType"
              :rules="smartBodyRules">
              <a-form-model-item label="名称" prop="modelName">
                <a-input v-model="smartBodyForm.modelName" />
              </a-form-model-item>

              <a-form-model-item label="类型" prop="smartType">
                <a-input v-model="smartBodyForm.smartType" />
              </a-form-model-item>

              <a-form-model-item label="想定场景" prop="scenario">
                <a-input v-model="smartBodyForm.scenario" />
              </a-form-model-item>

              <a-form-model-item label="作战方案" prop="battlePlan">
                <a-input v-model="smartBodyForm.battlePlan" />
              </a-form-model-item>

              <a-form-model-item label="作战方" prop="battleOrg">
                <a-input v-model="smartBodyForm.battleOrg" />
              </a-form-model-item>

              <a-form-model-item label="配置文件" prop="configFile">
                <a-input v-model="smartBodyForm.configFile" />
              </a-form-model-item>
            </a-form-model>

            <div style="padding: 5px 10px;">
              <a-button @click="saveAndNext" type="primary">
                <a-icon type="save" /> 保存并下一步
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="aiCreateModelBdMd">
        <div class="aiCreateModelBdBdTitle">readme</div>
        <AceEditor
          :mode="'markdown'"
          :value="markdownContent"
          :theme="'github'"
          @input="updateCode"
          :options="options"
          width="100%"
          height="500px"
          style="border-bottom: 1px solid #e5e7eb;"
        />
        <!-- <vue-markdown ref="markdownRef" :source="md"></vue-markdown> -->
        <div class="aiCreateModelBdBdTitle">file</div>
        <div class="aiCreateModelBdBdMid">
          <a-upload
            :file-list="fileList"
            :multiple="false"
            :remove="(file) => myRemoveFile(file, fileList)"
            :before-upload="(file) => myBeforeUploadFile(file)"
            :showUploadList="{
              showRemoveIcon: true,
            }"
          >
            <!-- <a-button v-if="fileList.length == 0">
              <a-icon type="file" /> 选择文件
            </a-button> -->
            <a-button>
              <a-icon type="file" /> 选择文件
            </a-button>
          </a-upload>
        </div>
        <div class="aiCreateModelBdBdBottom">
          <a-button type="primary" @click="saveModel"><a-icon type="save" /> 保存</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AceEditor from 'vue2-ace-editor'
import VueMarkdown from "vue-markdown";
import 'brace/theme/github'
import { createFile } from '@/utils/index'
import { mapGetters } from 'vuex';
import {
  getRootList,
  getChildList
} from '@/api/dictionary'
import {
  insertModel,
  uploadCodeFile
} from '@/api/aiModel'
export default {
  name: 'CreateModel',
  components: { 
    AceEditor,
    VueMarkdown,
  },
  data() {
    return {
      options: {
        readOnly: false,
        fontSize: '14px',
        showGutter: false,
        tabSize: 2,
        highlightActiveLine: false,
        displayIndentGuides: false,
        autoScrollEditorIntoView: true,
      },
      markdownContent: "# README",
      md: "# ddd\n ## dasd",
      fileList: [],
      modelForm: {
        label: undefined,
        modelDesc: "",
        modelFormat: undefined,
        modelLibrary: undefined,
        modelName: "",
        modelTask: [],
        modelType: undefined,
        remark: "",
      },
      bigModelForm: {
        modelName: "",
        bigModelType: "",
        bigModelToken: 0,
        serviceInterface: "",
        bigModelArea: "",
        bigModelDesc: "",
        smallModelRemark: "",
      },
      samllModelForm: {
        modelName: "",
        modelVersion: "",
        modelFormat: "",
        modelDesc: "",
        smallModelRemark: ""
      },
      smartBodyForm: {
        modelName: "",
        smartType: "",
        scenario: "",
        battlePlan: "",
        battleOrg: "",
        configFile: "",
      },
      bigModelRules: {
        modelName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      smallModelRules: {
        modelName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      smartBodyRules: {
        modelName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      categotyList: [],
      taskList: [],
      libraryList: [],
      modelId: '',
      uploadFileShow: false,
    };
  },

  mounted() {
    this.getTaskAndLibrary();
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/aiModel' });
    },

    updateCode(newData) {
      this.markdownContent = newData;
      console.log(this.$refs.markdownRef)
      // let file = createFile('README.md', this.markdownContent);
      // console.log(file)
    },

    getTaskAndLibrary() {
      getRootList({
        column: "createTime",
        order: "desc",
        filed: "id, name",
        pageNo: 1,
        pageSize: 200
      }).then(res => {
        this.categotyList = res.data.result.records;
        let task = this.categotyList.find(item => item.name === '模型分类')
        let library = this.categotyList.find(item => item.name === '框架')

        getChildList({
          pid: task.id,
          column: "createTime",
          order: "desc",
          filed: "id, name",
          pageNo: 1,
          pageSize: 200
        }).then(res => {
          this.taskList = res.data.result.map(item => {
            return  {
              ...item,
              label: item.name,
              value: item.name,
              isLeaf: false,
            }
          });
        })

        getChildList({
          pid: library.id,
          column: "createTime",
          order: "desc",
          filed: "id, name",
          pageNo: 1,
          pageSize: 200
        }).then(res => {
          this.libraryList = res.data.result;
        })

      })

    },

    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      console.log(targetOption)
      targetOption.loading = true;

      getChildList({
        pid: targetOption.id,
        column: "createTime",
        order: "desc",
        filed: "id, name",
        pageNo: 1,
        pageSize: 200
      }).then(res => {
        targetOption.loading = false;
        targetOption.children = res.data.result.map(item => {
          return  {
            ...item,
            label: item.name,
            value: item.name,
          }
        });
        this.taskList = [...this.taskList];
      })
      // load options lazily
      // setTimeout(() => {
      //   targetOption.loading = false;
      //   targetOption.children = [
      //     {
      //       label: `${targetOption.label} Dynamic 1`,
      //       value: 'dynamic1',
      //     },
      //     {
      //       label: `${targetOption.label} Dynamic 2`,
      //       value: 'dynamic2',
      //     },
      //   ];
      //   this.optionsList = [...this.optionsList];
      // }, 1000);
    },

    saveAndNext() {
      if(this.modelForm.modelName === '') {
        this.$message.warning("请填写模型名称")
      } else if(this.modelForm.modelType === undefined) {
        this.$message.warning("请先选择类型")
      } else {
        this.$refs[this.modelForm.modelType].validate((valid) => {
          if(valid) {
            const params = JSON.parse(JSON.stringify(this.modelForm));
            switch (this.modelForm.modelType) {
              case '大模型':
                params.bigModel = JSON.parse(JSON.stringify(this.bigModelForm));
                break;
              case '小模型':
                params.smallModel = JSON.parse(JSON.stringify(this.samllModelForm));
                break;
              case '智能体':
                params.smartAgent = JSON.parse(JSON.stringify(this.smartBodyForm));
                break;
              default:
                break;
            }
            let tempModelTask = this.modelForm.modelTask[this.modelForm.modelTask.length - 1];
            params.modelTask = tempModelTask
            console.log(params)
            insertModel(params).then(res => {
              this.modelId = res.data.data;
              this.uploadFileShow = true;
            })
          }
        })
      }
    },

    saveModel() {
      // let readmeFile = createFile('REAMDE.md', this.markdownContent);
      // this.fileList.push(readmeFile);
      // console.log(this.fileList)
      let formData = new FormData();
      formData.append("modelId", this.modelId);
      // // formData.append("files", readmeFile);
      this.fileList.forEach((file) => {
        formData.append("files", file);
      });
      uploadCodeFile(formData).then(res => {
        console.log(res)
      })
    },

    myRemoveFile(file, fileList) {
      let i = fileList.indexOf(file);
      fileList.splice(i, 1);
    },
    myBeforeUploadFile(file) {
      console.log(this.fileList)
      this.fileList.push(file);  
      // if(this.fileList.length > 1) {
      //   this.fileList= this.fileList.slice(-1)
      // }
      return false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/aiModel.scss';

.aiCreateModel {
  width: 100%;
  .aiCreateModelHeadWrap {
    width: 100vw;
    min-width: 1280px;
    background-image: linear-gradient(175deg, rgba(255, 255, 255, 0) 40%, #F5F7FB 100%);
    border-bottom: 1px solid #EFF0F2;
    .aiCreateModelHead {
      width: 1280px;
      margin: 0 auto;
      padding: 18px 0;
      position: relative;
      .aiModelHdBreadcrumb {
        .aiModelHdBreadcrumbBack {
          &:hover {
            color: $themeColor;
            cursor: pointer;
          }
        }
      }
    }
  }
  .aiCreateModelBd {
    width: 1280px;
    margin: 0 auto;
    .aiCreateModelBdName {
      display: flex;
      margin-top: 10px;
      margin-bottom: 30px;
      .labelTitle {
        width: 85px;
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        font-weight: 500;
      }
    }
    .aiCreateModelBdMetaData {
      margin-bottom: 30px;
      margin-top: 10px;
      .aiCreateModelBdMetaDataMain {
        border: 1px solid #e5e7eb;
        border-radius: 5px;
        border-bottom: none;
        .aiCreateModelBdMetaDataMainTitle {
          background: #fafbfc;
          padding: 5px 10px;
        }
        .grid {
          padding: 7px 15px;
          display: flex;
          align-items: center;
          .gridLabel {
            width: 100px;
          }
          .gridValue {
            width: calc(100% - 100px);
          }
        }
        .aiCreateModelBdMetaDataMainBottom {
          border-bottom: 1px solid #e5e7eb;
          padding: 5px 10px;
        }
      }
    }
    .aiCreateModelBdMd {
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      margin-bottom: 30px;
      margin-top: 10px;

      .aiCreateModelBdBdTitle {
        background: #fafbfc;
        padding: 5px 10px;
      }
      .aiCreateModelBdBdMid {
        padding: 5px 10px;
        border-bottom: 1px solid #e5e7eb;
      }
      .aiCreateModelBdBdBottom {
        padding: 5px 10px;
      }
    }
  }
}
.gridLeft {
  border-bottom: 1px solid #e5e7eb;
  // border-left: none;
  // border-right: none;
  // border-top: none;
}
.gridRight {
  border: 1px solid #e5e7eb;
  border-right: none;
  border-top: none;
}
/deep/ .ant-upload-list-item-info {
  padding: 0 25px 0 4px;
}
/deep/ .ant-upload-list-item {
  margin: 5px 0;
}
</style>