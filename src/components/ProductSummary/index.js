import React from 'react'
import Img from 'gatsby-image'

import { Item, Label } from 'semantic-ui-react'

import AddToCart from '../AddToCart'

class ProductSummary extends React.Component {
  render() {
    console.log('ProductSummary props', this.props)
    const { id, name, price, type } = this.props.pathContext
    const imageSharp = this.props.data[id]
    console.log('ProductSummary imageSharp', imageSharp)
    return (
      <Item.Group>
        <Item style={{ alignItems: 'center' }}>
          <Item.Image size="medium">
            <Img
              resolutions={imageSharp.resolutions}
              title={name}
              alt={name}
            />
          </Item.Image>
          <Item.Content>
            <Item.Header>{name}</Item.Header>
            <Item.Description>
              <p>{price}</p>
              <Label>Type: {type}</Label>
            </Item.Description>
            <Item.Extra>
              <AddToCart productId={id} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}

export default ProductSummary;

export const query = graphql`
  query ProductSummary {
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
