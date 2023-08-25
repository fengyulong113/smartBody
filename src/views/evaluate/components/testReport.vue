<template>
  <div class="test_report">
    <div class="main">
      <div class="left">
        <div class="report_name">
          <div class="name">对比细则</div>
        </div>
        <div class="valuation_set">
          <div class="name">评测集</div>
          <div>军事装备知识SH-dev</div>
        </div>
        <div>
          <Radars
            :radarsResults="radarsResults"
            :contrastJobIdContrast="contrastJobIdContrast"
          ></Radars>
        </div>
      </div>
      <div class="right">
        <div>
          <p>综合表现最优:</p>
          <p>ChatGLM-6b</p>
          <P>幻觉现象最严重(Rouge-1高分但Rouge-L低分)</P>
          <P>ChatGLM-6b-3000</P>
          <P>有过拟合风险</P>
          <P>ChatGLM-6b-3000)</P>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button @click="closeResport">关闭</el-button>
      <el-button type="primary" @click="">下载报告</el-button>
    </div>
  </div>
</template>
<script>
import Radars from "./echarts/radars.vue";
export default {
  props: {
    contrastJobIdContrast: {
      type: String,
    },
  },
  data() {
    return {
      radarsResults: [],
    };
  },
  components: {
    Radars,
  },
  mounted() {
    console.log("1111", this.contrastJobIdContrast);
  },
  methods: {
    closeResport() {
      this.$bus.$emit("closeResport", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.test_report {
  width: 100%;
  // height: 450px;
  .main {
    display: flex;
    justify-content: center;

    .left,
    .right {
      flex: 1;
    }
    .left {
      .valuation_set {
        text-decoration: 2em;
      }
      .report_name,
      .valuation_set {
        display: flex;
        .name {
          width: 5em;
          text-align: right;
          margin-right: 2em;
        }
      }
      .num1 {
        height: 47px;
        background: url("./img/公式1.svg") no-repeat;
        background-size: 80%;
      }
      .num2 {
        display: flex;
        justify-content: space-between;
        dl {
          width: 45%;
          dl {
            text-decoration: 2em;
          }
        }
        .num3 {
          width: 50%;
          background: url("./img/公式2.svg") no-repeat;
        }
      }
    }
    .right {
      position: relative;
      div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .footer {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
