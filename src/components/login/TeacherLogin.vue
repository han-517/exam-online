<template>
  <div class="teacher-card">
    <h4>教师登录</h4>
    <el-form>
    <div class="user">
        <el-input
            placeholder="请输入用户名"
            v-model="loginForm.username"
            clearable>
        </el-input>
    </div>
    <div class="passwd">
        <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password>
        </el-input>
    </div>
    <div class="check-code">
        <el-input
            placeholder="请输入验证码"
            v-model="loginForm.checkcode"
            clearable>
        </el-input>
        <el-tooltip class="item" effect="dark" content="看不清点击刷新" placement="top-start">
        <a href="#" @click="refreshCode">
            <img src="examination/checkCodeServlet" id="vcode2"/>
        </a>
        </el-tooltip>
    </div>
    </el-form>
    <div class="btn">
        <el-button type="primary" 
            plain
            round>登录
        </el-button>
        <el-button type="primary" 
            plain
            round
            @click="register">注册
        </el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TeacherLogin',
    data(){
    return{
        loginForm:{
            username: '',
            password: '',
            checkcode: ''
        },
    }
  },
  methods:{
    refreshCode() {
        // 切换验证码
        let vcode = document.getElementById("vcode2");
        vcode.src = "examination/acheckCodeServlet?time=" + new Date().getTime();
    },
    register() {
        this.$router.push({name: 'register'});
    }
  }
}
</script>

<style lang="scss" scoped>
  .teacher-card {
    display: inline-block;
    width: 500px;
    height: 600px;
    background-color: rgba(230, 230, 230, 1);
    text-align: center;
    .check-code {
        display: grid;
        grid-template-columns: 70% 30%;
        overflow: hidden;
       .item{
        position: relative;
        top: 5px;
        left: 5px;
       }
    }
    h4 {
        font-size: 40px;
        font-style: italic;
        font-weight: 900;
        color: #3f3f3f;
        display: block;
        padding-top: 100px;
        padding-bottom: 40px;
    }
    span {
        display: block;
        margin: 0 auto;
    }
    .check-code, .user, .passwd {
        width: 60%;
        margin: 15px 20%;
    }
  }
  .btn {
    margin: 55px 20%;
    display: grid;
    grid-template-columns: 50% 50%;
  }
</style>