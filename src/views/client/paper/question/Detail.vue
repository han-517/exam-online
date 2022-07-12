<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 题目相关 -->
      <el-card>
        <el-form-item label="题目类型" prop="type"
          ><el-input v-model="ruleForm.type"></el-input
        ></el-form-item>
        <el-form-item label="所属题库" prop="bank">
          <el-input v-model="ruleForm.bank"></el-input>
        </el-form-item>

        <el-form-item label="所属专业" prop="major">
          <el-input v-model="ruleForm.major"></el-input>
        </el-form-item>

        <el-form-item label="题目内容" prop="content">
          <el-input
            type="textarea"
            style="width: 600px; font-size: 20px"
            rows="5"
            v-model="ruleForm.content"
          ></el-input>
        </el-form-item>
      </el-card>

      <!-- 答案相关 -->
      <div
        v-if="ruleForm.type !== 3"
        class="filter-container"
        style="margin-top: 25px"
      >
        <el-table
          :data="ruleForm.answerList"
          :border="true"
          style="width: 100%"
        >
          <el-table-column label="是否答案" width="120" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isRight">答案</el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="答案内容">
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" type="textarea" />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 20px">
        <el-button type="info" @click="onCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 题目相关内容
      ruleForm: {
        type: "单选题",
        bank: "默认题库",
        content: "树上有几只鸟",
        major: "软件工程",
        // 答案数组
        answerList: [
          {
            isRight: false,
            content: "A.对",
            analysis: "",
          },
          {
            isRight: false,
            content: "B.错",
            analysis: "",
          },
        ],
      },
      quTypes: [
        {
          value: 0,
          label: "单选题",
        },
        {
          value: 1,
          label: "多选题",
        },
        {
          value: 2,
          label: "判断题",
        },
      ],
    };
  },
  methods: {
    // 取消，返回按钮
    onCancel() {
      this.$router.push({ name: "uquestion" });
    },
  },
};
</script>

<style>
.el-input {
  width: 350px;
}
</style>