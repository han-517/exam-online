<template>
  <div class="teacher-card">
    <h4>管理员登录</h4>
    <el-form>
      <div class="user">
        <el-input
          placeholder="请输入账号"
          v-model="loginForm.user"
          clearable
        >
        </el-input>
      </div>
      <div class="passwd">
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
        >
        </el-input>
      </div>
      <div class="check-code">
        <el-input
          placeholder="请输入验证码"
          v-model="loginForm.checkcode"
          clearable
        >
        </el-input>
        <el-tooltip
          class="item"
          effect="dark"
          content="看不清点击刷新"
          placement="top-start"
        >
          <a href="#" @click="refreshCode">
            <img src="examination/checkCodeServlet" id="vcode2" />
          </a>
        </el-tooltip>
      </div>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="mLogin" plain round>登 录 </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from 'element-ui';
export default {
  name: "TeacherLogin",
  data() {
    return {
      loginForm: {
        user: "",
        password: "",
        checkcode: "",
      },
    };
  },
  methods: {
    refreshCode() {
      // 切换验证码
      let vcode = document.getElementById("vcode2");
      vcode.src = "examination/checkCodeServlet?time=" + new Date().getTime();
    },
    mLogin() {
      if(this.loginForm.user === '' || this.loginForm.password === ''){
        this.$notify.error({
          title: '登录失败',
          message: '账号和密码不能为空！'
        });
      }
      else{
        let load = Loading.service({
          text: "正在登录中，请稍等..."
        })
        axios
        .get(
          `examination/login/admin?checkcode=${this.loginForm.checkcode}&teacherId=${this.loginForm.user}&password=${this.loginForm.password}`
        )
        .then((response) => {
          
          if(response.data['isSuccess']){
            this.$store.commit("LOGIN", this.loginForm.user)
            this.$notify({
              title: '登录成功',
              type: 'success'
            });
            setTimeout(() => {
              load.close()
              this.$router.push({ name: "home" })
            }, 1000)
          }
          else{
            load.close()
            this.$notify.error({
              title: '登录失败',
              message: response.data['errorInfo']
            });
          }
        })
        .catch((error) => {
          load.close()
          this.$notify.error({
            title: '登录失败',
            message: error
          });
        });
      }
    },
  },
};
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
    .item {
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
  .check-code,
  .user,
  .passwd {
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