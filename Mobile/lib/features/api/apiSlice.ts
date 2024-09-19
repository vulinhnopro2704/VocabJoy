import { backendUrl } from "@/constants/backend";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: backendUrl,
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "/auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		signUp: builder.mutation({
			query: (userData) => ({
				url: "/auth/signUp",
				method: "POST",
				body: userData,
			}),
		}),
	}),
});

export const { useLoginMutation, useSignUpMutation } = apiSlice;
