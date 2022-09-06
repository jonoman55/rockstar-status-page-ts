import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { OutageBarAlert } from '../types';

interface AppState {
    tabValue: number;
    drawerOpen: boolean;
    navbarAlignment: string;
    servicePageId: number;
    targetHref: string;
    isServiceRoute: boolean;
    showToolbar: boolean;
    outageCount: number;
    activeAlerts: number;
    outageAlerts: OutageBarAlert[];
    activeOutages: OutageBarAlert[];
    resetAlerts: boolean;
    resetAlertsOpen: boolean;
};

const initialState: AppState = {
    tabValue: 0,
    drawerOpen: false,
    navbarAlignment: 'Home',
    servicePageId: 0,
    targetHref: '/all',
    isServiceRoute: false,
    showToolbar: true,
    outageCount: 0,
    activeAlerts: 0,
    outageAlerts: [],
    activeOutages: [],
    resetAlerts: false,
    resetAlertsOpen: true
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: () => initialState,
        setTabValue: (state: AppState, action: PayloadAction<number>) => {
            state.tabValue = action.payload;
        },
        setDrawerOpen: (state: AppState, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
        setNavbarAlignment: (state: AppState, action: PayloadAction<string>) => {
            state.navbarAlignment = action.payload;
        },
        setServicePageId: (state: AppState, action: PayloadAction<number>) => {
            state.servicePageId = action.payload;
        },
        setTargetHref: (state: AppState, action: PayloadAction<string>) => {
            state.targetHref = action.payload;
        },
        setIsServiceRoute: (state: AppState, action: PayloadAction<boolean>) => {
            state.isServiceRoute = action.payload;
        },
        setShowToolbar: (state: AppState, action: PayloadAction<boolean>) => {
            state.showToolbar = action.payload;
        },
        setOutageCount: (state: AppState, action: PayloadAction<number>) => {
            state.outageCount = action.payload;
        },
        setActiveAlerts: (state: AppState, action: PayloadAction<number>) => {
            state.activeAlerts = action.payload;
        },
        setOutageAlerts: (state: AppState, action: PayloadAction<OutageBarAlert[]>) => {
            state.outageAlerts = action.payload;
        },
        setActiveOutages: (state: AppState, action: PayloadAction<OutageBarAlert[]>) => {
            state.activeOutages = action.payload;
        },
        setResetAlerts: (state: AppState, action: PayloadAction<boolean>) => {
            state.resetAlerts = action.payload;
        },
        setResetAlertsOpen: (state: AppState, action: PayloadAction<boolean>) => {
            state.resetAlertsOpen = action.payload;
        },
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;