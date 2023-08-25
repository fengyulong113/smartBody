<template>
  <div class="constrast">
    <el-row>
      <el-col :span="10"
        ><div class="test_name">评测样本集选择</div>
        <div class="test_input">
          <el-select
            v-model="sampleSet"
            placeholder="请选择"
            @change="selectEvaluteSets"
          >
            <el-option
              v-for="item in evaluteSets"
              :label="item"
              :value="item"
              :key="item"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      ref="setTables"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="jobName" label="测评名称"> </el-table-column>
      <el-table-column prop="jobCreateUser" label="上传者ID"> </el-table-column>
      <!-- <el-table-column prop="address" label="状态(点击查看详情)">
      </el-table-column> -->
      <!-- <el-table-column fixed="right" label="操作"> -->
      <!-- <template slot-scope="scope"> </template> -->
      <!-- </el-table-column> -->
      <el-table-column fixed="right" label="操作" type="selection" width="55">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tablePage.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="tablePage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablePage.total"
    >
    </el-pagination>
    <div class="footer">
      <el-button @click="closeConstrast">取消</el-button>
      <el-button @click="viewReport">查看报告</el-button>
    </div>
  </div>
</template>
<script>
import {
  selectByConditions,
  selectDatasetList,
  selectCompareResultsByIds,
  selectExecutedJobByDataset,
} from "../../../api/evalute/evalute";
export default {
  data() {
    return {
      tableData: [],
      tablePage: {
        currentPage: 1, // 第几页
        pageSize: 10, // 每页多少条
        total: 0, // 总记录数
      },

      currentPage: 1,
      sampleSet: "",
      arrlist: [],
      evaluteSets: [],
    };
  },
  mounted() {
    this.selectDatasetList();
    this.selectByConditions({});
  },
  components: {},
  methods: {
    // 查看报告
    viewReport() {
      if (this.arrlist.length != 0) {
        this.$bus.$emit("viewReport", this.arrlist.join(","));
      } else {
        this.$message.warning("请选择样本集");
      }
    },
    //关闭
    closeConstrast() {
      this.$bus.$emit("closeConstrast", false);
    },
    //列表查询
    // 该列表查询无法分页等
    selectEvaluteSets(val) {
      let param = {
        datasetName: val,
      };
      selectExecutedJobByDataset(param).then((res) => {
        // console.log("qqqqq", res.data.data);
        this.tableData = res.data.data;
      });
    },
    selectByConditions(datas) {
      let data = {};
      if (datas) {
        Object.keys(datas).length > 0 ? (data = datas) : (data = {});
      }
      selectByConditions(data).then((res) => {
        // console.log("selectByConditions", res.data.data);
        this.tableData = this.getList(
          res.data.data.list,
          this.tablePage.currentPage,
          this.tablePage.pageSize
        );
        this.tablePage.total = res.data.data.total;
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
    //数据集查询
    selectDatasetList() {
      selectDatasetList().then((res) => {
        // console.log("模型", res.data.data);
        this.evaluteSets = res.data.data;
      });
    },

    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      this.tablePage.currentPage = currentPage;
    },
    // 选中样本集
    handleSelectionChange(val) {
      if (val.length > 3) {
        this.$refs.setTables.clearSelection();
        this.$message.warning("选中个数不能超过3个");
      } else {
        this.arrlist = val.map((item) => {
          return item.jobId;
        });
        // console.log(this.arrlist, this.arrlist.join(","));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.constrast {
  width: 100%;
  height: 100%;
  .footer {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    .el-button {
      min-width: 81px;
      height: 32px;
      line-height: 32px;
      padding-top: 0;
      opacity: 1;
      border-radius: 4px;
      border: 1px solid rgba(220, 223, 230, 1);
    }
  }
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
        min-width: 6em;
        height: 100%;
        line-height: 40px;
        margin-right: 1em;
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
}
</style>
