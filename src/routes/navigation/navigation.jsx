import React, {Fragment, useContext} from 'react'
import { Outlet, Link } from 'react-router-dom'
import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase'
import { ReactComponent as CrwLogo } from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown'
import { CartContext } from '../../context/cart.context'

import { NavLink, NavLinks, NavigationContainer, LogoContainer } from './navigation.style.jsx'

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }
  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (<NavLink as='span' onClick={signOutHandler}>
            SIGN OUT
          </NavLink>) : (<Link to='/auth'>
            SIGN IN
          </Link>)}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation