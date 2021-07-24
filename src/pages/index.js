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
