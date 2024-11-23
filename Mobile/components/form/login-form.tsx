import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Formik } from "formik";
import { validationSchema } from "@/schemas/login";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/colors";
import { useLoginMutation } from "@/lib/features/api/api-slice";
import { isSuccessfullStatus } from "@/utils/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { loginUser } from "@/lib/features/auth/auth-slice";
import { router, useRouter } from "expo-router";

// Define the structure of the data object
interface Data {
	token: string;
}

// Define the structure of the entire response
interface ApiLoginResponse {
	success: boolean;
	data: Data;
	message: string;
	statusCode: number;
}

export default function LoginForm() {
	const [login, { isLoading, error }] = useLoginMutation();
	const dispatch = useAppDispatch();
	const route = useRouter();

	return (
		<>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					try {
						const result: ApiLoginResponse = await login(
							values
						).unwrap(); // Gọi API'

						if (isSuccessfullStatus(result.statusCode)) {
							dispatch(loginUser(result.data.token));
							Toast.show({
								text1: "Đăng nhập thành công",
								position: "top",
							});
							route.replace("/(tabs)/home-screen");
						} else {
							alert(result.message); // Hiển thị thông báo lỗi
						}
					} catch (err) {
						const errorMessage = (err as Error).message; // Type assertion
						Toast.show({
							text1: "Đăng nhập thất bại",
							text2: errorMessage, // Hiển thị thông báo lỗi
							position: "top",
						});
					}
				}}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
				}) => (
					<View style={styles.container}>
						<Text style={styles.labelText}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder="Nhập email của bạn"
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
						<Text style={styles.labelText}>Mật khẩu</Text>
						<TextInput
							style={styles.input}
							placeholder="Nhập mật khẩu của bạn"
							secureTextEntry
							onChangeText={handleChange("password")}
							value={values.password}
						/>
						{errors.password && (
							<Text style={styles.errorText}>
								{errors.password}
							</Text>
						)}
						<Pressable
							style={styles.button}
							onPress={() => handleSubmit()}
							disabled={isLoading} // Disable button when loading
						>
							
						
								<Text style={styles.buttonText}>Đăng Nhập</Text>
							
						</Pressable>
						<TouchableOpacity onPress={()=>{
									router.push({pathname:"/forgot-password-screen"})
						}}>
						<Text style={styles.QMK}>Quen Mat Khau</Text>
						</TouchableOpacity>
						{error && (
							<Text style={styles.errorText}>
								{error && (
									<Text style={styles.errorText}>
										{(error as { message?: string })
											.message || "An error occurred."}
									</Text>
								)}{" "}
							</Text>
						)}
					</View>
				)}
			</Formik>
		</>
	);
}

const styles = StyleSheet.create({
	QMK:{
		color:Colors.blue_shadow,
		textDecorationLine:"underline",
		textDecorationColor:Colors.blue_shadow,
		marginTop:20,
		fontWeight:"600",
		margin: "auto"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	input: {
		height: 40,
		padding: 8,
		borderColor: "#EDF1F3",
		borderWidth: 2,
		borderRadius: 12,
	},
	errorText: {
		marginTop: 8,
		color: "red",
	},
	button: {
		paddingVertical: 15,
		paddingHorizontal: 16,
		height: 50,
		backgroundColor: Colors.primary,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 20,
	},
	labelText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#141718",
		marginBottom: 8,
		marginTop: 20,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
});
