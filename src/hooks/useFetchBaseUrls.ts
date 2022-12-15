// import { useState, useEffect, useMemo } from 'react';

// import { fetchBaseUrls } from '../utils';

// import type { ApiUrl } from '../types';

// /**
//  * Use Fetch Base API URLs Custom Hook
//  * @param {string} postFix API URL Postfix
//  * @example `/api`
//  * @returns {ApiUrl[]} Api URL
//  */
// export const useFetchBaseUrls = (postFix: string): ApiUrl[] => {
//     const [baseUrls, setBaseUrls] = useState<ApiUrl[]>([]);

//     const baseURLs: ApiUrl[] = useMemo<ApiUrl[]>(() => {
//         const getUrls: ApiUrl[] = fetchBaseUrls(postFix);
//         return getUrls;
//     }, [postFix]);

//     useEffect(() => {
//         if (baseURLs) {
//             setBaseUrls(baseURLs.filter(
//                 (url: ApiUrl) => url.reachable && url.enabled
//             ));
//         }
//     }, [baseURLs]);

//     return baseUrls;
// };

/**
 * @deprecated
 */
export const useFetchBaseUrls = () => { };
