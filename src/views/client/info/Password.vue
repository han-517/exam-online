<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input
          type="password"
          v-model="ruleForm.oldPass"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          placeholder="再次确定新密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    var checkOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("旧密码不能为空"));
      }
      setTimeout(() => {
       callback()
      }, 500);
    };

    //新密码不能为空，
    // 新密码、确定新密码是否一样
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // ruleForm:是输入的表单数据：旧密码，新密码，确定新密码
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
      },
      // 约束
      // trigger: "blur" :失去焦点时自动检验
      rules: {
        oldPass: [{ validator: checkOldPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.get(`examination/update/user?studentId=${this.$store.state.id}&password=${this.ruleForm.pass}`)
          .then(response => {
            this.$notify({
              title: '修改成功',
              type: 'success'
            });
          })
        } else {
          // 不符合提交要求
          this.$notify.error({
            title: '修改失败',
            message: '请输入正确的信息'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 350px;
}
</style>