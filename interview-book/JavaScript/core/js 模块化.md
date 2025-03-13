# js 模块化

## 模块化的定义

- 模块化是将复杂程序分解为独立功能单元的方法。
- 核心目标是通过将代码拆分为独立的、可复用的模块，来提高代码的可维护性、可扩展性、性能。

1. 早期方案

- 全局函数
- namespace 模式
- IIFE

2. 规范阶段

- commonjs
  - node.js 的默认模块系统，使用 require 和 module.exports,支持同步加载，但不适用于浏览器
- AMD/CMD
  - requirejs 和 seajs，支持异步加载，但需要额外配置，不支持浏览器
  - CMD 模式，更强调按需加载，常用于浏览器环境
- ES6 modules
  - 统一模块规范，支持同步加载和异步加载，支持浏览器
  - 原生模块系统，通过 import 和 export 关键字，支持浏览器和 node.js
