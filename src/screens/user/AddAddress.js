import React, { Component } from "react";
import {
  AsyncStorage,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { updateProfileUserPending } from "../../public/redux/user/user.actions";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      province: "",
      city: "",
      district: "",
      zipCode: "",
      address: "",
      loading: false,
      token: "",
    };

    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    await AsyncStorage.getItem("Token", (error, result) => {
      if (result) {
        this.setState({
          token: result,
        });
      }
    });
  };

  setname = (data) => {
    this.setState({
      name: data,
    });
  };

  setprovince = (data) => {
    this.setState({
      province: data,
    });
  };

  setcity = (data) => {
    this.setState({
      city: data,
    });
  };

  setdistrict = (data) => {
    this.setState({
      district: data,
    });
  };

  setPOS = (data) => {
    this.setState({
      zipCode: data,
    });
  };

  setaddress = (data) => {
    this.setState({
      address: data,
    });
  };

  updateProfile = () => {
    this.props.updateProfileUserPending(
      [this.state.token,
      this.state.name,
      this.state.province,
      this.state.city,
      this.state.district,
      this.state.zipCode,
      this.state.address]
    );
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => this.props.navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color={"#EE4D2D"} />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={{ color: "#000000", fontSize: 17 }}>
                Thêm địa chỉ giao hàng
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 80,
            backgroundColor: "#f2f2f2",
            height: 10,
            paddingLeft: 25,
          }}
        ></View>
        <View style={styles.container}>
          <TextInput
            placeholder="Tên địa chỉ"
            style={styles.items}
            onChangeText={this.setname}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Tỉnh"
            style={styles.items}
            onChangeText={this.setprovince}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Thành phố"
            style={styles.items}
            onChangeText={this.setcity}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Quận"
            style={styles.items}
            onChangeText={this.setdistrict}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Mã bưu điện"
            style={styles.items}
            onChangeText={this.setPOS}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Địa chỉ"
            multiline={true}
            style={styles.itemsLengkap}
            onChangeText={this.setaddress}
          />
        </View>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <TouchableOpacity
            style={styles.buttonTambah}
            onPress={() => this.updateProfile()}
          >
            <Text style={{ color: "#FFFFFF" }}>Trở lại</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    updateProfileUserPending: (data) =>
      dispatch(updateProfileUserPending(data)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(App);

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
  back: {
    marginLeft: "5%",
  },
  check: {
    marginLeft: "10%",
  },
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
  },
  items: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    height: 60,
    justifyContent: "center",
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
  },
  itemsLengkap: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 100,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
  },
  textLabel: {
    color: "#000000",
    fontWeight: "600",
  },
  text: {
    color: "grey",
  },
  buttonTambah: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE4D2D",
  },
});
