/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against this Gatsbygram's graphql schema. Think of
    // it like Gatsbygram has a built-in database constructed
    // from static data that you can run queries against.
    //
    // Post is a data node type derived from data/posts.json
    // which is created when scraping Instagram. “allPostsJson”
    // is a "connection" (a GraphQL convention for accessing
    // a list of nodes) gives us an easy way to query all
    // Post nodes.
    resolve(
      graphql(
        `
          {
            allTeamJson {
              edges {
                node {
                  name
                  imageId
                  role
                  description
                }
              }
            }
            allProductsJson {
              edges {
                node {
                  id
                  slug
                  type
                  price {
                    formatted
                    amount
                    currency
                  }
                  name
                  featured
                  description
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(new Error(result.errors))
        }

        // Create image post pages.
        const postTemplate = path.resolve(
          `src/components/ProductSummary/index.js`
        )
        // We want to create a detailed page for each
        // Instagram post. Since the scrapped Instagram data
        // already includes an ID field, we just use that for
        // each page's path.
        _.each(result.data.allProductsJson.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/product/${slug(edge.node.slug)}/`,
            component: slash(postTemplate),
            context: {
              id: edge.node.id,
              name: edge.node.name,
              slug: edge.node.slug,
              description: edge.node.description,
              price: edge.node.price,
              type: edge.node.type,
            },
          })
        })

        return
      })
    )
  })
}
