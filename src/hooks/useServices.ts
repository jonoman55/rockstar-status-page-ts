import { useMemo } from "react";

import { useGetServicesQuery } from "../services/rockstarApi";

import type { Service } from "../types";

export const useServices = () => {
    const { data: servicesResults, isLoading } = useGetServicesQuery('getNavbarServices');
    const services = useMemo(() => {
        const results: Service[] = [];
        if (!isLoading && servicesResults) {
            servicesResults.forEach((service: Service) => {
                results.push(service);
            });
        }
        return results;
    }, [isLoading, servicesResults]);
    return { isLoading, services };
};