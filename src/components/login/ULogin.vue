<template>
  <div class="student-card">
    <h4>用户登录</h4>
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
          ref="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
        >
        </el-input>
      </div>

      <!-- 验证码 -->
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
            <img
              src="http://47.113.225.80:8080/examination/checkCodeServlet"
              id="vcode1"
            />
          </a>
        </el-tooltip>
      </div>
    </el-form>
    <div class="btn">
      <el-button type="primary" plain round @click="ulogin">登录 </el-button>
      <el-button type="primary" plain round @click="register">注册 </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from 'element-ui';
export default {
  name: "StudentLogin",
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
      let vcode = document.getElementById("vcode1");
      vcode.src = "examination/checkCodeServlet?time=" + new Date().getTime();
    },
    ulogin() {
      
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
          `examination/studentLoginServlet?vertify=${this.loginForm.checkcode}&user=${this.loginForm.user}&password=${this.loginForm.password}`
        )
        .then(async(response) => {
          await this.$store.commit("LOGIN", this.loginForm.user)
          load.close()
          if(response.data['isSuccess']){
            this.$notify({
              title: '登录成功',
              type: 'success'
            });
            setTimeout(() => 
              this.$router.push({ name: "uhome" })
              , 1000)
          }
          else{
            this.$notify.error({
              title: '登录失败',
              message: response.data['errReason']
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
      // this.$router.push({ name: "uhome" }); // 测试
    },
    register() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style lang="scss" scoped>
.student-card {
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
      left: 9px;
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