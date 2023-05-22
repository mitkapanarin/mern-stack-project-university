import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UniversityApi = createApi({

  reducerPath: "UniversityApi",

  tagTypes: ["University"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/universities`, 
  }), 

  endpoints: (builder) => ({
    getUniversity: builder.query({
      query: (name) => `/get-one-university/:universityID`,
      providesTags: ["University"], 
    }),

    getAllUniversities: builder.query({
      query: ({ universityID }) => `/get-all-universities/${universityID}`,
      providesTags: ["University"],
    }),

    updateUniversity: builder.mutation({
      query: (body) => ({
        url: `/update-university/${body.universityID}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["University"],
    }),

    createUniversity: builder.mutation({
      query: (body) => ({
        url: "/create-university",
        method: "POST",
        body,
      }),
      invalidatesTags: ["University"],
    }),

    deleteUniversity: builder.mutation({
      query: ({ universityID}) => ({
        url: `/delete-task/${universityID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["University"],
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const{useCreateUniversityMutation, useDeleteUniversityMutation, useGetAllUniversitiesQuery, useGetUniversityQuery, useUpdateUniversityMutation} = UniversityApi