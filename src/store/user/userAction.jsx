import {
  SET_USER_LOGIN,
  CLOSE_LOGIN_MODAL,
  OPEN_LOGIN_MODAL,
  SET_USER_LOGOUT,
} from '../reducerTypes';

export const setUserLoggedIn = (user) => {
  return { type: SET_USER_LOGIN, payload: user };
};
