import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from "react";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getCartItemsURL } from "../shared/axiosConfig";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Colors';
import { h, w } from '../components/Dimension';
// const API_ENDPOINT = 'http://127.0.0.1:8000/'
const API_ENDPOINT = 'http://localhost:8000/'

let tempCartItemsArray: { category: any; name: any; desc: any; image: any; amount: any; user: any; showButton: boolean}[] = [];



export default function CartScreen() {
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    await axios({
      method: "get",
      url: getCartItemsURL,
    })
      .then(response => {
        console.log("response = ", response.data);
        if (response.data != "undefined") {
          for (let item of response.data) {
            tempCartItemsArray.push({ category: item.category, 
                                name: item.name, 
                                desc: item.desc,
                                image: item.image,
                                amount: item.amount,
                                user: item.user,
                                showButton: true 
                              });
          }
        }
      })
      .catch(error => console.log("timeout exceeded"));
  
    console.log("tempCartItemsArray =", tempCartItemsArray);
    let total = 0;
    let count = 0;
    tempCartItemsArray.map((item, index) => {
      total = total + parseInt(item.amount);
      count = count + 1;
      console.log("item=", item);
    })
    setTotalAmount(total);
    setCartCount(count);
    setCartItemsArray(tempCartItemsArray);
  };

  const checkout = async () => {

  }

  return (
    <View style={styles.container}>
        {cartItemsArray.length <= 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
              <FontAwesome
                name="info-circle"
                size={25}
                style={{ marginRight: 15 }}
              />
            <Text style={{ color: "#95a5a6" }}>Your cart is empty</Text>
          </View>
        ) : (
            <View style={{ paddingRight: 10 }}>
              <View style={{ backgroundColor: 'white', margin: 0, padding: 8, borderBottomColor: '#EDEDED', borderBottomWidth: 2 }}>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text style={{ flex: 1 }} >Price ({cartCount} Items)</Text>
                  <Text style={{ justifyContent: 'flex-end' }}>Rs. {totalAmount}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ flex: 1 }} >Delivery Fee</Text>
                  <Text style={{ justifyContent: 'flex-end', color: 'green' }}>Rs 100</Text>
                </View>
              </View>
              <View style={{ backgroundColor: 'white', margin: 0, padding: 8, borderBottomColor: '#EDEDED', borderBottomWidth: 2 }}>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text style={{ flex: 1, fontWeight: 'bold' }} >Total Amount</Text>
                  <Text style={{ justifyContent: 'flex-end', fontWeight: 'bold' }}>Rs. {totalAmount + 100}</Text>
                </View>
              </View>
              <View>

              {cartItemsArray.length > 0 && cartItemsArray.map((item, index) => (
                <View style={{ width: "90%"}}>
                  <View style={{ flexDirection: "row", marginTop: 10, width: "90%" }}>
                    <Image
                        resizeMode="contain"
                        source={{
                          uri: item.image
                        }}
                        style={{ height: 100, width: 100 }}
                    />
                    <Text style={{ color: Colors.buttonsColor, fontSize: h(2.5) }}>{item.name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: h(1.5), marginBottom: 10, width: "90%" }}>
                    <View style={{flexDirection: 'row', width: "70%"}}>
                      <Text style={{ fontSize: h(2), fontWeight: "bold" }}>MRP: </Text>
                      <Text style={{ fontWeight: "bold" }}>
                          Rs. {item.amount}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', borderColor: 'gray', margin: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'space-between' }}/>

                </View>
              ))}

                <View style={{ height: 70 }} />
              </View>
            </View>
          )}
        <View style={{
          flexDirection: "row", width: '100%', alignSelf: "center", position: "absolute", alignContent: "center",
          bottom: 0,
        }}>
          <TouchableOpacity
            disabled={cartCount == 0 ? true : false}
            onPress={() => { cartCount == 0 ? null : checkout() }}
            style={{
              width: "90%",
              alignContent: "center",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              borderWidth: 1,
              borderColor: 'white',
              backgroundColor: cartCount == 0 ? "grey" : Colors.buttonsColor,
              borderRadius: 5,
              marginLeft: 10, marginRight: 10
            }}
          >
            <View style={{ alignContent: "center", alignItems: "center", backgroundColor: Colors.buttonsColor}}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>
                Total= Rs. {cartCount == 0 ? 0 : parseInt(totalAmount) + 100}
              </Text>
            </View>
            <View style={{ height: 40, backgroundColor: "white", width: 1 }} />
            <View style={{ flexDirection: "row", alignSelf: "center", alignContent: "center", alignItems: "center", backgroundColor: Colors.buttonsColor}}>
              <FontAwesome name="credit-card" size={25} style={{ marginRight: 15 }}/>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 8, }}>
                Checkout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
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
