import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const statsApi = createApi({
    reducerPath: "statsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/stats`,
        credentials: "include",
    }),
    tagTypes: ["stats"],
    endpoints:(builder) =>({
        getUserStats: builder.query({
            query:(email) => `/user-stats/${email}`,
            providesTags:["stats"],
        }),
        getAdminStats: builder.query({
            query: () => `/admin-stats`,
            providesTags: ["stats"],
        }),
        getWeeklyStats: builder.query({
            query: ()=> `/weekly-stats`,
            providesTags:["stats"]
        }),
        getOrderStats: builder.query({
            query: ()=> `/order-stats`,
            providesTags:["stats"]
        })
    })
})
export const {useGetUserStatsQuery, useGetAdminStatsQuery,useGetWeeklyStatsQuery,useGetOrderStatsQuery} = statsApi;
export default statsApi;
