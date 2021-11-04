import React, { Component, } from "react";
import { View, StyleSheet,  } from "react-native";
import {
    Badge, Divider, VStack, HStack, Image, Text, FormControl, Stack, Select, CheckIcon, Modal,
    Button, Box,
    Center
} from 'native-base';
import { Settings } from "../../settings";
import axios from 'axios'


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


export default class AdminStock extends Component {

    constructor(props) {
        super(props);
        this.store = null;
        this.to = null;
        this.stores = null;
        this.from = null,
            this.send = true;
        this.state = {
            showModal: false,
            setShowModal: false,
            quantity: 0,
            fruit: null,
            send: true
        }
    }

    render() {
        var total = 0;
        this.getFrom();

        return (
            <>
                <View style={styles.View5} >
                    <VStack divider={<Divider />} w="100%" direction="column-reverse" >
                        {(this.props.stock === null ?
                            <View key={"hstack"}>
                                <View style={styles.View1}  >
                                    <Image source={require("./../../assets/fruitmark.png")} alt="Fruitamrk AppStore" key="fruitmark" />
                                </View>
                                <View style={styles.View1}  >
                                    <Text fontSize="lg" fontWeight="bold" color="green.600" >Welcome, Mr. Menjour. Choose a store to display the Stock</Text>
                                </View>
                            </View> :
                            (
                                this.props.stock.map(fruit =>
                                (total += fruit.inStock,
                                    this.StockItem(fruit))))
                        )
                        }

                        <HStack justifyContent="flex-end" key={"totalFruits"} marginBottom="10px">
                            <Box >
                                <Text fontSize="lg" fontWeight="extrabold" right="1" color="orange.500" >{(this.props.stock != null ? total + " fruits in stock." : "")}</Text>
                            </Box>
                        </HStack>
                    </VStack>
                </View>
                {this.transfer()}
            </>
        );
    }

    getFrom() {
        var size = this.props.stores.length;
        var elements = [];
        for (var i = 0; i < size; i++) {
            if (this.props.stores[i].code == this.props.store) {
                this.from = this.props.stores[i];
            } else {
                elements.push(this.props.stores[i]);
            }
        }
        this.stores = elements;
    }



    add() {
        var q = this.state.quantity + 1
        if (q <= this.state.fruit.inStock) {
            this.setState({ quantity: q });
        }
        this.validate();
    }



    subs() {
        var q = this.state.quantity - 1
        if (q >= 0) {
            this.setState({ quantity: q });
        }
        this.validate();
    }

    validate() {
        if (0 < this.state.quantity && this.to !== null) {
            this.setState({ send: false })
        } else {
            this.setState({ send: true })
        }
    }


    async doTransfer() {
        this.setState({ send: true })
        const body = {
            "catalog_id": this.state.fruit.catalog_id,
            "from_id": this.from._id,
            "to_id": this.to,
            "quantity": this.state.quantity
        }
        try {
            await axios.put(Settings.url + `/product/transfer`, body, { headers: Settings.headers }).then((response) => {
                if (response.status) {
                    alert("Successful Transaction");
                } else {
                    alert("Opps! Something went wrong. Try again.");
                }
            });
        } catch (error) {

        }
        this.clean();
    }

    clean() {

        this.setState({ showModal: false });
        this.to = null;
        this.setState({ send: true })
        this.setState({ quantity: 0 });
        this.setState({ fruit: null });
    }




    transfer() {
        return (<Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
            <Modal.Content maxWidth="100%">
                <Modal.Header>
                    <Text fontSize="2xl" fontWeight="bold"  >Transfer fruits</Text></Modal.Header>
                <Modal.Body>
                    <View nativeID="login" name="login">
                        <View >
                            <HStack alignItems="center">
                                <Box h="100%" w="40%" >{(this.state.fruit != null ? this.getImage(this.state.fruit.image) : "")}</Box>
                                <Box h="100%" w="60%"   >
                                    <Text fontSize="2xl" fontWeight="bold" color="orange.500" >{(this.state.fruit != null ? this.state.fruit.name : "")}</Text>
                                    <Badge width="75%"  >{(this.state.fruit != null ? this.state.fruit.inStock + " pieces in stock" : "")}</Badge>
                                </Box>
                            </HStack>

                            <FormControl style={{ marginTop: 25 }} >
                                <Text fontSize="lg" fontWeight="bold" color="green.500" >From: {this.from != null ? this.from.city.name + ", P.C. " + this.from.city.cp : ""}</Text>
                                <Text fontSize="lg" style={{ marginTop: 25 }} fontWeight="semibold" >Choose the store to transfer: </Text>
                                <Select placeholder="Choose a store" key="chooseTO"
                                    accesinilityLabel="Chose a store" onValueChange={(val) => { this.to = val, this.validate(); }}
                                    _selectedItem={{ bg: "orange.500", endIcon: <CheckIcon size={5} /> }}
                                    mt="1" >
                                    {(this.stores != null ?
                                        this.stores.map(store => (<Select.Item label={store.city.name + ", P.C. " + store.city.cp}
                                            value={store._id} key={store.code} ></Select.Item>)) : "")}
                                </Select>
                            </FormControl>
                        </View>
                        <View style={{ marginTop: 25 }} >
                            <Stack space={3} >
                                <HStack textAlign="center">
                                    <Text fontSize="md" fontWeight="semibold" >Choose the amount:</Text>
                                </HStack>
                                <HStack space={3} alignItems="center">
                                    <Button h="20" w="20" onPress={() => this.subs()} rounded="full" borderColor="green.500" bgColor="white" borderWidth="2" shadow={3} title="Log in"  >
                                        <Text fontSize="4xl" color="green.500" fontWeight="extrabold"  >-</Text>
                                    </Button>
                                    <Center h="20" w="20" rounded="md" ><Text fontSize="4xl" fontWeight="bold"  >{this.state.quantity}</Text></Center>
                                    <Button h="20" w="20" onPress={() => this.add()} rounded="full" borderColor="orange.500" bgColor="white" borderWidth="2" shadow={3} title="Log in" >
                                        <Text fontSize="4xl" color="orange.500" fontWeight="extrabold"  >+</Text>
                                    </Button>
                                </HStack>
                            </Stack>

                        </View>
                    </View>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group marginTop="35" space={2}>
                        <Button height="45" borderRadius={10} width="45%"
                            backgroundColor="green.500" color="black"
                            onPress={() => this.clean()}
                        >
                            Cancel
                        </Button>
                        <Button height="45" width="55%" bgColor="orange.500" borderRadius={10} isDisabled={this.state.send} onPress={() => this.doTransfer()} >
                            Transfer fruits</Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>);
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
                <HStack space={2} marginBottom="10px" marginTop="10px" >
                    <Button width="68%" bgColor="green.500" rounded="md" shadow={3} key={item._id} onPress={() => { this.setState({ fruit: item }), this.transfer(), this.setState({ showModal: true }) }} >
                        Transfer</Button>
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
                } marginBottom="10px" marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="cherry" />;
            case "strawberry.png":
                return <Image source={
                    require("./../../assets/strawberry.png")
                } marginBottom="10px" marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="strawberry" />;
            case "apple.png":
                return <Image source={
                    require("./../../assets/apple.png")
                } marginBottom="10px" marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="apple" />;
            case "banana.png":
                return <Image source={
                    require("./../../assets/banana.png")
                } marginBottom="10px" marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="banana" />;
            case "orange.png":
                return <Image source={
                    require("./../../assets/orange.png")
                } marginBottom="10px" marginTop="15px"
                    alt="Alternate Text" height="300px"
                    size="24" key="orange" />;
        }
    }

}