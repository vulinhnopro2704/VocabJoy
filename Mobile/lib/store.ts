import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/user-slice";
import { apiSlice } from "./features/api/api-slice";
import { wordApi } from "./features/api/api-search_word";
import authReducer, { loadToken } from "./features/auth/auth-slice";
import { apiLessonSlice } from "./features/api/api-lesson-slice";
import { apiUserSlice } from "./features/api/api-user-slice";

export const makeStore = () => {
	const store = configureStore({
		reducer: {
			user: userReducer,
			[apiSlice.reducerPath]: apiSlice.reducer,
			[apiUserSlice.reducerPath]: apiUserSlice.reducer,
			[wordApi.reducerPath]: wordApi.reducer,
			[apiLessonSlice.reducerPath]: apiLessonSlice.reducer,
			auth: authReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(
					apiSlice.middleware,
					apiLessonSlice.middleware,
					apiUserSlice.middleware
				)
				.concat(wordApi.middleware),
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
