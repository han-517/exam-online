<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :inline="true"
    >
      <!-- 题目相关 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>填写试卷相关信息</span>
        </div>
        <el-form-item label="试卷名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            style="width: 350px"
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item label="单选题数" prop="singleNum">
          <el-input
            v-model.number="ruleForm.singleNum"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="多选题数" prop="multiNum">
          <el-input v-model.number="ruleForm.multiNum" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="判断题数" prop="judgeNum">
          <el-input
            v-model.number="ruleForm.judgeNum"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="简答题数量" prop="brieflyNum">
          <el-input
            v-model.number="ruleForm.brieflyNum"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-select
          v-model="ruleForm.majors"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择专业">
          <el-option
            v-for="item in MajorList"
            :key="item.majorId"
            :label="item.name"
            :value="item.majorId">
          </el-option>
        </el-select>
        
      </el-card>

      <div style="margin-top: 20px">
        <el-button type="primary" @click="submitForm">确定生成</el-button>
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
      userid: '',

      // 题目相关内容
      ruleForm: {
        name: "",
        singleNum: undefined,
        multiNum: undefined,
        judgeNum: undefined,
        brieflyNum: undefined,
        majors: []
      },
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        majors: [
          {
            type: "array",
            required: true,
            message: "请至少专业",
            trigger: "change",
          },
        ],
      },
      
      MajorList: [],
    };
  },
  methods: {
    // 提交按钮
    submitForm() {
      axios.get(`examination/paper/add?judgeNum=${this.ruleForm.judgeNum}&mulNum=${this.ruleForm.multiNum}&singleNum=${this.ruleForm.singleNum}&brieflyNum=${this.ruleForm.brieflyNum}&name=${this.ruleForm.name}&userId=${this.userid}&majorId=${this.majorstr}`)
      .then(response => {
        this.$notify({
          title: '生成试卷成功',
          message: '即将跳转到答题卡',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
          name: "examCard",
          params: {
            paperId: response.data['paperId']
          }
        })}, 500)
      })
      .catch(err => {
        this.$notify.error({
          title: '生成失败',
          message: '题库数量不足，请重试'
        })
      })
      
    },

    // 取消保存，返回按钮
    onCancel() {
      this.$router.push({ name: "uquestion" });
    },
  },
  mounted() {
    this.userid = this.$store.state.id
    axios.get("examination/getAllMajorServlet")
    .then((response) => {
      this.MajorList = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  computed: {
    majorstr(){
      var res = ''
      for(let i = 0; i < this.ruleForm.majors.length - 1; ++i){
        res += (this.ruleForm.majors[i] + ',')
      }
      res += this.ruleForm.majors[this.ruleForm.majors.length - 1]
      return res
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 100px;
}
</style>>