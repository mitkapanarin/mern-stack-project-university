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
    getUniversity: builder.query<IUniversity, string>({
      query: (_id) => `/get-one-university/${_id}`,
      providesTags: ["University"],
    }),

    getAllUniversities: builder.query<IUniversity[], undefined>({
      query: () => "/get-all-universities",
      providesTags: ["University"],
    }),

    updateUniversity: builder.mutation({
      query: ({ body, _id }) => ({
        url: `/update-university/${_id}`,
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
      query: (_id) => ({
        url: `/delete-university/${_id}`,
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
