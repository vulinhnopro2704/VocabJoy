import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { signupSchema } from "@/schemas/sign-up";
import { Colors } from "@/constants/colors";
import { useSignUpMutation } from "@/lib/features/api/api-slice";
import { User } from "@/data-types/auth";
import { date } from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignUpForm() {
	const [signUp, { isLoading, error }] = useSignUpMutation();
	const handleSubmit = async (values: User) => {
		try {
			await signUp(values).unwrap();
		} catch (err) {
			alert("Sign up failed: " + err);
		}
	};
	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
				name: "",
				phone_number: "",
				confirm_password: "",
				date: new Date(),
			}}
			validationSchema={signupSchema}
			onSubmit={(values: User) => {
				// Hiển thị thông báo với giá trị
				Toast.show({
					text1: "Thông tin đăng ký",
					text2: `Email: ${values.email}`,
					position: "top",
				});
				handleSubmit(values);
			}}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
				values,
				errors,
			}) => (
				<View style={styles.container}>
					<Text style={styles.labelText}>Họ và tên</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập họ và tên của bạn"
						onChangeText={handleChange("name")}
						onBlur={handleBlur("name")}
						value={values.name}
					/>
					{errors.name && (
						<Text style={styles.errorText}>{errors.name}</Text>
					)}

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

					<Text style={styles.labelText}>Số Điện Thoại</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập số điện thoại của bạn"
						onChangeText={handleChange("phone_number")}
						onBlur={handleBlur("phone_number")}
						value={values.phone_number}
					/>
					{errors.phone_number && (
						<Text style={styles.errorText}>
							{errors.phone_number}
						</Text>
					)}

					<Text style={styles.labelText}>Ngày Sinh</Text>
					<View style={styles.datePicker}>
						<DateTimePicker
							style={styles.datePicker}
							value={values.date}
							mode="date"
							display="default"
							onChange={(event, selectedDate) => {
								setFieldValue(
									"date",
									selectedDate || values.date
								);
							}}
							minimumDate={new Date(1900, 0, 1)}
							maximumDate={new Date()}
						/>
					</View>
					<Text style={styles.labelText}>Mật khẩu</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập mật khẩu của bạn"
						secureTextEntry
						onChangeText={handleChange("password")}
						onBlur={handleBlur("password")}
						value={values.password}
					/>
					{errors.confirm_password && (
						<Text style={styles.errorText}>{errors.password}</Text>
					)}

					<Text style={styles.labelText}>Nhập lại mật khẩu</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập lại mật khẩu của bạn"
						secureTextEntry
						onChangeText={handleChange("confirm_password")}
						onBlur={handleBlur("confirm_password")}
						value={values.confirm_password}
					/>
					{errors.confirm_password && (
						<Text style={styles.errorText}>
							{errors.confirm_password}
						</Text>
					)}

					<TouchableOpacity
						style={styles.button}
						onPress={() => handleSubmit()}
						disabled={isLoading}
					>
						<Text style={styles.buttonText}>Đăng ký</Text>
					</TouchableOpacity>
					{error && (
						<Text style={styles.errorText}>
							{(error as { data: { message?: string } }).data
								?.message || "An error occurred."}
						</Text>
					)}
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
	},
	errorText: {
		color: "red",
		marginBottom: 8,
	},
	button: {
		marginTop: 20,
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
		marginTop: 20,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
	datePicker: {
		width: "100%",
	},
});
