import { BACKEND_URL } from "@/constants/backend";
import { Vocab } from "@/data-types/vocabulary";
import { RootState } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: BACKEND_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: async (args, api, extraOptions) => {
		// Exclude login and sign-up endpoints from attaching the token
		if (args.url === "/auth/login" || args.url === "/auth/signUp") {
			return baseQuery(args, api, extraOptions);
		}
		// Attach token for other endpoints
		const result = await baseQuery(args, api, extraOptions);
		return result;
	},
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
		saveVocabulary: builder.mutation({
			query: (newVocab: Vocab) => ({
				url: "/vocabulary",
				method: "POST",
				body: newVocab,
			}),
		}),
		saveVocabForUser: builder.mutation({
			query: ({ userId, vocabId }) => ({
				url: `/user/save-word-for-user`,
				method: "POST",
				body: { userId, vocabId },
			}),
		}),
		getVocabulary: builder.query({
			query: (word) => ({
				url: `/vocabulary/find-vocabulary?word=${word}`,
			}),
		}),
		getUserId: builder.query({
			query: () => ({
				url: `/user/get-user-id`,
			}),
		}),
		translateToVie: builder.query({
			query: (word) => ({
				url: `/vocabulary/get-mean?word=${word}`,
			}),
		}),
		get10Vocabulary: builder.query({
			query: () => ({
				url: `/vocabulary`,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignUpMutation,
	useSaveVocabularyMutation,
	useGetVocabularyQuery,
	useGetUserIdQuery,
	useSaveVocabForUserMutation,
	useTranslateToVieQuery,
	useGet10VocabularyQuery,
} = apiSlice;
