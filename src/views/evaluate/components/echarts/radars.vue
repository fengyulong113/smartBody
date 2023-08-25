<template>
  <div id="radar1" style="width: 440px; height: 360px"></div>
</template>

<script>
import * as echarts from "echarts";
import { selectCompareResultsByIds } from "../../../../api/evalute/evalute";
export default {
  name: "Process",
  props: {
    contrastJobIdContrast: {
      type: String,
    },
  },
  data() {
    return {
      radarsResults: [],
      indicator: [],
      backgroundColors: [
        "rgba(91, 143, 249, 0.25)",
        "rgba(222, 0, 18, 0.25)",
        "rgba(90, 216, 166, 0.25)",
      ],
      borderColors: [
        "rgba(91, 143, 249, 1)",
        "rgba(222, 0, 15, 1)",
        "rgba(90, 216, 166, 1)",
      ],
    };
  },
  mounted() {
    console.log("eDraaa", this.radarsResults, this.contrastJobIdContrast);
    this.getCpmpareResults();
  },
  methods: {
    initChart() {
      const charts = echarts.init(document.getElementById("radar1"));
      let option = {
        backgroundColor: "transparent",
        radar: {
          // shape: 'circle',
          center: ["50%", "50%"],
          // splitNumber: 3, // 雷达图圈数设置
          //图形的半径
          radius: "65%",
          name: {
            // 字体颜色
            textStyle: {
              color: "#000",
              fontSize: 12,
              fontFamily: "PingFangSC-Regular, PingFang SC;",
              // fontWeight: "500",
            },
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: "#808080",
              // color: "#013A3F",
            },
          },

          // indicator: [
          //   { name: "MCC", max: 100 },
          //   { name: "Rouge1", max: 100 },
          //   { name: "Rouge2", max: 100 },
          //   { name: "RougeL", max: 100 },
          //   { name: "BLEU", max: 100 },
          //   { name: "F1", max: 100 },
          //   { name: "EM", max: 100 },
          //   { name: "Accuracy", max: 100 },
          //   { name: "Distned", max: 100 },
          //   { name: "AVG", max: 100 },
          // ],
          indicator: this.indicator || [],
          //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          splitArea: {
            show: false,
            areaStyle: {
              color: "transparent",
              // color: "rgba(255,0,0,0)", // 图表背景的颜色
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#808080", // 设置网格的颜色
              // color: "#01424C", // 设置网格的颜色
            },
          },
        },
        series: [
          {
            name: "对比图",
            type: "radar",
            // data: [
            //   {
            //     value: [70, 70, 60, 13, 30, 68, 62, 40, 52, 60],
            //     // 标记的图形。
            //     // symbol: "rect",
            //     // 标记图形的大小
            //     // symbolSize: 0,
            //     symbol: "none", //去掉折线上的小圆点
            //     areaStyle: { color: "rgba(71,237,252,.3)" }, //阴影背景颜色
            //     lineStyle: {
            //       color: "#47EDFC",
            //       // 阴影折线宽度
            //       width: 1,
            //     },

            //     label: {
            //       show: true,
            //       formatter: function (params) {
            //         return params.value;
            //       },
            //     },
            //   },
            //   {
            //     value: [30, 65, 40, 40, 40, 55, 70, 50, 60, 75],
            //     // 标记的图形。
            //     // symbol: "rect",
            //     // 标记图形的大小
            //     // symbolSize: 0,
            //     symbol: "none", //去掉折线上的小圆点
            //     areaStyle: { color: " rgba(90, 216, 166, 0.25)" }, //阴影背景颜色
            //     lineStyle: {
            //       color: " rgba(90, 216, 166, 1)",
            //       // 阴影折线宽度
            //       width: 1,
            //     },

            //     label: {
            //       show: true,
            //       formatter: function (params) {
            //         return params.value;
            //       },
            //     },
            //   },
            // ],
            data: this.radarsResults || [],
          },
        ],
      };

      charts.setOption(option);
    },
    getCpmpareResults() {
      const param = {
        jobIds: this.contrastJobIdContrast,
      };
      selectCompareResultsByIds(param)
        .then((res) => {
          console.log("compare", res.data.data);
          this.radarsResults = res.data.data.map((item, index) => {
            return {
              value: Object.values(JSON.parse(item.result)),

              // value: [70, 70, 60, 13, 30, 68, 62, 40, 52, 60],
              symbol: "none", //去掉折线上的小圆点
              areaStyle: { color: this.backgroundColors[index] }, //阴影背景颜色
              lineStyle: {
                color: this.borderColors[index],
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
          console.log(
            "comparesss",
            this.radarsResults,
            this.indicator,
            res.data.data[0]
          );
        })
        .finally(() => {
          this.initChart();
        });
    },
  },
};
</script>
