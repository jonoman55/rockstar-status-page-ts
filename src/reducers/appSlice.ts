import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    tabValue: number;
    drawerOpen: boolean;
};

const initialState: AppState = {
    tabValue: 0,
    drawerOpen: false,
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
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;