<template>
  <div class="script">
    <div class="params">
      <el-tag class="tagStyle">Prompt</el-tag>
      <el-input v-model="inputValue" type="textarea" style="width: 50%;margin-bottom: 10px" :row="20" resize="none"></el-input>
      <el-tag class="tagStyle">⽣成样本类型</el-tag>
      <div class="group">
        <el-radio-group v-model="radioValue">
          <el-radio 
            v-for="(item, i) in radioList" 
            :key="i" 
            :label="item.label">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </div>
      <el-button style="width: 80px" type="primary" size="mini" @click="execute">执行</el-button>
    </div>
    <div class="result">
      <div v-if="this.resType === 'ner'" class="nerStyle">
        <el-card class="cardStyle" v-for="(item, i) in nerList" :key="i">
          <div style="margin-bottom: 15px" v-if="item.T === undefined">Branch： <el-tag>{{ item.Branch }}</el-tag></div>
          <div style="margin-bottom: 15px" v-else>类型： <el-tag>{{ item.T }}</el-tag></div>
          <div style="margin-bottom: 15px" v-if="item.E === undefined">Group： <el-tag>{{ item.Group }}</el-tag></div>
          <div style="margin-bottom: 15px" v-else>实体： <el-tag>{{ item.E }}</el-tag></div>
        </el-card>
      </div>
      <div v-if="this.resType === 'mltc'" class="mltcStyle">
        <div v-for="(item, i) in mltcList" :key="i" class="mltcItemStyle">
          <el-tag type="success" style="margin-bottom: 10px; width: 200px; height: 40px; line-height: 40px" v-for="(e,i) in Object.keys(item)" :key="i">{{ e }}: {{ Object.values(item)[i] }}</el-tag>
        </div>
      </div>
      <div v-else-if="this.resType === 'qa'" class="qaStyle">
        <div v-for="(item, i) in qaList" :key="i" class="qaItemStyle">
          <el-tag type="success" style="margin-bottom: 5px;height: 40px;line-height: 40px">问：{{ item.Q }}</el-tag>
          <el-tag type="info" style="height: 40px;line-height: 40px">答：{{ item.A }}</el-tag>
        </div>
      </div>
      <div v-else-if="this.resType === 're'" class="reStyle">
        <div v-for="(item, i) in reList" :key="i">
          <el-tag type="warning" style="margin: 5px 5px">{{ item[0] }}</el-tag>
          <el-tag type="warning" style="margin: 5px 5px">{{ item[1] }}</el-tag>
          <el-tag type="warning" style="margin: 5px 5px">{{ item[2] }}</el-tag>
        </div>
      </div>
      <div v-else-if="this.resType === 'sum'" class="sumStyle">
        <div v-for="(item, i) in sumList" :key="i">
          <el-tag type="info">{{ item.S }}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { analyse } from '../api/script'
export default {
  name: "scriptComponent",
  data() {
    return {
      inputValue: "2015年，俄罗斯向叙利亚派遣了武装部队，主要是空军。自那时以来，瓦格纳集团一直在叙利亚参与战斗和保护石油设施，其战士人数约为250到450人。",
      radioValue: "ner",
      resType: "ner",
      radioList: [
        { name: "命名实体识别", label: "ner" },
        { name: "多类别⽂本分类", label: "mltc" },
        { name: "问答", label: "qa" },
        { name: "关系抽取", label: "re" },
        { name: "⽂本摘要", label: "sum" },
      ],
      nerList: [],
      mltcList: [],
      qaList: [],
      reList: [],
      sumList: [],
    };
  },
  mounted() {
    this.execute()
  },
  methods: {
    execute() {
      if(this.inputValue === '') {
        this.$message.warning("Prompt内容不可为空")
        return
      }
      const params = {
        text: this.inputValue,
        modelType: this.radioValue
      }
      analyse(params).then(res => {
        const jsonData = res.data.replaceAll('\'', '\"')
        this.switchData(JSON.parse(jsonData));
        this.resType = this.radioValue
      })
    },

    switchData(data) {
      switch (this.radioValue) {
        case 'ner':
          this.nerList = data
          break;
        case 'mltc':
          this.mltcList = data
          break;
        case 'qa':
          this.qaList = data
          break;
        case 're':
          this.reList = data
          break;
        case 'sum':
          this.sumList = data
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.script {
  height: 100%;
  width: 100%;
  margin: 0;
}
.params {
  border: 1px solid #C0C4CC;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.group {
  padding: 20px;
}
.tagStyle {
  width: 100px;
  margin-bottom: 10px;
  text-align: center;
}
.result {
  border: 1px solid #C0C4CC;
  border-radius: 4px;
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
  height: 425px;
  overflow-y: auto;
}
.nerStyle {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: wrap;
}
.cardStyle {
  width: 270px;
  height: 190px;
  margin: 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.cardStyle div {
  height: 30px;
}
.qaStyle {
  height: 100%;
  width: 100%;
}
.qaItemStyle {
  display: flex;
  flex-direction: column;
  margin: 0 0 15px 0;
}
.mltcItemStyle {
  display: flex;
  flex-direction: column;
}
</style>