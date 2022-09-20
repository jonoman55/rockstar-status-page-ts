import {
    Paper as MuiPaper,
    Card as MuiCard,
    CardHeader as MuiCardHeader,
    CardMedia as MuiCardMedia,
    CardContent as MuiCardContent,
    CardActions as MuiCardActions,
    CardContentProps as MuiCardContentProps,
} from '@mui/material';
import { styled, Avatar, IconButton, SxProps } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import { CardActionBox, StatusIcon } from '../shared';
import { fetchImage, fetchCardImage } from '../../helpers';

import type { StatusType } from '../../types';
import { ToolTip } from '../controls';

export const Paper = styled(MuiPaper)(({ theme }) => ({
    height: '100%',
    width: '100%',
    padding: theme.spacing(6),
    backgroundColor: 'transparent', // theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 0,
    [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(2),
    },
}));

export const Card = styled(MuiCard)(({ theme }) => ({
    height: '100%',
    width: '100%',
    alignContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    '& .MuiCardHeader-title': {
        textAlign: 'right',
        color: theme.palette.primary.contrastText,
        paddingRight: theme.spacing(1),
    },
    '& .MuiCardHeader-subheader': {
        textAlign: 'right',
        color: theme.palette.primary.contrastText,
        paddingRight: theme.spacing(1),
    },
}));

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: theme.spacing(0),
    marginTop: theme.spacing(4),
}));

export const CardActions = styled(MuiCardActions)(({
    display: 'flex',
}));

export const CardContentPaper = styled(({ ...props }: MuiCardContentProps) =>
    <MuiCardContent component={MuiPaper} elevation={1} {...props} />
)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: theme.spacing(0),
    margin: theme.spacing(4, 0),
    '&:last-child': {
        paddingBottom: theme.spacing(0),
    },
}));

interface CardHeaderProps {
    title: string;
    subheader: string;
    status: StatusType;
    onRefreshClick: React.MouseEventHandler<HTMLButtonElement>;
    disabledAvatarClick?: boolean;
    onAvatarClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subheader, status, onRefreshClick, disabledAvatarClick, onAvatarClick }): JSX.Element => (
    <MuiCardHeader
        avatar={<RenderStatusAvatar status={status} disabled={disabledAvatarClick} onClick={onAvatarClick} />}
        action={<RefreshButton onClick={onRefreshClick} />}
        title={title}
        subheader={subheader}
        sx={{ textAlign: 'right' }}
    />
);

export const CardMedia: React.FC<{ id: number }> = ({ id }): JSX.Element => (
    <MuiCardMedia
        sx={{ objectFit: 'contain', mt: 2, mb: 1 }}
        component='img'
        height='198px'
        image={fetchCardImage(id)}
        alt='logo'
    />
);

export const CardMediaBrandLogo: React.FC<{ id: number }> = ({ id }): JSX.Element => (
    <MuiCardMedia
        sx={{ objectFit: 'contain' }}
        component='img'
        height='198px'
        image={fetchImage(id)}
        alt='logo'
    />
);

interface RefreshButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }): JSX.Element => (
    <IconButton aria-label='refresh' onClick={onClick} sx={{ color: 'primary.contrastText' }}>
        <RefreshIcon fontSize='large' />
    </IconButton>
);

interface StatusAvatarProps {
    status: StatusType;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const StatusAvatar: React.FC<StatusAvatarProps> = ({ status, disabled, onClick }): JSX.Element => (
    <IconButton disabled={disabled} onClick={onClick} sx={{ m: 0, p: 0 }}>
        <Avatar aria-label='status-icon' sx={{ bgcolor: 'inherit' }}>
            <StatusIcon status={status} />
        </Avatar>
    </IconButton>
);

const RenderStatusAvatar = ({ status, disabled, onClick }: StatusAvatarProps): JSX.Element => (
    disabled ? (
        <StatusAvatar status={status} disabled={disabled} onClick={onClick} />
    ) : (
        <ToolTip title='Status Menu' placement='top' component={
            <StatusAvatar status={status} disabled={disabled} onClick={onClick} />}
        />
    )
);

export const CardFooter: React.FC<{ sx?: SxProps; }> = ({ sx }): JSX.Element => (
    <CardActions sx={{ p: 0, display: 'flex', ...sx }}>
        <CardActionBox />
    </CardActions>
);
