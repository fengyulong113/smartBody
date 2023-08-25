<template>
  <div class="testing">
    <div class="detail_content">
      <img src="./components//img//时间.svg"></img>
      <span class="one">等待评测完成</span>
      <span class="two">评测所需时间由评测集大小及指标计算量决定</span>
    </div>
    <div class="main_content">
      <dl class="test_detail">
        <dd>评测序号: 202008196398345</dd>
        <dd>创建人员: system</dd>
        <dd>创建时间: {{formatDate}}</dd>
      </dl>
      <!-- <div class="horizontal-timeline"> -->
      <!-- <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline> -->
      <!-- </div> -->
      <ProcessLine :formatDate="formatDate"></ProcessLine>
    </div>
    <div class="btn_content">
      <el-button type="primary" @click="backList">返回列表</el-button>
        <el-button  @click="">查看详情</el-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import ProcessLine from "./components/processLine";
export default {
  data() {
    return {
      activities: [
        {
          content: "提交申请",
          timestamp: "2021-04-12 20:46",
          size: "large",
        },
        {
          content: "正在评测",
          timestamp: "2021-04-12 21:46",
        },
        {
          content: "评测完成",
          timestamp: "2021-06-03 20:46",
        },
        {
          content: "生成报告",
          timestamp: "2021-04-03 20:46",
          size: "large",
        },
      ],
    };
  },
  components: { ProcessLine },
  computed:{
    formatDate() {
      return moment(this.date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  mounted(){
  },
  methods:{
    backList(){
      this.$router.push({path:"/evaluate"})
    },
  }
};
</script>
<style lang="scss" scoped>
.testing {
  width: 50%;
  height: 50%;
  transform: translate(50%, 50%);
  // background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .detail_content,
  .main_content,
  .btn_content {
    width: 100%;
    height: 26%;
    // background-color: #ff0000;
  }
  .main_content {
    height: 34%;
  }
  .btn_content {
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .detail_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    i {
      width: 40px;
      height: 40px;
      font-size: 40px;
      color: #409eff;
    }
    .one {
      font-size: 20px;
    }
    .two {
      font-size: 14px;
      color: #dcdfe6;
    }
  }
  .main_content {
    background-color: #dcdfe6;
    box-sizing: border-box;
    padding: 20px 30px;
    .test_detail {
      display: flex;
      justify-content: space-between;
    }
    /deep/.horizontal-timeline {
      display: inline-block;
      vertical-align: middle;
      width: auto;
      margin-right: 20px; /* 调整时间轴项之间的间距 */
      position: relative;
    }
    /deep/.el-timeline {
      display: flex;
      justify-content: space-between;
    }
    /deep/.el-timeline-item__tail {
      border-left: none;
      border-top: 2px solid #e4e7ed;
    }
    /deep/.horizontal-timeline .el-timeline-item:before {
      position: absolute;
      left: -25px; /* 调整时间轴线的位置 */
      top: 50%; /* 将时间轴线垂直居中 */
      transform: translateY(-50%);
      background-color: transparent; /* 清除默认的线条颜色 */
    }

    /deep/.reached-node .el-timeline-item:before {
      background-color: color-reached-node; /* 修改为达到节点时的线条颜色 */
    }

    /deep/.before-node .el-timeline-item:before {
      background-color: color-before-node; /* 修改为节点之前的线条颜色 */
    }

    /deep/.after-node .el-timeline-item:before {
      background-color: color-after-node; /* 修改为节点之后的线条颜色 */
    }
    .process-line {
      margin-left:20px;
    }
  }
}
</style>
