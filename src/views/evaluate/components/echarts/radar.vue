<template>
  <div id="radar1" style="width: 300px; height: 240px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Process",
  data() {
    return {
      contratRadar: [],
      indicator: [],
    };
  },
  mounted() {},
  methods: {
    getRadarData(obj) {
      console.log(obj);
      this.contratRadar = obj.contratRadar;
      this.indicator = obj.indicator;
      this.initChart();
    },
    initChart() {
      const charts = echarts.init(document.getElementById("radar1"));
      let option = {
        backgroundColor: "transparent",
        radar: {
          // shape: 'circle',
          center: ["50%", "50%"],
          // splitNumber: 3, // 雷达图圈数设置
          //图形的半径
          radius: "75%",
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

          indicator: this.indicator,
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
            // name: "测评集",
            type: "radar",
            data: this.contratRadar,
          },
        ],
      };

      charts.setOption(option);
    },
  },
};
</script>
