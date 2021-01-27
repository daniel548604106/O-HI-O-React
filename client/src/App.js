import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Backdrop } from '@material-ui/core';
import Header from './components/Navbar/Header.jsx';
import { Home, Product } from './pages/index';
import Footer from './components/Footer/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from './pages/Checkout/Checkout';
import { closeLoginModal } from './store/actions/indexActions';
import LoginModal from './components/Login/index';
import Cart from './pages/Cart/Cart.jsx';
import Account from './pages/Account/Account.jsx';
import OAuth from './pages/OAuth/OAuth.jsx';
import Beauty from './pages/Collection/Beauty/Beauty.jsx';
import PropTypes from 'prop-types';
import qs from 'query-string';
import Latest from './pages/Latest/Latest.jsx';
import { setUserLoggedIn } from './store/user/userAction';
import { apiGetUserData } from './api/index';
import './App.scss';
const App = (props) => {
  const dispatch = useDispatch();
  const isLoginModalShow = useSelector((state) => state.login.isLoginModalShow);
  const [open, setOpen] = useState(false);
  const handleClose = (e) => {
    dispatch(closeLoginModal());
  };

  const preventProp = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const query = window.location.search;
    let userId;
    const getUserData = async () => {
      try {
        const { data } = await apiGetUserData(userId);
        console.log('res', data);
        dispatch(setUserLoggedIn(data.user));
      } catch (error) {
        console.log(error);
      }
    };
    if (query) {
      userId = query.split('=')[1];
      getUserData();
    }
  }, []);

  useEffect(() => {
    setOpen(isLoginModalShow);
  }, [isLoginModalShow]);

  return (
    <Router history={history}>
      <Header />
      {isLoginModalShow}
      <div className="loginModal">
        <Backdrop open={open} onClick={handleClose} style={{ zIndex: 11 }}>
          <div
            onClick={preventProp}
            style={{
              maxWidth: '600px',

              borderRadius: '10px',
              zIndex: 12,
              backgroundColor: '#fff',
            }}
          >
            <form noValidate autoComplete="off">
              <LoginModal />
            </form>
          </div>
        </Backdrop>
      </div>
      <Route path="/" exact>
        <Home />
      </Route>
      <main className="global-container">
        <Route path="/oauth/:type" exact>
          <OAuth props={props} />
        </Route>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/latest" exact>
          <Latest />
        </Route>
        <Route path={`/products/:id`}>
          <Product />
        </Route>
        <Route path="/checkout" exact>
          <Checkout />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/beauty">
          <Beauty />
        </Route>
      </main>
      <Footer />
    </Router>
  );
};

export default App;