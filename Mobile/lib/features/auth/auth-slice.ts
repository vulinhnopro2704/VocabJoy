import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { jwtDecode, JwtPayload, JwtHeader } from "jwt-decode";
import { AppDispatch, RootState } from "../../store";
import { apiUserSlice } from "../api/api-user-slice";
import { setUser } from "./user-slice";

// Define the initial state type
interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	userId: string | null; // Add userId to the state
}

// Initial state
const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
	userId: null, // Initialize userId
};

interface DecodedToken extends JwtPayload {
	userId: string;
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			state.isAuthenticated = true;
			const decoded: DecodedToken = jwtDecode<DecodedToken>(
				action.payload
			);
			state.userId = decoded.userId;
		},
		removeToken: (state) => {
			state.token = null;
			state.isAuthenticated = false;
			state.userId = null; // Clear userId
		},
	},
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;

// Async actions for login and logout
export const loginUser = (token: string) => async (dispatch: AppDispatch) => {
	await SecureStore.setItemAsync("access_token", token);
	dispatch(setToken(token));
	dispatch(fetchUserInfo());
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
	await SecureStore.deleteItemAsync("access_token");
	dispatch(removeToken());
};

// Function to check if token exists on app start
export const loadToken = () => async (dispatch: AppDispatch) => {
	const token = await SecureStore.getItemAsync("access_token");
	if (token) {
		dispatch(setToken(token));
		dispatch(fetchUserInfo());
	}
};

// Thunk to fetch user info
export const fetchUserInfo =
	() => async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const userId = state.auth.userId;
		if (userId) {
			const { data, error } = await dispatch(
				apiUserSlice.endpoints.getUserInfo.initiate(userId)
			);
			if (data) {
				dispatch(
					setUser({
						data: data.data,
						success: data.success,
						message: data.message,
						statusCode: data.statusCode,
					})
				);
			} else if (error) {
				console.error("Failed to fetch user information:", error);
			}
		}
	};
