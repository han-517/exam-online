<template>
  <div id="app">
    <el-container style="height: 100%">
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header style="height: 50px">
          <Header></Header>
        </el-header>
        <!-- Tag -->
        <Tag></Tag>
        <!-- 内容页面 -->
        <el-main>
          <!-- <div><hr /></div> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./components/Aside";
import Header from "./components/Header";
import Tag from "./components/Tag.vue";
export default {
  name: "App",
  components: {
    Aside,
    Header,
    Tag,
  },
};
</script>

<style lang="less" scoped>
html,
body {
  margin: 0;
  padding: 0;
  /* height: 100%; */
}
#app {
  height: 100%;
}
// .el-header {
//   background-color: #333;
// }
.el-main {
  padding-top: 0;
}
</style>