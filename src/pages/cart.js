import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Loader, Message, Segment } from 'semantic-ui-react'

import { AWS_LAMBDA_URL } from '../constants'
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
  state = {
    loading: false,
    paymentResponse: null,
  }

  handleCheckout = token => {
    console.log('handleCheckout', token)

    const { id } = token

    this.setState({ loading: true })

    fetch(AWS_LAMBDA_URL, {
      method: 'POST',
      body: JSON.stringify({
        token: id,
        amount,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => {
        console.log('Transaction processed successfully')
        this.setState({
          paymentResponse: {
            success: true,
            message: '',
          },
        })
        return res.json()
      })
      .catch(error => {
        console.error('Error:', error)
        this.setState({
          paymentResponse: {
            success: false,
            message: error,
          },
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
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

    let totalPriceInEuro = 0

    for (const cartItem of cartItems) {
      const {
        quantity,
        price: { amount },
      } = cartItem
      totalPriceInEuro += quantity * Number(amount)
    }

    return {
      amountInCents: totalPriceInEuro * 100,
      currency: 'EUR',
      formatted: `${totalPriceInEuro}€`,
    }
  }

  render() {
    const { loading, paymentResponse } = this.state
    return (
      <div>
        <Helmet title="Cart" />
        <Loader active={loading} inline="centered">
          Bearbeite Bezahlung...
        </Loader>
        {paymentResponse ? (
          <Message
            negative={!paymentResponse.success}
            positive={paymentResponse.success}
          >
            <Message.Header>
              {paymentResponse.success
                ? 'Bezahlung erfolgt'
                : 'Fehler beim Bezahlen'}
            </Message.Header>
            <p>{paymentResponse.message}</p>
          </Message>
        ) : null}
        <Segment disabled={loading}>
          <CartItemList
            imageData={this.props.data}
            items={this.getCartItems()}
            removeFromCart={item => this.handleRemoveFromCart(item)}
          />
          <CartSummary
            totalPrice={this.getTotalPrice()}
            handleCheckout={this.handleCheckout}
          />
        </Segment>
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
