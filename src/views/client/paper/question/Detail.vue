<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm" >
      <!-- 题目相关 -->
      <el-card>
        <el-form-item label="题目类型">
          <el-select disabled
            v-model="ruleForm.type"
            placeholder="请选择"
            class="filter-item"
            @change="handleTypeChange(ruleForm.type)">
            <el-option
              v-for="item in quTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属题库">
          <el-select disabled
            v-model="ruleForm.bankId"
            placeholder="请选择题库">
            <el-option 
              v-for="(bank, index) in BankList"
              :key="index"
              :label="bank.name"
              :value="bank.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业">
          <el-select disabled
            v-model="ruleForm.majorId"
            placeholder="请选择专业">
            <el-option 
              v-for="(major, index) in MajorList"
              :key="index"
              :label="major.name"
              :value="major.majorId"
              />
          </el-select>
        </el-form-item>
        <el-form-item label="题目内容">
          <el-input disabled
            type="textarea"
            style="width: 600px; font-size: 20px"
            rows="5"
            v-model="ruleForm.content"
          ></el-input>
        </el-form-item>
      </el-card>

      <!-- 答案相关 -->
      <div
        class="filter-container"
        style="margin-top: 25px"
      >
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          size="small"
          plain
          @click="handleAdd"
          v-if="ruleForm.type === 4"
        >
          添加答案
        </el-button>
        <!-- 单选题答案框 -->
        <el-table
          ref="singleTable"
          :data="ruleForm.answerList"
          :border="true"
          style="width: 100%"
          v-if="ruleForm.type === 0"
        >
          <el-table-column label="答案选项" prop="opname" width="120" align="center"></el-table-column>
          <el-table-column label="答案内容">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.content" type="textarea" />
            </template>
          </el-table-column>
          
        </el-table>
        <!-- 多选题答案框 -->
        <el-table
          ref="mutiTable"
          :data="ruleForm.answerList"
          :border="true"
          style="width: 100%"
          v-if="ruleForm.type === 1"
        >
          <el-table-column label="答案选项" width="120" align="center">
            <template slot-scope="scope">
              {{scope.row.opname}}
            </template>
          </el-table-column>

          <el-table-column label="答案内容">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.content" type="textarea" />
            </template>
          </el-table-column>
        </el-table>

        <!-- 简答题答题框 -->
        <el-card v-if="ruleForm.type === 3">
          <template>
            <p></p>
            <el-input disabled
              v-model="ruleForm.optionA" 
              type="textarea"
              style="width: 800pxpx; font-size: 20px"
              rows="5"
            />
          </template>
        </el-card>
      </div>
      <br/>
      <div v-if="ruleForm.type !== 3">
        答案：<el-input disabled v-model="Answer"></el-input>
      </div>
      <br/>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button type="info" @click="onCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      // 题目相关内容
      ruleForm: {},
      quTypes: [
        {
          value: 0,
          label: "单选题",
        },
        {
          value: 1,
          label: "多选题",
        },
        {
          value: 2,
          label: "判断题",
        },
        {
          value: 3,
          label: "简答题"
        }
      ],
      rules: {
        content: [
          { required: true, message: "请输入题目内容", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择一个题目类型", trigger: "change" },
        ],
        bank: [{ required: true, message: "请选择一个题库", trigger: "blur" }],
        major: [{ required: true, message: "请选择一个专业", trigger: "blur" }],
      },
      BankList: [],
      MajorList: [],
    };
  },
  methods: {
    // 根据题型，生成默认答案选项
    // 判断题两个选项，单选、多选四个选项
    handleTypeChange(v) {
      this.ruleForm.answerList = [];
      if (v === 2) {
        
      }
      else if (v === 0) {
        this.ruleForm.answerList.push({
          opname: "选项A",
          content: this.ruleForm.optionA,
          id: 1
        });
        this.ruleForm.answerList.push({
          opname: "选项B",
          content: this.ruleForm.optionB,
          id: 2
        });
        this.ruleForm.answerList.push({
          opname: "选项C",
          content: this.ruleForm.optionC,
          id: 4
        });
        this.ruleForm.answerList.push({
          opname: "选项D",
          content: this.ruleForm.optionD,
          id: 8
        });
      }
      else if (v === 1) {
        this.ruleForm.answerList.push({
          opname: "选项A",
          content: this.ruleForm.optionA,
          checked: Boolean(this.ruleForm.answerId & 1)
        });
        this.ruleForm.answerList.push({
          opname: "选项B",
          content: this.ruleForm.optionB,
          checked: Boolean(this.ruleForm.answerId & 2)
        });
        this.ruleForm.answerList.push({
          opname: "选项C",
          content: this.ruleForm.optionC,
          checked: Boolean(this.ruleForm.answerId & 4)
        });
        this.ruleForm.answerList.push({
          opname: "选项D",
          content: this.ruleForm.optionD,
          checked: Boolean(this.ruleForm.answerId & 8)
        });
      }
    },
    // 添加答案子项
    handleAdd() {
      this.ruleForm.answerList.push({
        isRight: false,
        content: "",
        analysis: "",
      });
    },

    // 移除答案子项
    removeItem(index) {
      this.ruleForm.answerList.splice(index, 1);
    },

    // 提交按钮
    submitForm() {
      // console.log(this.ruleForm)
      if(this.ruleForm.type === 0){
        var data = this.$refs.singleTable.tableData
        this.ruleForm.optionA = data[0].content
        this.ruleForm.optionB = data[1].content
        this.ruleForm.optionC = data[2].content
        this.ruleForm.optionD = data[3].content
      }
      else if(this.ruleForm.type === 1){
        var data = this.$refs.mutiTable.tableData
        this.ruleForm.optionA = data[0].content
        this.ruleForm.optionB = data[1].content
        this.ruleForm.optionC = data[2].content
        this.ruleForm.optionD = data[3].content
      }
      axios.get(`examination/question/update?id=${this.ruleForm.id}&content=${this.ruleForm.content}&optionA=${this.ruleForm.optionA}&optionB=${this.ruleForm.optionB}&optionC=${this.ruleForm.optionC}&optionD=${this.ruleForm.optionD}&answerId=${this.ruleForm.answerId}&bankId=${this.ruleForm.bankId}&majorId=${this.ruleForm.majorId}&remark=${this.ruleForm.remark}&type=${this.ruleForm.type}`)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
      this.onCancel()
    },

    // 取消保存，返回按钮
    onCancel() {
      this.$router.push({ name: "question" });
    },

    handleCurrentChange(val) {
      this.ruleForm.answerId = val.id
      var data = this.$refs.singleTable.tableData
      this.ruleForm.optionA = data[0].content
      this.ruleForm.optionB = data[1].content
      this.ruleForm.optionC = data[2].content
      this.ruleForm.optionD = data[3].content
    },

    MutiCheck(selection) {
      // console.log(selection)
      var num = 0
      this.ruleForm.answerList.forEach((element, index) => {
        if(element.checked) num += 1 << index
      })
      this.ruleForm.answerId = num
      var data = this.$refs.mutiTable.tableData
      this.ruleForm.optionA = data[0].content
      this.ruleForm.optionB = data[1].content
      this.ruleForm.optionC = data[2].content
      this.ruleForm.optionD = data[3].content
    }

    // // 重置
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
  mounted(){
    axios
      .get("examination/getAllMajorServlet")
      .then((response) => {
        this.MajorList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("examination/getAllBankNameServlet")
      .then((response) => {
        this.BankList = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.ruleForm = this.$route.params.data
    this.handleTypeChange(this.ruleForm.type)

    // console.log(this.ruleForm) // debug
  },
  computed: {
    Answer(){
      var res = ''
      var num = this.ruleForm.answerId
      if(this.ruleForm.type === 1 || this.ruleForm.type === 0){
        if(num & 1) res += 'A'
        if(num & 2) res += 'B'
        if(num & 4) res += 'C'
        if(num & 8) res += 'D'
      }
      else if(this.ruleForm.type === 2){
        if(num === 0) res = '错'
        if(num === 16) res = '对'
      }
      else if(this.ruleForm.type === 3){
        res = this.ruleForm.optionA
      }
      return res
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 350px;
}
</style>