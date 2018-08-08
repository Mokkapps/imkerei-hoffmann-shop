/* eslint-disable */

import React from 'react'
import get from 'lodash/get'
import { Image, Header } from 'semantic-ui-react'
import Helmet from 'react-helmet'

import ProductList from '../components/ProductList'
import logo from '../images/logo.png'

class StoreIndex extends React.Component {
  render() {
    const siteTitle = 'Imkerei Hoffmann'
    return (
      <div>
        <Helmet title={siteTitle} />
        <Header as="h3" icon textAlign="center" style={{ marginBottom: '2em' }}>
          <Header.Content style={{ width: '60%', margin: '0 auto' }}>
            <Header as="h2" icon>
              Verfügbare Produkte
            </Header>
          </Header.Content>
        </Header>
        <ProductList products={this.props.data.allProductsJson.edges}/>
      </div>
    )
  }
}

export default StoreIndex


export const query = graphql`
  query ProductList {
    allProductsJson(limit: 1000) {
      edges {
        node {
          id
          price
          image
          name
          featured
        }
      }
    }
  }
`
