import { BACKEND_URL } from "@/constants/backend";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Lesson {
	_id:string;
	name: string;
	description: string;
	meaning: string;
	image: string;
	vocabulary: String[];
}

export type ApiGetAllLessonsResponse = {
	data: Lesson[]; // This is the type of the response from the API
	success: boolean;
	message: string;
	statusCode: number;
};
export const apiLessonSlice = createApi({
	reducerPath: "apiLesson",
	baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL + "/lesson" }),
	endpoints: (builder) => ({
		getAllLessons: builder.query<ApiGetAllLessonsResponse, void>({
			query: () => "/",
		}),
		getVocabLessons: builder.query({
			query: (idLesson) => `/${idLesson}/randomVocab`,
		}),
	}),
});

export const { useGetAllLessonsQuery,useGetVocabLessonsQuery } = apiLessonSlice;
