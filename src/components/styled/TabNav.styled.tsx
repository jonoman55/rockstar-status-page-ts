import { Link, LinkProps } from 'react-router-dom';
import { styled, Tab as MuiTab, TabProps } from '@mui/material';

export function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

export const Tab = styled(({ ...props }: TabProps) =>
    <MuiTab {...props} />
)(({ theme }) => ({
    padding: theme.spacing(0),
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    fontFamily: [
        'Roboto',
        'sans-serif',
    ].join(','),
    '&.Mui-selected': {
        color: theme.palette.mode === 'dark'
            ? theme.custom.palette.main
            : theme.palette.common.white,
    },
}));

export const TabLink = styled(({ ...props }: TabProps) =>
    <MuiTab {...props} />
)(({ theme }) => ({
    padding: theme.spacing(0),
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    fontFamily: [
        'Roboto',
        'sans-serif',
    ].join(','),
    '&.Mui-selected': {
        color: theme.palette.mode === 'dark'
            ? theme.custom.palette.main
            : theme.palette.common.white,
    },
})) as unknown as typeof Link;

interface Props extends LinkProps { }

export const LinkTab = (props: Props) => (
    <TabLink
        {...props}
        onClick={(event) => {
            event.preventDefault();
        }}
    />
);