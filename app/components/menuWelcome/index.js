import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { HStack, Text, Image, Button } from "native-base";

const styles = StyleSheet.create({
    btntitle: {
        fontWeight: "bold",
        color: "#FFF"
    },
    btn: {
        height: 45,
        width: 100,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
});
export default class MenuWelcome extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <>
                <HStack bg='green.500' px="1" py="3" justifyContent='space-between' alignItems='center'>
                    <HStack space="4" alignItems='center'>
                        <Image source={
                            require("./../../assets/fruitmark-altern.png")
                        } marginLeft="10px"
                            alt="Alternate Text" maxHeight="22px" key="logo" />
                    </HStack>
                    <HStack space="2">
                        <Button style={styles.btn} bgColor="orange.500" title="Log in" onPress={() => { this.props.props.navigation.navigate('Login') }}  >
                            <Text style={styles.btntitle} >Log in</Text>
                        </Button>
                    </HStack>
                </HStack>
            </>
        );
    }
}