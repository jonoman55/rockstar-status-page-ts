import { useCallback } from "react"

import { rockstarApi } from "../services/rockstarApi";
import { useAppDispatch } from "../app/hooks";
import type { Service, Status } from "../types";

/**
 * Rockstar API custom hook
 */
export const useRockstarApi = () => {
    const dispatch = useAppDispatch();

    const fetchApiStatus = useCallback(() => {
        return dispatch(rockstarApi.endpoints.getApiStatus.initiate('getApiStatus')).unwrap();
    }, [dispatch]);

    const fetchUpdated = useCallback(() => {
        return dispatch(rockstarApi.endpoints.getUpdated.initiate('getUpdated')).unwrap();
    }, [dispatch]);

    const fetchAll = useCallback(() => {
        return dispatch(rockstarApi.endpoints.getAll.initiate('getAll')).unwrap();
    }, [dispatch]);

    const fetchServices = useCallback(() => {
        return dispatch(rockstarApi.endpoints.getServices.initiate('getServices')).unwrap();
    }, [dispatch]);

    const fetchService = useCallback(
        ({ id }: { id: number; }): Promise<Service> => {
            return dispatch(rockstarApi.endpoints.getService.initiate(id)).unwrap();
        },
        [dispatch]
    );

    const fetchStatuses = useCallback(() => {
        return dispatch(rockstarApi.endpoints.getStatuses.initiate('getStatuses')).unwrap();
    }, [dispatch]);

    const fetchStatus = useCallback(
        ({ id }: { id: number; }): Promise<Status> => {
            return dispatch(rockstarApi.endpoints.getStatus.initiate(id)).unwrap();
        },
        [dispatch]
    );

    return {
        fetchApiStatus,
        fetchUpdated,
        fetchAll,
        fetchServices,
        fetchService,
        fetchStatuses,
        fetchStatus
    } as const;
};