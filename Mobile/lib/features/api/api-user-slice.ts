import { BACKEND_URL } from "@/constants/backend";
import {
	ApiResponseVocabByEachLevel,
	ApiResponseVocabForPractice,
} from "@/data-types/user";
import { Vocab } from "@/data-types/vocabulary";
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

type ApiGetVocabByLevelBody = {
	userId: string;
	level: number;
	offset: number;
	size: number;
};

export type VocabWithStatus = {
	vocab: Vocab;
	status: boolean;
};

export type ApiUpdateDiaryBody = {
	userId: string;
	listVocab: VocabWithStatus[];
};

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
		getVocabForPractice: builder.query<ApiResponseVocabForPractice, string>(
			{
				query: (userId) => ({
					url: `${userId}/practice-vocab`,
				}),
			}
		),
		getVocabByLevel: builder.mutation<
			ApiResponseVocabByEachLevel,
			ApiGetVocabByLevelBody
		>({
			query: (body) => ({
				url: `${body.userId}/get-vocab-each-level`,
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					level: body.level.toString(),
					offset: body.offset.toString(),
					size: body.size.toString(),
				}).toString(),
			}),
		}),
		updateDiary: builder.mutation<void, ApiUpdateDiaryBody>({
			query: (body) => ({
				url: `${body.userId}/update-diary`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ listVocab: body.listVocab }),
			}),
		}),
	}),
});

export const {
	useGetUserVocabsHomeQuery,
	useGetUserInfoQuery,
	useGetVocabForPracticeQuery,
	useGetVocabByLevelMutation,
	useUpdateDiaryMutation,
} = apiUserSlice;
