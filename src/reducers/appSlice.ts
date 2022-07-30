import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    tabValue: number;
    drawerOpen: boolean;
    navbarAlignment: string;
    servicePageId: number;
};

const initialState: AppState = {
    tabValue: 0,
    drawerOpen: false,
    navbarAlignment: 'Home',
    servicePageId: 0,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTabValue: (state: AppState, action: PayloadAction<number>) => {
            state.tabValue = action.payload;
        },
        setDrawerAnchor: (state: AppState, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
        setNavbarAlignment: (state: AppState, action: PayloadAction<string>) => {
            state.navbarAlignment = action.payload;
        },
        setServicePageId: (state: AppState, action: PayloadAction<number>) => {
            state.servicePageId = action.payload;
        },
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;