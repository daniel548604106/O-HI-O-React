import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Loader from '../../Global/Loader/Loader.jsx';
import Pagination from '../../Global/Pagination/Pagination.jsx';
import ProductCard from '../../Global/ProductCard/ProductCard.jsx';
import classes from './MainContent.module.scss';
const MainContent = ({
  activeCategory,
  products,
  currentPage,
  setCurrentPage,
  totalPage,
  subcategoryId,
  setFilterShow,
}) => {
  const location = useLocation();
  const history = useHistory();
  //Lazy Load Image using Intersection Observer API
  const [imageObserver, setImageObserver] = useState(null);
  const createObserver = (inViewCallback = noop, newOptions = {}) => {
    const defaultOptions = {
      root: null,
      rootMargin: '30px',
      threshold: 0,
    };
    return new IntersectionObserver(inViewCallback, { ...defaultOptions, newOptions });
  };
  const onImageInView = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const imageSrc = element.getAttribute('data-src');

        element.removeAttribute('data-src');
        element.setAttribute('src', imageSrc);

        observer.unobserve(element);
      }
    });
  };

  useEffect(() => {
    const imageObserver = createObserver(onImageInView);
    setImageObserver(imageObserver);

    return () => {
      imageObserver.disconnect();
    };
  }, []);
  // const [activeSubcategory, setActiveSubcategory] = useState([]);
  // useEffect(() => {
  //   if (activeCategory && subcategoryId) {
  //     subcategory = activeCategory.category.find((option) => {
  //       return option.id === subcategoryId;
  //     });
  //   }
  // }, [activeCategory, subcategoryId]);

  const filter = (e) => {
    const value = JSON.parse(e.target.value);
    let query = qs.parse(location.search);
    query = { ...query, sort: value.name, order: value.order };
    history.push(`${location.pathname}?${qs.stringify(query)}`);
  };

  return (
    <>
      <div className={classes.topRow}>
        {window.innerWidth > 500 ? (
          <div>{activeCategory ? <h2>{activeCategory.title}</h2> : <h2>??????????????????</h2>}</div>
        ) : (
          <a onClick={() => setFilterShow(true)} className={classes.filterBtn}>
            <FilterListIcon />
            <span>????????????</span>
          </a>
        )}
        <div className={classes.filter}>
          <select onChange={(e) => filter(e)} name="sort" id="sort">
            <option value="sort" selected disabled>
              ??????
            </option>
            <option value='{"name": "rank", "order": ""}'>??????????????????</option>
            <option value='{"name": "price", "order": "descending"}'>??????????????????</option>
            <option value='{"name": "price", "order": "ascending"}'>??????????????????</option>
          </select>
        </div>
      </div>
      {products.length ? (
        <div className={classes.products}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} observer={imageObserver} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
      <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

MainContent.propTypes = {
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
  categoryId: PropTypes.string,
  activeCategory: PropTypes.arrays,
  subcategoryId: PropTypes.number,
  products: PropTypes.array,
  setCurrentPage: PropTypes.func,
  setFilterShow: PropTypes.func,
};

export default MainContent;
