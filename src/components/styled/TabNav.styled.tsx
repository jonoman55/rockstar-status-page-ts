import { styled, Tabs as MuiTabs, Tab as MuiTab, Paper as MuiPaper, Box } from '@mui/material';

export const Paper = styled(MuiPaper)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
}));

interface TabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
};

export const Tabs = styled((props: TabsProps) => (
    <MuiTabs
        variant='fullWidth'
        centered
        {...props}
        TabIndicatorProps={{
            children: <Box component="span" className="MuiTabs-indicatorSpan" />
        }}
    />
))(({ theme }) => ({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 50,
        width: '100%',
        backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.common.white
            : theme.custom.palette.main,
    },
}));

interface TabProps {
    label: string;
};

export const Tab = styled((props: TabProps) => (
    <MuiTab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    fontFamily: [
        'Roboto',
        'sans-serif',
    ].join(','),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
        color: theme.palette.mode === 'dark'
            ? theme.custom.palette.main
            : theme.palette.common.white,
        '&:hover': {
            color: theme.palette.action.disabledBackground
        },
    },
    '&:hover': {
        color: theme.palette.mode === 'dark'
            ? theme.custom.palette.main
            : theme.palette.common.white,
    },
}));


export function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};
