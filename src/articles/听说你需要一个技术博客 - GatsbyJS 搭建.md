---
title: '听说你需要一个技术博客 - GatsbyJS 搭建'
date: '2021-07-23'
author: 'Nodreame'
tag: 'GatsbyJS'
---

# 听说你需要一个技术博客 - GatsbyJS 搭建

Gatsbyjs 官方的文档详细且通用，但是略显繁琐，现在针对搭建团队技术博客来写写怎么快速入门到完成部署

如果想要自己学习使用建议从这里开始：<https://www.gatsbyjs.cn/tutorial/part-zero/>

## 零、前置

前置环境：NodeJS（8.0.0+） 、Git、 Xcode 命令行工具（Mac）

建议编辑器配置：VSCode + Prettier 插件 （参考：[安装 Prettier 插件](https://www.gatsbyjs.cn/tutorial/part-zero/#%E5%AE%89%E8%A3%85-prettier-%E6%8F%92%E4%BB%B6)）

全局安装 Gatsby：`npm install -g gatsby-cli` 或者 `yarn global add gatsby-cli`

查 Gatsby 所支持的指令：`gatsby --help`

TodoList：

- [ ] 使用 GatsbyJSCLI 创建项目，并部署到 Github Page 上
- [ ] 创建数篇 Markdown 博文，成功读取并按照时间生成列表，点击进入可以阅读博文
- [ ] 优化样式: 使用主题
- [ ] 增加能力：
  - Lighthouse 检查 => PWA (mainfest & Service Worker)
  - SEO
  - 增加 RSS 订阅

## 一、弹射起步

### 1. 创建项目

依次执行以下命令完成项目创建及本地运行：

```
# 创建项目（hello 改为项目名）
gatsby new hello https://github.com/gatsbyjs/gatsby-starter-hello-world
cd hello
gatsby develop # 运行本地服务器
```

运行后可以看到已经启动了网站 & 对应的 GraphQL 页面，不懂不要急，先继续走下去~

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ab61d1953694ac7b41540b69b98e161~tplv-k3u1fbpfcp-watermark.image)

如果想要增加页面，可以在 src/page 中直接添加文件，无需配置路由即可看到页面（可在 src 编码获得想要的效果）：

![截屏2021-07-23 上午10.07.08-side.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55c33d12120a4e40ad26baf1aab4e088~tplv-k3u1fbpfcp-watermark.image)

### 2. 部署在 Github Page 上

## 二、博客的优化

- 页面读取配置:
  - [ ] Why: 通过 Graphql 查询：页面可以进行页面查询、非页面组件（例如 Layout）可以用 StaticQuery
  - 不通过 Graphql 查询：Gatsby without GraphQL

### 1. 读取文件列表

想要实现一个 Markdown 博客站点，读取项目中文件是基础功能，现在按照官网的教程读取：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3052ff7bcc9b42ebb34cba6222f2e4f7~tplv-k3u1fbpfcp-watermark.image)

发现读取不到内容，再次阅读文档了解到需要安装"文件系统源插件"来从文件系统中获取数据.

添加 gatsby-source-filesystem 插件，用以读取文件信息：

```bash
yarn add gatsby-source-filesystem
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33b94d795a1c470ab45e3ef508a93734~tplv-k3u1fbpfcp-watermark.image)

重启本地服务器（`yarn develop`）, 可以查找数据了：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c5649fc027b4b0e871d39ed11c98cdf~tplv-k3u1fbpfcp-watermark.image)

### 2. 读取 Markdown 文件列表
