<template>
  <div class="aiHeader">
    <div class="aiHeaderHdWrap" v-show="pageType !== 'aiModel'">
      <div class="aiModelHd">
        <a-breadcrumb class="aiModelHdBreadcrumb ">
          <a-breadcrumb-item>
            <span class="aiModelHdBreadcrumbBack" @click="pageType = 'aiModel'">模型库</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-if="pageType === 'detail'">
            <span>模型详情</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-else-if="pageType === 'create'">
            <span>创建模型</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span> </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div>
      <AiModel v-if="pageType === 'aiModel'" @changePage="changePage" />
      <ModelsDetail v-else-if="pageType === 'detail'" :activeId="modelId" />
      <CreateModel v-else-if="pageType === 'create'" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import AiModel from './aiModel.vue';
import ModelsDetail from './modelsDetail.vue';
import CreateModel from './createModel.vue'
export default {
  name: 'SmartBodyIndex',
  components: {
    AiModel,
    ModelsDetail,
    CreateModel
  },
  data() {
    return {
      pageType: 'aiModel',
      modelId: '',
    };
  },

  mounted() {
    
  },

  methods: {
    changePage(params) {
      this.modelId = "";
      this.pageType = params.type;
      this.modelId = params.id
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/aiModel.scss';

.aiHeader {
  width: 100%;
  .aiHeaderHdWrap {
    width: 100vw;
    min-width: 1280px;
    background-image: linear-gradient(175deg, rgba(255, 255, 255, 0) 40%, #F5F7FB 100%);
    border-bottom: 1px solid #EFF0F2;
    .aiModelHd {
      width: 1280px;
      margin: 0 auto;
      padding: 10px 0;
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
}
</style>