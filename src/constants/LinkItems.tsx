import { Home, Api, Apps, MonitorHeart, Storage, RssFeed, Lan, GitHub, Twitter } from "@mui/icons-material";

import { REACT_APP_GITHUB_REPO_URL, REACT_APP_ROCKSTAR_TWITTER_URL } from "./urls";

import type {LinkItem } from "../types";

export const LinkItems: LinkItem[] = [
    {
        id: 0, text: 'All', description: 'All Rockstar Services and Statuses', icon: <Apps />, type: 'internal', to: '/all'
    },
    {
        id: 1, text: 'Services', description: 'Rockstar Services', icon: <Storage />, type: 'internal', to: '/services'
    },
    {
        id: 2, text: 'Statuses', description: 'Rockstar Statuses', icon: <RssFeed />, type: 'internal', to: '/statuses'
    },
    {
        id: 3, text: 'API', description: 'API Status', icon: <Api />, type: 'internal', to: '/api'
    },
    {
        id: 4, text: 'Outages', description: 'Check Known Outages', icon: <MonitorHeart />, type: 'internal', to: '/outages'
    },
    {
        id: 5, text: 'API Routes', description: 'Backend API Routes', icon: <Lan />, type: 'external', href: `${process.env.REACT_APP_BACKEND_API_HEROKU_URL}`
    },
    {
        id: 6, text: 'GitHub Repo', description: 'Source Code', icon: <GitHub />, type: 'external', href: `${REACT_APP_GITHUB_REPO_URL}`
    },
    {
        id: 7, text: 'Rockstar Support', description: 'Rockstar Support Twitter Account', icon: <Twitter />, type: 'external', href: `${REACT_APP_ROCKSTAR_TWITTER_URL}`
    },
    {
        id: 8, text: 'Home', description: 'Go Home', icon: <Home />, type: 'other', href: '/'
    }
];