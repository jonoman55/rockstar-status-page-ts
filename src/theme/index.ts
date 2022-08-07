// Rockstar Yellow #ffa500
// Rockstar Gray #f2f2f2
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=f2f2f2&secondary.color=424242
import { PaletteColor, ThemeOptions } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

import type { CustomPalette } from "../types";

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      palette: {
        main: string;
        gray: string;
        error: string;
        green: string;
        red: string;
        yellow: string;
        alert: string;
        stadia: string;
        playstation: string;
        xboxOne: string;
        xbox360: string;
        xboxCloud: string;
        brightGreen: string;
        brightRed: string;
        brightYellow: string;
        cloud: string;
        auth: string;
        store: string;
        all: string;
        downloads: string;
        pc: string;
      }
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      palette?: {
        main?: string;
        gray?: string;
        error?: string;
        green?: string;
        red?: string;
        yellow?: string;
        alert?: string;
        stadia?: string;
        playstation?: string;
        xboxOne?: string;
        xbox360?: string;
        xboxCloud?: string;
        brightGreen?: string;
        brightRed?: string;
        brightYellow?: string;
        cloud?: string;
        auth?: string;
        store?: string;
        all?: string;
        downloads?: string;
        pc?: string;
      }
    };
  }
};

const scrollBodyLight = {
  scrollbarColor: '#959595 #2b2b2b',
  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
    backgroundColor: '#2b2b2b',
  },
  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    backgroundColor: '#959595',
    minHeight: 24,
    border: '3px solid #2b2b2b',
  },
  '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
    backgroundColor: '#6b6b6b',
  },
  '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
    backgroundColor: '#6b6b6b',
  },
  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#6b6b6b',
  },
  '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
    backgroundColor: '#2b2b2b',
  },
};

const scrollBodyDark = {
  scrollbarColor: '#6b6b6b #2b2b2b',
  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
    backgroundColor: '#2b2b2b',
  },
  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    backgroundColor: '#6b6b6b',
    minHeight: 24,
    border: '3px solid #2b2b2b',
  },
  '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
    backgroundColor: '#959595',
  },
  '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
    backgroundColor: '#959595',
  },
  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#959595',
  },
  '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
    backgroundColor: '#2b2b2b',
  },
};

const light: PaletteColor = {
  main: '#f2f2f2',
  light: '#ffffff',
  dark: '#bfbfbf',
  contrastText: '#000000',
};

const dark: PaletteColor = {
  main: '#424242',
  light: '#6d6d6d',
  dark: '#1b1b1b',
  contrastText: '#ffffff',
};

const custom: CustomPalette = {
  palette: {
    main: '#ffa500',
    gray: '#f2f2f2',
    error: '#d32f2f',
    green: '#0cfa1c',
    red: '#ff0000',
    yellow: '#fff700',
    alert: '#ffeb3b',
    stadia: '#f44336',
    playstation: '#2196f3',
    xboxOne: '#9bf00b',
    xbox360: '#00af00',
    xboxCloud: '#9e9e9e',
    brightGreen: '#0cf223',
    brightRed: '#f50202',
    brightYellow: '#fff700',
    cloud: '#7f7fda',
    auth: '#fdc60f',
    store: '#27ebd1',
    all: '#147af0',
    downloads: '#dc5ffc',
    pc: '#181717'
  }
};

const typography: TypographyOptions = {
  fontFamily: [
    'Neue Haas Grotesk Light',
    'sans-serif',
  ].join(','),
};

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: light,
    secondary: dark,
  },
  custom: custom,
  typography: typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: scrollBodyLight,
      },
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: dark,
    secondary: light,
  },
  custom: custom,
  typography: typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: scrollBodyDark,
      },
    },
  },
};
