<template>
  <div>
    <el-form status-icon label-width="100px">
      <el-form-item label="账号">
        <el-input>{{ myInfo.id }}</el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input>{{ myInfo.name }}</el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input>{{ myInfo.gender }}</el-input>
      </el-form-item>

      <el-form-item>
        <!-- 提交修改：炅函上 -->
        <el-button type="primary">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 个人信息，更多后面在添加
      myInfo: {
        id: "",
        name: "",
        gender: "",
      },
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.el-input {
  width: 350px;
}
</style>