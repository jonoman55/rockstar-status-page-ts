import { styled, Box, Tooltip, TooltipProps, tooltipClasses, Zoom, SxProps } from '@mui/material';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
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

interface Props {
    title: string;
    placement: TooltipProps['placement'];
    component: React.ReactNode | JSX.Element | JSX.Element[]
    sx?: SxProps
}

export const ToolTip = ({ title, placement, component, sx }: Props) => (
    <StyledTooltip title={title} placement={placement} TransitionComponent={Zoom}>
        <Box component='div' sx={sx}>
            {component}
        </Box>
    </StyledTooltip>
);