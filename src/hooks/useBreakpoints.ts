import { useTheme, useMediaQuery, Breakpoint } from "@mui/material";

/**
 * Use Breakpoints to match screen size
 * @param {Breakpoint} size A breakpoint key (xs, sm, etc.) or a screen width number in px
 * @param {string} on "up" or "down"
 * @returns {boolean} matches
 */
export const useBreakpoint = (
    size: Breakpoint = 'sm',
    on: string = 'up'
): boolean => {
    const theme = useTheme();
    return useMediaQuery(
        on === 'down'
            ? theme.breakpoints.down(size)
            : theme.breakpoints.up(size), {
        noSsr: true
    });
};
