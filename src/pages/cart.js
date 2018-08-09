import React from 'react'
import Helmet from 'react-helmet'
import CartItemList from '../components/CartItemList/'
import CartSummary from '../components/CartSummary/'

export default class Cart extends React.Component {
  state = {
    items: [],
    loading: true,
    completed: false,
  }

  componentDidMount() {
    this.setState({
      items: this.props.data.allProductsJson.edges,
      meta: '',
      cartId: '',
      loading: false,
    })
  }

  _handleCheckout = data => {}

  _handleRemoveFromCart = (itemId, context) => {}

  render() {
    const { meta, ...rest } = this.state
    const { loading } = rest
    return (
      <div>
        <Helmet title="Cart" />
        {context => (
          <CartItemList
            {...rest}
            removeFromCart={item => this._handleRemoveFromCart(item, context)}
          />
        )}
        {!loading &&
          !rest.completed && (
            <CartSummary {...meta} handleCheckout={this._handleCheckout} />
          )}
      </div>
    )
  }
}

export const query = graphql`
  query Cart {
    allProductsJson(limit: 1000) {
      edges {
        node {
          id
        }
      }
    }
  }
`
