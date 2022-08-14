import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    tabValue: number;
    drawerOpen: boolean;
    navbarAlignment: string;
    servicePageId: number;
    targetHref: string;
    isServiceRoute: boolean;
};

const initialState: AppState = {
    tabValue: 0,
    drawerOpen: false,
    navbarAlignment: 'Home',
    servicePageId: 0,
    targetHref: '/all',
    isServiceRoute: false
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
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;