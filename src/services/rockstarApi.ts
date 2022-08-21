import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Api, All, Service, Status, Updated } from '../types';

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
                responseHandler: async (res: Response) => await res.json() as Api,
            }),
            transformResponse: (api: Api) => api,
        }),
        getAll: builder.query({
            query: () => ({ 
                url: `/all`,
                responseHandler: async (res: Response) => await res.json() as All,
            }),
            transformResponse: (all: All) => all,
        }),
        getUpdated: builder.query({
            query: () => ({
                url: `/updated`,
                responseHandler: async (res: Response) => await res.json() as Updated,
            }),
            transformResponse: (updated: Updated) => updated,
        }),
        getServices: builder.query({
            query: () => ({
                url: `/services`,
                responseHandler: async (res: Response) => await res.json() as Service[],
            }),
            transformResponse: (services: Service[]) => services,
        }),
        getService: builder.query({
            query: (id: number) => ({
                url: `/services/${id}`,
                responseHandler: async (res: Response) => await res.json() as Service,
            }),
            transformResponse: (service: Service) => service,
        }),
        getStatuses: builder.query({
            query: () => ({
                url: `/statuses`,
                responseHandler: async (res: Response) => await res.json() as Status[],
            }),
            transformResponse: (statuses: Status[]) => statuses,
        }),
        getStatus: builder.query({
            query: (id: number) => ({
                url: `/statuses/${id}`,
                responseHandler: async (res: Response) => await res.json() as Status,
            }),
            transformResponse: (status: Status) => status,
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
