<template>
  <div class="aiModelDetail">
    <div class="aiModelDetailHdWrap">
      <div class="aiModelDetailHd">
        <a-breadcrumb class="aiModelDetailHdBreadcrumb ">
          <a-breadcrumb-item>
            <span class="aiModelDetailHdBreadcrumbBack" @click="goHome">模型库</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span>模型详情</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="aiModelDetailHdTitle">PP-OCRv3</div>
        <div class="aiModelDetailHdSubtitle">
          <div class="modelDesc">PP-OCRv3文字检测识别系统</div>
          <a-divider type="vertical" />
          <div>4511次调用</div>
          <a-divider type="vertical" />
          <div>2022-11-28 20:13:40</div>
        </div>
        <div class="aiModelDetailHdTags">
          <a-radio-button
            v-for="(item, i) in tagsLsit" 
            :key="i">
            {{ item }}
          </a-radio-button>
        </div>
      </div>
    </div>
    <div class="aiModelDetailBd">
      <div class="aiModelDetailBdMain">
        <a-tabs default-active-key="introduction" @change="tabsChange">
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
                    <a-breadcrumb-item>
                      <span>PP-OCRv3</span>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                      <span> </span>
                    </a-breadcrumb-item>
                  </a-breadcrumb>
                </div>
                <div class="aiModelDetailSpaceDownload">
                  <SvgIcon icon-class="download" />
                  下载模型demo
                </div>
              </div>

              <div class="aiModelDetailSpaceH">
                <div class="aiModelDetailSpaceHInfo">
                  <div class="aiModelDetailSpaceHNick">fengyulong</div>
                  <div class="aiModelDetailSpaceHSub">
                    <span>Update icon 202211281453 (#5681)</span>
                  </div>
                </div>
              </div>

              <a-table
                v-if="!isShowFileContent"
                class="aiModelDetailSpaceTable"
                :columns="columns"
                :data-source="fileData"
                :pagination="false" 
                :showHeader="false"
              >
                <template slot="fileName" slot-scope="text, record">
                  <div style="cursor: pointer;" @click="fileClick(record)">{{ text }}</div>
                </template>
                <span slot="action" slot-scope="text, record">
                  <a-button type="link" @click="fileClick(record)">查看</a-button>
                </span>
              </a-table>

              <div v-else>
                <AceEditor
                  :mode="'javascript'"
                  :value="jsCode"
                  :theme="'github'"
                  :displayIndentGuides="false"
                  :options="options"
                  width="100%"
                  height="500px"
                ></AceEditor>
              </div>

            </div>
          </a-tab-pane>
          <a-tab-pane key="download" tab="模型下载">
            模型下载
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="aiModelDetailBdAsideWrap"></div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import SvgIcon from '@/components/SvgIcon.vue';
import AceEditor from 'vue2-ace-editor'
import 'brace/theme/monokai'
import 'brace/theme/github'
import 'brace/theme/chrome'
export default {
  name: 'ModelsDetail',
  components: {
    VueMarkdown,
    SvgIcon,
    AceEditor
  },
  data() {
    return {
      activeId: "",
      tagsLsit: ["xxx", "xxx", "xxxx", "xxx"],
      branchVal: 'master',
      isShowFileContent: false,
      options: {
        readOnly: true,
        fontSize: '14px',
        showGutter: false,
        tabSize: 2,
        highlightActiveLine: false,
        // displayIndentGuides: false,
      },
      jsCode: "function fn() {\n  console.log('xxx')\n}",
      markdown: "# Hello World\n## test Code\n```js\nfunction fn() {\n  console.log('xxx')\n}\n```",
      columns: [
        { 
          dataIndex: "fileName", 
          scopedSlots: { customRender: 'fileName' },  
          align: 'left', 
          key: "fileName" 
        },
        { 
          dataIndex: "size", 
          align: 'center', 
          key: "size" 
        },
        { 
          dataIndex: "commit", 
          align: 'center', 
          key: "commit" 
        },
        { 
          dataIndex: "lately", 
          align: 'center', 
          key: "lately" 
        },
        { 
          key: 'action',
          align: 'right',
          scopedSlots: { customRender: 'action' }, 
        },
      ],
      fileData: [
        { fileName: 'fyl.md', size: '1023kb', commit: 'first cm', lately: '1 months ago' },
        { fileName: 'fyl.md', size: '1023kb', commit: 'first cm', lately: '1 months ago' },
      ],
    };
  },
  created() {
    if (this.$route.query) {
      this.activeId = this.$route.query.modelId;
      this.init();
    }
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.query.modelId != from.query.modelId) {
        this.activeId = to.query.modelId;
        this.init();//重新加载数据
      }
    }
  },
  mounted() {
    
  },

  methods: {
    init() {
      console.log('init', this.activeId)
    },

    goHome() {
      this.$router.push({ path: '/aiModel' });
    },

    tabsChange(key) {
      console.log(key)
    },

    fileClick(record) {
      console.log(record);
      this.isShowFileContent = true;
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