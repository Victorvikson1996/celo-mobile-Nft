import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { FetchNft } from "../../utils/fetchNft";
import COLORS from "../../utils/COLORS";

const galleryItemWidth = Dimensions.get("screen").width / 3;

const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

const GalleryItem = ({ item }) => {
  return (
    <Pressable style={styles.galleryItem_container}>
      <View style={styles.img_container}>
        <Image source={{ uri: item.imageUrl }} style={styles.nftImg} />
      </View>
      <View style={styles.txt_container}>
        <Text style={styles.txt1}>{item?.title}</Text>
        <Text style={styles.txt2}>{item?.desc}</Text>
      </View>
    </Pressable>
  );
};

const renderGalleryItem = ({ item }) => <GalleryItem item={item} />;

const NftScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const nav = useNavigation();

  let addr = accounts.length ? shortenAddress(accounts?.[0]) : "Wallet Id";

  // connec

  const connector = useWalletConnect();

  const onErr = () => {
    Alert.alert("Error", "You cancelled the connection request", [
      { text: "OK", onPress: () => nav.goBack() },
    ]);
  };

  const connectWallet = async () => {
    setLoading(true);
    connector
      .connect()
      .then((res) => {
        let acnts = res.accounts;
        if (acnts.length) {
          setAccounts(acnts);
          getNfts(acnts[0]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("nftGallery.js > connectWallet > err: ", err);
        onErr();
      });
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const getNfts = async (acnt) => {
    try {
      const theNfts = await FetchNft(acnt);
      setNfts(theNfts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("nftGallery.js > getNfts > err: ", err);
    }
  };

  const _disconnectWalletAlert = () => {
    Alert.alert(
      "Are you sure you want to disconnect your wallet?",
      "you can always reconnect later.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => _disconnectWallet() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <Text>{"My Gallery"} </Text>
      </TouchableOpacity>
      <View style={styles.outer_wallet_container}>
        <View style={styles.wallet_container} level={"2"}>
          <Text style={styles.wallet_id}>💎 {addr}</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator color="black" size={40} />
      ) : (
        <FlatList
          data={nfts || []}
          renderItem={renderGalleryItem}
          keyExtractor={(item, idx) => idx.toString()}
          numColumns={3}
          style={{ paddingHorizontal: 10 }}
          ListFooterComponent={
            <Button
              title="Disconnect"
              onPress={() => connector.killSession() && nav.goBack()}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 61,
  },
  outer_wallet_container: {
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  wallet_container: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  wallet_id: {
    fontSize: 12,
  },
  galleryItem_container: {
    flex: 1,
    maxWidth: "33.3%",
    padding: 3,
  },
  img_container: {
    backgroundColor: "#7980A4",
    flex: 1,
    height: galleryItemWidth - 12,
  },
  nftImg: {
    flex: 1,
    height: galleryItemWidth - 12,
  },
  txt_container: {
    paddingTop: 8,
    paddingBottom: 15,
  },
  txt1: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: "700",
  },
  txt2: {
    fontSize: 7,
    color: COLORS.black,
  },
});

export default NftScreen;
