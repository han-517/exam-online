<template>
  <div class="container">
    <div class="login-container">
      <transition name="student">
      <div class="student-box" v-if="isStudent">
        <span class="student">
          <student-login/>
        </span>
        <span class="stubtn">
          <el-button round @click="isStudent = !isStudent">{{Msg}}</el-button>
        </span>
      </div>
      </transition>
      <transition name="teacher">
      <div class="teacher-box" v-if="!isStudent">
        <span class="teacbtn">
          <el-button round @click="isStudent = !isStudent">{{Msg}}</el-button>
        </span>
        <span class="teacher">
          <teacher-login/>
        </span>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import StudentLogin from '@/components/login/StudentLogin.vue'
import TeacherLogin from '@/components/login/TeacherLogin.vue'
export default {
    name: 'Login',
    components: {StudentLogin, TeacherLogin},
    data(){
      return{
        isStudent: false,
      }
    },
    computed:{
      Msg(){
        if(this.isStudent){
          return '教师身份登录'
        }
        else{
          return '学生身份登录'
        }
      }
    },
    methods: {
      
    },
}
</script>

<style lang="scss" scoped>
  @keyframes StuAnimate {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes TeacAnimate {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  .student-enter-active {
    animation: StuAnimate 0.6s;
  }
  .student-leave-active {
    animation: StuAnimate 0.6s reverse;
  }
  .teacher-enter-active {
    animation: TeacAnimate 0.6s;
  }
  .teacher-leave-active {
    animation: TeacAnimate 0.6s reverse;
  }
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
  .login-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1000px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.1);
    /* background-color: rgba(200, 200, 200, 0.8); */
    box-shadow: 0 3px 5px rgba(0, 0, 0, .6), 0 0 6px rgba(0, 0, 0, .6);
    border-radius: 20px;
    overflow: hidden;
    z-index: -2;
  }
  .student {
    float: left;
  }
  .teacher {
    float: right;
  }
  .stubtn, .teacbtn {
    width: 500px;
    height: 600px;
    display: inline-block;
    text-align: center;
    position: absolute;
    z-index: -1;
  }
  .el-button {
    margin-top: 55%;
    width: 50%;
    font-size: 16px;
    font-weight: 800;
    color: #3f3f3f;
    background: linear-gradient(-45deg, #106ebe, #bad80a, #23A6D5, #23D5AB);
    background-size: 400% 400%;
  }
  @-webkit-keyframes Gradient {
    0% { background-position: 0% 50% }
    50% {background-position: 100% 50%}
    100% {background-position: 0% 50%}
  }
  @-moz-keyframes Gradient {
    0% {background-position: 0% 50%}
    50% {background-position: 100% 50%}
    100% {background-position: 0% 50%}
  }
  @keyframes Gradient {
    0% {background-position: 0% 50%}
    50% {background-position: 100% 50%}
    100% {background-position: 0% 50%}
  }
  .el-button:hover {
    color: #3f3f3f;
    -webkit-animation: Gradient 3s ease infinite;
    -moz-animation: Gradient 3s ease infinite;
    animation: Gradient 3s ease infinite;
  }
</style>