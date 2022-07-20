import VueRouter from "vue-router";
import Manager from "@/views/Manager.vue";
import Home from "@/views/home";
import User from "@/views/user";
import Login from "@/views/login/Login.vue";
import Register from "@/views/login/Register.vue";
import Paper from "@/views/paper/index";
import Bank from "@/views/paper/Bank.vue";
import Question from "@/views/paper/questions/Question.vue";
import Add from "@/views/paper/questions/Add.vue";
import Update from "@/views/paper/questions/Update.vue";
import Exam from "@/views/paper/Exam.vue";
import Info from "@/views/info/index";
import MyInfo from "@/views/info/MyInfo";
import Password from "@/views/info/Password";

import Client from "@/views/client/User";
import uHome from "@/views/client/home";
import uPaper from "@/views/client/paper";
import uQuestion from "@/views/client/paper/question/Question";
import uDetail from "@/views/client/paper/question/Detail";
import uExam from "@/views/client/paper/exam/Exam";
import addExam from "@/views/client/paper/exam/AddExam";
import examCard from "@/views/client/paper/exam/ExamCard";
import uMyInfo from "@/views/client/info/MyInfo";
import uPassword from "@/views/client/info/Password";
import examDetail from "@/views/client/paper/exam/ExamDetail";

export default new VueRouter({
  mode: "hash",
  routes: [
    // 空路径直接跳转到home，
    {
      path: "/",
      component: Manager,
      redirect: "/login",
      children: [
        // 首页
        {
          path: "home",
          name: "home",
          component: Home,
        },

        // 用户管理
        {
          path: "user",
          name: "user",
          component: User,
        },

        // 试题中心
        {
          path: "paper",
          name: "paper",
          component: Paper,
          children: [
            {
              path: "bank",
              name: "bank",
              component: Bank,
            },
            {
              path: "question",
              name: "question",
              component: Question,
            },
            {
              path: "/question/update",
              name: "update",
              component: Update,
            },
            {
              path: "/question/add",
              name: "add",
              component: Add,
            },
            {
              path: "exam",
              name: "exam",
              component: Exam,
            },
            {
              path: "exam/detail",
              component: examDetail,
            },
          ],
        },

        // 个人中心
        {
          path: "/info",
          name: "info",
          component: Info,
          children: [
            {
              path: "myinfo",
              name: "myinfo",
              component: MyInfo,
            },
            {
              path: "password",
              name: "password",
              component: Password,
            },
          ],
        },
      ],
    },

    // 登录
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    // 注册
    {
      path: "/register",
      name: "register",
      component: Register,
    },

    // 用户端
    {
      path: "/client",
      component: Client,
      redirect: "/client/home",
      children: [
        // 首页
        {
          path: "home",
          name: "uhome",
          component: uHome,
        },
        // 试题中心
        {
          path: "paper",
          name: "upaper",
          component: uPaper,
          children: [
            {
              path: "question",
              name: "uquestion",
              component: uQuestion,
            },
            {
              path: "/question/detail",
              name: "detail",
              component: uDetail,
            },
            {
              path: "exam",
              name: "uexam",
              component: uExam,
            },
            {
              path: "exam/detail",
              component: examDetail,
            },
            {
              path: "addexam",
              name: "addexam",
              component: addExam,
            },
            {
              path: "examcard",
              name: "examCard",
              component: examCard,
            },
          ],
        },

        // 个人中心
        {
          path: "info",
          name: "info",
          component: Info,
          children: [
            {
              path: "myinfo",
              name: "umyinfo",
              component: uMyInfo,
            },
            {
              path: "password",
              name: "upassword",
              component: uPassword,
            },
          ],
        },
      ],
    },
  ],
});
