<template>
  <div class="container">
    <div class="register-container">
      <h4>账号注册</h4>
      <el-form>
        <div class="register-box">
          <el-input
            class="username"
            placeholder="请输入姓名"
            v-model="Form.username"
            clearable
          >
          </el-input>
          <el-input
            class="password"
            placeholder="请输入密码"
            v-model="Form.password"
            show-password
          >
          </el-input>
          <el-input
            class="password-again"
            placeholder="确认密码"
            v-model="passwordVertify"
            show-password
          >
          </el-input>
          <el-select v-model="Form.gender" placeholder="请选择性别" style="display:block; width:60%; margin: 8px auto;">
            <el-option
              key="1"
              label="男"
              value="男">
            </el-option>
            <el-option
              key="2"
              label="女"
              value="女">
            </el-option>
          </el-select>
          <el-input
            class="email"
            placeholder="请输入邮箱"
            v-model="Form.email"
            clearable
          >
          </el-input>
        </div>
      </el-form>
      <el-button class="registerbtn" type="primary" plain round
        @click="registerbtn"
        >注册
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Loading } from 'element-ui';
export default {
  name: "Register",
  data() {
    return {
      select: "",
      majors: [],
      teachers: [],
      Form: {
        username: "",
        password: "",
        email: "",
        gender: ""
      },
      passwordVertify: "",
    };
  },
  methods: {
    registerbtn() {
      if(this.Form.username === '') {
        this.$notify.error({
          title: '注册失败',
          message: '姓名不能为空'
        });
      }
      else if(this.Form.password === '' || this.passwordVertify === '' ) {
        this.$notify.error({
          title: '注册失败',
          message: '密码不能为空'
        });
      }
      else if(this.Form.gender === '') {
        this.$notify.error({
          title: '注册失败',
          message: '性别不能为空'
        });
      }
      else if(this.Form.email === '') {
        this.$notify.error({
          title: '注册失败',
          message: '邮箱不能为空'
        });
      }
      else if(this.Form.password !== this.passwordVertify) {
        this.$notify.error({
          title: '注册失败',
          message: '请保证两次输入的密码一致'
        });
      }
      else {
        let load = Loading.service({
          text: "正在注册中，请稍等..."
        })
        axios.get(`examination/register?name=${this.Form.username}&gender=${this.Form.gender}&password=${this.Form.password}&email=${this.Form.email}`)
        .then(response => {
          if(response.data['isSuccess']) {
            this.$store.commit("LOGIN", response.data['currentUserId'])
            this.$notify({
              title: '注册成功',
              type: 'success'
            })
            setTimeout(() => {
              load.close()
              this.$router.push({ name: "uhome" })
            }, 1000)
          }
          else {
            load.close()
            this.$notify.error({
            title: '注册失败',
            })
          }
        })
        .catch(err => {
          load.close()
          this.$notify.error({
            title: '注册失败',
            message: err
          })
        })
      } 
    }
  }

};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background-image: url("@/assets/background.jpg");
  opacity: 1;
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
  background-color: rgba(230, 230, 230, 0.9);
  /* background-color: rgba(200, 200, 200, 0.8); */
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.6);
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
.username,
.password,
.password-again,
.email,
.userid,
.password-again {
  width: 60%;
  margin: 8px auto;
}
.registerbtn {
  width: 360px;
  font-size: 16px;
  font-weight: 700;
}
</style>