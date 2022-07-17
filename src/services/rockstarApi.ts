// DOCS : https://redux-toolkit.js.org/rtk-query/usage-with-typescript#createapi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = process.env.REACT_APP_BACKEND_API_URL;

export const rockstarApi = createApi({
    reducerPath: 'rockstarApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}/api`,
    }),
    endpoints: (builder) => ({
        getApiStatus: builder.query({
            query: () => ({
                url: `/`,
                responseHandler: async (res: Response) => await res.json(),
            }),
        }),
        getAll: builder.query({
            query: () => ({ 
                url: `/all`,
                responseHandler: async (res: Response) => await res.json(),
            }),
        }),
        getUpdated: builder.query({
            query: () => ({
                url: `/updated`,
                responseHandler: async (res: Response) => await res.json(),
            }),
        }),
        getServices: builder.query({
            query: () => ({
                url: `/services`,
                responseHandler: async (res: Response) => await res.json(),
            }),
        }),
        getService: builder.query({
            query: (id) => ({
                url: `/services/${id}`,
                responseHandler: async (res: Response) => await res.json(),
            }),
        }),
        getStatuses: builder.query({
            query: () => ({
                url: `/statuses`,
                responseHandler: async (res: Response) => await res.json(),
            }),
        }),
        getStatus: builder.query({
            query: (id) => ({
                url: `/statuses/${id}`,
                responseHandler: async (res: Response) => await res.json(),
            }),
        }),
    }),
});

export const {
    useGetApiStatusQuery,
    useGetAllQuery,
    useGetServicesQuery,
    useGetServiceQuery,
    useGetStatusesQuery,
    useGetStatusQuery,
    useGetUpdatedQuery,
} = rockstarApi;
