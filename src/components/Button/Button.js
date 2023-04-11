import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

import COLORS from "../../../utils/COLORS";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        height: 55,
        width: "50%",
        backgroundColor: COLORS.green,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
      testID="button"
    >
      <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
