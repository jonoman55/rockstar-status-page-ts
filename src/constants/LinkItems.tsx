import { Home, Api, Apps, AppsOutage, Storage, RssFeed, Lan, GitHub, Twitter } from "@mui/icons-material";

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
        id: 4, text: 'Outages', description: 'Check Known Outages', icon: <AppsOutage />, type: 'internal'
    },
    {
        id: 5, text: 'API Routes', description: 'Backend API Routes', icon: <Lan />, type: 'external', href: `${process.env.REACT_APP_BACKEND_API_URL}`
    },
    {
        id: 6, text: 'GitHub Repo', description: 'Source Code', icon: <GitHub />, type: 'external', href: `${process.env.REACT_APP_GITHUB_URL}`
    },
    {
        id: 7, text: 'Rockstar Support', description: 'Rockstar Support Twitter Account', icon: <Twitter />, type: 'external', href: `${process.env.REACT_APP_ROCKSTAR_TWITTER_URL}`
    },
    {
        id: 8, text: 'Home', description: 'Go Home', icon: <Home />, type: 'other'
    }
];