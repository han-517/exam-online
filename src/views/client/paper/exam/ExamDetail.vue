<template>
  <div>
    <!-- 答题卡左边侧边栏 -->
    <div ref="paperLeft" class="paper-left">
      <!-- 标题 -->
      <div class="paper-title">
        <h1><i class="el-icon-s-grid"></i>答题卡-{{ dataSource.paperName }}</h1>
      </div>
      <el-collapse>
        <el-collapse-item
          v-for="item in convertDatas"
          :name="item.code"
          :key="item.code"
        >
          <template slot="title">
            <h2>{{ item.name }}</h2>
            <span>共{{ item.count }}题</span>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 答题卡主题部分 -->
    <div ref="paperContent" class="paper-content">
      <div class="subject" v-for="(item, index) in convertDatas" :key="index">
        <!-- 总览，判断题：共..题 -->
        <div class="subject-title">
          <h2>{{ item.name }}</h2>
          <span>（共 {{ item.count }} 题）</span>
        </div>

        <!-- for循环：每道题一个卡片 -->
        <el-card
          class="box-card"
          v-for="(sub, index) in item.childs"
          :id="item.code + (index + 1)"
          :key="index"
        >
          <!-- 列出题目 -->
          <div slot="header" class="clearfix">
            <el-tag effect="dark"> {{ sub.no }} </el-tag>
            <span> {{ sub.context }}</span>
          </div>
          <!-- 列出答案 -->
          <el-radio-group v-if="item.type === 0" v-model="sub.examineAnswer">
            <el-radio
              :disabled="disabledAnswer"
              v-for="(o, index) in sub.answers"
              class="answer-radio"
              :label="1 << index"
              :key="index"
              >{{ o.answer }}</el-radio
            >
          </el-radio-group>
          <el-checkbox-group v-if="item.type === 1" v-model="sub.examineAnswer">
            <el-checkbox
              :disabled="disabledAnswer"
              v-for="(o, index) in sub.answers"
              class="answer-checkbox"
              :label="1 << index"
              :key="index"
              >{{ o.answer }}</el-checkbox
            >
          </el-checkbox-group>
          <el-radio-group v-if="item.type === 2" v-model="sub.examineAnswer">
            <el-radio
              :disabled="disabledAnswer"
              :label="16"
              class="answer-radio"
              >A.对</el-radio
            >
            <el-radio :disabled="disabledAnswer" :label="0" class="answer-radio"
              >B.错</el-radio
            >
          </el-radio-group>

          <el-input
            :disabled="disabledAnswer"
            v-if="item.type === 3"
            type="textarea"
            style="width: 600px; font-size: 15px"
            rows="3"
            placeholder="请输入答案"
            v-model="sub.examineAnswer"
          ></el-input>

          <div class="subject-remark">
            <div class="item">
              <span class="title">正确答案：</span>
              <!-- <span>{{ converAnswerStr(sub.correctAnswer) }}</span> -->
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- <div class="paper-footer">
      <el-button type="success" @click="onCancel">返回考试列表</el-button>
    </div> -->
  </div>
</template>

<script>
import { Loading } from "element-ui";
import axios from "axios";
export default {
  name: "examinationPaper",
  props: {
    //数据源
    //试卷类型 1 考试 2 查看
    type: {
      type: Number,
      default: 1,
    },
    dataSource: {
      type: Object,
      default: () => {
        return {
          //试卷名称
          paperName: "",
        };
      },
    },
  },
  data() {
    return {
      //组装后数据集
      disabledAnswer: true,
      convertDatas: [],
      paperId: "",
      origindata: {},
    };
  },
  methods: {
    onCancel() {
      this.$router.push({ name: "uexam" });
    },
  },
  mounted() {
    this.paperId = this.$route.params.paperId;
    // this.paperId = 23
    let load = Loading.service({
      text: "正在加载，请稍等...",
    });
    axios
      .get(`examination/paper/search?paperId=${this.paperId}`)
      .then((response) => {
        this.origindata = response.data;
        this.convertDatas = [];

        var res = {
          type: 0,
          name: "单选题",
          code: "single",
          // 题数量
          count: response.data["单选题"].length,
          childs: [],
        };
        response.data["单选题"].forEach((el, index) => {
          res.childs.push({
            no: index + 1,
            context: el.content,
            answers: [
              { answer: `A. ${el.optionA}` },
              { answer: `B. ${el.optionB}` },
              { answer: `C. ${el.optionC}` },
              { answer: `D. ${el.optionD}` },
            ],
            answerId: el.answerId,
            examineAnswer: undefined,
          });
        });
        this.convertDatas.push(res);

        var res = {
          type: 1,
          name: "多选题",
          code: "mul",
          // 题数量
          count: response.data["多选题"].length,
          childs: [],
        };
        response.data["多选题"].forEach((el, index) => {
          res.childs.push({
            no: index + 1,
            context: el.content,
            answers: [
              { answer: `A. ${el.optionA}` },
              { answer: `B. ${el.optionB}` },
              { answer: `C. ${el.optionC}` },
              { answer: `D. ${el.optionD}` },
            ],
            answerId: el.answerId,
            examineAnswer: [],
          });
        });
        this.convertDatas.push(res);

        var res = {
          type: 2,
          name: "判断题",
          code: "judge",
          // 题数量
          count: response.data["对错题"].length,
          childs: [],
        };
        response.data["对错题"].forEach((el, index) => {
          res.childs.push({
            no: index + 1,
            context: el.content,
            answerId: el.answerId,
            examineAnswer: undefined,
          });
        });
        this.convertDatas.push(res);

        var res = {
          type: 3,
          name: "简答题",
          code: "shortAnswer",
          // 题数量
          count: response.data["简答题"].length,
          childs: [],
        };
        response.data["简答题"].forEach((el, index) => {
          res.childs.push({
            no: index + 1,
            context: el.content,
            answers: el.optionA,
            examineAnswer: "",
          });
        });
        this.convertDatas.push(res);
      })
      .catch({})
      .finally(() => {
        load.close();
      });
  },
};
</script>

<style scoped>
.paper-main {
  margin: 10px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.subject-remark {
  background: #f7f7f7;
}
.subject-remark .item {
  display: block;
  padding: 5px;
}
.subject-remark .title {
  font-weight: bold;
}
.paper-header {
  width: 100%;
  height: 60px;
  background-color: #f7f7f7;
  position: absolute;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.paper-left {
  position: absolute;
  padding: 10px;
  left: 200px;
  top: 100px;
  bottom: 0;
  width: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #e4e4e4;
  border-top: none;
}

.paper-content {
  position: absolute;
  left: 450px;
  top: 100px;
  right: 0px;
  bottom: 45px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #e4e4e4;
  border-top: none;
}

.paper-footer {
  position: absolute;
  padding: 5px 10px;
  left: 450px;
  right: 0;
  bottom: 0px;
  height: 45px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f7f7f7;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.paper-title {
  padding-left: 10px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #f7f7f7;
}

.paper-title h1 {
  font-size: 1.2em;
  margin: 0;
}

.downTime {
  color: rgb(230, 93, 110);
  font-size: 16px;
  font-weight: bold;
}
.answer-button {
  padding: 0px;
  color: #0a0a0a;
  background-color: #ffffff;
  border-color: #e4e4e4;
  margin-left: 10px;
  width: 30px;
  height: 30px;
}
.answer-button:hover {
  background: #ecf1ef;
  border-color: #e4e4e4;
  color: #0a0a0a;
}
.answer-button-check {
  background: #13ce66;
  border-color: #30b08f;
}

.answer-radio {
  display: block;
  margin: 5px 0px;
}

.answer-checkbox {
  display: block;
  margin: 5px 0px;
}

.subject-title {
  padding-left: 10px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #f7f7f7;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.subject-title h2 {
  font-size: 16px;
  display: inline-block;
}
.subject-title span {
  font-size: 16px;
  display: inline-block;
}

.el-radio >>> .el-radio__input.is-checked .el-radio__inner {
  background-color: #13ce66;
  border-color: #13ce66;
}

.el-radio-button >>> .el-radio-button__inner {
  padding: 10px;
}

.el-collapse-item h2 {
  width: 150px;
  font-size: 14px;
  display: inline-block;
}
.el-form--label-top >>> .el-form-item__label {
  float: none;
  display: inline-block;
  text-align: left;
  padding: 0px;
}

.el-card {
  margin: 10px;
}

.el-card >>> .el-card__header {
  background-color: #ffffff;
  padding: 0px 10px;
  line-height: 35px;
  font-size: 16px;
}
.el-card >>> .el-card__body {
  padding: 5px 10px;
}
</style>

