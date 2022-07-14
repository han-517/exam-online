const { defineConfig } = require("@vue/cli-service");

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },

  //开启代理服务器
  devServer: {
    proxy: {
      'examination': {// 匹配所有以 '/examination'开头的请求路径
        target: 'http://47.113.225.80:8080/',// 代理目标的基础路径
        changeOrigin: true,
        // pathRewrite: {'^/examination': ''}
      }
    }
  },

  //build配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      config["performance"] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000,
      };
    }
  },
  publicPath: "./",
  assetsDir: "static",
});
