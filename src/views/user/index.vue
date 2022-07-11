<template>
  <div class="manage">
    <!-- 对话框 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">
        <i class="el-icon-plus"></i>
        <span>新增</span>
      </el-button>

      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="搜索内容" v-model="searchForm.keyword">
          </el-input>
        </el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="getList"
          circle
        ></el-button>
        <!-- <el-button type="primary" >搜索</el-button> -->
      </el-form>
    </div>
    <el-dialog
      :title="operateType === `add` ? `新增用户` : `编辑用户信息`"
      :visible.sync="isShow"
    >
      <el-form label-width="100px" v-model="operateForm" :inline="true">
        <el-form-item label="账号">
          <el-input
            placeholder="请输入账号"
            v-model="operateForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名" v-model="operateForm.name">
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select placeholder="请选择性别" v-model="operateForm.gender">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-input placeholder="请输入专业" v-model="operateForm.major">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="operateForm.email">
          </el-input>
        </el-form-item>

        <el-form-item><slot></slot></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- <table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></table> -->

    <div class="table">
      <el-table :data="tableData" height="90%" stripe>
        <el-table-column prop="id" label="账号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="gender" label="性别"> </el-table-column>
        <el-table-column prop="major" label="专业"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <el-button size="mini" type="primary" plain @click="editUser">
            编 辑
          </el-button>
          <el-button size="mini" type="danger" plain @click="delUser">
            删 除
          </el-button>
        </el-table-column>
      </el-table>

      <!-- 这里是分页操作，还不太完整，先不用管 -->
      <el-pagination
        class="pager"
        layout="prev,pager,next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="28"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      operateType: "add",
      isShow: false,
      // 操作用户信息表单，包括新增，编辑，共用一个对象，分别在addUser() 和editUser() 中实现赋值
      operateForm: {
        id: "",
        name: "",
        gender: "",
        major: "",
        email: "",
      },
      // 搜索框信息
      searchForm: {
        // keyword,
        keyword: "",
      },
      // 所有用户信息表单
      tableData: [
        {
          id: "15185912234",
          name: "田阿强",
          gender: "男",
          major: "软件工程",
          email: "3072592845@qq.com",
        },
        {
          id: "15185912234",
          name: "田阿强",
          gender: "男",
          major: "软件工程",
          email: "3072592845@qq.com",
        },
        {
          id: "15185912234",
          name: "田阿强",
          gender: "男",
          major: "软件工程",
          email: "3072592845@qq.com",
        },
        {
          id: "15185912234",
          name: "田阿强",
          gender: "男",
          major: "软件工程",
          email: "3072592845@qq.com",
        },
      ],

      config: {
        page: 1,
        toatl: 30,
      },
    };
  },
  methods: {
    // 确认提交处理函数
    confirm() {
      // if (this.operateType === "edit") {
      //   this.$http.post("user/edit", this.operateForm).then((res) => {
      //     this.isShow = false;
      //   });
      // } else {
      //   this.$http.post("user/add", this.operateForm).then((res) => {
      //     this.isShow = false;
      //   });
      // }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        id: "",
        name: "",
        gender: "",
        major: "",
        email: "",
      };
    },
    // 编辑用户信息，可能需要传参，将原有用户信息加在里面，在修改
    editUser() {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = {
        id: "原有账号",
        name: "原有",
        gender: "原有",
        major: "原有",
        email: "原有",
      };
    },
    delUser() {},
    // 搜索用户
    getList() {},
    changePage() {},
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>