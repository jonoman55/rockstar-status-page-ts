import {
    Paper as MuiPaper,
    Card as MuiCard,
    CardHeader as MuiCardHeader,
    CardMedia as MuiCardMedia,
    CardContent as MuiCardContent,
    CardActions as MuiCardActions
} from '@mui/material';
import { styled, Avatar, Box, IconButton } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import { StatusIcon } from '../shared';
import { FetchImage } from '../../helpers';

import type { StatusType } from '../../types';

export const Paper = styled(MuiPaper)(({ theme }) => ({
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

export const Card = styled(MuiCard)(({ theme }) => ({
    alignContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(1),
    '& .MuiCardHeader-title': {
        color: theme.palette.primary.contrastText,
        paddingRight: theme.spacing(1),
    },
    '& .MuiCardHeader-subheader': {
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

export const CardHeader = ({ title, subheader, status, onClick }: CardHeaderProps) => (
    <MuiCardHeader
        avatar={<AvatarStatusIcon status={status} />}
        action={<RefreshButton onClick={onClick} />}
        title={title}
        subheader={subheader}
        sx={{ textAlign: 'right' }}
    />
);

export const CardMedia = ({ id }: { id: number }) => (
    <MuiCardMedia
        sx={{ objectFit: 'contain' }}
        component='img'
        height='198px'
        image={FetchImage(id)}
        alt='logo'
    />
);

interface RefreshButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const RefreshButton = ({ onClick }: RefreshButtonProps) => (
    <IconButton aria-label='refresh' onClick={onClick} sx={{ color: 'primary.contrastText' }}>
        <RefreshIcon fontSize='large' />
    </IconButton>
);

export const AvatarStatusIcon = ({ status }: { status: StatusType }) => (
    <Avatar aria-label='status-icon' sx={{ bgcolor: 'inherit' }}>
        <StatusIcon status={status} />
    </Avatar>
);

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
