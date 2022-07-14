1. vue create vue-manage

2. 安装element-ui：npm i element-ui -S

   ```javascript
   //main.js中全局引入
   import ElementUI from 'element-ui';
   import 'element-ui/lib/theme-chalk/index.css';
   
   Vue.use(ElementUI);
   ```

   ```json
   //按需引入
   //借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。首先，安装 babel-plugin-component：
   //命令：npm install babel-plugin-component -D
   
   ```

   官网地址：https://element.eleme.cn/#/zh-CN/component/quickstart

3. 路由使用：yarn add vue-router 或 npm i vue-router@3.2.0

   ```js
   //引入路由
   import router from './router'
   ```

4. 下载less和less-loader

5. 下载vuex

6. yarn add axios

```js
dataSource: {
      type: Object,
      default: () => {
        return {
          //试卷ID
          paperId: "",
          //试卷名称
          paperName: "",
          //题目集合
          list: [
            {
              //题目类型 1.单选题 2.多选题 3.判断题
              type: null,
              //题号
              no: null,
              //题目
              subject: "",
              //答案集合
              answers: [
                {
                  //答案序号
                  no: "",
                  //答案
                  answer: "",
                },
              ],
            },
          ],
        };
      },
    },
```





