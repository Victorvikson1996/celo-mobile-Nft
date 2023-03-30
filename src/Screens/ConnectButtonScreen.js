import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Button from "../components/Button/Button";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useNavigation } from "@react-navigation/native";

const makeAddressShort = (address) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

const ConnectButtonScreen = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();

  const connectWallet = useCallback(() => {
    // return connector.connect();
    navigation.navigate("NFT");
  }, [connector]);

  // React.useEffect(() => {
  //   if (connector.connected()) {
  //     navigation.navigate("NFT");
  //   }
  // }, [connector]);

  const killSession = useCallback(() => {
    return connector.killSession();
  }, [connector]);
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
