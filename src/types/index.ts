import { ReactNode } from "react";

export type ChildProps = ReactNode | JSX.Element | JSX.Element[];

export type StatusType = 'up' | 'down' | 'limited'; 
export type ASCIICacheKey<StatusType extends string> = `${Lowercase<StatusType>}`;
export type StatusIndicator = ASCIICacheKey<StatusType>;

export interface Service {
    id: number;
    name: string;
    tag: string;
    category_id: string | null;
    sandbox_category_id: string | null;
    alert_status: number;
    priority: number;
    updated: string;
    message: string;
    status: number,
    recent_update: string;
    hash: string;
    status_tag: string;
};

export interface ServicePlatform {
    id: number;
    service_id: number;
    name: string;
    service_status_id: number;
    priority: number;
    updated: string;
    service_status: {
        id: number;
        status: string;
    };
};

export interface Status extends Service {
    services_platforms: ServicePlatform[];
};

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export type LinkType = 'internal' | 'external' | 'other';

export type LinkItem = {
    id: number;
    text: string;
    description: string;
    icon: ChildProps;
    type: LinkType;
    href?: string;
};
