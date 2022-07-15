<template>
  <div class="manage">
    <!-- 对话框 -->
    <div class="manage-header">
      <el-button type="primary" @click="addQues(item)">
        <i class="el-icon-plus"></i>
        <span>新增</span>
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
        <el-table-column prop="typeName" label="题目类型"> </el-table-column>
        <el-table-column prop="content" label="题目内容"> </el-table-column>
        <el-table-column prop="majorName" label="专业"> </el-table-column>
        <el-table-column prop="bankName" label="所属题库"> </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="updateQues(item, scope.row)">
              更 新
            </el-button>
            <el-button size="mini" type="danger" @click="delQues(scope.row)">
              删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      operateForm: {
        id: "",
        type: "",
        content: "",
        majorId: "",
        createtime: "",
        bankId: "",
        answerId: "",
        remark: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
      },
      // 搜索框信息
      searchForm: {
        // keyword,
        keyword: "",
      },
      // 所有题库信息表单，这里是写死的，还需要从数据库中读取
      tableData: [
        {},{},{},{},{},{},{},{},{},{},{},{}
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
    // 添加题目
    addQues(item) {
      this.$router.push({
        name: "add",
      });
      item = {
        path: "/question/add",
        name: "add",
        label: "新增题目",
      };
      this.$store.commit("selectMenu", item);
      // console.log("添加");
    },

    // 更新题目
    updateQues(item, row) {
      this.$router.push({
        name: "update",
        params: {
          data: {
            id: row.id,
            type: row.type,
            content: row.content,
            majorId: row.majorId,
            bankId: row.bankId,
            answerId: row.answerId,
            remark: row.remark,
            optionA: row.optionA,
            optionB: row.optionB,
            optionC: row.optionC,
            optionD: row.optionD
          }
        }
      });

      item = {
        path: "/question/update",
        name: "update",
        label: "更新题目",
      };
      this.$store.commit("selectMenu", item);
    },
    // 删除题目
    delQues(row) {
      axios.get(`examination/question/delete?id=${row.id}`)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
      location.reload()
    },
    // 搜索用户
    getList() {},
    // 分页操作
    changePage() {},
  },
  mounted() {
    axios.get('examination/question/list')
    .then(response => {
      this.tableData = response.data
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
</style>