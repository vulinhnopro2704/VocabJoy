import { useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	Text,
	StyleSheet,
	Image,
	View,
	Pressable,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import LogoWithName from "@/components/logo-with-name";
import LoginForm from "@/components/form/login-form";
import SignUpForm from "@/components/form/sign-up-form";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/lib/hook";

const LoginScreen = () => {
	const [isLogin, setIsLogin] = useState(true);
	const { token } = useAppSelector((state) => state.auth);
	const route = useRouter();

	useEffect(() => {
		if (token) {
			route.replace("/(tabs)/home-screen");
		}
	}, [token]);

	return (
		<KeyboardAvoidingView
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		style={styles.container}
	  >
		<SafeAreaView style={styles.container}>
			
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<Image
					source={require("../assets/images/Pattern.png")}
					style={styles.pattern}
					resizeMode="cover"
				/>
				<SafeAreaView>
					<LogoWithName />
				</SafeAreaView>

				<View style={styles.buttonContainer}>
					<Pressable
						style={[
							styles.button,
							isLogin
								? styles.activeButton
								: styles.inactiveButton,
						]}
						onPress={() => setIsLogin(true)}
					>
						<Text style={styles.buttonText}>Đăng Nhập</Text>
					</Pressable>
					<Pressable
						style={[
							styles.button,
							!isLogin
								? styles.activeButton
								: styles.inactiveButton,
						]}
						onPress={() => setIsLogin(false)}
					>
						<Text style={styles.buttonText}>Đăng Ký</Text>
					</Pressable>
				</View>

				<View style={styles.formContainer}>
					{isLogin ? <LoginForm /> : <SignUpForm />}
				</View>
			</ScrollView>
		</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		backgroundColor: "white",
	},
	scrollContainer: {
		marginTop: 60,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 80,
	},
	logoContainer: {
		marginBottom: 20,
	},
	buttonContainer: {
		marginTop: 20,
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "center",
		width: "80%",
		gap: 16,
		backgroundColor: "#f9f9f9",
		padding: 4,
		borderRadius: 10,
	},
	activeButton: {
		backgroundColor: "#fff",
	},
	inactiveButton: {
		backgroundColor: "transparent",
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		backgroundColor: "#D1D5DB",
		borderRadius: 12,
		width: "50%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
	},
	formContainer: {
		width: "100%",
		height: "auto",
		marginTop: 20,
	},
	pattern: {
		position: "absolute",
		top: "20%",
		right: "20%",
	},
});
export default LoginScreen;
