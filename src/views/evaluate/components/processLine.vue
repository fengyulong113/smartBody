<!--
 * @Description: 
 * @Author: luqiang
 * @Date: 2023-08-21 15:57:29
 * @LastEditTime: 2023-08-21 16:40:59
 * @LastEditors: luqiang
-->
<template>
  <div class="process-line">
    <!--时间线-->
    <div style="display: flex">
      <div class="timeline-container">
        <div style="display: flex">
          <div
            v-for="(item, index) in lineList"
            :key="index"
            style="flex: 1; display: flex; flex-direction: column"
          >
            <div
              style="
                flex: 1;
                display: flex;
                align-items: center;
                position: relative;
              "
            >
              <div class="dot"></div>
              <div class="item" v-show="item.isShow" v-if="index <= 2">
                <div class="item_bgc" v-if="index == 1"></div>
              </div>
              <div class="text">
                {{ item.title }}
                <p>{{ item.titletime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    formatDate: {
      type: String,
    },
  },
  data() {
    return {
      // 进程轴
      lineList: [
        {
          title: "提交申请",
          titletime: this.formatDate,
          isShow: true,
        },
        {
          title: "正在评测",
          titletime: moment().add(5, "seconds").format("YYYY-MM-DD HH:mm:ss"),

          isShow: true,
        },
        {
          title: "评测完成",
          titletime: "",
          isShow: true,
        },
        {
          title: "生成报告",
          titletime: "",
          isShow: true,
        },
      ],
    };
  },
  methods: {},
  mounted() {
    console.log("3333", this.$route.params.key);
  },
};
</script>
<style lang="scss" scoped>
.process-line {
  margin-top: 16px;
  .timeline-container {
    width: 100%;
    height: 100%;
    margin-left: 22px;
    div {
      div:nth-child(1),
      div:nth-child(2) {
        div {
          .dot {
            background-color: #1890ff;
            border-color: #1890ff;
          }
        }
      }
      div:nth-child(2) {
        div {
          .item {
            // background-color: #1890ff;
            border-color: gray;
          }
        }
      }
      div:nth-child(3),
      div:nth-child(4) {
        div {
          .item {
            border-bottom: 2px solid gray !important;
          }
        }
      }
    }
  }
  .dot {
    border: 3px solid #dcdfe6;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: white;
    margin: 2px 0px;
    box-sizing: border-box;
  }

  .item {
    flex: 1;
    border-bottom: 2px solid #1890ff;
    box-sizing: border-box;
    position: relative;
    .item_bgc {
      width: 50%;
      position: absolute;
      border-bottom: 2px solid #1890ff;
      z-index: 100;
    }
  }
  .item:nth-child(3),
  .item:nth-child(4) {
    border-bottom: 2px solid gray !important;
  }
  .text {
    position: absolute;
    bottom: -400%;
    left: -22px;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: rgba(0, 0, 0, 0.5);
    line-height: 22px;
    p {
      font-size: 12px;
    }
  }
}
</style>
