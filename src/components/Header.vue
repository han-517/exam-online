<template>
  <header>
    <!-- l-content：左边部分 -->
    <div class="l-content">
      <!-- plain:是否为朴素按钮 -->
      <el-button
        @click="collapse()"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- r-content：右边部分 -->
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <template>
            <router-link v-if="isStudent == false" :to="{ name: 'myinfo' }">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <router-link v-else :to="{ name: 'myinfo' }">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
          </template>

          <router-link :to="{ name: 'login' }">
            <el-dropdown-item>退出</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      isStudent: this.$store.state.isStudent,
      userImg: require("@/assets/images/user.png"),
    };
  },
  methods: {
    collapse() {
      this.$store.commit("COLLAPSE");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tabList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>