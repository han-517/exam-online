<template>
  <div class="container">
    <div class="register-container">
      <h4>账号注册</h4>
      <el-form>
      <div class="register-box">
        <el-input
            class="userid"
            placeholder="请输入学号"
            v-model="Form.id"
            clearable>
        </el-input>
        <el-input
            class="username"
            placeholder="请输入用户名"
            v-model="Form.username"
            clearable>
        </el-input>
        <el-input
            class="password"
            placeholder="请输入密码"
            v-model="Form.password"
            show-password>
        </el-input>
        <el-input
            class="password-again"
            placeholder="确认密码"
            v-model="passwordVertify"
            show-password>
        </el-input>
        <el-input
            class="email"
            placeholder="请输入邮箱"
            v-model="Form.email"
            clearable>
        </el-input>
        <el-select class="major" v-model="Form.majorid" slot="prepend" placeholder="请选择专业" clearable>
            <el-option v-for="(m, index) of majors" :label="m.name" :value="m.majorId" :key="index"></el-option>
        </el-select>
        <el-select class="teacher" v-model="Form.teacherid" slot="prepend" placeholder="请选择老师" clearable>
            <el-option v-for="(m, index) of teachers" :label="m.name" :value="m.teacherId" :key="index"></el-option>
        </el-select>
      </div>
      </el-form>
      <el-button 
        class="registerbtn"
        type="primary" 
        plain
        round>注册
      </el-button>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Register',
    data(){
        return{
            select: '',
            majors: [ ],
            teachers: [ ],
            Form: {
                id: '',
                password: '',
                email: '',
                majorid: undefined,
                teacherid: undefined
            },
            passwordVertify: '',
        }
    },
    mounted(){
        axios.get('examination/getAllTecServlet').then(
            response => {
                this.teachers = response.data
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
        axios.get('examination/getAllMajorServlet').then(
            response => {
                this.majors = response.data
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    },

}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    width: 100%;
    background-image: url('@/assets/background.jpg');
    opacity: 1.0;
    position: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    z-index: -2;
  }
  .register-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1000px;
    height: 600px;
    background-color: rgba(230, 230, 230, .9);
    /* background-color: rgba(200, 200, 200, 0.8); */
    box-shadow: 0 3px 5px rgba(0, 0, 0, .6), 0 0 6px rgba(0, 0, 0, .6);
    border-radius: 20px;
    overflow: hidden;
    z-index: -2;
    text-align: center;
  }
  h4 {
      height: 70px;
      font-size: 40px;
      font-style: italic;
      font-weight: 900;
      color: #3f3f3f;
      display: block;
      padding-top: 20px;
  }
    .register-box {
        display: inline-block;
        height: 400px;
        width: 600px;
    }
    .major, .teacher, .username, .password, .password-again, .email, .userid, .password-again {
        width: 60%;
        margin: 8px auto;
    }
    .registerbtn {
        width: 360px;
        font-size: 16px;
        font-weight: 700;
    }
</style>