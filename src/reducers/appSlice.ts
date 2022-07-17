// DOCS : https://redux-toolkit.js.org/usage/usage-with-typescript#createslice
import { createSlice } from '@reduxjs/toolkit';

interface AppState {
    tabValue: number;
    drawerOpen: boolean;
};

const initialState: AppState = {
    tabValue: 0,
    drawerOpen: false
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTabValue: (state, action) => {
            state.tabValue = action.payload;
        },
        setDrawerAnchor: (state, action) => {
            state.drawerOpen = action.payload;
        },
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;