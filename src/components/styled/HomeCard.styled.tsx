import { Box, Stack, Link, Typography, Card, Paper, Grid } from '@mui/material';
import { styled, darken, lighten } from '@mui/material/styles'
import { Wifi as WifiIcon } from '@mui/icons-material';

export const StatusCard = styled(Card)(({ theme }) => ({
    minHeight: '675px',
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : darken(
            theme.palette.primary.light,
            theme.palette.action.focusOpacity
        ),
    textDecoration: 'none',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: lighten(
            theme.palette.primary.dark,
            theme.palette.action.hoverOpacity
        ),
    },
}));

export const CardImageBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    border: `solid 1px ${theme.palette.common.black}`,
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.common.white,
}));

export const CardName = styled(Typography)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    textAlign: 'center',
    color: theme.custom.palette.main,
}));

export const PlatformItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
}));

export const PlatformWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
}));

export const RockstarLinkStack = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

export const RockstarLink = styled(Link)(({ theme }) => ({
    mb: '0.35em',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    '&:hover': {
        color: theme.custom.palette.main,
    },
}));

export const RockstarLinkIcon = styled(WifiIcon)(({ theme }) => ({
    color: theme.custom.palette.brightGreen,
}));

export const IndicatorsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginLeft: theme.spacing(0.25),
    marginTop: theme.spacing(-4),
}));

export const IndicatorsGridPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(0.5),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    minHeight: '125px',
    width: '100%'
}));

export const IndicatorsGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2, 1, 2, 2),
    marginTop: theme.spacing(1),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
}));

export const IndicatorPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : lighten(
            theme.palette.primary.dark,
            theme.palette.action.focusOpacity
        ),
    minWidth: '75px',
    minHeight: '50px',
}));

export const IndicatorTitle = styled(Typography)(({ theme }) => ({
    color: theme.custom.palette.main,
    padding: theme.spacing(0.25, 0),
    textAlign: 'center',
}));

export const IndicatorStatus = styled(Typography)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    textTransform: 'uppercase',
}));
