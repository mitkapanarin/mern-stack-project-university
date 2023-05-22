import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const FacultyApi = createApi({
  reducerPath: "FacultyApi",
  tagTypes: ["Faculty"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/faculty`,
  }),
  endpoints: (builder) => ({
    getAllFacultys: builder.query({
      query: ({ universityID }) => `/get-all-faculties/${universityID}`,
      providesTags: ["Faculty"],
    }),
    createFaculty: builder.mutation({
      query: ({ body, universityID }) => ({
        url: `/create-faculty/${universityID}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faculty"],
    }),
    deleteFaculty: builder.mutation({
      query: ({ universityID, FacultyID }) => ({
        url: `/delete-faculty/${universityID}/${FacultyID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faculty"],
    }),
    editFaculty: builder.mutation({
      query: ({ universityID, FacultyID, updatedData }) => ({
        url: `/update-faculty/${universityID}/${FacultyID}`,
        method: "PUT",
        body: updatedData
      }),
      invalidatesTags: ["Faculty"],
    }),
    
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateFacultyMutation, useDeleteFacultyMutation, useEditFacultyMutation, useGetAllFacultysQuery } =
  FacultyApi;