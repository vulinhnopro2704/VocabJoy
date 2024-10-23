import { BACKEND_URL } from "@/constants/backend";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Levels {
	level1: number;
	level2: number;
	level3: number;
	level4: number;
	level5: number;
}

interface UserData {
	total: number;
	levels: Levels;
	practice: number;
}

export interface ApiHomepageResponse {
	success: boolean;
	data: UserData;
	message: string;
	statusCode: number;
}

export interface Account {
	password: string;
	otp: string | null;
	otpExp: string | null;
	_id: string;
}

export interface VocabularyUser {
	vocab: string;
	count: number;
	_id: string;
}

export interface UserInfo {
	account: Account;
	_id: string;
	name: string;
	email: string;
	phone: string;
	isDeleted: boolean;
	date: string;
	__v: number;
	vocabulary: VocabularyUser[];
}

export interface ApiGetUserInfoResponse {
	success: boolean;
	data: UserInfo;
	message: string;
	statusCode: number;
}

export const apiUserSlice = createApi({
	reducerPath: "apiUser",
	baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL + "/user" }),
	endpoints: (builder) => ({
		getUserVocabsHome: builder.query<ApiHomepageResponse, string>({
			query: (userId) => `/${userId}/vocabs-home`,
		}),
		getUserInfo: builder.query<ApiGetUserInfoResponse, string>({
			query: (userId) => ({
				url: `/get-user-by-id`,
				params: { id: userId },
			}),
		}),
	}),
});

export const { useGetUserVocabsHomeQuery } = apiUserSlice;
