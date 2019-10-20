const modifyVars = require("./modifyVars.js");
const {
  override,
  addDecoratorsLegacy, // @装饰器
  fixBabelImports, // antd按需加载
  addLessLoader // 用less变量覆盖antd默认主题
} = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    // style: "css"
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: { "@primary-color": "#1DA57A" } // 蓝->绿
    modifyVars // 自定义主题文件
  }),
  addDecoratorsLegacy()
);
