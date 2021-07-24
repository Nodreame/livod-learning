import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'

const ListLink = props => (
  <li>
    <Link to={props.to} style={{ marginRight: '10px', textDecoration: 'none' }}>
      {props.children}
    </Link>
  </li>
)

const Layout = ({ children }) => {
  // 非页面组件中使用静态查询
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  )
  return (
    <div style={{ margin: '0 20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h3>{data.site.siteMetadata.title}</h3>
        </Link>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
          <ListLink to="/">Articles</ListLink>
          <ListLink to="/about/">About</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}

export default Layout
