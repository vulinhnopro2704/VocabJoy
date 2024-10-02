import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter-slice";
import { apiSlice } from "./features/api/api-slice";
import authReducer, { loadToken } from "./features/auth/auth-slice";

export const makeStore = () => {
	const store = configureStore({
		reducer: {
			counter: counterReducer,
			[apiSlice.reducerPath]: apiSlice.reducer,
			auth: authReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiSlice.middleware),
	});

	// Load token when app starts
	store.dispatch(loadToken());

	return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
