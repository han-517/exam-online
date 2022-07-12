<template>
  <div id="manager">
    <el-container style="min-height: 100vh">
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
import Aside from "@/components/client/Aside.vue";
import Header from "@/components/Header.vue";
import Tag from "@/components/Tag.vue";
export default {
  name: "Manager",
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
  margin: 0px;
  padding: 0;
  /* height: 100%; */
}
#manager {
  height: 100%;
}
// .el-header {
//   background-color: #333;
// }
.el-main {
  padding-top: 0;
}
</style>