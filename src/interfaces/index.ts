import type { Children, Service } from "../types";

/**
 * React Node Props
 */
export interface ChildProps {
    /**
     * React Children - ReactNode | JSX.Element | JSX.Element[]
     */
    children: Children;
};

/**
 * Use Service Query Props
 */
export interface ServiceQueryProps {
    /**
     * Loading State
     */
    isLoading: boolean;
    /**
     * Services Array
     */
    services: Service[];
    /**
     * Refetch Function
     */
    refetch: () => void;
};
