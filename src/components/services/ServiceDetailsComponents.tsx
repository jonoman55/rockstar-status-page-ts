import { Box, CardActions, Divider, Stack, Typography } from '@mui/material';

import { CardActionBox, StatusChip } from '../shared';
import { Image, ImageBox, StatusTextBox } from '../styled/ServiceDetailsCard.styled';
import { fetchImage } from '../../helpers';

import type { StatusType } from '../../types';

export const CardImage: React.FC<{ id: number; }> = ({ id }): JSX.Element => (
    <ImageBox>
        <Image src={fetchImage(id)} alt='logo' />
    </ImageBox>
);

export const RawHtml: React.FC<{ htmlString: string; }> = ({ htmlString }): JSX.Element => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);

export const HtmlMessage: React.FC<{ message: string; }> = ({ message }): JSX.Element => (
    <Box sx={{ p: 2, mb: 2 }}>
        <RawHtml htmlString={message} />
    </Box>
);

export const Footer: React.FC<{}> = (): JSX.Element => (
    <CardActions sx={{ p: 0, display: 'flex' }}>
        <CardActionBox />
    </CardActions>
);

interface StatusTextProps {
    name: string;
    status: StatusType;
};

export const StatusText: React.FC<StatusTextProps> = ({ name, status }): JSX.Element => (
    <StatusTextBox>
        <Typography variant='h6'>{name}</Typography>
        <StatusChip status={`${status?.toUpperCase()}`} />
    </StatusTextBox>
);

interface StatusesListProps {
    status: StatusType;
    service: StatusType;
};

export const StatusesList: React.FC<StatusesListProps> = ({ status, service }): JSX.Element => (
    <Stack direction='column' spacing={1} display='flex' alignItems='baseline' justifyContent='flex-start'>
        <StatusText name='Service' status={service} />
        <Divider flexItem variant='middle' sx={{ py: 1 }} />
        <StatusText name='Status' status={status} />
    </Stack>
);
