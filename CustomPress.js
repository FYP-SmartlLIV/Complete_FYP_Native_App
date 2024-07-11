import { StyleSheet, Text, View,Pressable } from "react-native";
import React from "react";
import {Colors} from "./constants/GlobalStyle";
const CustomPress = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={{ color: Colors.primary_grey }}
    >
      <Text>
      {children}
      </Text>
    </Pressable>
  );
};

export default CustomPress;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
