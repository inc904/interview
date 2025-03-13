1.看过axios源码吗
2.编码题
3.判断是否为有效括号
```js
function isValid(s){
const stack = [];
const map ={
};
for (let i=0;i<s.length;i++){if(map[s[i]]){
stack.push(map[s[i]]);} else {
if(stack.pop()!== s[i]){return false;
return stack.length === 0;
```
4. 数组转化为树

5. webpack对哪些loader，插件比较了解自己有写过loader和plugin吗

常用的webpackloader和插件包括:
Loaders:
babel-loader :用于转译ES6+代码。
css-loader:解析CSS文件。
style-loader:将CSS注入到DOM中
file-loader :处理文件导入(如图片、字体)
url-loader:类似于file-loader，但可以将较小的文件转换为base64
Plugins:
HtmlwebpackPlugin :生成HTML文件，并自动引入打包后的资源
CleanWebpackPlugin:在每次构建前清理输出目录。
MinicssExtractplugin:将CSS提取为单独文件
TerserPlugin:用于压缩JavaScript代码。
DefinePlugin:定义环境变量

6. 自己写过 plugin 或 loader 吗？
7.webpack如何把没有用到的文件删除掉
8.看过vue框架原理吗，说说你对vue的了解
9.原生js发送ajax请求的方法，流程(XMLHttpRequest)
10.前端安全防范措施，如何避免xss和csrf攻击
11.跨域常用解决方案
12.如何封装一个组件，要做什么准备(这里说的有点乱)
	封装一个组件需要以下准备
	1. 确定组件的功能和界面:明确组件的用途和设计。
	2. 定义组件的API:包括属性、事件和方法。
	3. 编写组件代码:使用Vue、React等框架创建组件
	4. 测试组件:编写单元测试，确保组件的功能正确
	5. 编写文档:提供使用指南和API说明


13.箭头函数和普通函数的区别
14.性能优化
15.有哪些常用调试技巧?
