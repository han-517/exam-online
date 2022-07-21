<template>
  <div>
    <el-form status-icon label-width="100px">
      <el-form-item label="账号">
        <el-input v-model="myInfo.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱账号">
        <el-input v-model="myInfo.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="myInfo.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="myInfo.gender" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="editMyInfo(item)">编辑修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      // 个人信息，更多后面在添加
      myInfo: {
        id: "1",
        email: "",
        name: "",
        gender: ""
      },
      item: {
        path: "/info/edit",
        name: "editMyInfo",
        label: "修改个人信息",
      },
    };
  },
  methods: {
    editMyInfo(item) {
      axios.get(`examination/update/user?studentId=${this.myInfo.id}&name=${this.myInfo.name}&email=${this.myInfo.email}&gender=${this.myInfo.gender}`)
      .then(response => {
        this.$notify({
          title: '修改成功',
          type: 'success'
        });
      })
      .catch(err => {
        this.$notify.error({
          title: '修改失败',
          message: err
        });
      })
    },
  },
  mounted() {
    this.myInfo.id = this.$store.state.id
    
    axios.get('examination/info/user')
    .then(response => {
      this.myInfo.name = response.data['name']
      this.myInfo.gender = response.data['gender']
      this.myInfo.email = response.data['email']
    })
    .catch(err => {
      console.log('err: ', err)
    })
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 350px;
}
</style>