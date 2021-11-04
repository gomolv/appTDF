/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/views/login';
import Home from './app/views/home';
import Welcome from './app/views/welcome'
import type {Node} from 'react';
import MenuWelcome from './app/components/menuWelcome';
import Menu from './app/components/menu';

//const Hello = () => <Text>mi componente </Text>;


/*class App extends Component {
  render(){
    return ( 
      <View style={{flex: 2, backgroundColor: 'green'}} >
        <View style={{flex: 2 , backgroundColor: 'blue'}} ></View>
        <Stack.Screen name="log" component={login}  />
        </View>
      );
  };
}function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>body</Text>
    </View>
  );
}*/





const styles = StyleSheet.create({

});


const Stack = createNativeStackNavigator();
/*
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: 'Overview' }}
/>
*/
const App: () => Node = () => {
    return (
      <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="Welcome" component={Welcome}  options={{title: "Welcome", headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{title: "Log in", headerShown: false}}  />
        <Stack.Screen name="Home" component={Home} options={{title: "Home", headerShown: false}} />
      <Stack.Screen name="MenuWelcome" component={MenuWelcome} options={{title: "MenuWelcome", headerShown: false}} />
      <Stack.Screen name="Menu" component={Menu} options={{title: "Menu", headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    );
};

//<Stack.Screen name="FruitMark" component={HomeScreen}  />
    /*
    NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="log" component={login}  />
      </Stack.Navigator>
    </NavigationContainer>
    */
/*import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};*/


  /*
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );*/


/*
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
*/
export default App;
