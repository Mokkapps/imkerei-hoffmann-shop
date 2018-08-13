import React from 'react'
import { Header } from 'semantic-ui-react'
import Helmet from 'react-helmet'

import ProductList from '../components/ProductList'

class StoreIndex extends React.Component {
  addGatsbyImageToProduct = () => {
    const products = this.props.data.allProductsJson.edges
    return products.map(product => {
      return { ...product, imageSharp: this.props.data[product.node.id] }
    })
  }

  render() {
    const siteTitle = 'Imkerei Hoffmann'
    return (
      <div>
        <Helmet title={siteTitle} />
        <Header as="h3" icon textAlign="center" style={{ marginBottom: '2em' }}>
          <Header.Content style={{ width: '60%', margin: '0 auto' }}>
            <Header as="h2" icon>
              Produkte
            </Header>
          </Header.Content>
        </Header>
        <ProductList products={this.addGatsbyImageToProduct()} />
      </div>
    )
  }
}

export default StoreIndex

export const query = graphql`
  query ProductList {
    allProductsJson {
      edges {
        node {
          id
          slug
          price {
            formatted
            amount
            currency
          }
          name
          featured
        }
      }
    }
    honey1: imageSharp(id: { regex: "/blossom-honey/" }) {
      resolutions(width: 250, height: 250) {
        ...GatsbyImageSharpResolutions
      }
    }
    honey2: imageSharp(id: { regex: "/forest-honey/" }) {
      resolutions(width: 250, height: 250) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`
