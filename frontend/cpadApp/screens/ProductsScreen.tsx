import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from "react";

import axios from "axios";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { h, w } from '../components/Dimension';
import {  getProductsURL } from "../shared/axiosConfig";
import Colors from '../Colors';

let tempProductArray: { category: any; name: any; desc: any; image: any; amount: any; user: any; showButton: boolean}[] = [];



const addData = () => {
  const dataRemove = false;
  // setQuantity(_quantity + 1)
  // addToCart();

  //increaseItem(dataRemove);
}

const removeData = () => {
  const dataRemove = false;

}

const increaseItem = async (dataRemove: boolean) => {

};

const decreaseItem = async (dataRemove) => {

};


export default function ProductsScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { showButton = false, quantity = 0 } = {showButton: true}
  const [btnshow, setshowButton] = useState(showButton);
  const [productArray, setProductArray] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("ProductArray =", productArray);
  }, productArray);

  const getProducts = async () => {

    await axios({
      method: "get",
      url: getProductsURL,
    })
      .then(response => {
        console.log("response = ", response.data);
        if (response.data != "undefined") {
          for (let item of response.data) {
            tempProductArray.push({ category: item.category, 
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

    console.log("tempProductArray =", tempProductArray);
    tempProductArray.map((item, index) => {
      console.log("item=", item);
    })
    setProductArray(tempProductArray);
  };

  const addDataToCart = (index: number) => {
    tempProductArray = productArray;
    console.log("index=", index);
    tempProductArray.map((item, i) => {
      console.log("index=", index, "  i=", i);
      if(i==index) {
        console.log("insode IF")
        tempProductArray[i].showButton = false
      }
    })
    console.log("tempProductArray =", tempProductArray);
    setProductArray(tempProductArray);
    console.log("ProductArray =", productArray);

    // console.log('addDataToCart', btnshow);
    setshowButton(false)
    
    //addItemPressed();
  }
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff', marginTop: h(1), width: "95%", alignSelf: "center", borderColor: 'grey', borderTopWidth: 1 }}>
        {productArray.length > 0 ? productArray.map((item, index) => (
          <View style={{ width: "90%"}}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
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
              <View>
                {index == 0 ? 
                <View>
                {btnshow == true &&
                  <TouchableOpacity
                          onPress={() => addDataToCart(index)} 
                          style={{
                              alignItems: "center", justifyContent: "center",
                              alignSelf: "center",
                              height: 30,
                              backgroundColor: Colors.addToCartButton,
                              borderRadius: 5
                          }}
                      >
                          <Text style={{ color: "white", marginLeft: 5, marginRight: 5 }}>ADD TO CART</Text>
                    </TouchableOpacity>
                }
                {btnshow == false &&
                  <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                      <TouchableOpacity
                          onPress={() => removeData()}
                          style={{ height: h(3), width: h(3), borderWidth: 1, borderRadius: 5, borderColor: "red", alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: h(3), textAlign: 'center', color: 'red' }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ width: w(10), textAlign: 'center', color: 'red' }}>1</Text>
                      <TouchableOpacity
                          onPress={() => addData()}
                          style={{ height: h(3), width: h(3), borderWidth: 1, borderRadius: 5, borderColor: "red", alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: h(3), textAlign: 'center', color: 'red' }}>+</Text>
                      </TouchableOpacity>
                  </View>
                }
                </View>
                :
                <View>
                  <TouchableOpacity
                      onPress={() => addDataToCart(index)} 
                      style={{
                          alignItems: "center", justifyContent: "center",
                          alignSelf: "center",
                          height: 30,
                          backgroundColor: Colors.addToCartButton,
                          borderRadius: 5
                      }}
                  >
                      <Text style={{ color: "white", marginLeft: 5, marginRight: 5 }}>ADD TO CART</Text>
                  </TouchableOpacity>
                </View>
                }
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderColor: 'gray', margin: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'space-between' }}/>

          </View>
        )) 
        : 
        <View>
          <Text> Not looping</Text>
        </View> }

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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


