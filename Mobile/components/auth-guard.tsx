import React, { useEffect } from "react";
import { useAppSelector } from "../lib/hook";
import { useRouter } from "expo-router";

const AuthGuard = ({ children }: { children: any }) => {
	const { token } = useAppSelector((state) => state.auth);
	const route = useRouter();

	useEffect(() => {
		// Nếu không có token (chưa đăng nhập), điều hướng tới màn hình đăng nhập
		if (!token) {
			route.replace("/");
		}
	}, [token]);

	// Nếu đã đăng nhập thì render màn hình con
	return <>{token ? children : null}</>;
};

export default AuthGuard;
