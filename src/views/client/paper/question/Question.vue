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
        <el-table-column prop="type" label="题目类型"> </el-table-column>
        <el-table-column prop="content" label="题目内容"> </el-table-column>
        <el-table-column prop="major" label="专业"> </el-table-column>
        <el-table-column prop="bank" label="所属题库"> </el-table-column>
        <el-table-column prop="createtime" label="创建时间"> </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <el-button size="mini" type="primary" @click="detailQues(item)">
            详 细
          </el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "qusetion",
  data() {
    return {
      item: {
        path: "",
        name: "",
        label: "",
      },
      operateForm: {
        type: "",
        content: "",
        major: "",
        createtime: "",
      },
      // 搜索框信息
      searchForm: {
        // keyword,
        keyword: "",
      },
      // 所有题库信息表单，这里是写死的，还需要从数据库中读取
      tableData: [
        {
          id: "",
          type: "客户端单选题",
          content: "树上有几只鸟",
          major: "软件工程",
          bank: "默认题库",
          createtime: "2016-05-02",
        },
        {
          id: "",
          type: "单选题",
          content: "树上有几只鸟",
          major: "软件工程",
          bank: "默认题库",
          createtime: "2016-05-02",
        },
        {
          id: "",
          type: "单选题",
          content: "树上有几只鸟",
          major: "软件工程",
          bank: "默认题库",
          createtime: "2016-05-02",
        },
      ],

      // 分页有关参数，不用管
      config: {
        page: 1,
        toatl: 30,
      },
    };
  },
  methods: {
    // 确认提交处理函数，
    confirm() {},

    // 查看题目详情
    detailQues(item) {
      this.$router.push({
        name: "detail",
      });

      item = {
        path: "/client/paper/question/detail",
        name: "detail",
        label: "题目详细",
      };

      this.$store.commit("selectMenu", item);
      console.log(item.name);
    },
    // 搜索用户
    getList() {},
    // 分页操作
    changePage() {},
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>