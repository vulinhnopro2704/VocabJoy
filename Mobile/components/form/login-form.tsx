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

export default function LoginForm() {
	return (
		<>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					// Hiển thị thông báo với giá trị
					Toast.show({
						text1: "Thông tin đăng nhập",
						text2: `Email: ${values.email}\nMật khẩu: ${values.password}`,
						position: "top",
					});
					console.log(values); // In ra console để kiểm tra
					alert(values.email + " " + values.password); // Hiển thị thông báo
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
						>
							<Text style={styles.buttonText}>Đăng Nhập</Text>
						</TouchableOpacity>
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
		marginBottom: 20,
	},
	errorText: {
		color: "red",
		marginBottom: 8,
	},
	button: {
		paddingVertical: 15,
		paddingHorizontal: 16,
		height: 50,
		backgroundColor: Colors.primary,
		borderRadius: 12,
		alignItems: "center",
	},
	labelText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#141718",
		marginBottom: 8,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
});
