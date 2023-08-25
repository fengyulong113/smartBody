<template>
  <div class="report">
    <div class="main">
      <div class="left">
        <div class="report_name">
          <div class="name">任务名称</div>
          <div>ChatGLM-6b-30000</div>
        </div>
        <div class="valuation_set">
          <div class="name">评测集</div>
          <div>军事装备知识SH-dev</div>
        </div>
        <div>
          <Process></Process>
        </div>
        <div class="num1"></div>
        <div class="num2">
          <dl>
            <dd><img src="./img/bp.svg" />：惩罚因子</dd>
            <dd><img src="./img/lc.svg" />：大模型输出长度</dd>
            <dd><img src="./img/lr.svg" />：最短标准答案句子长度</dd>
            <dd><img src="./img/wn.svg" />：n-gram权重</dd>
          </dl>
          <div class="num3"></div>
        </div>
      </div>
      <div class="right">
        <div class="report_name">
          <div class="name">对比细则</div>
        </div>
        <div class="valuation_set">
          <div class="name">评测集</div>
          <div>军事装备知识SH-dev</div>
        </div>
        <div>
          <div class="radar_ttle"></div>
          <Radar ref="radar"></Radar>
        </div>
        <div class="num2">
          <div class="num3"></div>
          <div class="num4"></div>
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
import Process from "../components/echarts/process.vue";
import { selectResultsByJobId } from "../../../api/evalute/evalute";
import Radar from "./echarts/radar.vue";
export default {
  props: {
    jobId: {
      type: String,
    },
  },
  data() {
    return {
      contratRadar: [],
      indicator: [],
    };
  },
  components: {
    Process,
    Radar,
  },
  computed: {
    jobID: function () {
      return this.jobId;
    },
  },
  methods: {
    closeResport() {
      this.$bus.$emit("closeResport", false);
    },
    showRadar() {
      const params = {
        jobId: this.jobID,
      };
      selectResultsByJobId(params).then((res) => {
        console.log(res);
        this.contratRadar = res.data.data.map((item) => {
          return {
            value: Object.values(JSON.parse(item.result)),

            // value: [70, 70, 60, 13, 30, 68, 62, 40, 52, 60],
            symbol: "none", //去掉折线上的小圆点
            areaStyle: { color: "rgba(71,237,252,.3)" }, //阴影背景颜色
            lineStyle: {
              color: "#47EDFC",
              // 阴影折线宽度
              width: 1,
            },
            label: {
              show: true,
              formatter: function (params) {
                return params.value;
              },
            },
          };
        });
        this.indicator = Object.keys(JSON.parse(res.data.data[0].result)).map(
          (item) => {
            return {
              name: item,
              max: 40,
            };
          }
        );
        console.log("wwww", this.contratRadar, this.indicator);
        this.$refs.radar.getRadarData({
          contratRadar: this.contratRadar,
          indicator: this.indicator,
        });
      });
    },
  },
  mounted() {
    console.log("传递", this.jobId, this.jobID);
    this.showRadar();
  },
};
</script>
<style lang="scss" scoped>
.report {
  width: 100%;
  height: 450px;
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
      // background-color: #f00;
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
      div {
        position: relative;
        .radar_ttle {
          position: absolute;
          left: -128px;
          top: 13px;
          width: 174px;
          height: 43px;
          opacity: 0.95;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
            0px 6px 16px rgba(0, 0, 0, 0.08),
            0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        }
      }
      .num2 {
        display: flex;
        justify-content: space-between;
        height: 130px;
        padding-top: 32px;
        .num3,
        .num4 {
          width: 45%;
          background: url("./img/公式3.svg") no-repeat;
        }
        .num4 {
          background: url("./img/公式4.svg") no-repeat;
        }
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
