import React from 'react'
import Layout from '../component/layout'
import { graphql } from 'gatsby'

// 页面中进行页面查询
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const About = ({ data }) => (
  <Layout>
    <div style={{ color: `teal` }}>
      <h1>About {data.site.siteMetadata.title}</h1>
      <p>{data.site.siteMetadata.description}</p>
    </div>
  </Layout>
)

export default About
