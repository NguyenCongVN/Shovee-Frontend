import React, {Component} from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Image, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { register } from '../../public/redux/actions/auth'

class Register extends Component {
	constructor (props) {
		super(props)
		this.state = {
			Phone:''
		}
	}

	componentWillMount(){
		AsyncStorage.getItem('Token', (error, result) => {
			if (result) {
				this.props.navigation.goBack()
			} else {
				console.log('Not Login')
			}
		})
	}

	setPhone = (values) => {
		this.setState({
			Phone: values
		})
	}

	confirmRegister = (data) => {
		if (data == '') {
			alert('Lỗi thông tin')
		} else {
			this.props.navigation.navigate('Next', data)
		}
	}

	render(){
		console.log(this.state.Phone)
		return(
			<React.Fragment>
				<View style={styles.container}>
					<View style={{width:'80%', marginTop: 30}}>
						<TextInput style={styles.input} placeholder="Số điện thoại" onChangeText={this.setPhone}/>
					</View>
					<TouchableOpacity style={styles.button} onPress={() =>  this.confirmRegister(this.state.Phone)}>
						<Text style={{color: '#FFFFFF'}}>{'Tiếp tục'.toUpperCase()}</Text>
					</TouchableOpacity>
					<View style={{marginTop: '30%'}}>
						
					</View>
					<View style={styles.labelLoginWith}>
						<View style={styles.itemsLoginWith}>
							<View style={styles.borderLoginWith}></View>
						</View>
						<View style={{flex: 3, alignItems: 'center'}}>
							<Text>Đăng kí bằng:</Text>
						</View>
						<View style={styles.itemsLoginWith}>
							<View style={styles.borderLoginWith}></View>
						</View>
					</View>
					<TouchableOpacity style={styles.loginSMS} onPress={() => alert('Soon!')}>
						<IconAntDesign name="message1" style={{flex: 1, paddingLeft: 15}} size={25} color="#FFFFFF"/>
						<Text style={styles.text}>Đăng kí với Email</Text>
						<Text style={{flex: 1}}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.loginLine} onPress={() => alert('Soon!')}>
						<Icon name="google" style={{flex: 1, paddingLeft: 15}} size={25} color="#FFFFFF"/>
						<Text style={styles.text}>Đăng kí với Google</Text>
						<Text style={{flex: 1}}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.loginFacebook} onPress={() => alert('Soon!')}>
						<Icon name="facebook" style={{flex: 1, paddingLeft: 15}} size={25} color="#FFFFFF"/>
						<Text style={styles.text}>Đăng kí với Facebook</Text>
						<Text style={{flex: 1}}/>
					</TouchableOpacity>
				</View>
		    </React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Register)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	button: {
		width: '80%',
		marginTop: 30,
		backgroundColor: "#EE4D2D",
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		borderRadius: 5
	},
	loginSMS: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
		marginTop: 15,
		height: 40,
		elevation: 1,
		borderRadius: 5,
		backgroundColor: '#075e54'
	},
	loginLine: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
		marginTop: 15,
		height: 40,
		elevation: 1,
		borderRadius: 5,
		backgroundColor: 'red'
	},
	loginFacebook: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
		marginTop: 15,
		height: 40,
		elevation: 1,
		borderRadius: 5,
		backgroundColor: '#3a5998'
	},
	input: {
		borderBottomWidth: 1,
	},
	text: {
		color: '#FFF'
	},
	labelLoginWith: {
		flexDirection: 'row', 
		width: '80%', 
		alignItems: 'center',
		marginTop: '24%'
	},
	itemsLoginWith: {
		flex: 1, 
		alignItems: 'center'
	},
	borderLoginWith: {
		borderWidth: 0.4, 
		width: '100%', 
		borderColor: 'grey',
	}
})