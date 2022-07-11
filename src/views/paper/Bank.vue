<template>
  <div class="manage">
    <!-- 对话框 -->
    <div class="manage-header">
      <el-button type="primary" @click="addBank">
        <i class="el-icon-plus"></i>
        <span>新增</span>
      </el-button>

      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="搜索" v-model="searchForm.keyword"> </el-input>
        </el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="getList"
          circle
        ></el-button>
      </el-form>
    </div>
    <el-dialog
      :title="operateType === `add` ? `新增题库` : `编辑题库`"
      :visible.sync="isShow"
    >
      <el-form label-width="100px" v-model="operateForm">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入题库名称"
            v-model="operateForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input placeholder="请添加备注说明" v-model="operateForm.remark">
          </el-input>
        </el-form-item>

        <el-form-item><slot></slot></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <div class="table">
      <el-table :data="tableData" height="90%" stripe>
        <el-table-column prop="name" label="题库名称"> </el-table-column>
        <el-table-column prop="remark" label="备注信息"> </el-table-column>
        <el-table-column prop="createtime" label="创建时间"> </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <el-button size="mini" type="primary" @click="editBank">
            编 辑
          </el-button>
          <el-button size="mini" type="danger" @click="delBank">
            删 除
          </el-button>
        </el-table-column>
      </el-table>

      <!-- 这里是分页操作，还不太完整，先不用管 -->
      <!-- <el-pagination
        class="pager"
        layout="prev,pager,next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="28"
      ></el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "bank",
  data() {
    return {
      operateType: "add",
      isShow: false,
      // 操作用户信息表单，包括新增，编辑，共用一个对象，分别在addUser() 和editUser() 中实现赋值
      operateForm: {
        name: "",
        remark: "",
        createtime: "",
      },
      // 搜索框信息
      searchForm: {
        // keyword,
        keyword: "",
      },
      // 所有题库信息表单，这里是写死的，还需要从数据库中读取
      tableData: [
        {
          name: "默认题库",
          remark: "无备注",
          createtime: "2016-05-02",
        },
      ],

      // 分页有关参数，不用管
      config: {
        page: 1,
        toatl: 30,
      },
    };
  },
  methods: {
    // 确认提交处理函数，
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
    addBank() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        remark: "",
      };
    },
    // 编辑用户信息，可能需要传参，从数据库中读取原有数据信息并将其加在里面，在修改
    editBank() {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = {
        name: "原有",
        remark: "原有备注",
        createtime: "2016-05-02",
      };
    },
    delBank() {},
    // 搜索用户
    getList() {},
    // 分页操作
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