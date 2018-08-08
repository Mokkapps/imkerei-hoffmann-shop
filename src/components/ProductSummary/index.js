import React from 'react'
import Img from 'gatsby-image'

import { Item, Label } from 'semantic-ui-react'

import AddToCart from '../AddToCart'

export default ({ id, name, description, price, type, image }) => (
  <Item.Group>
    <Item style={{ alignItems: 'center' }}>
      <Item.Image size="medium" src={`/images/${image}`} />
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
