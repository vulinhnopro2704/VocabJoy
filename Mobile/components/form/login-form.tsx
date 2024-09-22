import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import { validationSchema } from "@/schemas/login";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";
import { useLoginMutation } from "@/lib/features/api/apiSlice";
import { isSuccessfullStatus } from "@/utils/utils";

export default function LoginForm() {
	const [login, { isLoading, error }] = useLoginMutation();

	return (
		<>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					try {
						const result = await login(values).unwrap(); // Gọi API'
						console.log(result); // In ra kết quả
						if (isSuccessfullStatus(result.status)) {
							Toast.show({
								text1: "Đăng nhập thành công",
								text2: `Welcome, ${result.name}`, // Giả sử API trả về tên người dùng
								position: "top",
							});
							console.log(result); // In ra kết quả
							alert("Đăng nhập thành công");
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
							onBlur={handleBlur("password")}
							value={values.password}
						/>
						{errors.password && (
							<Text style={styles.errorText}>
								{errors.password}
							</Text>
						)}
						<TouchableOpacity
							style={styles.button}
							onPress={() => handleSubmit()}
							disabled={isLoading} // Disable button when loading
						>
							<Text style={styles.buttonText}>Đăng Nhập</Text>
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
