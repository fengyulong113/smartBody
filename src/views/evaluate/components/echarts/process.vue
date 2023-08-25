<template>
  <div id="process" style="width: 400px; height: 200px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Process",
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(document.getElementById("process"));
      // 进度百分比
      // let value = 20;
      // const option = {
      //   // backgroundColor: '#36467E',
      //   title: [
      //     {
      //       text: value + "%",
      //       left: "center",
      //       top: "56%",
      //       textStyle: {
      //         color: "#c00",
      //         fontSize: 20,
      //         fontWeight: "bold",
      //       },
      //     },
      //     {
      //       text: "半圆进度条",
      //       left: "center",
      //       top: "70%",
      //       textStyle: {
      //         color: "#2892E8",
      //         fontSize: 14,
      //       },
      //     },
      //   ],
      //   angleAxis: {
      //     show: false,
      //     // 后面的180表示圆环的跨越的角度， 如max设置为100*360/270,startAngle设置为-135
      //     max: (100 * 360) / 180,
      //     type: "value",
      //     startAngle: 180,
      //     splitLine: {
      //       show: false,
      //     },
      //   },
      //   // 修改环形的宽度
      //   barMaxWidth: 10,
      //   radiusAxis: {
      //     show: false,
      //     type: "category",
      //   },
      //   polar: {
      //     // 设置环形的位置
      //     center: ["50%", "66%"],
      //     // 设置环形大小
      //     radius: "120%",
      //   },
      //   series: [
      //     {
      //       type: "bar",
      //       data: [
      //         {
      //           value: value,
      //           itemStyle: {
      //             // 这里是已经达到进度的颜色
      //             color: "#409EFF",
      //           },
      //         },
      //       ],
      //       barGap: "-100%",
      //       coordinateSystem: "polar",
      //       z: 3,
      //     },
      //     {
      //       type: "bar",
      //       data: [
      //         {
      //           value: 100,
      //           itemStyle: {
      //             // 这里是环形底色
      //             color: "#f5f5f5",
      //             borderWidth: 0,
      //           },
      //         },
      //       ],
      //       barGap: "-100%",
      //       coordinateSystem: "polar",
      //       z: 1,
      //     },
      //   ],
      // };

      let data1 = 87; //最大100
      let getvalue = (data1 / 100) * 180;
      // let getvalue = (data1 / 100) * 100;
      let option = {
        backgroundColor: "transparent", //div背景色
        title: {
          text: data1,
          // text: getvalue,
          textStyle: {
            color: "#28BCFE",
            fontSize: 16,
          },
          subtext: "综合得分",
          subtextStyle: {
            color: "#606266",
            fontSize: 14,
          },
          itemGap: 20,
          left: "center",
          top: "43%",
        },
        angleAxis: {
          // 起始角度，180 也可以是 225
          startAngle: 180,
          max: 360,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {
          center: ["50%", "60%"], //图形位置
          radius: "200%", //图形大小
        },
        series: [
          {
            type: "bar",
            z: 2,
            // 数值
            // data: [data1],
            data: [getvalue],
            showBackground: true,
            backgroundStyle: {
              color: "transparent",
            },
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 10,
            barGap: "-100%",
            itemStyle: {
              normal: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#25BFFF",
                  },
                  {
                    offset: 1,
                    color: "#5284DE",
                  },
                ]),
                shadowBlur: 5,
                shadowColor: "#2A95F9",
              },
            },
          },
          {
            type: "bar",
            z: 1,
            // 需要的圆环跨度大小，可以是180,270等
            data: [180],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 10,
            barGap: "-100%",
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#d0d2d5", //未达到的半圆环底色
                // color: "#093368",
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>
