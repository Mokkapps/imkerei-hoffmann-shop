import { createStore as reduxCreateStore } from 'redux'

import { LS_CART_KEY } from '../constants'

const initialState = { cart: {}, cartCount: 0 }

const rootReducer = (state = initialState, action) => {
  const oldState = { ...state }
  const { productId, quantity } = action.payload || {}
  const { cart } = oldState
  let { cartCount } = oldState

  switch (action.type) {
    case 'ADD_TO_CART':
      console.log('ADD_TO_CART oldState, action', oldState, action)

      if (cart[productId] === undefined) {
        cart[productId] = quantity
        cartCount++
      } else {
        for (const entry of Object.entries(cart)) {
          const [key, value] = entry

          if (key === productId) {
            cart[key] += 1
            cartCount++
          }
        }
      }

      const newState = { ...oldState, cart, cartCount }
      console.log('ADD_TO_CART newState', newState)
      localStorage.setItem(LS_CART_KEY, JSON.stringify(newState))
      return newState
    case 'REMOVE_FROM_CART':
      console.log('REMOVE_FROM_CART oldState, action', oldState, action)

      const amount = cart[productId]
      delete cart[productId]
      cartCount -= amount

      const s = { ...oldState, cart, cartCount }
      console.log('REMOVE_FROM_CART newState', s)
      return s
    default:
      return state
  }
}

const createStore = () => reduxCreateStore(rootReducer, initialState)
export default createStore
