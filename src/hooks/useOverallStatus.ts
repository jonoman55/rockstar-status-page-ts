import { useState, useCallback, useEffect, useMemo } from "react";

import { appActions } from "../reducers/appSlice";
import { useAppDispatch } from "../app/hooks";
import { useGetStatusesQuery } from "../services/rockstarApi";
import { createAlertMessage, getHighestStatusCount } from "../helpers";
import { useNotify } from "./useNotify";

import type { OverallStatus, Platform, Status, StatusItem, StatusItems, StatusType, UseQueryOptions } from "../types";

/**
 * Use Overall Status Hook
 * @param {string} queryName Query Subscription Name
 * @param {UseQueryOptions} options Query Options
 * @returns {OverallStatus} Overall Status
 */
export const useOverallStatus = (queryName: string, options: UseQueryOptions): OverallStatus => {
    const dispatch = useAppDispatch();
    const notify = useNotify();

    const [outages, setOutages] = useState<StatusItem[]>();

    const {
        data: statusesResults,
        isLoading,
        refetch,
        isFetching
    } = useGetStatusesQuery(queryName, options);

    /**
     * Statuses
     */
    const statuses: Status[] = useMemo<Status[]>(() => {
        const results: Status[] = [];
        if (!isLoading && statusesResults) {
            statusesResults?.forEach(
                (status: Status) => results.push(status)
            );
        }
        return results;
    }, [statusesResults, isLoading]);

    /**
     * Platforms
     */
    const platforms: Platform[] = useMemo<Platform[]>(() => {
        const results: Platform[] = [];
        if (!isLoading && statusesResults) {
            statusesResults?.forEach(
                (s: Status) => s.services_platforms.forEach(
                    (p: Platform) => results.push(p)
                )
            );
        }
        return results;
    }, [isLoading, statusesResults]);

    /**
     * Status Items
     */
    const statusItems: StatusItems = useMemo<StatusItems>(() => {
        // Initial State
        let statusItems: StatusItems = {
            statuses: []
        };
        // Add Service Status values to state
        if (!isLoading && statuses) {
            statuses.forEach((s: Status) =>
                statusItems.statuses.push({
                    id: s.id,
                    name: s.name,
                    status: s.status.toLowerCase(),
                    type: 'service',
                    message: s?.message,
                    new: s.status.toLowerCase() !== 'up',
                })
            );
        }
        // Add Platform values to state
        if (!isLoading && platforms) {
            platforms.forEach((p: Platform) => {
                statusItems.statuses.push({
                    id: p.id,
                    name: p.name,
                    status: p.status.toLowerCase(),
                    type: 'platform',
                    new: p.status.toLowerCase() !== 'up',
                });
            });
        }
        // Set Outages Statuses State
        setOutages(statusItems.statuses);
        return statusItems;
    }, [isLoading, platforms, statuses]);

    /**
     * Overall Status
     */
    const overallStatus: StatusType = useMemo<StatusType>(() => {
        // Get All Statuses from state
        const allStatuses: StatusItem[] = Object.values(statusItems.statuses);
        // Get All Status Values
        const allStatusValues = allStatuses.map((v) => v.status.toLowerCase());
        // Get All Service Statuses from state
        const serviceValues: StatusItem[] = allStatuses.filter((s) => s.type === 'service');
        // Get Service and Status statuses
        const overallStatusValues: string[] = serviceValues.map((s) => s.status);
        // Check if Service and Status statuses are all UP
        const isOverallAllUp: boolean = overallStatusValues.every((v) => v === 'up');
        // Get Platform Statuses from state
        const platformValues: StatusItem[] = allStatuses.filter((s) => s.type === 'platform');
        // Get Platform statuses
        const platformStatusValues: string[] = platformValues.map((s) => s.status);
        // Check if Platform statuses are all UP
        const isPlatformsAllUp: boolean = platformStatusValues.every((v) => v === 'up');
        // All UP
        if (isOverallAllUp && isPlatformsAllUp) return 'up';
        // Service Status DOWN
        if (overallStatusValues.includes('down')) return 'down';
        // Service Status LIMITED
        if (overallStatusValues.includes('limited')) return 'limited';
        // Service Status AND Platforms DOWN
        if (overallStatusValues.includes('down') && platformStatusValues.includes('down')) return 'down';
        // Service Status AND Platforms LIMITED
        if (overallStatusValues.includes('limited') && platformStatusValues.includes('limited')) return 'limited';
        // Get highest status value count
        const highestValue = getHighestStatusCount(allStatusValues) as StatusType;
        // return highest status
        return highestValue;
    }, [statusItems]);

    /**
     * Outage Change Callback Handler
     */
    const handleOutages = useCallback<() => void>(() => {
        if (!isLoading && overallStatus && outages) {
            if (overallStatus?.includes('down') || overallStatus?.includes('limited')) {
                const newOutages: StatusItem[] = statusItems.statuses?.filter(
                    (i: StatusItem) => i.type === 'service').filter(
                        (i: StatusItem) => i.status !== 'up'
                    );
                dispatch(appActions.setOutageCount(newOutages.length));
                setOutages(newOutages.map((item: StatusItem) => {
                    if (item.new) {
                        notify({
                            message: createAlertMessage(item),
                            variant: item.status === 'down' ? 'error' : 'warning',
                            persist: false,
                            autoHideDuration: 5000,
                            disableWindowBlurListener: true,
                        });
                        item.new = false;
                    }
                    return item;
                }));
            }
            if (overallStatus.includes('up')) {
                dispatch(appActions.setOutageCount(0));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, overallStatus, statusItems.statuses, dispatch, notify]);

    /**
     * Handle Outage Change Hook
     */
    useEffect(
        () => handleOutages(),
        [handleOutages]
    );

    return {
        isLoading,
        statuses,
        platforms,
        statusItems,
        overallStatus,
        refetch,
        isFetching
    };
};
