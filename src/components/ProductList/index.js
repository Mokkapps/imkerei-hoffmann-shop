import React from 'react'
import { Card, Image, Label } from 'semantic-ui-react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'

const mapProductsToItems = products => {
  return products.map(product => {
    const { id, slug, price, image, name, featured, description } = product.node
    const { imageSharp } = product

    return {
      as: Link,
      to: `/product/${slug}/`,
      childKey: id,
      image: (
        <Image>
          {featured ? (
            <Label color="red" ribbon style={{ zIndex: '1' }}>
              New!
            </Label>
          ) : null}
          <Img title={name} alt={name} resolutions={imageSharp.resolutions}/>
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
