import React from 'react'
import { Input, Icon, Transition } from 'semantic-ui-react'

import LS_CART_KEY from '../../constants'

export default class AddToCart extends React.Component {
  state = {
    error: '',
    quantity: 1,
    visible: false,
  }

  _handleSubmit = (e, context) => {
    const { productId } = this.props
    const { quantity } = this.state
    const storedCart = localStorage.getItem(LS_CART_KEY)

    const error = this.validate(quantity)
    this.setState({ error })
    if (!error) {
      console.log('Add to cart', quantity, productId, storedCart)
    } else {
      this.setState({
        error: 'Something went wrong',
      })
    }
  }

  toggleMessage = () => {
    setTimeout(() => {
      this.setState({ visible: false })
    }, 1000)
  }

  _handleChange = ({ target: { value } }) => {
    this.setState({
      quantity: value,
    })
  }

  validate = quantity => {
    let error
    const re = /^[0-9\b]+$/

    if (!quantity) error = "Can't be blank"
    if (!re.test(quantity)) error = 'Please enter an integer for the quantity'

    return error
  }

  render() {
    const { loading, quantity, visible, error } = this.state
    return (
      <div>
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min={1}
          step={1}
          error={!!error}
          onChange={e => this._handleChange(e)}
          action={{
            color: 'orange',
            content: 'Add to Cart',
            icon: 'plus cart',
            onClick: e => this._handleSubmit(e),
            loading,
            disabled: loading,
          }}
        />
        {error && (
          <div style={{ color: 'red', position: 'absolute' }}>{error}</div>
        )}
        <Transition duration={{ hide: 500, show: 500 }} visible={visible}>
          <div style={{ color: 'green', position: 'absolute' }}>
            <Icon name="check" />
            Added to cart
          </div>
        </Transition>
      </div>
    )
  }
}
