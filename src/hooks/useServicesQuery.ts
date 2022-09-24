import { useMemo } from "react";

import { useGetServicesQuery } from "../services/rockstarApi";
import { ServiceQueryProps } from "../interfaces";
import type { Service } from "../types";

/**
 * Use Services Query
 * @returns {ServiceQueryProps} Services Array
 */
export const useServicesQuery = (): ServiceQueryProps => {
    const { data: servicesResults, isLoading, refetch, isFetching } = useGetServicesQuery('getServicesQuery');

    const services: Service[] = useMemo<Service[]>(() => {
        const results: Service[] = [];
        if (!isLoading && servicesResults) {
            servicesResults.forEach((service: Service) => {
                results.push(service);
            });
        }
        return results;
    }, [isLoading, servicesResults]);

    return {
        isLoading,
        services,
        refetch,
        isFetching
    };
};
