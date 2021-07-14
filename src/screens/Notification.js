import React, { Component } from "react";
import {
  Text,
  View,
  Image,
} from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image
          source={require("../assets/icon/shopee-seeklogo.com.png")}
          style={{ width: 80, height: 120 }}
        />
        <Text style={{ fontSize: 17, fontWeight: "600" }}>Soon!</Text>
      </View>
    );
  }
}