import axios from 'axios';

export const getAllProducts = () => {
  return axios.get('/v1/products');
};

export const getProduct = (id) => {
  return axios.get(`/v1/products/${id}`);
};

export const getCollectionProducts = (collection) => {
  return axios.get(`v1/products/collection/${collection}`);
};