import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';

import { SnackbarProvider } from './contexts/AlertContext';
import { ErrorFallback, LoadingContainer } from './components';
import { darkTheme, lightTheme } from './theme';
import { useAppSelector } from './app/hooks';

const Routes: React.LazyExoticComponent<() => JSX.Element> = lazy(
    () => import('./routes')
);

const App: React.FC<{}> = (): JSX.Element => {
    const darkMode: boolean = useAppSelector((state) => state.theme.darkMode);
    const activeTheme: Theme = createTheme(darkMode ? darkTheme : lightTheme);
    return (
        <ThemeProvider theme={activeTheme}>
            <SnackbarProvider>
                <CssBaseline />
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                    <Suspense fallback={<LoadingContainer />}>
                        <Routes />
                    </Suspense>
                </ErrorBoundary>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
