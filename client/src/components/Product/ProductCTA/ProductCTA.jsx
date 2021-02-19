import React, { useState, useEffect } from 'react';
import classes from './ProductCTA.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/cart/cartAction.js';
import { addToFavorite, openLoginModal } from '../../../store/index/indexAction';
const ProductCTA = ({ product }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const favoriteProducts = useSelector((state) => state.global.favoriteProducts);
  const [hasAdded, setHasAdded] = useState(false);
  const addItemToCart = () => {
    if (!isUserLoggedIn) {
      return dispatch(openLoginModal());
    }
    dispatch(addToCart(product));
  };

  const addToWishList = () => {
    const type = 'product';
    dispatch(addToFavorite(params.id, type));
  };

  return (
    <div className={classes.productCta}>
      <div className={classes.addToCart} onClick={() => addItemToCart()}>
        Add To Cart
      </div>
      <div
        onClick={() => addToWishList()}
        className={`${classes.wishlist} ${
          favoriteProducts.find((favoriteProduct) => favoriteProduct._id === product._id) &&
          classes.wishListAdded
        }`}
      >
        {favoriteProducts.find((favoriteProduct) => favoriteProduct._id === product._id) ? (
          <div>Saved</div>
        ) : (
          <>
            <div>
              <FavoriteIcon />
              <span>Add to Wishlist</span>
              <ChevronRightIcon />
            </div>
            <p>Save for future shopping</p>
          </>
        )}
      </div>
    </div>
  );
};

ProductCTA.propTypes = {
  product: PropTypes.object,
};

export default ProductCTA;
