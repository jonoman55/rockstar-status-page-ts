import {
    Paper as MuiPaper,
    Card as MuiCard,
    CardHeader as MuiCardHeader,
    CardMedia as MuiCardMedia,
    CardContent as MuiCardContent,
    CardActions as MuiCardActions,
} from '@mui/material';
import { styled, Avatar, IconButton, SxProps } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import { CardActionBox, StatusIcon } from '../shared';
import { fetchImage } from '../../helpers';

import type { StatusType } from '../../types';

export const Paper = styled(MuiPaper)(({ theme }) => ({
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

export const Card = styled(MuiCard)(({ theme }) => ({
    height: '100%',
    width: '100%',
    alignContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(1),
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

interface CardHeaderProps {
    title: string;
    subheader: string;
    status: StatusType;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subheader, status, onClick }) => (
    <MuiCardHeader
        avatar={<StatusAvatar status={status} />}
        action={<RefreshButton onClick={onClick} />}
        title={title}
        subheader={subheader}
        sx={{ textAlign: 'right' }}
    />
);

export const CardMedia: React.FC<{ id: number }> = ({ id }) => (
    <MuiCardMedia
        sx={{ objectFit: 'contain' }}
        component='img'
        height='198px'
        image={fetchImage(id)}
        alt='logo'
    />
);

interface RefreshButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => (
    <IconButton aria-label='refresh' onClick={onClick} sx={{ color: 'primary.contrastText' }}>
        <RefreshIcon fontSize='large' />
    </IconButton>
);

export const StatusAvatar: React.FC<{ status: StatusType; }> = ({ status }) => (
    <Avatar aria-label='status-icon' sx={{ bgcolor: 'inherit' }}>
        <StatusIcon status={status} />
    </Avatar>
);

export const CardFooter: React.FC<{ sx?: SxProps; }> = ({ sx }) => (
    <CardActions sx={{ p: 0, display: 'flex', ...sx }}>
        <CardActionBox />
    </CardActions>
);
