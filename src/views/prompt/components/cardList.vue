<template>
  <div class="cardListStyle">
    <div class="card" v-for="(item, i) in cardList" :key="i" @click="cardClick(item)">
      <div class="cardHead">
        <div class="cardTitle">{{ item.templateName }}</div>
        <SvgIcon :icon-class="item.isCollect ? `collected` : `collect`" class="iconStyle" @click.native.stop="collectClick(item)" />
      </div>
      <div class="cardContent">{{ item.templateContent }}</div>
      <div class="labelList">
        <a-tag v-for="(e, i) in item.labelList" :key="i">{{ e }}</a-tag>
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
              <p class="labelContent">{{ detailsPrompt.templateName }}</p>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item label="创建时间：">
          <p class="labelContent">{{ detailsPrompt.templateName }}</p>
        </el-form-item>

        <el-form-item label="模板标签：">
          <p class="labelContent">{{ detailsPrompt.templateName }}</p>
        </el-form-item>
        
        <el-form-item label="模板内容：">
          <p class="labelContent">{{ detailsPrompt.templateContent }}</p>
        </el-form-item>

        <el-form-item label="接口地址：">
          <p class="labelContent">{{ detailsPrompt.templateName }}</p>
        </el-form-item>

      </el-form>
    </a-modal>
  </div>
</template>
<script>
import SvgIcon from '@/components/SvgIcon.vue';
export default {
  name: 'CardList',
  components: {
    SvgIcon
  },
  data() {
    return {
      cardList: [
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
        { templateName: "电影评论", isCollect: false, templateContent: "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。电影名称是{content}", labelList: ["写作", "写作", "写作"]},
      ],
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

    // 收藏
    collectClick(item) {
      item.isCollect = !item.isCollect;
    },

    // 模板点击
    cardClick(item) {
      this.detailsPrompt = JSON.parse(JSON.stringify(item));
      this.detailsPromptVisible = true;
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
        &:hover {
          cursor: pointer;
        }
      }
    }
    .cardContent {
      padding: 0 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .labelList {
      padding: 10px 15px;
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