import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
	name: Yup.string().required("Họ và tên là bắt buộc"),
	phone_number: Yup.number().min(10).required("Số điện thoại là bắt buộc"),
	email: Yup.string()
		.email("Email không hợp lệ")
		.required("Email là bắt buộc"),
	password: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.required("Mật khẩu là bắt buộc"),
	confirm_password: Yup.string()
		.oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp") // Kiểm tra xem confirm_password có giống password không
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.required("Bạn cần xác nhận lại mật khẩu"),
	date: Yup.date().required("Ngày sinh là bắt buộc"),
});
