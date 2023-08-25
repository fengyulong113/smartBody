<template>
  <div class="tabHeadStyle">
    <a-button v-if="type === 'self'" type="primary" icon="plus" @click="createPrompt">创建Prompt模板</a-button>
    <div v-else></div>
    <div class="options">
      <a-select v-model="filterForm.labelVal" placeholder="请选择模板标签" style="width: 200px" allowClear @change="handleChange">
        <a-select-option 
          v-for="(item, i) in dictionary.prompt_label" 
          :key="i" 
          :value="item.value">
          {{ item.value }}
        </a-select-option>
      </a-select>
      <a-input-search v-model="filterForm.searchVal" placeholder="请输入模板名称" style="width: 200px" @search="onSearch" />
      <a-button icon="redo" @click="reset"></a-button>
    </div>

    <a-modal
      :title="titleText"
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
          <a-select allowClear mode="multiple" v-model="promptForm.labels" placeholder="请输入模板名称">
            <a-select-option 
              v-for="(item, i) in dictionary.prompt_label" 
              :key="i" 
              :value="item.value">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="模板内容" prop="templateContent">
          <a-textarea v-model="promptForm.templateContent" placeholder="请输入模板内容" :autoSize="{ minRows: 4, maxRows: 4 }"></a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import {
  addPromptTemplate,
  editPromptTemplate
} from '@/api/prompt';
import { mapGetters } from 'vuex';
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
      titleText: "",
      addOrEdit: "",
      createPromptVisible: false,
      promptForm: {
        templateName: "",
        labels: undefined,
        templateContent: "",
        templateType: "自制模板"
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
  computed: {
    ...mapGetters(["dictionary"])
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
      this.titleText = "创建Prompt模板";
      this.addOrEdit = "add";
    },
    
    okCreatePrompt() {
      if(this.addOrEdit === 'add') {
        const params = {
          ...this.promptForm,
          labelName: this.promptForm.labels.join(",")
        }
        addPromptTemplate(params).then(res => {
          if(res.data.status === 1){
            this.$notification['success']({ message: '创建成功' });
            this.$emit("getData");
          }
        }).finally(() => {
          this.createPromptVisible = false;
          this.titleText = "";
          this.addOrEdit = "";
          this.promptForm = {
            templateName: "",
            labels: undefined,
            templateContent: "",
            templateType: "自制模板"
          }
        })
      } else if(this.addOrEdit === 'edit') {
        const params = {
          ...this.promptForm,
          labelName: this.promptForm.labels.join(",")
        }
        editPromptTemplate(params).then(res => {
          if(res.data.status === 1){
            this.$notification['success']({ message: '编辑成功' });
            this.$emit("getData");
          }
        }).finally(() => {
          this.createPromptVisible = false;
          this.titleText = "";
          this.addOrEdit = "";
          this.promptForm = {
            templateName: "",
            labels: undefined,
            templateContent: "",
            templateType: "自制模板"
          }
        })
      }
    },

    cancelCreatePrompt() {
      this.createPromptVisible = false;
      this.titleText = "";
      this.addOrEdit = "";
      this.promptForm = {
        templateName: "",
        labels: undefined,
        templateContent: "",
        templateType: "自制模板"
      }
    },

    handleChange() {},
    onSearch() {
      this.$emit("getData");
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