import React from 'react'
import { Card, Image, Label } from 'semantic-ui-react'
import Link from 'gatsby-link'

const mapProductsToItems = products => {
  console.log('products', products)
  return products.map(product => {
    console.log('product', product)
    console.log('product.node', product.node)
    const { id, price, image, name, featured } = product.node

    return {
      as: Link,
      to: `/product/${id}/`,
      childKey: id,
      image: (
        <Image src={`/images/${image}`} size="small" centered>
          {featured ? (
            <Label color="red" ribbon style={{ zIndex: '1' }}>
              New!
            </Label>
          ) : null}
        </Image>
      ),
      header: name,
      meta: <Card.Meta style={{ color: 'dimgray' }}>{price}</Card.Meta>,
    }
  })
}

export default ({ products }) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
