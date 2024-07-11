import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
function NoticeBoard() {
  const [news, setNews] = useState([]);
  const [type, setType] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.0.2.2:3001/news", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNews(response.data.Title);
        setType(response.data.Type);
      });
  }, []);

  return (
    <View clasName={styles.contianer}>
      <LinearGradient style={styles.board} colors={["#0b0c4b", "#0b8793"]}>
        <View className=" rounded-2xl items-center justify-center my-4 h-48  mx-4 shadow-2xl">
          <Text className="text-center font-semibold text-xl p-2 text-white">
          {news}
          </Text>
          <Text className="text-center   p-2 text-white">
            {`Type | ${type}`}
          
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

export default NoticeBoard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  board: {
    margin: 18,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
  },
});
