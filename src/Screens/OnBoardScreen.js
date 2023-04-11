import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import COLORS from "../../utils/COLORS";

export default function OnBoardScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("Button");
  }, 100);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Celo NFT</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
