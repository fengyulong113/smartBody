<template>
  <div class="aiCreateModel">
    <div class="aiCreateModelHeadWrap">
      <div class="aiCreateModelHead">
        <a-breadcrumb class="aiModelHdBreadcrumb ">
          <a-breadcrumb-item>
            <span class="aiModelHdBreadcrumbBack" @click="goHome">模型库</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span>创建模型</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div class="aiCreateModelBd">
      <div class="aiCreateModelBdName">
        <div class="labelTitle">模型名称</div>
        <a-input placeholder="模型名称"></a-input>
      </div>
      <div class="aiCreateModelBdMetaData">
        <div class="aiCreateModelBdMetaDataMain">
          <a-row>
            <div class="aiCreateModelBdMetaDataMainTitle">元数据</div>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">License</div>
                <a-select class="gridValue"></a-select>
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">datasets</div>
                <a-select class="gridValue"></a-select>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">language</div>
                <a-select class="gridValue"></a-select>
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">metrics</div>
                <a-select class="gridValue"></a-select>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">library_name</div>
                <a-select class="gridValue"></a-select>
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">pipeline_tag</div>
                <a-select class="gridValue"></a-select>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" class="gridLeft">
              <div class="grid">
                <div class="gridLabel">tags</div>
                <a-select class="gridValue"></a-select>
              </div>
            </a-col>
            <a-col :span="12" class="gridRight">
              <div class="grid">
                <div class="gridLabel">file</div>
                <a-upload
                  :file-list="fileList"
                  :multiple="false"
                  :remove="(file) => myRemoveFile(file, fileList)"
                  :before-upload="(file) => myBeforeUploadFile(file)"
                  :showUploadList="{
                    showRemoveIcon: true,
                  }"
                >
                  <a-button v-if="fileList.length == 0">
                    <a-icon type="file" /> 选择文件
                  </a-button>
                </a-upload>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="aiCreateModelBdMd">
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
        <div class="aiCreateModelBdBdBottom">
          <a-button><a-icon type="save" /> 保存</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AceEditor from 'vue2-ace-editor'
import 'brace/theme/github'
export default {
  name: 'CreateModel',
  components: { AceEditor },
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
      markdownContent: "",
      fileList: [],
    };
  },

  mounted() {
    
  },

  methods: {
    goHome() {
      this.$router.push({ path: '/aiModel' });
    },

    updateCode(newData) {
      this.markdownContent = newData;
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
      }
    }
    .aiCreateModelBdMd {
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      margin-bottom: 30px;
      .aiCreateModelBdBdTitle {
        background: #fafbfc;
        padding: 5px 10px;
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