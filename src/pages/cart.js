import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CartItemList from '../components/CartItemList/'
import CartSummary from '../components/CartSummary/'

const mapStateToProps = state => {
  return { cart: state.cart, cartCount: state.cartCount }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: productId =>
      dispatch({ type: `REMOVE_FROM_CART`, payload: { productId } }),
  }
}

class ConnectedCart extends React.Component {
  handleCheckout = data => {
    console.log('Checkout', data)
  }

  handleRemoveFromCart = productId => {
    this.props.removeFromCart(productId)
  }

  getCartItems = () => {
    const { data, cart } = this.props
    const products = data.allProductsJson.edges

    return Object.entries(cart).map(entry => {
      const [cartProductId, quantity] = entry
      const product = products
        .map(p => p.node)
        .find(p => p.id === cartProductId)

      return { ...product, quantity }
    })
  }

  getTotalPrice = () => {
    const cartItems = this.getCartItems()

    let totalPrice = 0

    for (const cartItem of cartItems) {
      const {
        quantity,
        price: { amount },
      } = cartItem
      totalPrice += quantity * Number(amount)
    }

    return {
      amount: totalPrice,
      currency: 'EUR',
      formatted: `${totalPrice}€`
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Cart" />
        <CartItemList
          imageData={this.props.data}
          items={this.getCartItems()}
          removeFromCart={item => this.handleRemoveFromCart(item)}
        />
        <CartSummary
          totalPrice={this.getTotalPrice()}
          handleCheckout={this.handleCheckout}
        />
      </div>
    )
  }
}

ConnectedCart.propTypes = {
  cart: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
}

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCart)

export default Cart

export const query = graphql`
  query CartItemList {
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
    honey1: imageSharp(id: { regex: "/blossom-honey/" }) {
      resolutions(width: 128, height: 128) {
        ...GatsbyImageSharpResolutions
      }
    }
    honey2: imageSharp(id: { regex: "/forest-honey/" }) {
      resolutions(width: 128, height: 128) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`
