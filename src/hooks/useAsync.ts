import { useCallback, useEffect, useState } from "react";

import type { FetchValues } from "../types";

/**
 * Use Async Custom Hook
 * @param {CallableFunction} callback Callback Function
 * @param {any[]} dependencies Dependencies Array
 * @returns {AsyncValues} loading, error, value
 */
export const useAsync = (callback: CallableFunction, dependencies: any[] = []): FetchValues => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const [value, setValue] = useState<any>();

    const callbackMemoized = useCallback<() => void>(() => {
        setLoading(true);
        setError(undefined);
        setValue(undefined);
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependencies]);

    useEffect(() => {
        callbackMemoized();
    }, [callbackMemoized]);

    return { loading, error, value };
};
