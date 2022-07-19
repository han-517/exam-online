<template>
  <div class="manage">
    <!-- 对话框 -->
    <div class="manage-header">
      <el-button type="primary" @click="addExam(item)">
        <i class="el-icon-plus"></i>
        <span>我要考试</span>
      </el-button>

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
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="singleNum" label="单选题数量"> </el-table-column>
        <el-table-column prop="mulNum" label="多选题数量"> </el-table-column>
        <el-table-column prop="judgeNum" label="判断题数量"> </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
        <!-- <el-table-column prop="score" label="分数"> </el-table-column> -->
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="config.pageSize"
      :page-count="config.currentPage"
      :total="config.total"
      @current-change="pagechange">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios';
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
        total: 0
      }
    };
  },
  methods: {
    pagechange(value) {
      axios.get(`examination/paper/curPagePaper?currentPage=${value}&pageSize=${this.config.pageSize}`)
      .then(response => {
        this.tableData = response.data['rows']
        this.config.total = response.data['totalCount']
      })
    },
    // 确认提交处理函数，
    confirm() {},
    // 开始添加考试
    addExam(item) {
      this.$router.push({
        name: "addexam",
      });
      item = {
        path: "/client/paper/addexam",
        name: "addeaxm",
        label: "生成考试卷",
      };

      this.$store.commit("selectMenu", item);
    },

    // 搜索用户
    getList() {},
  },
  mounted() {
    axios.get(`examination/paper/curPagePaper?currentPage=${this.config.currentPage}&pageSize=${this.config.pageSize}`)
    .then(response => {
      this.tableData = response.data['rows']
      this.config.total = response.data['totalCount']
    })
    .catch(err => {
      console.log(err)
    })
  }
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