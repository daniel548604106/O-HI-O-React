import React, { useState, useEffect } from 'react';
import classes from './Cart.module.scss';
import CartProgressBar from '../../components/Cart/CartProgressBar/CartProgressBar.jsx';
import CartPayment from './CartPayment/CartPayment.jsx';
import CartListInfo from '../../components/Cart/CartListInfo/CartListInfo.jsx';
import CartConfirm from './CartConfirm/CartConfirm.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Checkout = () => {
  const params = useParams();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [amount, setAmount] = useState(1);
  const handleAmountChange = (e) => {
    console.log(e);
  };
  useEffect(() => {
    console.log(params);
    console.log(location);
  }, []);
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div className={classes.progressBarLayout}>
        <CartProgressBar />
      </div>
      {!params.status && (
        <div>
          <CartListInfo cartItems={cartItems} />
        </div>
      )}

      {params.status === 'payment' && (
        <div>
          <CartPayment />
        </div>
      )}
      {params.status === 'confirm' && (
        <div>
          <CartConfirm />
        </div>
      )}
    </div>
  );
};

export default Checkout;
