import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ConnectButtonScreen, NftScreen } from "../Screens";

const screenOptions = {
  headerShown: false,
};

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Button" component={ConnectButtonScreen} />
        <Stack.Screen name="NFT" component={NftScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
