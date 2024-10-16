
import { SEARCH_URL } from "@/constants/seacrch";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const wordApi = createApi({
    reducerPath:"wordApi",
    baseQuery: fetchBaseQuery({
        baseUrl: SEARCH_URL,
}),   
    endpoints: (builder)=>({
        word: builder.query({
            query:word=>`/${word}`
        })
    })
})
export const {useWordQuery} = wordApi;
