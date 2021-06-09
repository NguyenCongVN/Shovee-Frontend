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
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-picker";
import NavigationService from "../NavigationService.js";
import { register } from "../../public/redux/auth/auth.actions";
import { connect } from "react-redux";
import Loading from "../Loading";
import {
  registerStart,
  confirmBox,
} from "../../public/redux/auth/auth.actions";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      Phone: this.props.navigation.state.params,
      password: "",
      confirmPassword: "",
      imageProfile: null,
      image : null
    };
  }

  setUsername = (value) => {
    this.setState({
      username: value,
    });
  };

  setEmail = (value) => {
    this.setState({
      email: value,
    });
  };

  setPassword = (value) => {
    this.setState({
      password: value,
    });
  };

  setConfirmPassword = (value) => {
    this.setState({
      confirmPassword: value,
    });
  };

  handleUpdateImage = async () => {
    const options = {
      noData: true,
      mediaType: "photo",
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.warn("User cancelled image picker");
      } else if (response.error) {
        console.warn("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.warn("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageProfile: source,
          image : response
        });
      }
    });
  };

  componentDidUpdate() {
    if (this.props.auth.isError && !this.props.auth.isLoading) {
      alert("Thông tin không hợp lệ");
      this.props.confirmBox();
    } else {
      if (!this.props.auth.isError && !this.props.auth.isLoading && this.props.auth.isSuccess) {
        alert("Thành Công");
        this.props.confirmBox();
		this.props.navigation.goBack()
      }
    }
  }

  userRegister = (data) => {
    if (data == []) {
      alert("Thiếu thông tin");
    } else {
      this.props.registerStart(data);
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
              <Text style={styles.text}>Danh sách</Text>
            </View>
            <TouchableOpacity
              style={styles.shopcart}
              onPress={() => this.props.navigation.goBack()}
            >
              <AntDesign name="closecircleo" size={24} color={"#EE4D2D"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{ width: "80%", marginTop: 10 }}>
            {this.props.auth.isLoading ? <Loading /> : <View />}
            <TextInput
              style={styles.input}
              placeholder="Tên tài khoản"
              onChangeText={this.setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={this.setEmail}
            />
            <TextInput
              style={styles.input}
              value={this.props.navigation.state.params}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Mật khẩu"
              onChangeText={this.setPassword}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Chấp nhân mật khẩu"
              onChangeText={this.setConfirmPassword}
            />
          </View>
          <TouchableOpacity
            style={{ width: "80%", marginTop: 20, flexDirection: "row" }}
            onPress={this.handleUpdateImage}
          >
            <View style={{ flex: 1 }}>
              {this.state.imageProfile != null ? (
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={this.state.imageProfile}
                />
              ) : (
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={{
                    uri: "https://i.pinimg.com/736x/a1/1b/95/a11b95eb80d3451f384c2f565835071f.jpg",
                  }}
                />
              )}
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Chọn ảnh đại điện</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
            {
              this.userRegister({
                username: this.state.username,
                email: this.state.email,
                phone: this.state.Phone,
                password: this.state.password,
                password_confirmation: this.state.confirmPassword,
                image : this.state.image
              })
            }
            }
          >
            <Text style={{ color: "#FFFFFF" }}>{"Tiếp tục".toUpperCase()}</Text>
          </TouchableOpacity>
          <View style={{ width: "80%", marginTop: 50, flexDirection: "row" }}>
            <Text style={{ textAlign: "center" }}>
              Bằng cách đăng kí bạn đã đồng ý với điều khoản của shopee
            </Text>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerStart: (data) => dispatch(registerStart(data)),
    confirmBox: () => dispatch(confirmBox()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    height: 80,
    width: "100%",
    backgroundColor: "#F2F2F2",
  },
  headerTop: {
    flexDirection: "row",
    top: 40,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "25%",
  },
  input: {
    borderBottomWidth: 0.4,
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
  shopcart: {
    marginLeft: "17%",
  },
  button: {
    width: "80%",
    marginTop: 30,
    backgroundColor: "#EE4D2D",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 5,
  },
});
