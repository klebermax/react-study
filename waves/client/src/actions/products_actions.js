import axios from 'axios';
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from './types';
import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductsBySell() {
  //articles?sortBy=sold&order=desc&limit=4

  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
}

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}

// Categories
export const getBrands = () => async dispatch => {
  const request = await axios.get(`${PRODUCT_SERVER}/brands`).then(response => response.data);

  dispatch({
    type: GET_BRANDS,
    payload: request
  });
};

export const getWoods = () => async dispatch => {
  const request = await axios.get(`${PRODUCT_SERVER}/woods`).then(response => response.data);

  dispatch({
    type: GET_WOODS,
    payload: request
  });
};

export const getProductsToShop = (skip, limit, filters = [], previousState = []) => async dispatch => {
  await axios
    .get(`${PRODUCT_SERVER}/shop`, {
      params: {
        skip,
        limit,
        filters
      }
    })
    .then(response => {
      const { size, articles } = response.data;
      let newState = [...previousState, ...articles];

      dispatch({
        type: GET_PRODUCTS_TO_SHOP,
        payload: {
          size,
          articles: newState
        }
      });
    })
    .catch(err => {
      console.log('error ' + err);
    });
};

export const addProduct = dataToSubmit => async dispatch => {
  const request = await axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit).then(response => response.data);

  dispatch({
    type: ADD_PRODUCT,
    payload: request
  });
};

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  };
}
