module.exports = {
  siteMetadata: {
    title: 'Imkerei Hoffmann Shop',
    author: 'Michael Hoffmann',
    description: 'Shop website for our family-run honey farm',
    siteUrl: 'https://hoffmann-imkerei.de',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/src/img`,
      },
    },
    'gatsby-plugin-react-helmet',
    // Used for Stripe checkout handling
    'gatsby-plugin-stripe-checkout',
    // This plugin transforms JSON file nodes.
    `gatsby-transformer-json`,
    // Necessary plugins for gatsby-image
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
