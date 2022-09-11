import { useAsync } from "./useAsync";

import type { DefaultOptions, FetchValues } from './../types';

const DEFAULT_OPTIONS: DefaultOptions = {
    headers: { "Content-Type": "application/json" },
};

/**
 * 
 * @param {RequestInfo | URL} url Target URL
 * @param {RequestInit | undefined} options Fetch Options
 * @param {any[]} dependencies Dependencies Array 
 * @returns {FetchValues} loading, error, value
 */
export const useFetch = (
    url: RequestInfo | URL,
    options: RequestInit | undefined = {},
    dependencies: any[] = []
): FetchValues => {
    return useAsync(async () => {
        const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options });
        if (res.ok)
            return res.json();
        const json = await res.json();
        return await Promise.reject(json);
    }, dependencies);
};
