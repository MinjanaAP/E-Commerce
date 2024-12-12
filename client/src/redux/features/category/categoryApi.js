import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/category`,
    credentials: "include",
    }),
    tagTypes:["Category"],
    endpoints: (builder) =>({
        getAllCategories : builder.query({
            query: () =>(
                {
                    url:'',
                    method:'GET'
                }
            ),
            providesTags:['Category']
        })
    })
})

export const {useGetAllCategoriesQuery} = categoryApi;
export default categoryApi;