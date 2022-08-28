import { createSlice } from '@reduxjs/toolkit';

import { getItem } from '../hooks';

const theme = getItem('theme') as string;

interface ThemeState {
    darkMode: boolean;
};

const initialState: ThemeState = {
    darkMode: Boolean(theme) ? true : false
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state: ThemeState) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem(
                'theme',
                state.darkMode.toString()
            );
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;