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
      <el-table :data="banklist" height="90%" stripe>
        <el-table-column prop="name" label="题库名称"> </el-table-column>
        <el-table-column prop="remark" label="备注信息"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editBank(scope.row)">
              编 辑
            </el-button>
            <el-button size="mini" type="danger" @click="delBank(scope.row)">
              删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "bank",
  data() {
    return {
      operateType: "add",
      isShow: false,
      // 操作用户信息表单，包括新增，编辑，共用一个对象，分别在addUser() 和editUser() 中实现赋值
      operateForm: {
        id: "",
        name: "",
        remark: "",
        createTime: "",
      },
      // 搜索框信息
      searchForm: {
        // keyword,
        keyword: "",
      },
      banklist: [],
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
      if (this.operateType === "edit") {
        axios.get(`examination/updateBankServlet?name=${this.operateForm.name}&remark=${this.operateForm.remark}&id=${this.operateForm.id}`)
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        axios.get(`examination/addBankServlet?name=${this.operateForm.name}&remark=${this.operateForm.remark}&createTime=${this.operateForm.createTime}`)
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
      }
      this.isShow = false
      this.BankList()
    },
    addBank() {
      this.isShow = true;
      this.operateType = "add";
      var time = new Date()
      this.operateForm = {
        name: "",
        remark: "",
        createTime: `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
      }
    },
    // 编辑题库信息，可能需要传参，从数据库中读取原有数据信息并将其加在里面，在修改
    editBank(row) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = {
        id: row.id,
        name: row.name,
        remark: row.remark,
        createTime: row.createTime,
      }
    },
    delBank(row) {
      // this.operateForm = {
      //   id: row.id,
      //   name: row.name,
      //   remark: row.remark,
      //   createTime: row.createTime,
      // }
      axios.get(`examination/deleteBankServlet?name=${row.name}`)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
      this.BankList()
    },
    // 搜索用户
    getList() {},
    // 分页操作
    changePage() {},
    BankList(){
      axios.get('examination/getAllBankNameServlet')
      .then(response => {
        this.banklist = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted(){
    this.BankList()
  }
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table {
  height: 100%;
}
.manage {
  margin: 0;
  padding: 0;
  height: 97%;
}
</style>