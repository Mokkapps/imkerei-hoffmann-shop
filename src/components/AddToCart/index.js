import React from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, Transition } from 'semantic-ui-react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { cart: state.cart }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productId, quantity) =>
      dispatch({ type: `ADD_TO_CART`, payload: { productId, quantity } }),
  }
}

class ConnectedAddToCart extends React.Component {
  state = {
    error: '',
    quantity: 1,
    visible: false,
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  _handleSubmit = (e, context) => {
    const { productId, cart } = this.props
    const { quantity } = this.state
    const error = this.validate(quantity)
    this.setState({ error })
    if (!error) {
      this.props.addToCart(productId, quantity)
      this.setState(
        {
          quantity,
          visible: true,
        },
        this.toggleMessage()
      )
    } else {
      this.setState({
        error: 'Etwas ist schiefgelaufen',
      })
    }
  }

  toggleMessage = () => {
    this.timeoutId = setTimeout(() => {
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

    if (!quantity) error = 'Darf nicht leer sein'
    if (!re.test(quantity)) error = 'Bitte geben Sie eine ganze Zahl ein'

    return error
  }

  render() {
    const { quantity, visible, error } = this.state
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
            content: 'Zum Warenkorb hinzufügen',
            icon: 'plus cart',
            onClick: e => this._handleSubmit(e),
          }}
        />
        {error && (
          <div style={{ color: 'red', position: 'absolute' }}>{error}</div>
        )}
        <Transition duration={{ hide: 500, show: 500 }} visible={visible}>
          <div style={{ color: 'green', position: 'absolute' }}>
            <Icon name="check" />
            Zum Warenkorb hinzugefügt
          </div>
        </Transition>
      </div>
    )
  }
}

ConnectedAddToCart.propTypes = {
  cart: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
}

const AddToCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAddToCart)

export default AddToCart
