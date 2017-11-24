用antd、mobx、react-router搭的框架，可用于开发内部系统

feature：
- 封装了基于fetch的数据请求方法，包含GET/POST两种请求
- 提供了一套较优雅的基于mobx的数据管理方案，并封装了mobx数据更新的log打印方法
- 封装了表单的双向绑定的方法，包括提交参数收集，方便扩展表单功能，例如：多个表单项的联动等
- 代码按路由拆分，按需加载
- 具备简单的mock功能，只需json数据就可进行本地开发
- 带完整webpack本地开发和打包的配置，支持es2015、less、antd组件样式的按需加载等功能

## 结构介绍

```
.
├── dist
│   ├── mocks // mock数据
│   └── build 打包目录
├── src
│   ├── img // 图片资源
│   ├── components // 公用组件
│   ├── pages
│   │   ├── App.js // 界面js
│   │   ├── MainPage.js // 首页
│   │   ├── TestPage.js // demo页
│   │   ├── testPage.less // demo页的样式
│   │   ├── NotFound.js // notFound页
│   │   └── ErrorPage
│   ├── store
│   │   ├── commonRequest.js // 页面公用数据对应的store改变方法
│   │   ├── mobxReaction.js // mobx数据更改时的log方法
│   │   ├── setAttr.js // 表单项双向绑定的方法
│   │   └── TestPage.js // TestPage页面对应的store
│   ├── utils
│   │   ├── request.js //封装的fetch方法
│   │   ├── getParams.js //计算表单参数的方法
│   │   └── config.js // 全局的配置，包括api的路径等
│   └── index.js // 入口文件
├── tools
│   ├── build.js //打包脚本
│   └── postcss.config.js // postcss的配置文件
└── webpack.config.js // webpack配置文件
```

本地开发

`$ yarn start # localhost:8080查看`

打包

`$ yarn build -- --release`