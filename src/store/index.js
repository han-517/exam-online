//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//引用Vuex
Vue.use(Vuex);

//在methods中定义的函数使用：this.$store.dispatch('action中的方法名',数据)调用action
const actions = {
  //响应组件中加的动作
  //context：含有commit函数
  collapse(context) {
    console.log("actions中的collapse被调用了");
    // context.state.sum
    context.commit("COLLAPSE");
  },
};

//初始化数据
const state = {
  isCollapse: false,
  tabList: [
    {
      path: "/home",
      name: "home",
      label: "首页",
      icon: "home",
    },
  ],
  currentMenu: null,
  isStudent: false,
};

const mutations = {
  // 展开/隐藏侧边栏
  COLLAPSE(state) {
    // console.log('mutations中的JIA被调用了',state,value)
    state.isCollapse = !state.isCollapse;
  },
  isStudent(state, val) {
    // console.log('mutations中的JIA被调用了',state,value)
    state.isStudent = val;
  },
  // 面包屑
  selectMenu(state, val) {
    if (val.name !== "home") {
      //不是首页
      state.currentMenu = val;
      const result = state.tabList.findIndex((item) => item.name === val.name);
      if (result === -1) {
        state.tabList.push(val);
      }
    } else {
      //是首页
      state.currentMenu = null;
    }
  },
  //关闭面包屑
  closeTag(state, val) {
    const result = state.tabList.findIndex((item) => item.name === val.name);
    state.tabList.splice(result, 1);
  },
};

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});

//在methods中定义的函数使用：this.$store.dispatch调用action
