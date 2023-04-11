import { View, StyleSheet } from "react-native";
import React from "react";
import Button from "../components/Button/Button";
import { useNavigation } from "@react-navigation/native";

const ConnectButtonScreen = () => {
  const navigation = useNavigation();

  const connectWallet = () => {
    navigation.navigate("NFT");
  };

  return (
    <View style={styles.container}>
      <Button onPress={connectWallet} title="Connect" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ConnectButtonScreen;
