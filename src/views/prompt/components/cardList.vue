<template>
  <div class="cardListStyle">
    <div class="card" v-for="(item, i) in cardList" :key="i" @click="cardClick(item)">
      <div class="cardHead">
        <div class="cardTitle">{{ item.templateName }}</div>
        <div>
          <SvgIcon :icon-class="item.isCollect === '是' ? `collected` : `collect`" class="iconStyle" @click.native.stop="collectClick(item)" />
          <a-dropdown v-if="type === 'self'">
            <SvgIcon icon-class="more" @click.native.stop="e => e.preventDefault()" />
              <a-menu slot="overlay">
                <a-menu-item>
                  <div @click="editPropmt(item)">编辑</div>
                </a-menu-item>
                <a-menu-item>
                  <div @click="deletePrompt(item)">删除</div>
                </a-menu-item>
              </a-menu>
          </a-dropdown>
        </div>
      </div>
      <div class="cardContent">{{ item.templateContent }}</div>
      <div class="labelList">
        <a-tag v-for="(e, i) in item.labels" :key="i">{{ e.labelName }}</a-tag>
      </div>
    </div>
    <div style="display: flex;justify-content: flex-end;width: 100%;">
      <a-pagination
        show-size-changer
        v-model="pageNo"
        :page-size="pageSize"
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
    

    <!-- 详情 -->
    <a-modal
      title="查看Prompt模板"
      v-model="detailsPromptVisible"
      @cancel="detailsPromptVisible = false"
      :width="550"
      centered
      :footer="null"
      :maskClosable="false"
    >
      <el-form 
        :model="detailsPrompt"
        label-width="80px" 
        >
        <el-row>

          <el-col :span="12">
            <el-form-item label="模板名称：">
              <p class="labelContent">{{ detailsPrompt.templateName }}</p>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="模板来源：">
              <p class="labelContent">{{ detailsPrompt.templateType }}</p>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item label="创建时间：">
          <p class="labelContent">{{ detailsPrompt.optTime }}</p>
        </el-form-item>

        <el-form-item label="模板标签：">
          <p class="labelContent">{{ detailsPrompt.labels }}</p>
        </el-form-item>
        
        <el-form-item label="模板内容：">
          <p class="labelContent">{{ detailsPrompt.templateContent }}</p>
          <p style="font-size: 12px;">变量：{{ detailsPrompt.variableName }}</p>
        </el-form-item>

        <el-form-item label="接口地址：">
          <p class="labelContent">{{ detailsPrompt.serviceInterface }}</p>
        </el-form-item>

      </el-form>
    </a-modal>
  </div>
</template>
<script>

import SvgIcon from '@/components/SvgIcon.vue';

import {
  selectDetailById,
  collect,
  cacelCollect
} from '@/api/prompt';
export default {
  name: 'CardList',
  props: {
    cardList: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      defatult: "",
    }
  },
  components: {
    SvgIcon
  },
  data() {
    return {
      total: 100,
      pageNo: 1,
      pageSize: 24,
      pageSizeOptions: ['24', '36', '48'],
      detailsPromptVisible: false,
      detailsPrompt: {},
    };
  },

  mounted() {
    
  },

  methods: {

    // 收藏or取消收藏
    collectClick(item) {
      if(item.isCollect === '否') {  // 收藏
        item.isCollect = '是';
        collect({ templateId: item.templateId }).then(res => {
          if(res.data.status === 1){
            this.$emit("getData");
          }
        })
      } else {                       // 取消收藏
        item.isCollect = '否';
        cacelCollect({ templateId: item.templateId }).then(res => {
          if(res.data.status === 1){
            this.$emit("getData");
          }
        })
      }
    },

    // 模板点击
    cardClick(item) {
      this.detailsPromptVisible = true;
      selectDetailById({ templateId: item.templateId }).then(res => {
        this.detailsPrompt = res.data.data;
        this.detailsPrompt.labels = this.detailsPrompt.labels.map(e => e.labelName).join('、');
      })
    },

    // 编辑
    editPropmt(item) {
      this.$emit("transOperation", { type: 'edit', params: item });
    },

    // 删除
    deletePrompt(item) {
      this.$emit("transOperation", { type: 'delete', params: item });
    },

    // 分页
    showSizeChange(pageNo, pageSize) {
      this.pageSize = pageSize;
      this.pageNo = pageNo;
      this.$emit('getPageParams', { pageNo: this.pageNo, pageSize: this.pageSize });
    },
    currentChange(pageNo, pageSize) {
      this.pageSize = pageSize;
      this.pageNo = pageNo;
      this.$emit('getPageParams', { pageNo: this.pageNo, pageSize: this.pageSize });
    },
  },
};
</script>

<style lang="scss" scoped>
.cardListStyle {
  display: flex;
  flex-flow: wrap;
  box-sizing: border-box;
  overflow-y: auto;
  align-content: flex-start;
  justify-content: flex-start;
  .card {
    width: 20.5%;
    height: 150px;
    margin: 5px;
    border: 1px solid #ebebeb;
    border-top:2px solid #60bc3b;
    border-radius: 5px;
    .cardHead {
      display: flex;
      padding: 10px 15px;
      align-items: center;
      justify-content: space-between;
      .iconStyle {
        margin-right: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .cardContent {
      height: 65px;
      padding: 0 15px;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .labelList {
      padding: 0 15px;
      height: 22px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
.labelContent {
  font-size: 12px;
  color: #262626;
  margin: 0;
}

/deep/ .ant-modal-header {
  border-bottom: none;
}

/deep/ .ant-modal-body {
  padding: 10px 15px;
}

/deep/ .el-form-item {
  margin: 0;
}

/deep/ .el-form-item__label {
  font-size: 12px;
}
</style>