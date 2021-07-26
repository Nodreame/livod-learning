import React from 'react'
import { Link, graphql } from 'gatsby'
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
          fields {
            slug
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
        <Link
          to={node.fields.slug}
          style={{
            textDecoration: 'none',
          }}
        >
          <h3>{node.frontmatter.title}</h3>
        </Link>

        {node.frontmatter.tag && (
          <span
            style={{
              padding: '5px',
              fontSize: '14px',
              color: '#fff',
              background: 'rgba(26, 189, 94, 0.8)',
              borderRadius: '2px',
              marginRight: '5px',
            }}
          >
            {node.frontmatter.tag}
          </span>
        )}
        <span style={{ color: '#aaa' }}>
          {node.frontmatter.date && <span style={{ marginRight: '10px' }}>{node.frontmatter.date}</span>}
          {node.frontmatter.author && <span>{node.frontmatter.author}</span>}
        </span>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
)

export default Home
