import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, } from "react-native";
import {
    Badge, Divider, VStack, HStack, Image, Text, FormControl, NativeBaseProvider, Select, CheckIcon, Modal,
    Button,
    ScrollView, Box,
    Center
} from 'native-base';

import axios from 'axios'


const styles = StyleSheet.create({
    View1: {
        flex: 1,
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    View8: {
        flex: 8,
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%'
    },
});


export default class Stock extends Component{

    constructor(props) {
        super();
    }

    
    
    render() {        
        var total = 0;
        (this.props.stock != null ? console.log("1") : console.log("2")
        )
        return(
         <View style={styles.View8} >
            <VStack divider={<Divider />} w="100%" direction="column-reverse" >
                { ( this.props.stock === null ?
                <View key={"hstack"}>
                    <View style={styles.View1}  >
                    <Image source={ require("./../../assets/fruitmark.png")} alt="Fruitamrk AppStore" key="fruitmark" />
                </View>
                <View style={styles.View1}  >
                <Text fontSize="lg" fontWeight="bold" color="green.600" >Welcome, Choose a store to display the Stock</Text>
                </View>
                </View> : 
                (console.log("DEBERIA IMPRIMIR") ,
                this.props.stock.map(fruit => 
                        (total += fruit.inStock,
                         this.StockItem(fruit))) )
                )
                }
                

                <HStack justifyContent="flex-end" key={"totalFruits"} marginBottom="10px">
                <Box >
                    <Text fontSize="lg" fontWeight="extrabold" right="1" color="orange.500" >{ ( this.props.stock !=null ? "Fruits in Stock: " + total : "" )}</Text>
                </Box>
            </HStack>
            </VStack>
        </View>
        );
    }


    StockItem(item) {
        return (<HStack justifyContent="space-between" key={"item_" + item.barcode}>
            <View style={{ flex: 4 }} >
                {this.getImage(item.image)}
            </View>
            <View style={{ flex: 6 }}  >
            <Text fontSize="lg" fontWeight="bold" >{item.name}</Text>
                    <Text fontSize="md" fontWeight="semibold" color="orange.500"  >{'€ ' + item.price}</Text>
                <Badge width="68%"  >{item.inStock + " pieces in stock."}</Badge>
                                <HStack space={2}  marginBottom="10px"  marginTop="10px" >
                    <Button width="68%" bgColor="green.500" rounded="md" shadow={3}>add to cart</Button>
                </HStack>
            </View>
    
        </HStack>
        );
    }

    

    getImage(param) {
        switch (param) {
            case "cherry.png":
                return <Image source={
                    require("./../../assets/cherry.png")
                }  marginBottom="10px"  marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="cherry" />;
            case "strawberry.png":
                return <Image source={
                    require("./../../assets/strawberry.png")
                } marginBottom="10px"  marginTop="15px"
                    alt="Alternate Text" height="300px" 
                    size="24" key="strawberry" />;
            case "apple.png":
                return <Image source={
                    require("./../../assets/apple.png")
                } marginBottom="10px"  marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="apple" />;
            case "banana.png":
                return <Image source={
                    require("./../../assets/banana.png")
                } marginBottom="10px"  marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="banana" />;
            case "orange.png":
                return <Image source={
                    require("./../../assets/orange.png")
                } marginBottom="10px"  marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="orange" />;
        }
    }

}