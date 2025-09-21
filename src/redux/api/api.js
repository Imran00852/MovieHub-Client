import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    createMovie: builder.mutation({
      query: (data) => ({
        url: "/movies",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getMovies: builder.query({
      query: () => ({
        url: "/movies",
      }),
      providesTags: ["user"],
    }),
    getSingleMovie: builder.query({
      query: (id) => ({
        url: `/movies/${id}`,
      }),
      providesTags: ["user"],
    }),

    //vote
    voteMovie: builder.mutation({
      query: ({ movieId, vote_type }) => ({
        url: `/votes/${movieId}`,
        method: "POST",
        body: { vote_type },
      }),
      invalidatesTags: ["user"],
    }),

    //comment
    createComment: builder.mutation({
      query: ({ movieId, data }) => ({
        url: `/comments/${movieId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, data }) => ({
        url: `/comments/${commentId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    //admin
    getTopMovies: builder.query({
      query: () => ({
        url: "/admin/movies",
      }),
      providesTags: ["user"],
    }),
    deleteAdminComment: builder.mutation({
      query: (commentId) => ({
        url: `/admin/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    deleteAdminMovie: builder.mutation({
      query: (movieId) => ({
        url: `/admin/movies/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export default api;

export const {
  useCreateMovieMutation,
  useGetSingleMovieQuery,
  useGetMoviesQuery,
  useVoteMovieMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useDeleteAdminCommentMutation,
  useGetTopMoviesQuery,
  useDeleteAdminMovieMutation,
} = api;
