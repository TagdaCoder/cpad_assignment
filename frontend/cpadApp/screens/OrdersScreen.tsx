import { StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from "react";

import { Container, Icon } from 'native-base';
import { Linking, TouchableOpacity, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from "axios";
import {  getOrdersURL } from "../shared/axiosConfig";

import { Platform } from 'react-native';
let ISAndroid = Platform.OS === 'android';

// const API_ENDPOINT = 'http://127.0.0.1:8000/'
const API_ENDPOINT = 'http://localhost:8000/'

let tempOrdersArray: { id: any, category: any; name: any; desc: any; image: any; amount: any; user: any; key1: any; showButton: boolean}[] = [];



export default function OrdersScreen() {
  const { showButton = false, quantity = 0 } = {showButton: true}
  const [btnshow, setshowButton] = useState(showButton);
  const [ordersArray, setOrdersArray] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    await axios({
      method: "get",
      url: getOrdersURL
    })
      .then(response => {
        console.log("response = ", response.data);
        if (response.data != "undefined") {
          for (let item of response.data) {
            tempOrdersArray.push({ category: item.category, 
                                id: item.id,
                                name: item.name, 
                                desc: item.desc,
                                image: item.image,
                                amount: item.amount,
                                user: item.user,
                                showButton: true, 
                                key1: item.key1
                              });
          }
        }
      })
      .catch(error => console.log("timeout exceeded"));
  
    console.log("tempOrdersArray =", tempOrdersArray);
    tempOrdersArray.map((item, index) => {
      console.log("item=", item);
    })
    setOrdersArray(tempOrdersArray);
  };

  return (
    <View style={styles.container}>
        <View>
            {ordersArray.length == 0 ?
                <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center", marginTop: "80%" }}>No Orders</Text>
                </View>
                :
                <View>
                    {/* {renderProducts()} */}
                    <FlatList
                        data={ordersArray}
                        renderItem={({ item }) => (
                            <View style={{ width: "100%" }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignContent: "left", alignItems: "center", margin: 10, }} >
                                    <View style={{  }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>OrderId - #{item.id} <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: 'green' }}>({item.key1})</Text></Text>
                                        <Text style={{ fontSize: 15, marginBottom: 8 }}><Text style={{ fontWeight: 'bold' }}>{item.name}</Text></Text>
                                        <Text style={{ fontSize: 15, marginBottom: 8 }}><Text style={{ fontWeight: 'bold' }}>Order Date</Text> - {new Date().toLocaleDateString()}</Text>
                                        <Text style={{ fontSize: 15, marginBottom: 8 }}>Order Amount - Rs. {item.amount}</Text>
                                    </View>
                                    {/* <Icon name="right" type="AntDesign" style={{ position: "absolute", right: 10 }} /> */}
                                </TouchableOpacity>
                                <View style={{ height: 1, width: "100%", backgroundColor: "grey" }} />
                            </View>
                        )}
                        onEndReached={() => {

                        }}
                        onEndReachedThreshold={0.5}
                        keyExtractor={item => item.id}
                    />
                </View>
            }
        </View>
    {/* <Loader loading={isLoading} loadingText={"Please wait"}></Loader> */}
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
