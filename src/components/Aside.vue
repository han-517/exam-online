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
      {{ isCollapse ? "Java" : "在线考试系统-java" }}
    </h3>
    <!-- 只有一级目录的 -->
    <el-menu-item @click="clickMenu(menu[0])" index="1">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item @click="clickMenu(menu[1])" index="2">
      <i class="el-icon-s-promotion"></i>
      <span>用户管理</span>
    </el-menu-item>
    <!-- 含有二级目录 -->
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-help"></i>
        <span>试题中心</span>
      </template>
      <el-menu-item @click="clickMenu(menu[2].children[0])" index="3-1">
        <i class="el-icon-folder-opened"></i>
        题库管理
      </el-menu-item>
      <el-menu-item @click="clickMenu(menu[2].children[1])" index="3-2">
        <i class="el-icon-tickets"></i>
        试题管理
      </el-menu-item>
      <el-menu-item @click="clickMenu(menu[2].children[2])" index="3-3">
        <i class="el-icon-s-data"></i>
        考试管理
      </el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>个人中心</span>
      </template>
      <el-menu-item @click="clickMenu(menu[3].children[0])" index="4-1">
        <i class="el-icon-postcard"></i>
        个人信息
      </el-menu-item>
      <el-menu-item @click="clickMenu(menu[3].children[1])" index="4-2">
        <i class="el-icon-edit"></i>
        编辑个人信息
      </el-menu-item>
      <el-menu-item @click="clickMenu(menu[3].children[2])" index="4-3">
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
          path: "/home",
          name: "home",
          label: "首页",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
        },
        {
          label: "试题中心",
          children: [
            {
              path: "/paper/bank",
              name: "bank",
              label: "题库管理",
            },
            {
              path: "/paper/question",
              name: "question",
              label: "题库管理",
            },
            {
              path: "/paper/exam",
              name: "exam",
              label: "考试管理",
            },
          ],
        },
        {
          label: "个人中心",
          children: [
            {
              path: "/info/myinfo",
              name: "myinfo",
              label: "个人信息",
            },
            {
              path: "/info/editmyinfo",
              name: "editmyinfo",
              label: "编辑个人信息",
            },
            {
              path: "/info/password",
              name: "password",
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
    // 没有子项目
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
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
// .el-menu-item-group__title {
//   padding: 0 !important;
// }
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