import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Item, Button, Loader, Message, Responsive } from 'semantic-ui-react'

export default ({ imageData, items, removeFromCart, loading, completed }) => {
  if (loading) return <Loader active inline="centered" />

  if (completed)
    return (
      <Message success>
        <Message.Header>Your placed!</Message.Header>
        <p>Congratulations. Your order and payment has been accepted.</p>
      </Message>
    )

  if (items.length === 0)
    return (
      <Message warning>
        <Message.Header>Warenkorb ist leer</Message.Header>
        <p>
          Sie müssen erst Artikel dem Warenkorb hinzufügen, bevor Sie zur Kasse gehen können.
        </p>
      </Message>
    )
  const mapCartItemsToItems = (imageData, items) =>
    items.map(({ id, slug, name, quantity, description, image, price }) => {
      const imageSharp = imageData[id]

      const DesktopItemImage = () => (
        <Item.Image alt={name} style={{ background: '#f2f2f2' }}>
          <Img resolutions={imageSharp.resolutions} title={name} alt={name} />
        </Item.Image>
      )
      const MobileItemImage = () => (
        <Item.Image alt={name} style={{ background: '#none' }}>
          <Img resolutions={imageSharp.resolutions} title={name} alt={name} />
        </Item.Image>
      )

      return {
        childKey: id,
        header: (
          <Item.Header>
            <Link to={`/product/${slug}/`}>{name}</Link>
          </Item.Header>
        ),
        image: (
          <React.Fragment>
            <Responsive as={MobileItemImage} {...Responsive.onlyMobile} />
            <Responsive
              as={DesktopItemImage}
              minWidth={Responsive.onlyTablet.minWidth}
            />
          </React.Fragment>
        ),
        meta: `${quantity}x ${price.formatted}`,
        description,
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => removeFromCart(id)}
          />
        ),
      }
    })
  return <Item.Group divided items={mapCartItemsToItems(imageData, items)} />
}
