import { styled, Box, Tooltip, TooltipProps, tooltipClasses, Zoom, SxProps } from '@mui/material';

/**
 * Styled Tooltip
 */
export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        border: 'solid',
        borderWidth: 'thin',
        boxShadow: theme.shadows[2],
        fontWeight: 'bold',
        fontSize: 12,
        borderColor: theme.palette.primary.contrastText,
    },
}));

/**
 * ToolTip Props
 */
interface Props {
    /**
     * Tooltip Title
     */
    title: string;
    /**
     * Tooltip Placement
     */
    placement: TooltipProps['placement'];
    /**
     * React Child Component
     */
    component: React.ReactNode | JSX.Element | JSX.Element[];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles
     */
    sx?: SxProps
}

/**
 * Custom ToolTip Component
 * @param {Props} props title, placement, component, sx
 * @returns {JSX.Element} Rendered ToolTip
 */
export const ToolTip = ({ title, placement, component, sx }: Props): JSX.Element => (
    <StyledTooltip title={title} placement={placement} TransitionComponent={Zoom}>
        <Box component='div' sx={sx}>
            {component}
        </Box>
    </StyledTooltip>
);
