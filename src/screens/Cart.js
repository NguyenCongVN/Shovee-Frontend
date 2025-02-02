import React, { Component } from "react";
import {AsyncStorage} from 'react-native'
import { connect } from "react-redux";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  CheckBox,
  FlatList,
  ScrollView,
} from "react-native";
import Fa from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Loading from "./Loading";
import { deleteCartPending , postCartPending } from "../public/redux/cart/cart.actions";

class CartList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      checked: true,
      isLoading: false,
      token : ''
    };
    console.log(this.props.item);
  }

  async componentDidMount() {
      await AsyncStorage.getItem('Token').then(result => {
          this.setState({
              ...this.state,
              token : result
          })
      })
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,0.08)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <CheckBox
                  value={this.state.checked}
                  onValueChange={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
              </View>

              <View style={{ flex: 9 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{
                      uri: this.props.item.product.seller.image_profil,
                    }}
                    style={{ width: 24, height: 24, borderRadius: 50 }}
                  />

                  <Text style={{ color: "#000" }}>
                    {" "}
                    {this.props.item.product.seller.user.username}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: "#fff" }}>
            <View
              style={{
                flexDirection: "row",
                padding: 15,
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <CheckBox
                  value={this.state.checked}
                  onValueChange={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
              </View>
              <View style={{ flex: 9 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: this.props.item.product.thumbnail }}
                    style={{ width: 72, height: 72 }}
                  />

                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      marginLeft: 8,
                    }}
                  >
                    <Text numberOfLines={1}>
                      {this.props.item.product.name}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.deleteCartPending(this.props.item._id , this.state.token , true );
                        }}
                      >
                        <AntDesign name="minussquareo" size={20} />
                      </TouchableOpacity>

                      <View>
                        <Text> {this.props.item.entity} </Text>
                      </View>

                      <TouchableOpacity onPress={() => {
                          this.props.postCartPending(this.props.item.product._id , this.state.token)
                      }}>
                        <AntDesign name="plussquareo" size={20} />
                      </TouchableOpacity>
                    </View>

                    <Text style={{ color: "#ee4d2d" }}>
                      {this.props.item.product.price} VNĐ
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  countPrice = () => {
    const arr = [];
    this.props.cart.data.map((item) => arr.push(item.product.price * item.entity));
    let totalPrice = arr.reduce((x, y) => x + y);
    return totalPrice;
  };

  render() {
    return (
      // HEADER \\
      <React.Fragment>
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: 24,
            right: 0,
            left: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 15,
              paddingVertical: 18,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Image
                  source={require("../assets/icon/left-arrow.png")}
                  style={{ width: 28, height: 28 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 20, color: "#000" }}>Giỏ hàng</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity>
                <AntDesign size={26} name="message1" color={"#ee4d2d"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            position: "absolute",
            top: 88,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#efefef",
          }}
        >
          <View style={{ backgroundColor: "#fff7b8" }}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 17,
                paddingVertical: 13,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Fa name="truck" color={"#01bfa5"} size={24} />
              </View>
              <View style={{ flex: 8 }}>
                <Text style={{ fontSize: 15 }}>
                  Chọn voucher để giao hàng miễn phí
                </Text>
              </View>
            </View>
          </View>

          {this.props.cart.isLoading ? (
            <Loading />
          ) : this.props.cart.data.length === 0 ? (
            <Text>Chưa có hàng</Text>
          ) : (
            <FlatList
              data={this.props.cart.data}
              keyExtractor={(item, index) => item._id}
              style={{marginBottom : 60}}
              renderItem={({ item, index }) => {
                return (
                  <CartList
                    item={item}
                    index={index}
                    deleteCartPending={this.props.deleteCartPending}
                    postCartPending={this.props.postCartPending}
                  />
                );
              }}
            />
          )}
        </ScrollView>

        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  value={this.state.checked}
                  onValueChange={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
                <Text style={{ color: "#000" }}>Chọn tất cả</Text>
              </View>
            </View>

            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Text style={{ color: "#000" }}>
                Tổng :{" "}
                <Text style={{ color: "#ee4d2d"}}>
                  {this.props.cart.data.length === 0 ? 0 : this.countPrice()}{" "}
                  VNĐ{" "}
                </Text>
              </Text>
              <Text style={{ fontSize: 12, color: "#f6a700" }}>Nhận 0 xu</Text>
            </View>

            {this.props.cart.data.length === 0 ? (
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "#efefef",
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginLeft: 10,
                }}
                disabled
                onPress={() => {
                  this.props.navigation.navigate("Checkout", this.countPrice());
                }}
              >
                <Text style={{ color: "#000", fontSize: 16 }}>Thanh toán</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "#ee4d2d",
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginLeft: 10,
                }}
                onPress={() => {
                  this.props.navigation.navigate("Checkout", this.countPrice());
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Thanh toán</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartPending: (id, token, wantDecrease) =>
      dispatch(deleteCartPending(id, token, wantDecrease)),
      postCartPending : (id , token) => dispatch(postCartPending(id , token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
