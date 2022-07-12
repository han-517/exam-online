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



