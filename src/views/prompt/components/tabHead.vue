<template>
  <div class="tabHeadStyle">
    <a-button v-if="type === 'self'" type="primary" icon="plus" @click="createPrompt">创建Prompt模板</a-button>
    <div v-else></div>
    <div class="options">
      <a-select v-model="filterForm.labelVal" placeholder="请选择模板标签" style="width: 200px" allowClear @change="handleChange">
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
      </a-select>
      <a-input-search v-model="filterForm.searchVal" placeholder="请输入模板名称" style="width: 200px" @search="onSearch" />
      <a-button icon="redo" @click="reset"></a-button>
    </div>

    <a-modal
      title="创建Prompt模板"
      v-model="createPromptVisible"
      @cancel="cancelCreatePrompt"
      @ok="okCreatePrompt"
      :width="550"
      centered
      cancel-text="取消"
      okText="确定"
      :maskClosable="false"
    >
      <a-form-model 
        :model="promptForm"
        :label-col="{ span: 4, offset: 0 }"
        :wrapper-col="{ span: 18 }"
        labelAlign="right"
        ref="createPromptRef"
        :rules="rules"
      >
        <a-form-model-item label="模板名称" prop="templateName">
          <a-input v-model="promptForm.templateName" placeholder="请输入模板名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="模板标签">
          <a-select v-model="promptForm.templateLabel" placeholder="请输入模板名称"></a-select>
        </a-form-model-item>
        <a-form-model-item label="模板内容" prop="templateContent">
          <a-textarea v-model="promptForm.templateContent" placeholder="请输入模板内容" :autoSize="{ minRows: 4, maxRows: 4 }"></a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'TabHead',
  props: {
    type: {
      type: String,
      defatult: "",
    }
  },
  data() {
    return {
      filterForm: {
        labelVal: undefined,
        searchVal: "",
      },
      createPromptVisible: false,
      promptForm: {
        templateName: "",
        templateLabel: undefined,
        templateContent: "",
      },
      rules: {
        templateName: [
          { required: true, message: "请填写模板名称", trigger: "blur" },
        ],
        templateContent: [
          { required: true, message: "请填写模板内容", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    filterForm:{
      handler(val){
        this.$emit("getFilterParams", val);
      },
      deep: true,
    }
  },
  mounted() {
    
  },

  methods: {
    // 创建模板
    createPrompt() {
      this.createPromptVisible = true;

    },

    okCreatePrompt() {

    },

    cancelCreatePrompt() {
      this.createPromptVisible = false;
      this.promptForm = {
        templateName: "",
        templateLabel: undefined,
        templateContent: "",
      }
    },

    handleChange() {},
    onSearch() {

    },
    reset() {
      this.filterForm = {
        labelVal: undefined,
        searchVal: "",
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.tabHeadStyle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  .options {
    width: 465px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

/deep/ .ant-modal-header {
  border-bottom: none;
}

/deep/ .ant-modal-footer {
  border-top: none;
}

/deep/ .ant-form-item label {
  font-size: 12px;
  color: #606266;
}

/deep/ .ant-input:placeholder-shown {
  font-size: 12px;
}

/deep/ .ant-select-selection__placeholder {
  font-size: 12px;
}
</style>