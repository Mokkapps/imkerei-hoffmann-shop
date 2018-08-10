import React from 'react'
import Helmet from 'react-helmet'

import CartItemList from '../components/CartItemList/'
import CartSummary from '../components/CartSummary/'

export default class Cart extends React.Component {
  state = {
    items: [],
    completed: false,
  }

  componentDidMount() {
    this.setState({
      items: [],
      meta: '',
      cartId: '',
    })
  }

  _handleCheckout = data => {}

  _handleRemoveFromCart = (itemId, context) => {}

  render() {
    const { meta, ...rest } = this.state
    return (
      <div>
        <Helmet title="Cart" />
        {context => (
          <CartItemList
            {...rest}
            removeFromCart={item => this._handleRemoveFromCart(item, context)}
          />
        )}
      </div>
    )
  }
}