<template>
  <div class="manage">
    <!-- 对话框 -->
    <div class="manage-header">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="搜索" v-model="searchForm.keyword"> </el-input>
        </el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="getList"
          circle
        ></el-button>
      </el-form>
    </div>

    <div class="table">
      <el-table :data="tableData" height="90%" border stripe>
        <el-table-column prop="name" label="考试名称"> </el-table-column>
        <!-- <el-table-column prop="user" label="考试人"> </el-table-column> -->
        <el-table-column prop="singleNum" label="单选题数量"> </el-table-column>
        <el-table-column prop="mulNum" label="多选题数量"> </el-table-column>
        <el-table-column prop="judgeNum" label="判断题数量"> </el-table-column>
        <el-table-column prop="brieflyNum" label="简答题数量">
        </el-table-column>
        <el-table-column prop="score" label="答题情况"> </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>

        <!-- 还没有写删除 -->
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="detail(scope.row)">
              详 情
            </el-button>
            <el-button size="mini" type="danger" @click="delExam(scope.row)">
              删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="config.pageSize"
      :page-count="config.currentPage"
      :total="config.total"
      @current-change="pagechange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "qusetion",
  data() {
    return {
      item: {
        path: "",
        name: "",
        label: "",
      },

      // 搜索框信息
      searchForm: {
        // keyword,
        keyword: "",
      },
      // 所有题库信息表单，这里是写死的，还需要从数据库中读取
      tableData: [],

      config: {
        currentPage: 1,
        pageSize: 9,
        total: 0,
      },
    };
  },
  methods: {
    pagechange(value) {
      axios
        .get(
          `examination/paper/curPagePaper?currentPage=${value}&pageSize=${this.config.pageSize}`
        )
        .then((response) => {
          this.tableData = response.data["rows"];
          this.config.total = response.data["totalCount"];
        });
    },
    // 确认提交处理函数，
    confirm() {},
    // 开始添加考试

    // 考试信息详情
    detail(row) {
      this.$router.push({ 
        name: "examdetail",
        params: {
          paperId: row.paperId
        } 
      });
    },
    delExam(row) {
      axios.get(`examination/paper/delete?paperId=${row.paperId}`)
      .then(response => {
        this.$notify({
          title: '删除成功',
          type: 'success'
        })
      })
      .catch(err => {
        this.$notify.error({
          title: '删除失败',
          message: '请稍后重试'
        })
      })
      location.reload()
    },
    // 搜索用户
    getList() {},
  },
  mounted() {
    axios
      .get(
        `examination/paper/curPagePaper?currentPage=${this.config.currentPage}&pageSize=${this.config.pageSize}`
      )
      .then((response) => {
        this.tableData = response.data["rows"];
        this.config.total = response.data["totalCount"];
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table {
  height: 85%;
}
</style>