import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
  FlatList,
  AsyncStorage,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import Loading from "./Loading";

import { connect } from "react-redux";

import { fetchCheckoutPending } from "../public/redux/checkout/checkout.actions";

class ListHistories extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.items}>
        <View
          style={{ flexDirection: "row", margin: 13, alignItems: "center" }}
        >
          <Text
            style={{
              flex: 1,
              marginLeft: "2%",
              fontSize: 15,
              fontWeight: "500",
              color: "#000",
            }}
          >
            {}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              marginRight: "5%",
              color: "#EE4D2D",
            }}
          >
            Đã đánh giá
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", margin: 13, alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#000",
              width: 100,
              height: 100,
              borderWidth: 0.5,
            }}
          >
            {this.props.checkout.data.map((item) => (
              <Image
                key={product._id}
                style={{ width: "100%", height: "100%" }}
                source={{ uri: product.thumbnail }}
              />
            ))}
          </View>
          {this.props.checkout.data.map((item) => (
            <View style={{ margin: 13, width: "63%", height: "100%" }}>
              <Text style={{ flex: 1, fontSize: 15, color: "#000" }}>
                {item.products[0].name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: "#000",
                  textAlign: "right",
                }}
              >
                x1
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: "#000",
                  textAlign: "right",
                }}
              >
                {item.products[0].price}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 13,
            marginRight: 18,
            alignItems: "center",
            borderBottomWidth: 0.4,
            borderTopWidth: 0.4,
            borderColor: "grey",
          }}
        >
          <Text style={{ flex: 1, margin: 10 }}>1 sản phẩm</Text>
          <Text style={{ flex: 2, margin: 10, textAlign: "right" }}>
            Số tiền phải trả:{" "}
          </Text>
          <Text style={{ color: "#EE4D2D" }}>VNĐ</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 13,
            marginRight: 18,
            alignItems: "center",
            borderBottomWidth: 0.4,
            borderColor: "grey",
          }}
        >
          <MaterialCommunityIcons
            name="truck-fast"
            size={24}
            color={"#008eaa"}
          />
          <Text style={{ flex: 8, margin: 10, color: "#008eaa" }}>
            Hàng đã nhận
          </Text>
          <SimpleLineIcons
            name="arrow-right"
            style={{ flex: 1, marginRight: "-5%" }}
            size={18}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 13,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ flex: 1 }}></Text>
          <TouchableOpacity
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "#EE4D2D",
              height: 40,
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
              Đánh giá từ người mua
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
    this._bootstrapAsync;
  }

  componentDidMount() {
    this.fetchHistory();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this._bootstrapAsync();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  fetchHistory = async () => {
    this.setState({ isLoading: true });
    const userToken = await AsyncStorage.getItem("Token");
    await this.props.fetchCheckoutPending(userToken);
    this.setState({ isLoading: false });
  };

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("Token");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    if (userToken) {
      this.setState({
        isLogin: true,
      });
    } else {
      this.setState({
        isLogin: false,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.follow}
              onPress={() => this.props.navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color={"#EE4D2D"} />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={styles.text}>Đơn hàng của tôi</Text>
            </View>
            <TouchableHighlight style={styles.chat}>
              <SimpleLineIcons name="bubbles" size={24} color={"#EE4D2D"} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.container}>
          <ScrollView>
            <View>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <FlatList
                  data={this.props.checkout.data}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item, index }) => {
                    return <ListHistories item={item} index={index} checkout={this.props.checkout} />;
                  }}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCheckoutPending: (token) => dispatch(fetchCheckoutPending(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    height: 80,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  headerTop: {
    flexDirection: "row",
    top: 40,
    alignItems: "center",
  },
  title: {
    width: "55%",
    marginLeft: "5%",
  },
  text: {
    fontSize: 17,
    color: "#000",
  },
  follow: {
    marginLeft: "5%",
  },
  chat: {
    marginLeft: "13%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
    backgroundColor: "#EFEFEF",
  },
  items: {
    marginTop: "2%",
    width: "100%",
    height: 325,
    backgroundColor: "#FFFFFF",
  },
});
