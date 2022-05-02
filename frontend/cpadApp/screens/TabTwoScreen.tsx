import { StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from "react";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getAxiosConfig, getProductsURL } from "../shared/axiosConfig";
import axios from "axios";
// const API_ENDPOINT = 'http://127.0.0.1:8000/'
const API_ENDPOINT = 'http://localhost:8000/'



const getProducts = async () => {

  // const axiosConf = await getAxiosConfig({

  // });
  // const result = await axiosConf.get(`${getProductsURL}`).catch(ex => {
  //   console.log("Failed to get product items.");
  //   return {};
  // });
  // console.log("result = ", result);

  // axios({
  //     method: "post",
  //     url: API_ENDPOINT + "/api/product/productByVariant",
  //     data: {
  //         productId: props.items.product_id
  //     }
  // })
  //     .then(response => {
  //         //   console.log('response getCat',response);
  //         if (response.status == 200) {
  //             getVariants(response.data[0].category_id);
  //         }
  //     })
  //     .catch(error =>
  //         console.log("timeout exceeded getCatId", error)
  //     );
};

export default function TabTwoScreen() {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
