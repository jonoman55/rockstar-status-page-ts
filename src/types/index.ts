import { ReactNode } from "react";

export type ChildProps = ReactNode | JSX.Element | JSX.Element[];

export type StatusType = 'up' | 'down' | 'limited'; 

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

export type Platform = {
    id: number;
    name: string;
    status: string;
};

export interface Status extends Service {
    services_platforms: Platform[];
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

export type Indicator = {
    key: number;
    value: string;
};
