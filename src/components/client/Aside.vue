<template>
  <!-- 这里我没有使用for循环，而是一个个列出来的 -->
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#ffd04b"
  >
    <h3 style="height: 50px">
      {{ isCollapse ? "客户" : "客户端系统-java" }}
    </h3>
    <!-- 只有一级目录的 -->
    <el-menu-item @click="clickMenu(menu[0])" index="1">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <!-- 含有二级目录 -->
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-help"></i>
        <span>试题管理</span>
      </template>
      <el-menu-item @click="clickMenu(menu[1].children[0])" index="2-1">
        <i class="el-icon-tickets"></i>
        题目中心
      </el-menu-item>
      <el-menu-item @click="clickMenu(menu[1].children[1])" index="2-2">
        <i class="el-icon-s-data"></i>
        考试管理
      </el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>个人中心</span>
      </template>
      <el-menu-item @click="clickMenu(menu[2].children[0])" index="3-1">
        <i class="el-icon-postcard"></i>
        个人信息
      </el-menu-item>
      <el-menu-item @click="clickMenu(menu[2].children[1])" index="3-2">
        <i class="el-icon-edit"></i>
        修改密码
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/client/home",
          name: "uhome",
          label: "首页",
        },
        {
          label: "试题管理",
          children: [
            {
              path: "/client/paper/question",
              name: "uquestion",
              label: "题目中心",
            },
            {
              path: "/client/paper/exam",
              name: "uexam",
              label: "考试管理",
            },
          ],
        },
        {
          label: "个人中心",
          children: [
            {
              path: "/client/info/myinfo",
              name: "umyinfo",
              label: "个人信息",
            },
            {
              path: "/client/info/password",
              name: "upassword",
              label: "修改密码",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      console.log(item.name);
      this.$router.push({
        name: item.name,
      });

      this.$store.commit("selectMenu", item);
    },
  },

  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>


<style lang="less" scoped>
.background {
  background-color: #1f2d3d;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  margin: 0px;
  height: 100%;
  border: none;
  padding: 0 !important;
  h3 {
    margin: 0px;
    color: #fff;
    text-align: center;
    line-height: 48px;
    background-color: #2b2f3a;
  }
}
</style>