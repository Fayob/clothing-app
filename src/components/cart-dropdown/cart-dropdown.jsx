import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
import { CartContext } from '../../context/cart.context'
import CartItem from '../cart-item/cart-item'

import {CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.style.jsx'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckoutPage = () => {
    navigate('/checkout')
  }
  
  return (
    <CartDropdownContainer className='cart-dropdown-container'>
      <CartItems className='cart-items' />
      {
        cartItems.length ? (cartItems.map((item) => <CartItem key={item.id} cartItem={item} />
      )) : <EmptyMessage>Your cart is empty</EmptyMessage>
      }
      
      <Button onClick={goToCheckoutPage}>Go To Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown