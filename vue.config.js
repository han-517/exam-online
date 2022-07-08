const { defineConfig } = require("@vue/cli-service");
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig(
{
  transpileDependencies: true,
	lintOnSave: process.env.NODE_ENV !== 'production', //关闭语法检查

  // 路径设置
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', resolve('src'))
    //格式.set('', resolve(''))
  },
  
  //开启代理服务器
	devServer: {
    proxy: 'http://47.113.225.80:8080/',
  }, 

  //build配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  publicPath: './',
  assetsDir: 'static',


});
