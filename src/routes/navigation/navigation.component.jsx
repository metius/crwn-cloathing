//adding comment to push to branch Context (to save)

import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import {UserContext} from '../../contexts/user.contexts';
import {CartContext} from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { signOutuser } from '../../utils/firebase/firebase.utils';

import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.styles';

const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>
            SHOP
          </NavLink>        
          {
            currentUser ?
            <NavLink as='span' onClick={signOutuser}>
              SIGN OUT
            </NavLink>
            :
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          }
          <CartIcon />
          </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
        </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;