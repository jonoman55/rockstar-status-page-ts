import { useCallback, useState, useEffect } from "react";

/**
 * Get Item
 * @param {string} value Storage Item Value
 * @returns {any} Storage Item
 */
export const getItem = (value: string): any => {
    return JSON.parse(localStorage.getItem(value) as string);
};

/**
 * Set Item
 * @param key Storage Item Key
 * @param value Storage Item Value
 * @returns {any[]} Storage Value
 */
export const setItem = (key: string, value: string): string => {
    return JSON.stringify(localStorage.setItem(key, value));
};

/**
 * Use Local Storage
 * @param {string} key Storage Item Key
 * @param {any} defaultValue Storage Item Value
 * @returns {any[]} Dependencies Array
 */
export function useLocalStorage(key: string, defaultValue: any): any[] {
    return useStorage(key, defaultValue, window.localStorage);
};

/**
 * Use Session Storage Hook
 * @param {string} key Storage Item Key
 * @param {any} defaultValue Storage Item Value
 * @returns {any[]} Dependencies Array
 */
export function useSessionStorage(key: string, defaultValue: any): any[] {
    return useStorage(key, defaultValue, window.sessionStorage);
};

/**
 * Use Storage Hook
 * @param {string} key Storage Item Key
 * @param {any} defaultValue Storage Item Value
 * @param {any} storageObject Storage Object
 * @returns {any[]} value, setValue, remove
 */
export const useStorage = (key: string, defaultValue: any, storageObject: any): any[] => {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof defaultValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
};
