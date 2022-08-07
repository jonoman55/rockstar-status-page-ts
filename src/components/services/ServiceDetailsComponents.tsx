import { Box, CardActions, Divider, Stack, Theme, Typography } from '@mui/material';

import { CardActionBox, StatusChip } from '../shared';
import { Image, ImageBox, StatusTextBox } from '../styled/ServiceDetailsCard.styled';
import { fetchImage } from '../../helpers';

import type { StatusType } from '../../types';

export const CardImage: React.FC<{ id: number; }> = ({ id }) => (
    <ImageBox>
        <Image
            src={fetchImage(id)}
            alt='logo'
        />
    </ImageBox>
);

export const RawHtml: React.FC<{ htmlString: string; }> = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);

export const HtmlMessage: React.FC<{ message: string; }> = ({ message }) => (
    <Box sx={{ p: 2, mb: 2 }}>
        <RawHtml htmlString={message} />
    </Box>
);

export const Footer: React.FC = () => (
    <CardActions sx={{ p: 0, display: 'flex' }}>
        <CardActionBox />
    </CardActions>
);

export const StatusText: React.FC<{ name: string; status: StatusType, theme: Theme; }> = ({ name, status, theme }) => (
    <StatusTextBox>
        <Typography variant='h6'>{name}</Typography>
        <StatusChip status={`${status?.toUpperCase()}`} theme={theme} />
    </StatusTextBox>
);

export const StatusesList: React.FC<{ status: StatusType, service: StatusType, theme: Theme; }> = ({ status, service, theme }) => (
    <Stack direction='column' spacing={1} display='flex' alignItems='baseline' justifyContent='flex-start'>
        <StatusText name='Service' status={service} theme={theme} />
        <Divider flexItem variant='middle' sx={{ py: 1 }} />
        <StatusText name='Status' status={status} theme={theme} />
    </Stack>
);
