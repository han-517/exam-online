import VueRouter from "vue-router";
import Home from "../views/home";
import User from "../views/user";
import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue";
import Paper from "../views/paper/index";
import Bank from "../views/paper/Bank.vue";
import Question from "../views/paper/questions/Question.vue";
import Add from "../views/paper/questions/Add.vue";
import Update from "../views/paper/questions/Update.vue";
import Exam from "../views/paper/Exam.vue";
import Info from "../views/info/index";
import MyInfo from "../views/info/MyInfo";
import Password from "../views/info/Password";
import EditMyInfo from "../views/info/EditMyInfo";
import { onUpdated } from "vue";

export default new VueRouter({
  mode: "hash",
  routes: [
    // 空路径直接跳转到home，
    // {
    //   path: "/",
    //   redirect: "/home",
    // },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/user",
      name: "user",
      component: User,
    },
    // 试题中心
    {
      path: "/paper",
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
          path: "editMyInfo",
          name: "editmyinfo",
          component: EditMyInfo,
        },
        {
          path: "password",
          name: "password",
          component: Password,
        },
      ],
    },
  ],
});
