<!--
 * @Description: 
 * @Author: luqiang
 * @Date: 2023-08-17 09:26:04
 * @LastEditTime: 2023-08-21 15:50:40
 * @LastEditors: luqiang
-->
<template>
  <div class="evaluate">
    <div class="tit">
      <i class="el-icon-location"></i><span>大语言模型评测</span>
    </div>
    <div class="main">
      <div class="content_title">评测任务</div>
      <div class="content_list">
        <el-row>
          <el-col :span="6"
            ><div class="test_name">测评名称</div>
            <div class="test_input">
              <el-input
                v-model="TestName"
                placeholder="请输入渠道内容"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6"
            ><div class="test_name">状态</div>
            <div class="test_input">
              <el-select v-model="TestState">
                <el-option
                  v-for="(item, i) in dictionary.evaluation_job_status"
                  :key="i"
                  :label="item.title"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="12"
            ><el-button
              type="primary"
              icon="el-icon-search"
              @click="searchEvalute"
              >搜索</el-button
            ><el-button
              type="primary"
              icon="el-icon-plus"
              @click="handeleAddTask"
              >新增评测任务</el-button
            ><el-button
              type="primary"
              icon="el-icon-plus"
              @click="handeleConstrast"
              >新增评测对比</el-button
            ></el-col
          >
        </el-row>
        <div class="content_main">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="jobName" label="测评名称"> </el-table-column>
            <el-table-column prop="jobCreateUser" label="上传者ID">
            </el-table-column>
            <el-table-column prop="status" label="状态(点击查看详情)">
              <template slot-scope="{ row }">
                <el-tag
                  v-if="row.status != undefined"
                  :type="row.status > 0 ? 'success' : 'info'"
                  v-html="statusFormatter(row)"
                >
                  {{ row.status }}
                </el-tag>
                <!-- <span
                  v-if="row.status != undefined"
                  :style="{
                    padding: ' 0 8px',
                    border: '1px solid red',
                    color: '#606266',
                    borderRadius: '8px',
                  }"
                  v-html="statusFormatter(row)"
                >
                  {{ row.status }}
                </span> -->
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="imReport(scope.row)"
                  >导出报告</el-button
                >
                <el-button type="text" size="small" @click="redact(scope.row)"
                  >继续编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="deleteCords(scope.row)"
                  >删除记录</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tablePage.pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="tablePage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tablePage.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="新增评测任务"
      :visible.sync="dialogAddTaskVisible"
      :destroy-on-close="true"
    >
      <AddTask></AddTask>
    </el-dialog>
    <el-dialog
      title="评测报告"
      :visible.sync="dialogImportReportVisible"
      width="70%"
      :destroy-on-close="true"
    >
      <EvaluteReport :jobId="jobIds"></EvaluteReport>
    </el-dialog>
    <el-dialog
      title="新增评测对比"
      :visible.sync="dialogConstrastVisible"
      :destroy-on-close="true"
    >
      <Constrast></Constrast>
    </el-dialog>
    <el-dialog
      title="评测对比报告"
      :visible.sync="dialogTestReportVisible"
      :destroy-on-close="true"
    >
      <TestResport :contrastJobIdContrast="contrastJobIdContrast"></TestResport>
    </el-dialog>
    <el-dialog
      title="新增评测任务"
      :visible.sync="dialogEditTaskVisible"
      :destroy-on-close="true"
    >
      <EditTask :editTaskFormBefore="editTaskFormBefore"></EditTask>
    </el-dialog>
  </div>
</template>
<script>
import AddTask from "./components/addTask.vue";
import EvaluteReport from "./components/evaluteReport";
import Constrast from "./components/contrast.vue";
import TestResport from "./components/testReport.vue";
import EditTask from "./components/editTask.vue";
import { selectByConditions, deleteById } from "../../api/evalute/evalute";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "暂存",
        },
        {
          value: "1",
          label: "评测中",
        },
        {
          value: "2",
          label: "待分配",
        },
        {
          value: "3",
          label: "已完成",
        },
      ],
      // options: [],
      TestState: "",
      TestName: "",
      tableData: [],
      tablePage: {
        paheNo: 1, // 第几页
        pageSize: 10, // 每页多少条
        total: 0, // 总记录数
      },
      // currentPage: 1,
      dialogAddTaskVisible: false,
      dialogImportReportVisible: false,
      dialogConstrastVisible: false,
      dialogTestReportVisible: false,
      dialogEditTaskVisible: false,
      jobIds: "",
      contrastJobIdContrast: "",
      editTaskFormBefore: {},
    };
  },
  computed: {
    ...mapGetters(["dictionary"]),
  },
  created() {
    this.$bus.$on("closeAddTask", (data) => {
      this.dialogAddTaskVisible = data;
    });
    this.$bus.$on("closeResport", (data) => {
      this.dialogImportReportVisible = data;
    });
    this.$bus.$on("closeConstrast", (data) => {});
    //查看报告->对比报告
    this.$bus.$on("viewReport", (data) => {
      this.dialogConstrastVisible = false;
      this.contrastJobIdContrast = data;
      this.dialogTestReportVisible = true;
    });
    this.$bus.$on("refresh", () => {
      this.selectByConditions({});
    });
  },
  mounted() {
    this.selectByConditions({});
    // console.log(JSON.stringify(this.dictionary));
  },
  components: { AddTask, EvaluteReport, Constrast, TestResport, EditTask },

  filters: {},
  methods: {
    //删除
    deleteCords(row) {
      const param = {
        jobId: row.jobId,
      };
      deleteById(param).then((res) => {
        if (res.data.message == "操作成功!") {
          this.$message.success("删除成功");
          this.searchEvalute({});
        }
      });
    },
    // 搜索
    searchEvalute() {
      let data = {};
      this.TestName !== "" ? (data.jobName = this.TestName) : "";
      this.TestState !== "" ? (data.status = this.TestState) : "";
      this.selectByConditions(data);
    },
    // 评测任务列表查询
    selectByConditions(datas, page) {
      let data = Object.assign(this.tablePage);
      if (datas) {
        Object.keys(datas).length > 0
          ? (data = Object.assign(data, datas))
          : "";
      }
      if (page && Object.prototype.toString.call(page)) {
        data = Object.assign(data, page);
      }
      // console.log("入参", data);
      selectByConditions(data).then((res) => {
        // console.log("selectByConditions", res.data.data);
        // this.tableData = this.getList(
        //   res.data.data.list,
        //   this.tablePage.pageNo,
        //   this.tablePage.pageSize
        // );
        (this.tableData = res.data.data.list),
          (this.tablePage.total = res.data.data.total);
      });
    },
    getList(data, num, size) {
      let list, start, end;
      start = (num - 1) * size;
      end = start + size;
      list = data.filter((item, index) => {
        return index >= start && index < end;
      });
      list.forEach((item, index) => {
        item.seq = index + start;
      });
      return list;
    },
    // 状态(0->暂存)
    statusFormatter(row) {
      // console.log(
      //   "55555",
      //   row,
      //   this.dictionary.evaluation_job_status.filter(
      //     (item) => item.value == row.status
      //   )[0]
      // );
      if (row.status == undefined || row.status == null) return;
      let arr =
        this.dictionary.evaluation_job_status !== undefined
          ? JSON.parse(JSON.stringify(this.dictionary.evaluation_job_status))
          : []; //运行了,list的条数乘以2次,有问题
      let title;
      if (arr.length > 0) {
        title = arr.filter((item) => item.value == row.status)[0].title;
      }

      return `<span>${title}</span>`;
    },

    // statusFormatter(value) {
    //   return this.dictionary.evaluation_job_status.filter(
    //     (item) => item.value == value
    //   )[0].title;
    // },
    handeleAddTask() {
      this.dialogAddTaskVisible = true;
    },
    handeleConstrast() {
      this.dialogConstrastVisible = true;
    },
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize;
    },
    handleCurrentChange(pageNo) {
      this.tablePage.pageNo = pageNo;
      console.log(this.tablePage.pageNo);
      this.selectByConditions({});
    },
    //导出报告
    imReport(row) {
      this.jobIds = row.jobId;
      this.dialogImportReportVisible = true;
    },
    // 继续编辑
    redact(row) {
      // console.log("edit", row);
      this.editTaskFormBefore = row;
      this.dialogEditTaskVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/index.scss";
.evaluate {
  width: 100%;
  height: 100%;
  // background-color: red;
  .tit {
    height: 20px;
    width: 100%;
    margin-bottom: 10px;
    .el-icon-location {
      font-size: 18px;
    }
    .el-icon-location,
    span {
      color: #11101091;
    }
  }
  .main {
    width: 100%;
    .content_title {
      box-sizing: border-box;
      margin-left: 12px;
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #11101091;
    }
    .content_list {
      //   width: 100%;
      //   height: calc(100% - 70px);
      .el-row {
        box-sizing: border-box;
        height: 40px;
        margin-left: 12px;
        margin-bottom: 20px;
        width: calc(100% - 12px);
        // background-color: #ff0000;
        .el-col {
          height: 100%;
          display: flex;
          .test_name {
            width: 6em;
            height: 100%;
            line-height: 40px;
            text-align: center;
          }
          .test_input {
            flex: 1;
            /deep/.el-input {
              width: 90%;
              background-color: #ffffff !important;
            }
            /deep/.el-select {
              width: 90%;
            }
          }
        }
      }
      .content_main {
        width: 100%;
        /deep/.el-table {
          margin-bottom: 20px;
        }
        /deep/.el-pagination {
          display: flex;
          justify-content: flex-end;
          box-sizing: border-box;
          padding-right: 4%;
        }
      }
    }
  }
}
// /deep/.el-dialog__header {
// }
</style>
