import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, } from "react-native";
import {
    Badge, Divider, VStack, HStack, Image, Text, FormControl, NativeBaseProvider, Select, CheckIcon, Modal,
    Button,
    ScrollView, Heading,
    Center
} from 'native-base';
import { Settings } from "../../settings";
import { createStore } from 'redux'
import axios from 'axios'
import AdminStock from "../../components/adminStock";
import Menu from "../../components/menu";

const styles = StyleSheet.create({
    View1: {
        flex: 1,
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    View5: {
        flex: 6,
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%'
    },
});

const fruitmarkReducer = (state = "all", action) => {
    switch (action.type) {
        case 'update':
            return "update";
    }
}

const store = createStore(fruitmarkReducer);


class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            stock: null,
            store: null
        }

    }

    async getStores() {
        await axios.get(Settings.url + `/store/list`).then((response) => {
            this.setState({ stores: response.data.stores })
        });
    }

    async getStock(code) {
        var stock = null;
        return await axios.get(Settings.url + `/product/inStore?code=` + code).then((response) => {
            this.setState({ stock: response.data.products })
        });
    }

    componentDidMount() {
        this.getStores();
    }

    render() {
        return (
            <>
                <View style={styles.View1}  >
                    <FormControl>
                        <FormControl.Label>
                            Choose a Store
                        </FormControl.Label>
                        <Select placeholder="Choose a store"
                            accesinilityLabel="Chose a store" onValueChange={(val) => (this.setState({ store: val }), this.getStock(val))}
                            _selectedItem={{ bg: "orange.500", endIcon: <CheckIcon size={5} /> }}
                            mt="1" >
                            {(this.state.stores != [] ?
                                this.state.stores.map(store => <Select.Item label={store.city.name + ",  P.C. " + store.city.cp} value={store.code} key={store.code} ></Select.Item>) : ""
                            )}
                        </Select>
                    </FormControl>
                </View>
                <AdminStock stock={this.state.stock} store={this.state.store} stores={this.state.stores} props={this.props} />
            </>
        );
    }


}


export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NativeBaseProvider flex={1}>
                <Menu props={this.props} />
                <ScrollView _contentContainerStyle={{ px: "20px", mb: "4", minW: "72" }}>
                    <Stores props={this.props} />
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}