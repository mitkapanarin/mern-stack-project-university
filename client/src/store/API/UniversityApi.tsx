import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import {
  CreateUniversityRequest,
  DeleteUniversityRequest,
  IUniversity,
  UpdateUniversityRequest,
} from "../../types/university.interface";

const baseQuery: BaseQueryFn = async ({ url, method, body }) => {
  const response = await fetch(url, { method, body });
  return response.json();
};

export const UniversityApi = createApi({
  reducerPath: "UniversityApi",
  tagTypes: ["University"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/universities`,
  }),

  endpoints: (builder) => ({
    getUniversity: builder.query<IUniversity, number>({
      query: (universityID) => `/get-one-university/${universityID}`,
      providesTags: ["University"],
    }),

    getAllUniversities: builder.query<IUniversity[], undefined>({
      query: () => "/get-all-universities",
      providesTags: ["University"],
    }),

    updateUniversity: builder.mutation<void, UpdateUniversityRequest>({
      query: (body) => ({
        url: `/update-university/${body.universityID}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["University"],
    }),

    createUniversity: builder.mutation<void, CreateUniversityRequest>({
      query: (body) => ({
        url: "/create-university",
        method: "POST",
        body,
      }),
      invalidatesTags: ["University"],
    }),

    deleteUniversity: builder.mutation<void, DeleteUniversityRequest>({
      query: (universityID) => ({
        url: `/delete-university/${universityID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["University"],
    }),
  }),
});

export const {
  useCreateUniversityMutation,
  useDeleteUniversityMutation,
  useGetAllUniversitiesQuery,
  useGetUniversityQuery,
  useUpdateUniversityMutation,
} = UniversityApi;
