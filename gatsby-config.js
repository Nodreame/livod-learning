module.exports = {
  // Customize your site metadata:
  pathPrefix: `/livod-learning`,
  siteMetadata: {
    title: 'Livod Team',
    author: `My Name`,
    description: 'Such wow. Very React + TS.',
    social: [
      {
        name: `github`,
        url: `https://github.com/livod`,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
  ],
}
