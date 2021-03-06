import { Home, Api, Apps, Storage, RssFeed, Lan, GitHub } from "@mui/icons-material";

import type { LinkItem } from "../types";

export const LinkItems: LinkItem[] = [
    {
        id: 0, text: 'All', description: 'All Rockstar Services and Statuses', icon: <Apps />, type: 'internal'
    },
    {
        id: 1, text: 'Services', description: 'Rockstar Services', icon: <Storage />, type: 'internal'
    },
    {
        id: 2, text: 'Statuses', description: 'Rockstar Statuses', icon: <RssFeed />, type: 'internal'
    },
    {
        id: 3, text: 'API', description: 'API Status', icon: <Api />, type: 'internal'
    },
    {
        id: 4, text: 'API Routes', description: 'Backend API Routes', icon: <Lan />, type: 'external', href: `${process.env.REACT_APP_BACKEND_API_URL}`
    },
    {
        id: 5, text: 'GitHub Repo', description: 'Source Code', icon: <GitHub />, type: 'external', href: `${process.env.REACT_APP_GITHUB_URL}`
    },
    {
        id: 6, text: 'Home', description: 'Go Home', icon: <Home />, type: 'other'
    },
];