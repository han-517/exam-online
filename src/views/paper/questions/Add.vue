<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 题目相关 -->
      <el-card>
        <el-form-item label="题目类型" prop="type">
          <el-select
            v-model="ruleForm.type"
            placeholder="请选择"
            class="filter-item"
            @change="handleTypeChange"
          >
            <el-option
              v-for="item in quTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属题库" prop="bank">
          <el-input v-model="ruleForm.bank"></el-input>
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
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          size="small"
          plain
          @click="handleAdd"
        >
          添加答案
        </el-button>

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

          <el-table-column label="答案解析">
            <template slot-scope="scope">
              <el-input v-model="scope.row.analysis" type="textarea" />
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeItem(scope.$index)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 20px">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button type="info" @click="onCancel">返回</el-button>
      </div>

      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 题目相关内容
      ruleForm: {
        type: "",
        bank: "",
        content: "",
        // 答案数组
        answerList: [],
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
      rules: {
        content: [
          { required: true, message: "请输入题目内容", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择一个题目类型", trigger: "change" },
        ],
        bank: [{ required: true, message: "请选择一个题库", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 根据题型，生成默认答案选项
    // 判断题两个选项，单选、多选四个选项
    handleTypeChange(v) {
      this.ruleForm.answerList = [];
      if (v === 2) {
        this.ruleForm.answerList.push({
          isRight: true,
          content: "正确",
          analysis: "",
        });
        this.ruleForm.answerList.push({
          isRight: false,
          content: "错误",
          analysis: "",
        });
      }

      if (v === 0 || v === 1) {
        this.ruleForm.answerList.push({
          isRight: false,
          content: "",
          analysis: "",
        });
        this.ruleForm.answerList.push({
          isRight: false,
          content: "",
          analysis: "",
        });
        this.ruleForm.answerList.push({
          isRight: false,
          content: "",
          analysis: "",
        });
        this.ruleForm.answerList.push({
          isRight: false,
          content: "",
          analysis: "",
        });
      }
    },

    // 添加答案子项
    handleAdd() {
      this.ruleForm.answerList.push({
        isRight: false,
        content: "",
        analysis: "",
      });
    },

    // 移除答案子项
    removeItem(index) {
      this.ruleForm.answerList.splice(index, 1);
    },

    // 提交按钮
    submitForm() {},

    // 取消保存，返回按钮
    onCancel() {
      this.$router.push({ name: "question" });
    },

    // // 重置
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
};
</script>

<style>
.el-input {
  width: 350px;
}
</style>