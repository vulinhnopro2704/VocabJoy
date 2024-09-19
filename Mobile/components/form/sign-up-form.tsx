import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { signupSchema } from "@/schemas/sign-up";

export default function SignUpForm() {
	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
				name: "",
				phone_number: "",
				confirm_password: "",
			}}
			validationSchema={signupSchema}
			onSubmit={(values) => {
				// Hiển thị thông báo với giá trị
				Toast.show({
					text1: "Thông tin đăng ký",
					text2: `Email: ${values.email}\nMật khẩu: ${values.password}`,
					position: "top",
				});
				console.log(values); // In ra console để kiểm tra
				alert(
					values.name +
						" " +
						values.phone_number +
						" " +
						values.email +
						" " +
						values.password +
						" " +
						values.confirm_password
				); // Hiển thị thông báo
			}}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors }) => (
				<View style={styles.container}>
					<Text style={styles.labelText}>Họ và tên</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập họ và tên của bạn"
						onChangeText={handleChange("name")}
						onBlur={handleBlur("name")}
						value={values.name}
					/>

					<Text style={styles.labelText}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập email của bạn"
						onChangeText={handleChange("email")}
						onBlur={handleBlur("email")}
						value={values.email}
					/>

					<Text style={styles.labelText}>Họ và tên</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập số điện thoại của bạn"
						onChangeText={handleChange("phone_number")}
						onBlur={handleBlur("phone_number")}
						value={values.phone_number}
					/>

					<Text style={styles.labelText}>Mật khẩu</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập mật khẩu của bạn"
						secureTextEntry
						onChangeText={handleChange("password")}
						onBlur={handleBlur("password")}
						value={values.password}
					/>

					<Text style={styles.labelText}>Mật khẩu</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập lại mật khẩu của bạn"
						secureTextEntry
						onChangeText={handleChange("confirm_password")}
						onBlur={handleBlur("confirm_password")}
						value={values.confirm_password}
					/>

					<TouchableOpacity
						style={styles.button}
						onPress={() => handleSubmit()}
					>
						<Text style={styles.buttonText}>Đăng ký</Text>
					</TouchableOpacity>
				</View>
			)}
		</Formik>
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
		backgroundColor: "#007AFF", // Màu primary
		borderRadius: 12,
		alignItems: "center",
	},
	labelText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#141718",
		marginBottom: 8, // Khoảng cách giữa nhãn và ô nhập
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
});
