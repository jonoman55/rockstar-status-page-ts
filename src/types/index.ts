import { JSXElementConstructor, LazyExoticComponent, LegacyRef, ReactElement, ReactNode, PropsWithChildren } from 'react';
import { TooltipProps } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

/**
 * React Node and JSX Elements
 */
export type Children = ReactNode | JSX.Element | JSX.Element[];

/**
 * Props With Children - New to React 18
 */
export type ChildrenProps = PropsWithChildren;

/**
 * React Lazy Component
 */
export type Lazy = LazyExoticComponent<() => JSX.Element>;

/**
 * HTML Div Ref
 */
export type DivRef = LegacyRef<HTMLDivElement> | undefined;

/**
 * Rockstar Status
 */
export type StatusType = 'up' | 'down' | 'limited' | undefined;

/**
 * Rockstar API URL Path Extension
 */
export type ApiPath = 'api' | 'file';

/**
 * Scroll Zoom Styles
 */
export type ZoomStyles = {
    position: string;
    bottom: number;
    right: number;
};

/**
 * All Services and Statuses Payload
 */
export type All = {
    services: Service[];
    statuses: Status[];
    updated: string;
};

/**
 * API Status Payload
 */
export type Api = {
    message: string
    status: string
    success: boolean;
    updated: string
};

/**
 * Last Updated Payload
 */
export type Updated = {
    updated: string;
};

/**
 * Service
 */
export type Service = {
    id: number;
    name: string;
    updated: string;
    message: string;
    status: string;
    tag?: string;
    category_id?: string | null;
    sandbox_category_id?: string | null;
    alert_status?: number;
    priority?: number;
    recent_update?: string;
    hash?: string;
    status_tag?: string;
};

/**
 * Platform
 */
export type Platform = {
    id: number;
    name: string;
    status: string;
};

/**
 * Services Platforms
 */
export type ServicePlatforms = {
    services_platforms: Platform[]
};

/**
 * Status
 */
export type Status = Service & ServicePlatforms;

/**
 * Tooltip Placement
 */
export type Placement = TooltipProps['placement']

/**
 * Drawer Anchor
 */
export type Anchor = 'top' | 'left' | 'bottom' | 'right';

/**
 * Link Type
 */
export type LinkType = 'internal' | 'external' | 'other' | 'settings';

/**
 * Alert Color
 */
export type AlertColor = 'error' | 'warning' | 'success' | 'info';

/**
 * Link Item
 */
export type LinkItem = {
    /**
     * Link ID
     */
    id: number;
    /**
     * Link Tooltip Text
     */
    text: string;
    /**
     * Link Description
     */
    description: string;
    /**
     * Link Icon
     */
    icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
    /**
     * Link Type
     */
    type: LinkType;
    /**
     * Link Path (For external links)
     */
    to?: string;
    /**
     * Link href (For external links)
     */
    href?: string;
};

/**
 * Rockstar Indicator
 */
export type Indicator = {
    key: number;
    value: string;
};

/**
 * Outage DataGrid Row
 */
export type ServiceRow = Service;

/**
 * Services Outages DataGrid Columns & Rows
 */
export type ServicesData = {
    columns: GridColDef<any, any, any>[];
    rows: ServiceRow[];
};

/**
 * DataGrid Platform
 */
export type DataGridPlatform = {
    platform_name: string;
    platform_status: string;
};

/**
 * Platform DataGrid Row
 */
export type StatusRow = {
    id: number;
    name: string;
    updated: string;
    message: string;
    status: string;
    platforms: DataGridPlatform[];
};

/**
 * Platform Status DataGrid Row
 */
export type PlatformStatusRow = {
    id?: number;
    service: string;
    name: string;
    updated: string;
    status: string;
};

/**
 * Outages DataGrid Columns & Rows
 */
export type PlatformStatusesData = {
    columns: GridColDef<any, any, any>[];
    rows: PlatformStatusRow[];
};

/**
 * MUI Custom Palette
 */
export type CustomPalette = {
    palette: {
        main: string;
        gray: string;
        error: string;
        green: string;
        red: string;
        yellow: string;
        orange: string;
        alert: string;
        stadia: string;
        playstation: string;
        xboxOne: string;
        xbox360: string;
        xboxCloud: string;
        brightGreen: string;
        brightRed: string;
        brightYellow: string;
        cloud: string;
        auth: string;
        store: string;
        all: string;
        downloads: string;
        pc: string;
    }
};

/**
 * Status Item Type
 */
export type StatusItemType = 'service' | 'platform';

/**
 * Status Item
 */
export type StatusItem = {
    /**
     * ID
     */
    id?: number;
    /**
     * Name
     */
    name: string;
    /**
     * Status
     */
    status: string;
    /**
     * Type
     */
    type?: StatusItemType;
    /**
     * Message
     */
    message?: string;
    /**
     * New Alert
     */
    new?: boolean;
};

/**
 * Status Item Array
 */
export type StatusItems = {
    /**
     * Status Item Array
     */
    statuses: StatusItem[];
};

/**
 * Status Menu Item
 */
export type StatusMenuItem = {
    /**
     * Item Name
     */
    name: string;
    /**
     * Item Status
     */
    status: StatusType;
    /**
     * Item Link
     */
    to?: string;
    /**
     * Service Page ID
     */
    id?: number;
};

/**
 * Overall Status
 */
export type OverallStatus = {
    isLoading: boolean;
    statuses: Status[];
    platforms: Platform[];
    statusItems: StatusItems;
    overallStatus: StatusType;
    refetch: () => void;
    isFetching: boolean;
};

/**
 * Use Query Options
 */
export type UseQueryOptions = {
    pollingInterval?: number;
    refetchOnReconnect?: boolean;
    refetchOnFocus?: boolean;
    skip?: boolean;
    refetchOnMountOrArgChange?: boolean | number;
};

/**
 * Outage Bar Alert
 */
export type OutageBarAlert = {
    id: number;
    name: string;
    status: string;
    open: boolean;
    message?: string;
};

/**
 * Outage Bar Alert Notification
 */
export type AlertNotification = {
    text: string;
    linkText: string;
    to: string;
    status: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Backend API Name
 */
export type ApiName = "heroku" | "render" | "railway";

/**
 * Backend API URL
 */
export type ApiUrl = {
    id: number;
    name: ApiName;
    url: string;
    enabled: boolean;
    reachable: boolean;
    duration: number;
    isBest?: boolean;
    baseUrl?: string;
    postFix?: string;
};

/**
 * Backend API Durations
 */
export type Durations = { [id: string]: number; };

/**
 * Fetch Values
 */
export type FetchValues = {
    /**
     * Loading State
     */
    loading: boolean;
    /**
     * Error State
     */
    error: any | undefined;
    /**
     * Value State
     */
    value: any | undefined;
};

/**
 * Default Fetch Header Options
 */
export type DefaultOptions = {
    headers: {
        "Content-Type": string;
    }
};
