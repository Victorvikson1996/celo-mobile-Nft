import "./shims";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Navigation } from "./src/Navigation";
import { WalletConnectProvider } from "@walletconnect/react-native-dapp/dist/providers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCHEME_FROM_APP_JSON = "connectDapp";

export default function App() {
  return (
    <WalletConnectProvider
      redirectUrl={
        Platform.OS === "web"
          ? window.location.origin
          : `${SCHEME_FROM_APP_JSON}://`
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
    >
      <Navigation />
    </WalletConnectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
