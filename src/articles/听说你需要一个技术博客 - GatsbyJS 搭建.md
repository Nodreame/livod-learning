---
title: '听说你需要一个技术博客 - GatsbyJS 搭建'
date: '2021-07-23'
author: 'Nodreame'
tag: 'GatsbyJS'
---

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

### 0. 前置

准备两个 Markdown 文件加入 `src/articles` 目录，随便写点内容方便后续读取.

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44a5f5af16b04078840b9819ea2a1d16~tplv-k3u1fbpfcp-watermark.image)

### 1. 读取文件列表

想要实现 Markdown 博客站点，读取项目中文件是基础功能，现在按照官网的教程读取：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3052ff7bcc9b42ebb34cba6222f2e4f7~tplv-k3u1fbpfcp-watermark.image)

发现读取不到内容，再次阅读文档了解到需要安装"文件系统源插件"来从文件系统中获取数据.

添加 gatsby-source-filesystem 插件：

```bash
yarn add gatsby-source-filesystem
```

配置文件读取目录:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33b94d795a1c470ab45e3ef508a93734~tplv-k3u1fbpfcp-watermark.image)

重启本地服务器（`yarn develop`）, 可以查找数据了：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59465a65c93b44f2bbe1d84cb02edc4c~tplv-k3u1fbpfcp-watermark.image)

### 2. 展示 Markdown 文件列表

博客项目不需要展示 Markdown 文章之外的文件信息，且最好能够读取 Markdown 文件内部的时间、作者、Tag、简要内容用于列表展示.

于是现在文章中补全一些文章相关信息：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7faaa0d0684409e8410157ba2bc0ea1~tplv-k3u1fbpfcp-watermark.image)

想要做到读取文件内的数据，需要"数据转换插件"的支持, 对于 Markdown 文章可以使用 `gatsy-transformer-remark`:

```bash
yarn add gatsby-transformer-remark
```

然后将其加入 `gatsby-config.js`:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5507edaa84364b6c8c5578795267cced~tplv-k3u1fbpfcp-watermark.image)

使用 `gatsy-transformer-remark` 带来的 `allMarkdownRemark` 获取到了文章信息

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fa63c2d38564ac586047d4ae1fc0b87~tplv-k3u1fbpfcp-watermark.image)

现在编辑 `index.js` 代码来展示对应的文章列表：

```js
import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../component/layout'

export const query = graphql`
  query {
    allMarkdownRemark(filter: {}) {
      edges {
        node {
          id
          frontmatter {
            author
            date
            tag
            title
          }
          excerpt
        }
      }
    }
  }
`

const Home = ({ data }) => (
  <Layout>
    <h1>文章列表</h1>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <h3>
          {node.frontmatter.title}
          {node.frontmatter.tag && (
            <span
              style={{
                padding: '5px',
                fontSize: '14px',
                color: '#fff',
                background: 'rgba(26, 189, 94, 0.8)',
                borderRadius: '2px',
                marginLeft: '5px',
              }}
            >
              {node.frontmatter.tag}
            </span>
          )}
        </h3>
        <p style={{ color: '#aaa' }}>
          {node.frontmatter.date && <span style={{ marginRight: '10px' }}>{node.frontmatter.date}</span>}
          {node.frontmatter.author && <span>{node.frontmatter.author}</span>}
        </p>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
)

export default Home
```

效果如下所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2343bffefd1e4d47bab9cd27b8ffb5b4~tplv-k3u1fbpfcp-watermark.image)

### 3. 展示文章内容

现在有了文章列表，还需要生成文章链接 & 文章. 按照下面三步操作即可：

**第一步**：创建页面模板文件 `src/templates/blog-post.js`

```js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../component/layout'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
```

**第二步**：在根目录创建 `gatsby-node.js`文件用于存放路径和页面创建函数，它们将被 Gatsby 调用执行

```js
// gatsby-node.js
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// 创建路径
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions
    // 使用 gatsby-source-filesystem 插件提供的创建路径能力
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    // 使用 createNodeField 向节点添加 slug 属性字段
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// 创建页面
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
```

**第三步**：为文章列表页添加路径查询及 Link 即可：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdcf4928e30f442789a3748fd48707ec~tplv-k3u1fbpfcp-watermark.image)
