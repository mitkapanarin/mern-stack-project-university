import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateFacultyRequest,
  DeleteFacultyRequest,
  EditFacultyRequest,
  GetAllFacultiesResponse,
} from "../../types/faculty.interface";

// Define a service using a base URL and expected endpoints
export const FacultyApi = createApi({
  reducerPath: "FacultyApi",
  tagTypes: ["Faculty"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/faculty`,
  }),
  endpoints: (builder) => ({
    getAllFaculties: builder.query<GetAllFacultiesResponse, string>({
      query: (universityID) => `/get-all-faculties/${universityID}`,
      providesTags: ["Faculty"],
    }),
    createFaculty: builder.mutation<void, CreateFacultyRequest>({
      query: ({ body, universityID }) => ({
        url: `/create-faculty/${universityID}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faculty"],
    }),
    deleteFaculty: builder.mutation<void, DeleteFacultyRequest>({
      query: ({ universityID, facultyID }) => ({
        url: `/delete-faculty/${universityID}/${facultyID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faculty"],
    }),
    editFaculty: builder.mutation<void, EditFacultyRequest>({
      query: ({ universityID, facultyID, updatedData }) => ({
        url: `/update-faculty/${universityID}/${facultyID}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Faculty"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateFacultyMutation,
  useDeleteFacultyMutation,
  useEditFacultyMutation,
  useGetAllFacultiesQuery,
} = FacultyApi;
