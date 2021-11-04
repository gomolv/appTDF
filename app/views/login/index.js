import React, { Component, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, TextInput, } from "react-native";
import { Button, Text, NativeBaseProvider } from 'native-base';
import { Settings } from "../../settings";
import axios from 'axios'

export default class Login extends Component {
    constructor({ navigation }) {
        super();
        this.state = {
            user: null,
            password: null
        }
    }

    render() {
        return (
            <NativeBaseProvider flex={1}>
                <View nativeID="login" name="login" style={styles.login}>
                    <Image style={styles.logo} source={require('../../assets/fruitmark.png')} />
                    <Text fontSize="lg" fontWeight="bold" color="green.600" >Welcome</Text>
                    <Text style={styles.title} >Username: </Text>
                    <TextInput style={styles.text} placeholder="Username" textContentType="nickname" value={this.state.user} nativeID="user" onChangeText={val => this.setUser({ user: val })} ></TextInput>
                    <Text style={styles.title}>Password: </Text>
                    <TextInput style={styles.text} placeholder="Password" secureTextEntry={true} textContentType="password" value={this.state.password} nativeID="password" onChangeText={val => this.setPassword({ password: val })}></TextInput>
                    <Button style={styles.btn} bgColor="orange.500" title="Log in" onPress={() => { this.props.navigation.navigate('Home') }}  >
                        <Text style={styles.btntitle} >Log in</Text>
                    </Button>
                </View></NativeBaseProvider>);
    }


    getData() {
        try {

            axios.get(Settings.url + `/store/list`).then((response) => {
            });
        } catch (error) {
            console.log(error)
        }
    }

}

const styles = StyleSheet.create({
    login: {
        flex: 1, justifyContent: 'center',
        marginLeft: '15%',
        marginRight: '15%'
    },
    logo: {
        maxHeight: 50
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 10,
        width: '100%',
        marginTop: 25,
        color: '#6cb63e',
    },
    btntitle: {
        fontWeight: "bold",
        color: "#FFF"
    },
    text: {
        borderWidth: 1,
        borderColor: '#a8a29e',
        height: 45,
        width: '100%',
        marginTop: 5,
        textAlign: 'left',
        borderRadius: 10
    },
    btn: {
        height: 45,
        width: '100%',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
});
