import { JSXElementConstructor, LazyExoticComponent, LegacyRef, ReactElement, ReactNode } from "react";
import { GridColDef } from "@mui/x-data-grid";

/**
 * React Node and JSX Elements
 */
export type Children = ReactNode | JSX.Element | JSX.Element[];

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
export type Placement =
    "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
    | undefined

/**
 * Drawer Anchor
 */
export type Anchor = 'top' | 'left' | 'bottom' | 'right';

/**
 * Link Type
 */
export type LinkType = 'internal' | 'external' | 'other' | 'settings';

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
