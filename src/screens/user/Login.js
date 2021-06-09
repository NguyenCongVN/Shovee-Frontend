import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { isLogin } from "../../public/redux/auth/auth.actions";
import Loading from "../Loading";
import { AsyncStorage } from "react-native";
import NavigationService from "../NavigationService.js";

import { loginStart } from "../../public/redux/auth/auth.actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidUpdate() {
    if (this.props.auth.isLogin) {
      NavigationService.navigate("Me");
    } else {
      if (this.props.auth.isError) {
        alert("Thông tin không hợp lệ");
      }
    }
  }

  userLogin = (data) => {
    if (this.state.username == "" || this.state.password == "") {
      alert("Lỗi thiếu thông tin");
    } else {
      this.props.loginStart(data);
	  alert('Thành Công');
    }
  };

  setUsername = (value) => {
    this.setState({
      username: value,
    });
  };

  setPassword = (value) => {
    this.setState({
      password: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={{ width: "80%", marginTop: 30 }}>
            {this.props.auth.isLoading ? <Loading /> : <View />}
            <TextInput
              style={styles.input}
              placeholder="Email/SĐT/Tên tài khoản"
              onChangeText={this.setUsername}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Mật khẩu"
              onChangeText={this.setPassword}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 5, top: 65 }}
              onPress={() => this.props.navigation.navigate("ForgetPassword")}
            >
              <Text style={{ color: "#075d54" }}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.userLogin({
                username: this.state.username,
                password: this.state.password,
              })
            }
          >
            <Text style={{ color: "#FFFFFF" }}>
              {"Đăng nhập".toUpperCase()}
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => alert("Soon!")}>
              <Text>Chưa có tài khoản</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.labelLoginWith}>
            <View style={styles.itemsLoginWith}>
              <View style={styles.borderLoginWith}></View>
            </View>
            <View style={{ flex: 3, alignItems: "center" }}>
              <Text>Đăng nhập bằng:</Text>
            </View>
            <View style={styles.itemsLoginWith}>
              <View style={styles.borderLoginWith}></View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginSMS}
            onPress={() => alert("Soon!")}
          >
            <IconAntDesign
              name="message1"
              style={{ flex: 1, paddingLeft: 15 }}
              size={25}
              color="#FFFFFF"
            />
            <Text style={styles.text}>Đăng nhập bằng Email</Text>
            <Text style={{ flex: 1 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginGoogle}
            onPress={() => alert("Soon!")}
          >
            <Icon
              name="google"
              style={{ flex: 1, paddingLeft: 15 }}
              size={25}
              color="#FFFFFF"
            />
            <Text style={styles.text}>Đăng nhập với Google</Text>
            <Text style={{ flex: 1 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginFacebook}
            onPress={() => alert("Soon!")}
          >
            <Icon
              name="facebook"
              style={{ flex: 1, paddingLeft: 15 }}
              size={25}
              color="#FFFFFF"
            />
            <Text style={styles.text}>Đăng nhập với Facebook</Text>
            <Text style={{ flex: 1 }} />
          </TouchableOpacity>
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
    loginStart: (data) => dispatch(loginStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  loginSMS: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: 15,
    height: 40,
    elevation: 1,
    borderRadius: 5,
    backgroundColor: "#075e54",
  },
  loginGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: 15,
    height: 40,
    elevation: 1,
    borderRadius: 5,
    backgroundColor: "red",
  },
  loginFacebook: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: 15,
    height: 40,
    elevation: 1,
    borderRadius: 5,
    backgroundColor: "#3a5998",
  },
  input: {
    borderBottomWidth: 1,
  },
  text: {
    color: "#FFF",
  },
  labelLoginWith: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    marginTop: "24%",
  },
  itemsLoginWith: {
    flex: 1,
    alignItems: "center",
  },
  borderLoginWith: {
    borderWidth: 0.4,
    width: "100%",
    borderColor: "grey",
  },
});
