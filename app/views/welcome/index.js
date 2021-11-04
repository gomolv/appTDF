import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, } from "react-native";
import { FormControl, NativeBaseProvider, Text, Select, CheckIcon, Button, ScrollView } from 'native-base';
import { createStore } from 'redux'
import axios from 'axios'
import Stock from "../../components/stock";
import MenuWelcome from "../../components/menuWelcome";
import { Settings } from "../../settings";

const fruitmarkReducer = (state = "all", action) => {
    switch (action.type) {
        case 'update':
            return "update";
    }
}

const store = createStore(fruitmarkReducer);

class Stores extends Component {
    constructor(props) {
        super();
        this.state = {
            stores: [],
            stock: null
        }
    }

    async getStores() {
        await axios.get(Settings.url + `/store/list`).then((response) => {
            this.setState({ stores: response.data.stores })
        });
    }

    componentDidMount() {
        this.getStores();
    }

    render() {
        return (
            <>
                <View >
                    <Text marginTop="15"  >
                        Choose a Store
                    </Text>
                    <FormControl>
                        <Select placeholder="Choose a store"
                            accesinilityLabel="Chose a store" onValueChange={(val) => (this.getStock(val))}
                            _selectedItem={{ bg: "green.500", endIcon: <CheckIcon size={5} /> }}
                            mt="1" >
                            {(this.state.stores != [] ?
                                this.state.stores.map(store => <Select.Item label={store.city.name + ", " + store.city.cp} value={store.code} key={store.code} ></Select.Item>) : ""
                            )}
                        </Select>
                    </FormControl>
                </View>
                <Stock stock={this.state.stock} props={this.props} />
            </>
        );
    }


}


export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NativeBaseProvider flex={1}>
                <MenuWelcome props={this.props} />
                <ScrollView _contentContainerStyle={{ px: "20px", mb: "4", minW: "72" }}>
                    <Stores />
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}