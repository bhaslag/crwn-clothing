import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

//the disptach action gets passed to state by default if no second dispatch argument is passed to the connect function
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        cartItems.length ?
        cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))
      :
      <span className='empty-message'>Your cart is empty</span>
      }
    </div>
    <CustomButton 
    onClick={() => { 
      history.push('/checkout');
      dispatch(toggleCartHidden());
    }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems
});

//all higher order components return component and can take components as arguments
//order matters when a component is used as an argument because the function will evaulate from inside-out
//i.e. first connected component comes out, which then gets passed to router
export default withRouter(connect(mapStateToProps)(CartDropdown));