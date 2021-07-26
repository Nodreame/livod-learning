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
