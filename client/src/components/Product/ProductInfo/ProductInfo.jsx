import React from 'react';
import PropTypes from 'prop-types';
import classes from './ProductInfo.module.scss';
import Tags from '../../Global/Tags/Tags.jsx';
const ProductInfo = ({ product }) => {
  return (
    <div className={classes.rootInfo}>
      <div className={classes.main}>
        <h2 className={classes.brandName}>KENZO</h2>
        <h1 className={classes.productName}>{product.name}</h1>
        <div className={classes.tags}>
          <div className={classes.discount}>
            <Tags tag={'60%off'} highlight="true" />
          </div>
          <div className={classes.service}>
            <Tags tag={'Free Shipping'} />
          </div>
        </div>
        <hr />
        <div className={classes.options}>
          <div className={classes.option}>
            <h2>Color</h2>
            <p>MultiColor</p>
          </div>
          <div className={classes.option}>
            <h2>Gender</h2>
            <p>Women</p>
          </div>
          <div className={classes.option}>
            <h2>Status</h2>
            <p>In Stock</p>
          </div>
        </div>
        <hr />
        <div className={classes.priceRow}>
          <div className={classes.price}>
            <div className={classes.discountPrice}>${product.discountPrice}</div>
            <div className={product.discountPrice ? classes.originalPrice : classes.fullPrice}>
              ${product.fullPrice}
            </div>
          </div>
          <div className={classes.brandOrigin}>
            <p>
              From: <span>www.benzo.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
};
export default ProductInfo;