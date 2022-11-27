import React, { createContext, useState, useEffect, useReducer } from 'react'

const ACTION_TYPES = {
  SET_CART_ITEM: 'SET_CART_ITEM',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const addCartItem = (cartItems, productToAdd) => {
const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id)

  if (existingCartItem) {
  return cartItems.map((cartItem)=>cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem)
  }
  
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id)

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem)=> cartItem.id !== cartItemToRemove.id)
  }

 if (existingCartItem) {
  return cartItems.map((cartItem)=>cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem)
  }
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem)=> cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  setCartItems: () => {}
})

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action
  
  switch (type) {
    case ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload
      }
    case ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state, 
        isCartOpen: payload
      }
    default: throw new Error(`unhandled type of ${type} in cart reducer`)
  }
}

const CartProvider = ({ children }) => {
  const [{cartItems, cartCount, isCartOpen, cartTotal}, dispatch] = useReducer(cartReducer, initialState)
  // const [isCartOpen, setIsCartOpen] = useState(false)
  // const [cartItems, setCartItems] = useState([])
  // const [cartCount, setCartCount] = useState(0)
  // const [cartTotal, setCartTotal] = useState(0)

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
  //   setCartCount(newCartCount)
  // }, [cartItems]);

  // useEffect(() => {
  //   const newTotalCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
  //   setCartTotal(newTotalCount)
  // }, [cartItems]);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

    const newTotalCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)

    dispatch({
      type: ACTION_TYPES.SET_CART_ITEM,
      payload: {
        cartCount: newCartCount,
        cartItems: newCartItems,
        cartTotal: newTotalCount
      }
    })
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemToCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems)
  }

  const setIsCartOpen = (bool) => {
    dispatch({type: ACTION_TYPES.SET_IS_CART_OPEN, payload: bool})
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemToCart,  cartTotal }
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export default CartProvider