import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { SnackbarProvider } from './contexts/AlertContext';
import { ErrorFallback, LoadingContainer } from './components';
import { darkTheme, lightTheme } from './theme';
import { useAppSelector } from './app/hooks';

const Routes = lazy(() => import('./routes'));

// TODO : Finish implementing all UI components and pages
// NOTE : mui docs -> https://mui.com/material-ui/getting-started/overview/
// NOTE : old source code ref -> https://github.com/jonoman55/rockstar-status-page
// TODO : Push code to GitHub
const App = () => {
    const theme = useAppSelector((state) => state.theme);
    const activeTheme = createTheme(theme.darkTheme ? darkTheme : lightTheme);
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
