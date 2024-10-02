import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { AppDispatch } from "../../store";

// Define the initial state type
interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			state.isAuthenticated = true;
		},
		removeToken: (state) => {
			state.token = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;

// Async actions for login and logout
export const loginUser = (token: string) => async (dispatch: AppDispatch) => {
	await SecureStore.setItemAsync("access_token", token);
	dispatch(setToken(token));
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
	}
};
