import React from 'react';
import classes from './PopularItems.module.scss';
import ProductCard from '../../Global/ProductCard/ProductCard.jsx';
import PropTypes from 'react';

const PopularItems = ({ products }) => {
  return (
    <div>
      <div className={classes.titleRow}>
        <h2 className={classes.title}>Popular Items</h2>
        <span className={classes.seeMore}>See More</span>
      </div>
      <div className={classes.cardRow}>
        {products.map((product) => (
          <div key={product._id} className={classes.cards}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

PopularItems.propTypes = {
  products: PropTypes.Array,
};

export default PopularItems;
