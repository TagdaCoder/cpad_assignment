import axios, { AxiosRequestConfig } from "axios";
// import assignIn from "lodash/assignin";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const API_ENDPOINT = process.env.NODE_ENV === "development" ? Constants.manifest.extra.devEndpoint : Constants.manifest.extra.prodEndpoint;
// const API_ENDPOINT = 'http://127.0.0.1:8000/'
const API_ENDPOINT = 'http://localhost:8000/'

const getdata = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = AsyncStorage.getItem("auth_token", (err, res) => {
      if (res) {
        unsubscribe;
        resolve(res);
      } else {
        unsubscribe;
        resolve(null);
      }
    });
  });
}
// const getAxiosConfig = async (options = {}) => {
//   let value = await getdata();
//   let timeout = 60 * 1 * 1000; // Let's say you want to wait at least 4 mins
//   if (value) {
//     options = {
//       headers: {
//         "Authorization": "Bearer " + value
//       },
//       timeout
//     }
//   }
//   const mergedObj = assignIn(
//     {
//       baseURL: API_ENDPOINT
//     },
//     options
//   );
//   return axios.create(mergedObj as AxiosRequestConfig);
// };

// Base URL of the server
const apiBaseURL = "";

// API for get products
const getProductsURL = 'http://34.221.153.203:5000/products/view';
const getOrdersURL = 'http://34.221.153.203:5000/order/view/mahaveer';
const getCartItemsURL = 'http://34.221.153.203:5000/cart/view/mahaveer';

export {
  getProductsURL,
  getOrdersURL,
  getCartItemsURL
};
