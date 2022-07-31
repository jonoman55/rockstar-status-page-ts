import { styled, AppBar as MuiAppBar, AppBarProps, Container as MuiContainer, Stack as MuiStack, SxProps } from '@mui/material';
import { Copyright } from '@mui/icons-material';

import { FlexButton, ToolTip } from '../controls';

interface FooterLinkProps {
    text: string;
    tooltip: string;
    onClick: () => void;
    sx?: SxProps;
};

export const FooterLink: React.FC<FooterLinkProps> = ({ text, tooltip, onClick, sx }) => (
    <ToolTip title={tooltip} placement='top' component={
        <FlexButton
            sx={{ m: 1 }}
            onClick={onClick}
            startIcon={<Copyright sx={sx} />}
        >
            {text}&nbsp;{new Date().getFullYear()}
        </FlexButton>}
    />
);

export const AppBar = styled(({ ...props }: AppBarProps) =>
    <MuiAppBar component='footer' {...props} />
)(({ theme }) => ({
    padding: theme.spacing(1),
    bottom: 0,
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: theme.custom.palette.main,
}));

export const Container = styled(MuiContainer)(({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const Stack = styled(MuiStack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    padding: theme.spacing(0),
    margin: theme.spacing(0)
}));
