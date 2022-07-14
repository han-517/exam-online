<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :inline="true"
    >
      <!-- 题目相关 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>填写试卷相关信息</span>
        </div>
        <el-form-item label="试卷名称" prop="name">
          <el-input
            v-model.number="ruleForm.singleNum"
            style="width: 350px"
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item label="单选题数" prop="singleNum">
          <el-input
            v-model.number="ruleForm.singleNum"
            placeholder="0"
          ></el-input>
        </el-form-item>

        <el-form-item label="多选题数" prop="mulNum">
          <el-input v-model.number="ruleForm.mulNum" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="判断题数" prop="judgeNum">
          <el-input
            v-model.number="ruleForm.judgeNum"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item label="专业选择">
          <el-checkbox-group v-model="ruleForm.majors">
            <el-checkbox label="软件工程" name="majors" border></el-checkbox>
            <el-checkbox label="数字媒体" name="majors" border></el-checkbox>
            <el-checkbox label="通信工程" name="majors" border></el-checkbox>
            <el-checkbox label="网络安全" name="majors" border></el-checkbox>
            <br />
            <el-checkbox label="人工智能" name="majors" border></el-checkbox>
            <el-checkbox label="电子科学" name="majors" border></el-checkbox>
            <el-checkbox label="材料化学" name="majors" border></el-checkbox>
            <el-checkbox label="行政管理" name="majors" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-card>

      <div style="margin-top: 20px">
        <el-button type="primary" @click="submitForm">确定生成</el-button>
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
        name: "",
        singleNum: "",
        mulNum: "",
        judgeNum: "",
        majors: [],
      },
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        majors: [
          {
            type: "array",
            required: true,
            message: "请至少专业",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 提交按钮
    submitForm() {
      this.$router.push({ name: "examCard" });
    },

    // 取消保存，返回按钮
    onCancel() {
      this.$router.push({ name: "uquestion" });
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 100px;
}
</style>>