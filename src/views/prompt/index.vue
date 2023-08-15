<template>
  <div class="promptContainer">
    <div class="top">
      <div class="title">Prompt 模板</div>
      <div class="titleInfo">
        <p>管理和查看prompt模板，支持在服务调用时组合prompt输入推理，prompt模板使用方式详见帮助手册。</p>
      </div>
    </div>
    <a-tabs default-active-key="自制模板" @change="callback">
      <a-tab-pane key="预制模版" tab="预制模版">
        <div class="tabContent">
          <div class="tabMain">
            <TabHead @getFilterParams="getFilterParams" />
            <CardList @getPageParams="getPageParams"/>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="自制模板" tab="自制模板" force-render>
        <div class="tabContent">
          <div class="tabMain">
            <TabHead @getFilterParams="getFilterParams" :type="'self'" />
            <CardList @getPageParams="getPageParams"/>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="我的收藏" tab="我的收藏">
        <div class="tabContent">
          <div class="tabMain">
            <TabHead @getFilterParams="getFilterParams" />
            <CardList @getPageParams="getPageParams"/>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
import TabHead from './components/tabHead.vue';
import CardList from './components/cardList.vue';

import {
  selectByConditions
} from '@/api/prompt';
export default {
  name: 'Prompt',
  components: {
    TabHead,
    CardList,
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
      if(key === '我的收藏') {
        this.filterForm.isCollect = '是';
        this.filterForm.templateType = "";
      } else {
        this.filterForm.isCollect = '';
        this.filterForm.templateType = key;
      }
      this.getData();
    },

    getData() {
      selectByConditions(this.filterForm).then(res => {
        console.log(res)
        res = res.data.data;
        this.total = res.total;
        switch (this.filterForm.templateType) {
          case "自制模板":
            this.selfList = res.list;
            break;
          case "预制模板":
            this.preList = res.list;
            break;
          case "我的收藏":
            this.collectList = res.list;
            break;
          default:
            break;
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
</style>