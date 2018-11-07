import axios from 'axios';
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  GET_PRODUCT_DETAIL,
  ADD_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  CLEAR_PRODUCT,
  CLEAR_PRODUCT_DETAIL
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export const getProductDetail = id => async dispatch => {
  const request = await axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response => response.data);

  dispatch({
    type: GET_PRODUCT_DETAIL,
    payload: request
  });
};

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  };
}

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

export function addBrand(dataToSubmit, existingBrands) {
  const request = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit).then(response => {
    let brands = [...existingBrands, response.data.brand];

    return { success: response.data.success, brands };
  });

  return {
    type: ADD_BRAND,
    payload: request
  };
}

export const getWoods = () => async dispatch => {
  const request = await axios.get(`${PRODUCT_SERVER}/woods`).then(response => response.data);

  dispatch({
    type: GET_WOODS,
    payload: request
  });
};

export function addWood(dataToSubmit, existingWoods) {
  const request = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit).then(response => {
    let woods = [...existingWoods, response.data.wood];

    return { success: response.data.success, woods };
  });

  return {
    type: ADD_WOOD,
    payload: request
  };
}

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
