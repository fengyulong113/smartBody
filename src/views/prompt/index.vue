<template>
  <div class="promptContainer">
    <div class="top">
      <div class="title">Prompt 模板</div>
      <div class="titleInfo">
        <p>
          管理和查看prompt模板，支持在服务调用时组合prompt输入推理，prompt模板使用方式详见帮助手册。
        </p>
      </div>
    </div>
    <a-tabs default-active-key="自制模板" @change="callback">
      <a-tab-pane key="预制模板" tab="预制模板">
        <div class="tabContent">
          <div class="tabMain">
            <TabHead 
              @getFilterParams="getFilterParams" 
              @getData="getData" 
            />
            <CardList 
              :cardList="preList"
              @getData="getData"  
              @getPageParams="getPageParams"
              @transOperation="transOperation"
            />
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="自制模板" tab="自制模板" force-render>
        <div class="tabContent">
          <div class="tabMain">
            <TabHead 
              ref="tabHeadRef"
              :type="'self'"
              @getFilterParams="getFilterParams" 
              @getData="getData" 
            />
            <CardList 
              :type="'self'" 
              :cardList="selfList"
              @getData="getData"  
              @getPageParams="getPageParams"
              @transOperation="transOperation"
            />
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="我的收藏" tab="我的收藏">
        <div class="tabContent">
          <div class="tabMain">
            <TabHead 
              @getFilterParams="getFilterParams" 
              @getData="getData" 
            />
            <CardList 
              :cardList="collectList"
              @getData="getData"  
              @getPageParams="getPageParams"
              @transOperation="transOperation"
            />
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- 删除 -->
    <a-modal
      title="确定要删除吗"
      v-model="deleteVisible"
      @cancel="deleteVisible = false"
      @ok="okDeletePrompt"
      :width="350"
      centered
      cancel-text="取消"
      okText="确定"
      :maskClosable="false">
      <div>
        <SvgIcon icon-class="warning" />
        将要删除模板【{{ this.operationParams.templateName }}】
      </div>
    </a-modal>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
import TabHead from './components/tabHead.vue';
import CardList from './components/cardList.vue';

import {
  selectByConditions,
  deletePromptTemplate
} from '@/api/prompt';
export default {
  name: "Prompt",
  components: {
    TabHead,
    CardList,
    SvgIcon,
  },
  data() {
    return {
      filterForm: {
        pageNo: 1,
        pageSize: 24,
        labels: "",
        templateName: "",
        templateType: "自制模板",
        isCollect: "",
        collectUserId: "",
      },
      preList: [],
      selfList: [],
      collectList: [],
      operationParams: {},
      deleteVisible: false,
    };
  },
  mounted() {
    this.getData();
  },

  methods: {

    callback(key) {
      // this.preList = [];
      // this.selfList = [];
      // this.collectList = [];
      if (key === "我的收藏") {
        this.filterForm.isCollect = "是";
        this.filterForm.templateType = "";
      } else {
        this.filterForm.isCollect = "";
        this.filterForm.templateType = key;
      }
      this.getData();
    },

    getData() {
      selectByConditions(this.filterForm).then(res => {
        res = res.data.data;
        this.total = res.total;
        switch (this.filterForm.templateType) {
          case "自制模板":
            this.selfList = res.list;
            break;
          case "预制模板":
            this.preList = res.list;
            break;
          default:
            break;
        }
        if(this.filterForm.isCollect === '是') {
          this.collectList = res.list;
        }
      })
    },

    getPageParams(data) {
      this.filterForm.pageNo = data.pageNo;
      this.filterForm.pageSize = data.pageSize;
    },

    getFilterParams(data) {
      this.filterForm.labels = data.labelVal === undefined ? "" : data.labelVal;
      this.filterForm.templateName = data.searchVal;
    },

    // 编辑or删除操作
    transOperation(data) {
      if(data.type === 'delete') {
        this.deleteVisible = true;
        this.operationParams = JSON.parse(JSON.stringify(data.params));
      } else {
        const tempData = data.params.labels.map(item => item.labelName)
        data.params.labels = tempData
        this.$refs.tabHeadRef.promptForm = JSON.parse(JSON.stringify(data.params));

        this.$refs.tabHeadRef.createPromptVisible = true;
        this.$refs.tabHeadRef.titleText = "编辑Prompt模板";
        this.$refs.tabHeadRef.addOrEdit = "edit";
      }
    },

    // 确定删除
    okDeletePrompt() {
      deletePromptTemplate({ templateIds: this.operationParams.templateId }).then(res => {
        if(res.data.status === 1){
          this.$notification['success']({ message: '删除成功' });
          this.deleteVisible = false;
          this.getData();
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.promptContainer {
  .top {
    padding: 0 10px;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
    }
    .titleInfo {
      p {
        font-size: 12px;
      }
    }
  }
  .tabContent {
    background-color: #f7f7f9;
    padding: 10px;
    .tabMain {
      background-color: #fff;
      border-radius: 5px;
      padding: 20px;
    }
  }
}
/deep/ .ant-tabs-bar {
  margin: 0;
}
/deep/ .ant-modal-header {
  border-bottom: none;
}

/deep/ .ant-modal-footer {
  border-top: none;
}
</style>
