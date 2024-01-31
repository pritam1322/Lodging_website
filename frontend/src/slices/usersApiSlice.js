import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';
const BOOK_URL = '/api/book';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}`,
          method: 'POST',
          body: data,
        }),
       }),
       logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        }),
      }),
      updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profiles`,
          method: 'PUT',
          body: data,
        }),
      }),
      bookRoom: builder.mutation({
        query: (data) => ({
          url: `${BOOK_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
  }),
});

export const { useLoginMutation,useRegisterMutation,useLogoutMutation, useUpdateUserMutation, useBookRoomMutation } = userApiSlice;