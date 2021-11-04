import React, { Component } from "react";
import { VStack, HStack, Button, IconButton, Image, Text, NativeBaseProvider, Center, Box, StatusBar } from "native-base";


export default class Menu extends Component {

  constructor(props) {
    super(props)
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
            <Button bgColor="orange.500" marginRight="10px" title="Log in" onPress={() => { this.props.props.navigation.navigate('Welcome') }}  >
              Log out
            </Button>
          </HStack>
        </HStack>
      </>
    );
  }
}